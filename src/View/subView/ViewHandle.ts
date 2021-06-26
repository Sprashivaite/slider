import IView from '../IView';

class ViewHandle {
  div!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  constructor(View: IView) {
    this.init(View);
  }

  createHandle(): HTMLDivElement {
    this.div = document.createElement('div');
    this.div.className = 'js-slider__handle';
    if(!this.isHorizontal) this.div.classList.add('js-slider__handle_isVertical')
    this.field.append(this.div);
    return this.div;
  }

  moveHandle(value: number): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    this.div.style[direction] = `${value}px`;
  }

  private init(View: IView): void {
    this.field = View.field.div;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
  }
}
export default ViewHandle;
