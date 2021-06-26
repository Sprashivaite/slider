import IView from '../IView';

class ViewHandle {
  divElement!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  constructor(View: IView) {
    this.init(View);
  }

  createHandle(): HTMLDivElement {
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-slider__handle';
    if(!this.isHorizontal) this.divElement.classList.add('js-slider__handle_isVertical')
    this.field.append(this.divElement);
    return this.divElement;
  }

  moveHandle(value: number): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    this.divElement.style[direction] = `${value}px`;
  }

  private init(View: IView): void {
    this.field = View.field.divElement;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
  }
}
export default ViewHandle;
