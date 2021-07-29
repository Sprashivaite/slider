import { ViewConfig } from '../../types';
import ViewTooltip from './ViewTooltip';

class ViewPoint {
  divElement: HTMLElement;

  tooltip: ViewTooltip;

  private root: HTMLElement;

  private isHorizontal: boolean;

  constructor(config: ViewConfig, root: HTMLElement) {
    this.root = root;
    this.isHorizontal = config.isHorizontal;
    this.divElement = this.createPoint();
    this.tooltip = new ViewTooltip(config, this.divElement);
  }

  movePoint(value: number): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    let result = value;
    if (result < 0) result = 0;
    if (result > 100) result = 100;
    this.divElement.style[direction] = `${result}%`;
  }

  getOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const size = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const pointOffset = this.divElement[offsetDirection];
    const result = (pointOffset * 100) / this.root[size];
    return result;
  }

  addTarget(): void {
    const modifier = 'slider__point_target';
    this.divElement.classList.add(modifier);
    this.divElement.classList.add(`js-${modifier}`);
  }

  removeTarget(): void {
    const modifier = 'slider__point_target';
    this.divElement.classList.remove(modifier);
    this.divElement.classList.remove(`js-${modifier}`);
  }

  private createPoint(): HTMLElement {
    this.divElement = document.createElement('div');
    const style = 'slider__point';
    this.divElement.className = `${style} js-${style}`;
    if (!this.isHorizontal) {
      const modifier = 'slider__point_vertical';
      this.divElement.classList.add(modifier);
      this.divElement.classList.add(`js-${modifier}`);
    }
    this.root.append(this.divElement);
    return this.divElement;
  }
}
export default ViewPoint;
