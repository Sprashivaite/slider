import { ViewConfig, ViewElements } from '../../types';
import ViewTooltip from './ViewTooltip'

class ViewPoint {
  divElement!: HTMLDivElement;

  tooltip!: ViewTooltip;

  private root!: HTMLElement;

  private isHorizontal!: boolean;

  private isRangeSlider!: boolean;  

  constructor(data: ViewConfig & ViewElements) {
    this.init(data);
    this.createPoint(data)
  }

  createPoint(data: ViewConfig & ViewElements): void {
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-slider__point';
    if(!this.isHorizontal) this.divElement.classList.add('js-slider__point_vertical')
    this.root.append(this.divElement);
    this.createTooltip(data)
  }

  private createTooltip(data: ViewConfig & ViewElements): void{
    this.tooltip = new ViewTooltip({...data, root: this.divElement})
  }

  movePoint(value: number): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    let result = value
    if(result < 0) result = 0
    if(result > 100) result = 100
    this.divElement.style[direction] = `${result}%`;
  }

  getPointOffset(): number {
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const size = this.isHorizontal ? 'offsetWidth': 'offsetHeight';
    const pointOffset = this.divElement[offsetDirection];
    const result = pointOffset * 100 / this.root[size]
    return result;
  }

  private init(data: ViewConfig & ViewElements): void {
    const { isHorizontal, isRangeSlider, root} = data
    this.root = root!;
    this.isHorizontal = isHorizontal;
    this.isRangeSlider = isRangeSlider;
  }
}
export default ViewPoint;
