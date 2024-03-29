import ViewField from './subView/ViewField/ViewField';
import ViewPoint from './subView/ViewPoint/ViewPoint';
import ViewTooltip from './subView/ViewTooltip/ViewTooltip';
import ViewProgressBar from './subView/ViewProgressBar/ViewProgressBar';
import ViewScale from './subView/ViewScale/ViewScale';
import ViewContainer from './subView/ViewContainer/ViewContainer';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { ViewConfig, PointData, EventTypes, SubViews, CurrentPoint } from '../types';
import Observer from '../Observer/Observer';

class View extends Observer<PointData> {
  private config: ViewConfig;

  private subViews: SubViews;

  private mouseCoords: number;

  private currentPoint: CurrentPoint;

  constructor(config?: Partial<ViewConfig>) {
    super();
    this.config = DEFAULT_VIEW_CONFIG;
    this.subViews = this.renderElements();
    this.mouseCoords = 0;
    this.addHandlers();
    if (config) this.updateConfig(config);
    this.currentPoint = {
      point: this.subViews.firstPoint,
      data: this.getFirstPointData,
      shift: 0,
    };
  }

  updateConfig(config: Partial<ViewConfig>): void {
    this.config = { ...this.getConfig(), ...config };
    this.removeElements();
    this.subViews = this.renderElements();
    this.addHandlers();
  }

  getConfig(): ViewConfig {
    return this.config;
  }

  getSubViews(): SubViews {
    return this.subViews;
  }

  updatePoints(data: PointData): void {
    const { pointOffset, pointName, value, steps } = data;
    const { firstPoint, secondPoint, progressBar } = this.getSubViews();

    if (pointName === 'firstPoint') {
      if (pointOffset || pointOffset === 0) firstPoint.movePoint(pointOffset);
      if (value !== undefined) firstPoint.tooltip.changeValue(value);
    }
    if (pointName === 'secondPoint') {
      if (pointOffset || pointOffset === 0) secondPoint?.movePoint(pointOffset);
      if (value !== undefined) secondPoint?.tooltip.changeValue(value);
    }
    progressBar.changeSize();
    if (steps !== undefined) this.updateScale(steps);
    this.joinTooltips();
  }

  private updateScale(data: number[]): void {
    if (!this.getSubViews().scale) return;
    this.getSubViews().scale?.updateValues(data);
    this.addScaleHandler();
  }

  private renderElements(): SubViews {
    const config = this.getConfig();
    const slider = new ViewContainer(config.target);
    const field = new ViewField(config, slider.divElement);
    const firstPoint = new ViewPoint(config, field.divElement);
    const scale = config.hasScale ? new ViewScale(config, slider.divElement) : undefined;
    const secondPoint = config.isRange
      ? new ViewPoint(config, field.divElement)
      : undefined;
    const tooltipTotal = config.isRange
      ? new ViewTooltip(config, firstPoint.divElement)
      : undefined;
    tooltipTotal?.addModifierTotal();
    const progressBar = new ViewProgressBar({
      root: field.divElement,
      firstPoint,
      secondPoint,
      ...config,
    });
    return { slider, field, firstPoint, secondPoint, tooltipTotal, progressBar, scale };
  }

  private removeElements(): void {
    const { firstPoint, secondPoint, field, progressBar, scale } = this.getSubViews();
    [
      firstPoint.divElement,
      field.divElement,
      progressBar.divElement,
      scale?.divElement,
      secondPoint?.divElement,
    ].forEach(item => item?.remove());
  }

  private addHandlers(): void {
    this.addMouseMoveHandler();
    this.addFieldHandler();
    this.addPointHandler();
  }

  private addMouseMoveHandler(): void {
    document.addEventListener('mousemove', this.calcMouseCoords);
  }

  private calcMouseCoords = (event: MouseEvent): void => {
    const { field } = this.getSubViews();
    const coordinate = this.getConfig().isHorizontal ? 'clientX' : 'clientY';
    const mouseCoordsPX = event[coordinate] - field.getOffset();
    this.mouseCoords = (mouseCoordsPX * 100) / field.getSize();
  };

  private getFirstPointData = (): PointData => {
    const { firstPoint } = this.getSubViews();
    return {
      pointOffset: firstPoint.getOffset(),
      pointName: 'firstPoint',
      value: firstPoint.tooltip.getValue(),
    };
  };

  private getSecondPointData = (): PointData => {
    const { secondPoint } = this.getSubViews();
    return {
      pointOffset: secondPoint?.getOffset() || 0,
      pointName: 'secondPoint',
      value: secondPoint?.tooltip.getValue() || 0,
    };
  };

  private addPointHandler(): void {
    const { firstPoint, secondPoint } = this.getSubViews();
    firstPoint.divElement.addEventListener('mousedown', this.handlePointMouseDown);
    secondPoint?.divElement.addEventListener('mousedown', this.handlePointMouseDown);
  }

