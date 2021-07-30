import './ViewProgressBar.css';
import { ViewConfig, ProgressBar } from '../../../types';
import ViewPoint from '../ViewPoint/ViewPoint';

class ViewProgressBar {
  divElement: HTMLDivElement;

  private root: HTMLDivElement;

  private isHorizontal: boolean;

  private firstPoint: ViewPoint;

  private secondPoint?: ViewPoint;

  private hasProgressBar: boolean;

  private styleColor: string;

  private isRange: boolean;

  constructor(data: ViewConfig & ProgressBar) {
    const { isHorizontal, isRange, hasProgressBar, firstPoint, secondPoint, root } = data;
    this.root = root;
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.isHorizontal = isHorizontal;
    this.hasProgressBar = hasProgressBar;
    this.isRange = isRange;
    this.divElement = this.createElement();
    this.styleColor = 'progressBar_color_first';
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
    const modifier = 'progressBar_hidden';
    this.divElement.classList.add(modifier);
    this.divElement.classList.add(`js-${modifier}`);
  }

  show(): void {
    const modifier = 'progressBar_hidden';
    this.divElement.classList.remove(modifier);
    this.divElement.classList.remove(`js-${modifier}`);
  }

  private createElement(): HTMLDivElement {
    this.divElement = document.createElement('div');
    const style = 'progressBar';
    this.divElement.className = `${style} js-${style}`;
    if (!this.isHorizontal) {
      const modifier = 'progressBar_vertical';
      this.divElement.classList.add(modifier);
      this.divElement.classList.add(`js-${modifier}`);
    }
    this.root.append(this.divElement);
    if (!this.hasProgressBar) this.hide();
    return this.divElement;
  }

  private changeColor(): void {
    const size = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const fieldSize = this.root[size];
    const progressBarSize = this.divElement[size];
    this.divElement.classList.remove(this.styleColor);
    this.divElement.classList.remove(`js-${this.styleColor}`);
    if (progressBarSize <= fieldSize / 4) this.styleColor = 'progressBar_color_first';
    if (progressBarSize >= fieldSize / 4) this.styleColor = `progressBar_color_second`;
    if (progressBarSize >= fieldSize / 2) this.styleColor = `progressBar_color_third`;
    if (progressBarSize >= fieldSize) this.styleColor = `progressBar_color_fourth`;
    this.divElement.classList.add(this.styleColor);
    this.divElement.classList.add(`js-${this.styleColor}`);
  }
}
export default ViewProgressBar;
