import ViewField from './subView/ViewField';
import ViewPoint from './subView/ViewPoint';
import ViewTooltip from './subView/ViewTooltip';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import assignTooltips from './utils/assignTooltips';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { viewConfig, userConfig, pointData, eventTypes, viewElements } from '../types';
import Observer from '../Observer/Observer';
import isFirstPointClosest from './utils/isFirstPointClosest'
import demarcatePoints from './utils/demarcatePoints'

class View extends Observer {
  slider!: ViewContainer;

  firstPoint!: ViewPoint;

  secondPoint!: ViewPoint;

  field!: ViewField;

  firstTooltip!: ViewTooltip;

  secondTooltip!: ViewTooltip;

  progressBar!: ViewProgressBar;

  scale!: ViewScale;

  config!: viewConfig;

  tooltipTotal!: ViewTooltip;

  mouseCoords!: number;

  constructor(config: userConfig) {
    super();
    this.slider = new ViewContainer(config.target);
    this.init(config);
  }

  setConfig(config: userConfig): void {
    this.config = { ...this.config, ...config };
    this.validate();
    this.removeElements();
    this.renderElements();
    this.addHandlers();
    this.emit('elementsRendered')
  }

  getElements(): viewElements { 
    let secondPoint
    if(this.secondPoint) secondPoint = this.secondPoint.divElement
    return {
      slider: this.slider.divElement,
      field: this.field.divElement,
      firstPoint: this.firstPoint.divElement,
      secondPoint,
    }
  }

  renderElements(): void {
    const { isRangeSlider } = this.config;
    this.field = new ViewField({ ...this.config, root: this.slider.divElement });
    this.firstPoint = new ViewPoint({...this.config, root: this.field.divElement });
    this.progressBar = new ViewProgressBar({
      root: this.field.divElement,
      ...this.config,
      ...this.getElements()
    });
    this.scale = new ViewScale({ ...this.config, root: this.slider.divElement });
    if (isRangeSlider) {
      this.secondPoint = new ViewPoint({ ...this.config, root: this.field.divElement });
      this.tooltipTotal = new ViewTooltip({ ...this.config, root: this.firstPoint.divElement }, );
      this.tooltipTotal.divElement.classList.add('-js-slider__tooltip_type_total')
      this.progressBar = new ViewProgressBar({
        root: this.field.divElement,
        ...this.config,
        ...this.getElements(),
      });      
    }
  }

  removeElements(): void {
    [
      this.firstPoint.divElement,
      this.field.divElement,
      this.progressBar.divElement,
      this.scale.divElement,
    ].forEach((item) => item.remove());
    if (this.config.isRangeSlider) this.secondPoint.divElement.remove()
  }

  addHandlers(): void {
    this.addFieldHandler();
    this.getMouseCoords();
    this.addScaleHandler();
    this.addPointHandler();
  }

  changeView(data: pointData): void {
    const { pointOffset, pointName, value } = data;
    if (pointName === 'firstPoint') {
      this.firstPoint.movePoint(pointOffset);
      this.firstPoint.tooltip.changeTooltipValue(value!);
    }
    if (pointName === 'secondPoint' && this.config.isRangeSlider) {
      this.secondPoint.movePoint(pointOffset);
      this.secondPoint.tooltip.changeTooltipValue(value!);
    }
    this.progressBar.progressBarMove();
    assignTooltips(this);
  }

  updateScale(data: number[]): void {
    this.scale.updateValues(data);
    this.addScaleHandler();
  }

  notifyListeners(): void {
    this.emit(eventTypes.pointStopped, this.getFirstPointData());
    if (this.config.isRangeSlider) {
      this.emit(eventTypes.pointStopped, this.getSecondPointData());
    }
  }

  getFirstPointData(): pointData {
    return {
      pointOffset: this.firstPoint.getPointOffset(),
      pointName: 'firstPoint',
    };
  }

  getSecondPointData(): pointData {
    return {
      pointOffset: this.secondPoint.getPointOffset(),
      pointName: 'secondPoint',
    };
  }

  private init(config: userConfig): void {
    let newConfig = config;
    if (typeof newConfig !== 'object') newConfig = {};
    this.config = { ...DEFAULT_VIEW_CONFIG, ...newConfig };
    this.validate();
  }

  private validate(): void {
    let { isHorizontal, isRangeSlider, hasTooltip, hasProgressBar, hasScale } =
      this.config;
    if (typeof isHorizontal !== 'boolean') isHorizontal = true;
    if (typeof isRangeSlider !== 'boolean') isRangeSlider = true;
    if (typeof hasTooltip !== 'boolean') hasTooltip = true;
    if (typeof hasProgressBar !== 'boolean') hasProgressBar = true;
    if (typeof hasScale !== 'boolean') hasScale = true;
    this.config = {
      ...this.config,
      isHorizontal,
      isRangeSlider,
      hasTooltip,
      hasProgressBar,
      hasScale,
    };
  }

  private getMouseCoords(): void {
    const Coords = (event: MouseEvent) => {
      const direction = this.config.isHorizontal ? 'left' : 'top';
      const coordinate = this.config.isHorizontal ? 'clientX' : 'clientY';
      const size = this.config.isHorizontal ? 'offsetWidth' : 'offsetHeight';
      this.mouseCoords =
        event[coordinate] -
        this.field.divElement.getBoundingClientRect()[direction];
      this.mouseCoords = (this.mouseCoords * 100) / this.field.divElement[size];
    };
    document.addEventListener('mousemove', Coords);
  }

  private addPointHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!isFirstPointClosest(this, event)) {
        this.handlePoint(this.secondPoint, this.getSecondPointData.bind(this))
      } else {        
        this.handlePoint(this.firstPoint, this.getFirstPointData.bind(this))
      }
    };
    this.firstPoint.divElement.addEventListener('mousedown', useHandlers);
    if (this.config.isRangeSlider) {
      this.secondPoint.divElement.addEventListener('mousedown', useHandlers);
    }
  }

  private addFieldHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!isFirstPointClosest(this, event)) {
        this.secondPoint.movePoint(this.mouseCoords);
        this.emit(eventTypes.pointStopped, this.getSecondPointData());
      } else {
        this.firstPoint.movePoint(this.mouseCoords);
        this.emit(eventTypes.pointStopped, this.getFirstPointData());
      }
    };
    this.field.divElement.addEventListener('mousedown', useHandlers);
  }

  private addScaleHandler(): void {
    const handleScaleClick = (event: MouseEvent) => {
      const value = event.currentTarget!.innerHTML;
      if (!isFirstPointClosest(this, event)) {
        this.emit(eventTypes.valueChanged, { value, ...this.getSecondPointData() });
      } else {
        this.emit(eventTypes.valueChanged, { value, ...this.getFirstPointData() });
      }
    };
    const scaleChildren = this.field.divElement.nextElementSibling!.querySelectorAll('div');
    scaleChildren.forEach((element) => element.addEventListener('click', handleScaleClick));
  }

  private handlePoint(point: ViewPoint, data: () => pointData): void {
    let shift: number;   
    const emitMouseDown = () => {
      shift = this.mouseCoords - point.getPointOffset();
    };
    const emitMouseMove = () => {
      point.movePoint(this.mouseCoords - shift);
      demarcatePoints(this, data().pointName)
      assignTooltips(this)
      this.emit(eventTypes.pointMoving, data());
    };
    emitMouseDown();
    emitMouseMove();
    document.addEventListener('mousemove', emitMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', emitMouseMove);
      this.emit(eventTypes.pointStopped, data());
      document.onmouseup = null;
    };
  }
}
export default View;