  private handlePointMouseDown = (event: MouseEvent): void => {
    const { firstPoint, secondPoint } = this.getSubViews();
    if (this.isFirstPointClosest(event))
      this.handleMouseMovePoint(firstPoint, this.getFirstPointData);
    else if (secondPoint) this.handleMouseMovePoint(secondPoint, this.getSecondPointData);
  };

  private handleMouseMovePoint(point: ViewPoint, data: () => PointData): void {
    const shift = this.mouseCoords - point.getOffset();
    this.currentPoint = {
      point,
      data,
      shift,
    };
    document.addEventListener('mousemove', this.movePoint);
    document.addEventListener('mouseup', this.handlePointMouseUp, { once: true });
  }

  private movePoint = (): void => {
    this.currentPoint.point.movePoint(this.mouseCoords - this.currentPoint.shift);
    this.demarcatePoints(this.currentPoint.data().pointName);
    this.emit(EventTypes.pointMoving, this.currentPoint.data());
  };

  private handlePointMouseUp = (): void => {
    document.removeEventListener('mousemove', this.movePoint);
    this.emit(EventTypes.pointStopped, this.currentPoint.data());
  };

  private addFieldHandler(): void {
    this.getSubViews().field.divElement.addEventListener('click', this.handleFieldClick);
  }

  private handleFieldClick = (event: MouseEvent): void => {
    const { firstPoint, secondPoint } = this.getSubViews();

    if (this.isFirstPointClosest(event)) {
      firstPoint.movePoint(this.mouseCoords);
      this.emit(EventTypes.pointMoving, this.getFirstPointData());
      this.emit(EventTypes.pointStopped, this.getFirstPointData());
    } else {
      secondPoint?.movePoint(this.mouseCoords);
      this.emit(EventTypes.pointMoving, this.getSecondPointData());
      this.emit(EventTypes.pointStopped, this.getSecondPointData());
    }
  };

  private addScaleHandler(): void {
    if (!this.getSubViews().scale) return;
    const scaleChildren = this.getSubViews().scale?.divElement.querySelectorAll('div');
    scaleChildren?.forEach(element =>
      element.addEventListener('click', this.handleScaleClick),
    );
  }

  private handleScaleClick = (event: MouseEvent): void => {
    const target = event.currentTarget;
    if (!target) return;
    const value = target instanceof HTMLDivElement && Number(target.innerHTML);
    if (!value && value !== 0) return;
    this.isFirstPointClosest(event)
      ? this.emit(EventTypes.valueChanged, { ...this.getFirstPointData(), value })
      : this.emit(EventTypes.valueChanged, { ...this.getSecondPointData(), value });
  };

  private isFirstPointClosest(event: MouseEvent): boolean {
    const { firstPoint, secondPoint } = this.getSubViews();
    const { mouseCoords } = this;
    const config = this.getConfig();
    if (!config.isRange) return true;
    if (!secondPoint) return true;

    if (event.target === firstPoint.divElement) return true;
    if (event.target === secondPoint.divElement) return false;

    const firstPointOffset = firstPoint.getOffset();
    const secondPointOffset = secondPoint.getOffset();
    const betweenPoints = (secondPointOffset + firstPointOffset) / 2;

    return mouseCoords < betweenPoints;
  }

  private demarcatePoints(pointName: string): void {
    const { firstPoint, secondPoint } = this.getSubViews();
    if (!secondPoint) return;

    if (pointName === 'firstPoint') {
      firstPoint.addTarget();
      secondPoint.removeTarget();
    } else {
      secondPoint.addTarget();
      firstPoint.removeTarget();
    }

    if (firstPoint.getOffset() <= secondPoint.getOffset()) return;
    if (pointName === 'firstPoint') firstPoint.movePoint(secondPoint.getOffset());
    if (pointName === 'secondPoint') secondPoint.movePoint(firstPoint.getOffset());
  }

  private joinTooltips(): void {
    const { firstPoint, secondPoint, tooltipTotal } = this.getSubViews();
    const config = this.getConfig();
    if (!config.hasTooltip) return;
    if (!secondPoint || !tooltipTotal) return;

    const firstTooltip = firstPoint.tooltip;
    const secondTooltip = secondPoint.tooltip;

    const firstTooltipOffset = firstTooltip.getOffset() + firstTooltip.getSize();
    const secondTooltipOffset = secondTooltip.getOffset();
    const tooltipTotalOffset = `${(secondTooltipOffset - firstTooltipOffset) / 2}px`;

    const direction = config.isHorizontal ? 'left' : 'top';
    tooltipTotal.divElement.style[direction] = tooltipTotalOffset;

    const firstValue = firstTooltip.getValue();
    const secondValue = secondTooltip.getValue();
    const delimiter = config.isHorizontal ? ' - ' : ' ';
    const text = `${firstValue}${delimiter}${secondValue}`;
    tooltipTotal.changeValue(text);

    if (firstTooltipOffset >= secondTooltipOffset) {
      firstTooltip.hide();
      secondTooltip.hide();
      tooltipTotal.show();
    } else {
      firstTooltip.show();
      secondTooltip.show();
      tooltipTotal.hide();
    }
  }
}
export default View;
