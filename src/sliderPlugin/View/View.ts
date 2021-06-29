import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import ViewField from './subView/ViewField';
import ViewPoint from './subView/ViewPoint';
import ViewTooltip from './subView/ViewTooltip';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import IView from './IView';
import assignTooltips from './utils/demarcateElements';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { viewConfig, userConfig, pointData, eventTypes } from '../types';
import Observer from '../Observer/Observer';

class View extends Observer implements IView {
  slider!: ViewContainer;

  firstPoint!: ViewPoint;

  secondPoint!: ViewPoint;

  field!: ViewField;

  firstTooltip!: ViewTooltip;

  secondTooltip!: ViewTooltip;

  progressBar!: ViewProgressBar;

  scale!: ViewScale;

  config!: viewConfig;

  fieldSize!: number;

  pointSize!: number;

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
  }

  renderElements(): void {
    const { isRangeSlider } = this.config;
    this.field = new ViewField(this);    
    this.firstPoint = new ViewPoint(this);
    this.firstTooltip = new ViewTooltip(this, this.firstPoint.divElement);
    if (isRangeSlider) {
      this.secondPoint = new ViewPoint(this);
      this.secondTooltip = new ViewTooltip(this, this.secondPoint.divElement);
      this.tooltipTotal = new ViewTooltip(this, this.firstPoint.divElement);
      this.tooltipTotal.hideTooltip();
      this.tooltipTotal.divElement.style.position = 'absolute';
    }
    this.progressBar = new ViewProgressBar(this);
    this.scale = new ViewScale(this);
  }

  removeElements(): void {
    [
      this.firstTooltip.divElement,
      this.firstPoint.divElement,
      this.field.divElement,
      this.progressBar.divElement,
      this.scale.divElement,
    ].forEach((item) => item.remove());

    if (this.config.isRangeSlider) {
      [this.secondTooltip.divElement, this.secondPoint.divElement].forEach(
        (item) => item.remove()
      );
    }
  }

  addHandlers(): void {
    this.addFieldHandler();
    this.getMouseCoords();
    this.addScaleHandler();
    this.addPointHandler();
    // eslint-disable-next-line no-new
    new ResizeSensor(this.slider.divElement, () =>
      this.notifyListeners()
    );
  }

  changeView(data: pointData): void {
    const { pointOffset, pointName, value } = data;

    if (pointName === 'firstPoint') {
      this.firstPoint.movePoint(pointOffset);
      this.firstTooltip.changeTooltipValue(value!);
    }
    if (pointName === 'secondPoint' && this.config.isRangeSlider) {
      this.secondPoint.movePoint(pointOffset);
      this.secondTooltip.changeTooltipValue(value!);
    }
    this.progressBar.progressBarMove();
    assignTooltips(this);
  }

  updateScale(values: number[]): void {
    this.scale.updateValues(values);
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

  addScaleHandler(): void {
    const handleScaleClick = (event: MouseEvent) => {
      const value = event.currentTarget!.innerHTML;
      if (!this.isFirstPointClosest(event)) {
        this.emit(eventTypes.valueChanged, {
          value,
          ...this.getSecondPointData(),
        });
        this.emit(eventTypes.pointStopped, this.getSecondPointData());
      } else {
        this.emit(eventTypes.valueChanged, {
          value,
          ...this.getFirstPointData(),
        });
        this.emit(eventTypes.pointStopped, this.getFirstPointData());
      }
    };
    const scaleChildren =
      this.field.divElement.nextElementSibling!.querySelectorAll('div');
    scaleChildren.forEach((element) =>
      element.addEventListener('click', handleScaleClick)
    );
  }

  private init(config: userConfig): void {
    let newConfig = config;
    if (typeof newConfig !== 'object') newConfig = {};
    this.config = { ...DEFAULT_VIEW_CONFIG, ...newConfig };
    this.validate();
  }

  private validate(): void {
    let { isHorizontal, isRangeSlider, isTooltip, isProgressBar, isScale } =
      this.config;
    if (typeof isHorizontal !== 'boolean') isHorizontal = true;
    if (typeof isRangeSlider !== 'boolean') isRangeSlider = true;
    if (typeof isTooltip !== 'boolean') isTooltip = true;
    if (typeof isProgressBar !== 'boolean') isProgressBar = true;
    if (typeof isScale !== 'boolean') isScale = true;
    this.config = {
      ...this.config,
      isHorizontal,
      isRangeSlider,
      isTooltip,
      isProgressBar,
      isScale,
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
      if (!this.isFirstPointClosest(event)) {
        this.handleSecondPoint();
      } else {
        this.handleFirstPoint();
      }
    };
    this.firstPoint.divElement.addEventListener('mousedown', useHandlers);
    if (this.config.isRangeSlider) {
      this.secondPoint.divElement.addEventListener('mousedown', useHandlers);
    }
  }

  private addFieldHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!this.isFirstPointClosest(event)) {
        this.secondPoint.movePoint(this.mouseCoords);
        this.emit(eventTypes.pointStopped, this.getSecondPointData());
      } else {
        this.firstPoint.movePoint(this.mouseCoords);
        this.emit(eventTypes.pointStopped, this.getFirstPointData());
      }
    };
    this.field.divElement.addEventListener('mousedown', useHandlers);
  }

  private isFirstPointClosest(event: MouseEvent): boolean {
    if (!this.config.isRangeSlider) return true;
    if (event.target === this.firstPoint.divElement) return true;
    if (event.target === this.secondPoint.divElement) return false;
    const firstPointOffset = this.firstPoint.getPointOffset();
    const secondPointOffset = this.secondPoint.getPointOffset();
    const betweenPoints = (secondPointOffset + firstPointOffset) / 2;
    const isPointClose = this.mouseCoords > betweenPoints;
    if (isPointClose) return false;
    return true;
  }

  private handleFirstPoint(): void {
    let shift: number;
    const emitMouseDown = () => {
      shift = this.mouseCoords - this.firstPoint.getPointOffset();
    };
    const emitMouseMove = () => {
      this.firstPoint.movePoint(this.mouseCoords - shift);
      if (
        this.config.isRangeSlider &&
        this.firstPoint.getPointOffset() > this.secondPoint.getPointOffset()
      ) {
        this.firstPoint.movePoint(this.secondPoint.getPointOffset());
      }
      this.emit(eventTypes.pointMoving, this.getFirstPointData());
    };
    emitMouseDown();
    emitMouseMove();
    document.addEventListener('mousemove', emitMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', emitMouseMove);
      this.emit(eventTypes.pointStopped, this.getFirstPointData());
      document.onmouseup = null;
    };
  }

  private handleSecondPoint(): void {
    let shift: number;
    const emitMouseDown = () => {
      shift = this.mouseCoords - this.secondPoint.getPointOffset();
    };
    const emitMouseMove = () => {
      this.secondPoint.movePoint(this.mouseCoords - shift);
      if (
        this.firstPoint.getPointOffset() > this.secondPoint.getPointOffset()
      ) {
        this.secondPoint.movePoint(this.firstPoint.getPointOffset());
      }
      this.emit(eventTypes.pointMoving, this.getSecondPointData());
    };
    emitMouseDown();
    emitMouseMove();
    document.addEventListener('mousemove', emitMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', emitMouseMove);
      this.emit(eventTypes.pointStopped, this.getSecondPointData());
      document.onmouseup = null;
    };
  }
}
export default View;
