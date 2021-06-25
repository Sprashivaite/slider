import IView from '../IView';

class ViewButton {
  div!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  constructor(View: IView) {
    this.init(View);
  }

  createButton(): HTMLDivElement {
    this.div = document.createElement('div');
    this.div.className = 'js-slider__button';
    if(!this.isHorizontal) this.div.classList.add('js-slider__button_isVertical')
    this.field.append(this.div);
    return this.div;
  }

  moveButton(value: number): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    this.div.style[direction] = `${value}px`;
  }

  private init(View: IView): void {
    this.field = View.field.div;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
  }
}
export default ViewButton;
