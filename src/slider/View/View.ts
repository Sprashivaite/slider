import ViewField from './subView/ViewField';
import ViewPoint from './subView/ViewPoint';
import ViewTooltip from './subView/ViewTooltip';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { ViewConfig, UserConfig, PointData, EventTypes } from '../types';
import Observer from '../Observer/Observer';

class View extends Observer {
  private firstPoint: ViewPoint;

  private secondPoint: ViewPoint;

  private field: ViewField;

  private progressBar: ViewProgressBar;

  private scale: ViewScale;

  private config: ViewConfig;

  private tooltipTotal: ViewTooltip;

  private mouseCoords: number;

  constructor(config?: Partial<ViewConfig>) {
    super();
    this.init(config);
  }

  updateConfig(config: Partial<ViewConfig>): void {
    this.config = { ...this.config, ...config };
    this.removeElements();
    this.renderElements();
    this.addHandlers();
  }

  getConfig(): ViewConfig {
    return this.config;
  }

  updatePoints(data: PointData): void {
    const { pointOffset, pointName, value } = data;
    if (pointName === 'firstPoint') {
      this.firstPoint.movePoint(pointOffset);
      this.firstPoint.tooltip.changeValue(value!);
    }
    if (pointName === 'secondPoint') {
      this.secondPoint?.movePoint(pointOffset);
      this.secondPoint?.tooltip.changeValue(value!);
    }
    this.progressBar.changeSize();
    this.joinTooltips();
  }

  updateScale(data: number[]): void {
    this.scale.updateValues(data);
    this.addScaleHandler();
  }

  private init(config?: UserConfig): void {
    this.config = DEFAULT_VIEW_CONFIG;
    this.renderElements();
    this.addHandlers();
    if (config) this.updateConfig(config);
  }

  private renderElements(): void {
    const { config } = this;
    const slider = new ViewContainer(config.target);
    this.field = new ViewField(config, slider.divElement);
    this.firstPoint = new ViewPoint(config, this.field.divElement);
    this.scale = new ViewScale(config, slider.divElement);
    if (config.isRange) {
      this.secondPoint = new ViewPoint(config, this.field.divElement);
      this.tooltipTotal = new ViewTooltip(config, this.firstPoint.divElement);
      this.tooltipTotal.addModifierTotal();
    }
    this.progressBar = new ViewProgressBar({
      root: this.field.divElement,
      firstPoint: this.firstPoint,
      secondPoint: this?.secondPoint,
      ...config,
    });
  }

  private removeElements(): void {
    [
      this.firstPoint.divElement,
      this.field.divElement,
      this.progressBar.divElement,
      this.scale.divElement,
      this.secondPoint?.divElement,
    ].forEach(item => item.remove());
  }

  private addHandlers(): void {
    this.addMouseMoveHandler();
    this.addFieldHandler();
    this.addPointHandler();
  }

  private addMouseMoveHandler(): void {
    document.addEventListener('mousemove', this.calcMouseCoords.bind(this));
  }

  private calcMouseCoords(event: MouseEvent): void {
    const direction = this.config.isHorizontal ? 'left' : 'top';
    const coordinate = this.config.isHorizontal ? 'clientX' : 'clientY';
    const size = this.config.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const mouseCoordsPX =
      event[coordinate] - this.field.divElement.getBoundingClientRect()[direction];
    this.mouseCoords = (mouseCoordsPX * 100) / this.field.divElement[size];
  }

  private getFirstPointData(): PointData {
    return {
      pointOffset: this.firstPoint.getOffset(),
      pointName: 'firstPoint',
    };
  }

  private getSecondPointData(): PointData {
    return {
      pointOffset: this.secondPoint?.getOffset(),
      pointName: 'secondPoint',
    };
  }

  private addPointHandler(): void {
    this.firstPoint.divElement.addEventListener(
      'mousedown',
      this.handlePointMouseDown.bind(this),
    );
    this.secondPoint?.divElement.addEventListener(
      'mousedown',
      this.handlePointMouseDown.bind(this),
    );
  }

  private handlePointMouseDown(event: MouseEvent): void {
    this.isFirstPointClosest(event)
      ? this.handlePoint(this.firstPoint, this.getFirstPointData.bind(this))
      : this.handlePoint(this.secondPoint, this.getSecondPointData.bind(this));
  }

