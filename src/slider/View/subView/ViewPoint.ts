import { ViewConfig } from '../../types';
import ViewTooltip from './ViewTooltip'

class ViewPoint {
  divElement!: HTMLDivElement;

  tooltip!: ViewTooltip;

  private root!: HTMLElement;

  private isHorizontal!: boolean;

  constructor(config: ViewConfig, root: HTMLElement) {
    this.createPoint(config, root)
  }

  movePoint(value: number): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    let result = value
    if(result < 0) result = 0
    if(result > 100) result = 100
    this.divElement.style[direction] = `${result}%`;
  }

  getOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const size = this.isHorizontal ? 'offsetWidth': 'offsetHeight';
    const pointOffset = this.divElement[offsetDirection];
    const result = pointOffset * 100 / this.root[size]
    return result;
  }

  addTarget(): void {
    this.divElement.style.zIndex = "10";
  }

  removeTarget(): void {
    this.divElement.style.zIndex = "3";
  }
  
  private createPoint(config: ViewConfig, root: HTMLElement): void {
    this.root = root;
    this.isHorizontal = config.isHorizontal
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-slider__point';
    if(!this.isHorizontal) this.divElement.classList.add('js-slider__point_vertical')
    this.root.append(this.divElement);
    this.createTooltip(config)
  }

  private createTooltip(config: ViewConfig): void{
    this.tooltip = new ViewTooltip(config, this.divElement)
  }
}
export default ViewPoint;
