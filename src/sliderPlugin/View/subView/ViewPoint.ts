import IView from '../IView';

class ViewPoint {
  divElement!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  constructor(View: IView) {
    this.init(View);
  }

  createPoint(): HTMLDivElement {
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-slider__point';
    if(!this.isHorizontal) this.divElement.classList.add('js-slider__point_isVertical')
    this.field.append(this.divElement);
    return this.divElement;
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
    const result = pointOffset * 100 / this.field[size]
    return result;
  }

  private init(View: IView): void {
    this.field = View.field.divElement;
    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
  }
}
export default ViewPoint;
