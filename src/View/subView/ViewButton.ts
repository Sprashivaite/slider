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
    this.field.append(this.div);

    const direction = this.isHorizontal ? 'left' : 'top';
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const offsetSize = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';

    if (this.div.previousElementSibling) {
      this.div.style[direction] = `${
        this.div.previousElementSibling[offsetDirection] +
        this.div.previousElementSibling[offsetSize]
      }px`;
    }

    if (!this.isHorizontal) {
      this.div.style.left = '-100%';
    }
    return this.div;
  }

  moveButton(value: number): void {
    let result = value;
    if (this.isRangeSlider) result = this.demarcateButtons(value);
    const direction = this.isHorizontal ? 'left': 'top';
    this.div.style[direction] = `${result}px`;
  }

  private init(View: IView): void {
    this.field = View.field.div;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
  }

  private demarcateButtons(value: number): number {
    const { isHorizontal } = this;
    const { className } = this.div;
    this.div.style.zIndex = '10';
    const isButton = this.div.previousElementSibling;
    const isSecondButton =
      this.div.nextElementSibling &&
      this.div.nextElementSibling!.classList.contains(className);

    const offset = isHorizontal ? 'offsetLeft': 'offsetTop';
    if (isSecondButton) {
      this.div.nextElementSibling!.style.zIndex = '3';
      const nextButtonOffset: number = this.div.nextElementSibling![offset];
      if (value > nextButtonOffset) return nextButtonOffset;
    }
    if (isButton) {
      this.div.previousElementSibling!.style.zIndex = '3';
      const prevButtonOffset: number =
        this.div.previousElementSibling![offset];
      if (value < prevButtonOffset) return prevButtonOffset;
    }
    return value;
  }
}
export default ViewButton;
