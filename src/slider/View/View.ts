import ViewField from './subView/ViewField';
import ViewPoint from './subView/ViewPoint';
import ViewTooltip from './subView/ViewTooltip';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { ViewConfig, UserConfig, PointData, EventTypes, ViewElements } from '../types';
import Observer from '../Observer/Observer';

class View extends Observer {
  slider!: ViewContainer;

  firstPoint!: ViewPoint;

  secondPoint!: ViewPoint;

  field!: ViewField;

  progressBar!: ViewProgressBar;

  scale!: ViewScale;

  config!: ViewConfig;

  tooltipTotal!: ViewTooltip;

  mouseCoords!: number;

  constructor(config?: UserConfig) {
    super();
    this.init(config);    
    this.renderElements();
    this.addHandlers()
  }

  updateConfig(config: UserConfig): void {
    this.config = { ...this.config, ...config };
    this.validate();
    this.removeElements();
    this.renderElements();
    this.addHandlers();
  }

  getElements(): ViewElements { 
    let secondPoint
    if(this.secondPoint) secondPoint = this.secondPoint.divElement
    return {
      slider: this.slider.divElement,
      field: this.field.divElement,
      firstPoint: this.firstPoint.divElement,
      secondPoint,
    }
  }

  updatePoints(data: PointData): void {
    const { pointOffset, pointName, value } = data;
    if (pointName === 'firstPoint') {
      this.firstPoint.movePoint(pointOffset);
      this.firstPoint.tooltip.changeValue(value!);
    }
    if (pointName === 'secondPoint' && this.config.isRangeSlider) {
      this.secondPoint.movePoint(pointOffset);
      this.secondPoint.tooltip.changeValue(value!);
    }
    this.progressBar.progressBarMove();
    this.joinTooltips();
  }

  updateScale(data: number[]): void {
    this.scale.updateValues(data);
    this.addScaleHandler();
  }

