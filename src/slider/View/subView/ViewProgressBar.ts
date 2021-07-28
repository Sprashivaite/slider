import { ViewConfig, ProgressBar } from '../../types';
import ViewPoint from './ViewPoint';

class ViewProgressBar {
  divElement!: HTMLElement;

  private root!: HTMLElement;

  private isHorizontal!: boolean;

  private firstPoint!: ViewPoint;

  private secondPoint?: ViewPoint;

  private hasProgressBar!: boolean;

  private styleColor!: string;

  private isRange!: boolean;

  constructor(data: ViewConfig & ProgressBar) {
    this.init(data);
    this.createElement();
  }

  changeSize(): void {
    const size = this.isHorizontal ? 'width' : 'height';
    const firstPointOffset = this.firstPoint.getOffset();
    this.divElement.style[size] = `${firstPointOffset}%`;
    if (this.isRange && this.secondPoint) {
      const secondPointOffset = this.secondPoint.getOffset();
      const direction = this.isHorizontal ? 'left' : 'top';
      this.divElement.style[direction] = `${firstPointOffset}%`;
      const rangePercent = secondPointOffset - firstPointOffset;
      this.divElement.style[size] = `${rangePercent}%`;
    }
    this.changeColor();
  }

  hide(): void {
    this.divElement.classList.add('-js-slider__bar_hide');
  }

  show(): void {
    this.divElement.classList.remove('-js-slider__bar_hide');
  }

  private init(data: ViewConfig & ProgressBar): void {
    const { isHorizontal, isRange, hasProgressBar, firstPoint, secondPoint, root } = data;
    this.root = root!;
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.isHorizontal = isHorizontal;
    this.hasProgressBar = hasProgressBar;
    this.isRange = isRange;
  }

  private createElement(): void {
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-progressBar';
    const styleDirection = this.isHorizontal
      ? 'js-progressBar'
      : 'js-progressBar js-progressBar_vertical';
    this.divElement.className = styleDirection;
    this.root.append(this.divElement);
    if (!this.hasProgressBar) this.hide();
  }

  private changeColor(): void {
    const size = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const fieldSize = this.root[size];
    const progressBarSize = this.divElement[size];
    this.divElement.classList.remove(this.styleColor);
    if (progressBarSize <= fieldSize / 4) this.styleColor = 'js-progressBar_color_first';
    if (progressBarSize >= fieldSize / 4) this.styleColor = `js-progressBar_color_second`;
    if (progressBarSize >= fieldSize / 2) this.styleColor = `js-progressBar_color_third`;
    if (progressBarSize >= fieldSize) this.styleColor = `js-progressBar_color_fourth`;
    this.divElement.classList.add(this.styleColor);
  }
}
export default ViewProgressBar;
