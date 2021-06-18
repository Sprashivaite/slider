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

    if (this.div.previousElementSibling) {
      this.div.style.left = `${
        this.div.previousElementSibling.offsetLeft +
        this.div.previousElementSibling.offsetWidth
      }px`;
    }

    if (!this.isHorizontal) {
      this.div.style.left = '-100%';

      if (this.div.previousElementSibling) {
        this.div.style.top = `${
          this.div.previousElementSibling.offsetTop +
          this.div.previousElementSibling.offsetHeight
        }px`;
      }
    }
    return this.div;
  }

  moveButton(value: number): void {
    let result = value;
    if (this.isRangeSlider) result = this.demarcateButtons(value);
    if (this.isHorizontal) this.div.style.left = `${result}px`;
    if (!this.isHorizontal) this.div.style.top = `${result}px`;
  }

  private init(View: IView): void {
    this.field = View.field.div;
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
  }

  private demarcateButtons(value: number): number {
    const { isHorizontal } = this;
    const { className } = this.div;
    this.div.style.zIndex = '10'
    const isButton = this.div.previousElementSibling;
    const isSecondButton =
      this.div.nextElementSibling &&
      this.div.nextElementSibling!.classList.contains(className); 
      
    if (isSecondButton) {
      this.div.nextElementSibling!.style.zIndex = '3'
      let nextButtonOffset: number =
        this.div.nextElementSibling!.offsetLeft;
      if (!isHorizontal) {
        nextButtonOffset =
          this.div.nextElementSibling!.offsetTop;
      }
      if (value > nextButtonOffset) return nextButtonOffset;
    }
    if (isButton) {
      this.div.previousElementSibling!.style.zIndex = '3'
      let prevButtonOffset: number =
        this.div.previousElementSibling!.offsetLeft;
      if (!isHorizontal) {
        prevButtonOffset =
          this.div.previousElementSibling!.offsetTop;
      }
      if (value < prevButtonOffset) return prevButtonOffset;
    }
    return value;
  }
}
export default ViewButton;
