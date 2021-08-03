import './ViewPoint.css';
import { ViewConfig } from '../../../types';
import ViewTooltip from '../ViewTooltip/ViewTooltip';

class ViewPoint {
  divElement: HTMLDivElement;

  tooltip: ViewTooltip;

  private root: HTMLDivElement;

  private isHorizontal: boolean;

  constructor(config: ViewConfig, root: HTMLDivElement) {
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
    const modifier = 'point_target';
    this.divElement.classList.add(modifier, `js-${modifier}`);
  }

  removeTarget(): void {
    const modifier = 'point_target';
    this.divElement.classList.remove(modifier, `js-${modifier}`);
  }

  private createPoint(): HTMLDivElement {
    this.divElement = document.createElement('div');
    const pointStyle = 'point';
    this.divElement.classList.add(pointStyle, `js-${pointStyle}`);
    if (!this.isHorizontal) {
      const modifier = 'point_vertical';
      this.divElement.classList.add(modifier, `js-${modifier}`);
    }
    this.root.append(this.divElement);
    return this.divElement;
  }
}
export default ViewPoint;