  private init(config?: UserConfig): void {
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

  private renderElements(): void {
    const { isRangeSlider } = this.config;
    this.slider = new ViewContainer(this.config.target);
    this.field = new ViewField({ ...this.config, root: this.slider.divElement });
    this.firstPoint = new ViewPoint({...this.config, root: this.field.divElement });
    this.progressBar = new ViewProgressBar({
      root: this.field.divElement,
      firstPoint :this.firstPoint,
      ...this.config,
    });
    this.scale = new ViewScale({ ...this.config, root: this.slider.divElement });
    if (isRangeSlider) {
      this.secondPoint = new ViewPoint({ ...this.config, root: this.field.divElement });
      this.tooltipTotal = new ViewTooltip({ ...this.config, root: this.firstPoint.divElement }, );
      this.tooltipTotal.divElement.classList.add('-js-slider__tooltip_type_total')
      this.progressBar = new ViewProgressBar({
        root: this.field.divElement,
        firstPoint :this.firstPoint,
        secondPoint: this.secondPoint,
        ...this.config,
      });      
    }
  }

  private removeElements(): void {
    [
      this.firstPoint.divElement,
      this.field.divElement,
      this.progressBar.divElement,
      this.scale.divElement,
    ].forEach((item) => item.remove());
    if (this.config.isRangeSlider) this.secondPoint.divElement.remove()
  }

  private addHandlers(): void {
    this.getMouseCoords();
    this.addFieldHandler();
    this.addPointHandler();
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

  private getFirstPointData(): PointData {
    return {
      pointOffset: this.firstPoint.getPointOffset(),
      pointName: 'firstPoint',
    };
  }

  private getSecondPointData(): PointData {
    return {
      pointOffset: this.secondPoint.getPointOffset(),
      pointName: 'secondPoint',
    };
  }

  private addPointHandler(): void {
    const useHandlers = (event: MouseEvent) => {
      if (!this.isFirstPointClosest(event)) {
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
      if (!this.isFirstPointClosest(event)) {
        this.secondPoint.movePoint(this.mouseCoords);
        this.emit(EventTypes.pointStopped, this.getSecondPointData());
      } else {
        this.firstPoint.movePoint(this.mouseCoords);
        this.emit(EventTypes.pointStopped, this.getFirstPointData());
      }
    };
    this.field.divElement.addEventListener('mousedown', useHandlers);
  }

  private addScaleHandler(): void {
    const handleScaleClick = (event: MouseEvent) => {
      const value = event.currentTarget!.innerHTML;
      if (!this.isFirstPointClosest(event)) {
        this.emit(EventTypes.valueChanged, { value, ...this.getSecondPointData() });
      } else {
        this.emit(EventTypes.valueChanged, { value, ...this.getFirstPointData() });
      }
    };
    const scaleChildren = this.field.divElement.nextElementSibling!.querySelectorAll('div');
    scaleChildren.forEach((element) => element.addEventListener('click', handleScaleClick));
  }

  private handlePoint(point: ViewPoint, data: () => PointData): void {
    let shift: number;   
    const emitMouseDown = () => {
      shift = this.mouseCoords - point.getPointOffset();
    };
    const emitMouseMove = () => {
      point.movePoint(this.mouseCoords - shift);
      this.demarcatePoints(data().pointName)
      this.joinTooltips()
      this.emit(EventTypes.pointMoving, data());
    };
    emitMouseDown();
    emitMouseMove();
    document.addEventListener('mousemove', emitMouseMove);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', emitMouseMove);
      this.emit(EventTypes.pointStopped, data());
      document.onmouseup = null;
    };
  }

  private isFirstPointClosest(event: MouseEvent): boolean {
    const { config, firstPoint, secondPoint, mouseCoords } = this;
    if (!config.isRangeSlider) return true;
    if (event.target === firstPoint.divElement) return true;
    if (event.target === secondPoint.divElement) return false;
    const firstPointOffset = firstPoint.getPointOffset();
    const secondPointOffset = secondPoint.getPointOffset();
    const betweenPoints = (secondPointOffset + firstPointOffset) / 2;
    const isPointClose = mouseCoords > betweenPoints;
    if (isPointClose) return false;
    return true;
  }

  private demarcatePoints(pointName: string): void {
    const { config, firstPoint, secondPoint } = this;
    if (!config.isRangeSlider) return;
    if (firstPoint.getPointOffset() <= secondPoint.getPointOffset()) return;
    if (pointName === 'secondPoint') {
      secondPoint.movePoint(firstPoint.getPointOffset());
      secondPoint.divElement.classList.add('js-slider__point_target');
      firstPoint.divElement.classList.remove('js-slider__point_target');
    } else {
      firstPoint.movePoint(secondPoint.getPointOffset());
      firstPoint.divElement.classList.add('js-slider__point_target');
      secondPoint.divElement.classList.remove('js-slider__point_target');
    }
  }

  private joinTooltips(): void {
    const { config, firstPoint, secondPoint, tooltipTotal } = this;
    const invalid = !config.hasTooltip || !config.isRangeSlider;
    if (invalid) return;

    const firstOffset = config.isHorizontal ? 'right' : 'bottom';
    const secondOffset = config.isHorizontal ? 'left' : 'top';
    const delimiter = config.isHorizontal ? ' - ' : ' ';

    const firstTooltip = firstPoint.tooltip;
    const secondTooltip = secondPoint.tooltip;

    const firstTooltipOffset = firstTooltip.divElement.getBoundingClientRect()[firstOffset];
    const secondTooltipOffset = secondTooltip.divElement.getBoundingClientRect()[secondOffset];
    const tooltipTotalOffset = `${(secondTooltipOffset - firstTooltipOffset) / 2}px`;

    const firstValue = firstTooltip.getValue()
    const secondValue = secondTooltip.getValue()
    const text = `${firstValue}${delimiter}${secondValue}`;

    tooltipTotal.divElement.style[secondOffset] = tooltipTotalOffset;
    tooltipTotal.divElement.innerHTML = text;

    if (firstTooltipOffset >= secondTooltipOffset) {
      [firstTooltip, secondTooltip].forEach((tooltip) => tooltip.hide());
      tooltipTotal.divElement.style.visibility = 'visible'
    } else {
      [firstTooltip, secondTooltip].forEach((tooltip) => tooltip.show());
      tooltipTotal.divElement.style.visibility = 'hidden'
    }
  }
}
export default View;