  private addFieldHandler(): void {
    this.field.divElement.addEventListener('mousedown', this.handleFieldClick.bind(this));
  }

  private handleFieldClick(event: MouseEvent): void {
    if (this.isFirstPointClosest(event)) {
      this.firstPoint.movePoint(this.mouseCoords);
      this.emit(EventTypes.pointStopped, this.getFirstPointData());
    } else {
      this.secondPoint.movePoint(this.mouseCoords);
      this.emit(EventTypes.pointStopped, this.getSecondPointData());
    }
  }

  private addScaleHandler(): void {
    const scaleChildren = this.scale.divElement.querySelectorAll('div');
    scaleChildren.forEach(element =>
      element.addEventListener('click', this.handleScaleClick.bind(this)),
    );
  }

  private handleScaleClick(event: MouseEvent): void {
    const value = event.currentTarget!.innerHTML;
    this.isFirstPointClosest(event)
      ? this.emit(EventTypes.valueChanged, { value, ...this.getFirstPointData() })
      : this.emit(EventTypes.valueChanged, { value, ...this.getSecondPointData() });
  }

  private handlePoint(point: ViewPoint, data: () => PointData): void {
    const shift = this.mouseCoords - point.getOffset();
    const movePoint = () => {
      point.movePoint(this.mouseCoords - shift);
      this.demarcatePoints(data().pointName);
      this.emit(EventTypes.pointMoving, data());
    };

    document.addEventListener('mousemove', movePoint);
    document.onmouseup = () => {
      document.removeEventListener('mousemove', movePoint);
      this.emit(EventTypes.pointStopped, data());
      document.onmouseup = null;
    };
  }

  private isFirstPointClosest(event: MouseEvent): boolean {
    const { config, firstPoint, secondPoint, mouseCoords } = this;
    if (!config.isRange) return true;

    if (event.target === firstPoint.divElement) return true;
    if (event.target === secondPoint.divElement) return false;

    const firstPointOffset = firstPoint.getOffset();
    const secondPointOffset = secondPoint.getOffset();
    const betweenPoints = (secondPointOffset + firstPointOffset) / 2;

    if (mouseCoords > betweenPoints) return false;
    return true;
  }

  private demarcatePoints(pointName: string): void {
    const { config, firstPoint, secondPoint } = this;
    if (!config.isRange) return;

    if (pointName === 'firstPoint') {
      firstPoint.addTarget();
      secondPoint.removeTarget();
    } else {
      secondPoint.addTarget();
      firstPoint.removeTarget();
    }

    if (firstPoint.getOffset() <= secondPoint.getOffset()) return;
    pointName === 'firstPoint'
      ? firstPoint.movePoint(secondPoint.getOffset())
      : secondPoint.movePoint(firstPoint.getOffset());
  }

  private joinTooltips(): void {
    const { config, firstPoint, secondPoint } = this;
    if (!config.hasTooltip || !config.isRange) return;

    const size = config.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const firstTooltip = firstPoint.tooltip;
    const secondTooltip = secondPoint.tooltip;

    const firstTooltipOffset = firstTooltip.getOffset() + firstTooltip.divElement[size];
    const secondTooltipOffset = secondTooltip.getOffset();
    const tooltipTotalOffset = `${(secondTooltipOffset - firstTooltipOffset) / 2}px`;

    const direction = config.isHorizontal ? 'left' : 'top';
    this.tooltipTotal.divElement.style[direction] = tooltipTotalOffset;

    const firstValue = firstTooltip.getValue();
    const secondValue = secondTooltip.getValue();
    const delimiter = config.isHorizontal ? ' - ' : ' ';
    const text = `${firstValue}${delimiter}${secondValue}`;
    this.tooltipTotal.divElement.innerHTML = text;

    if (firstTooltipOffset >= secondTooltipOffset) {
      firstTooltip.hide();
      secondTooltip.hide();
      this.tooltipTotal.show();
    } else {
      firstTooltip.show();
      secondTooltip.show();
      this.tooltipTotal.hide();
    }
  }
}
export default View;
