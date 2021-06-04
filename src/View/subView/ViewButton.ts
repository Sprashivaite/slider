import IView from '../IView'

class ViewButton {
  div!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider: any;

  constructor(View: IView) {
    this.init(View)    
  }

  createButton(): HTMLDivElement {
    this.div = document.createElement('div');

    this.div.className = 'js-slider__button';
    this.div.style.top = '-6px';
    this.div.style.left = '0px';
    this.field.append(this.div);

    if (this.div.previousElementSibling) {
      this.div.style.left = `${this.div.previousElementSibling.offsetLeft
        + this.div.previousElementSibling.offsetWidth}px`;
    }

    if (!this.isHorizontal) {
      this.div.style.left = '-5px';
      this.div.style.top = '0px';

      if (this.div.previousElementSibling) {
        this.div.style.top = `${this.div.previousElementSibling.offsetTop + this.div.previousElementSibling.offsetHeight}px`;
      }
    }
    return this.div;
  }
  
  moveButton(value: number): void {
    let result = value
    if (this.isRangeSlider) result = this.demarcateButtons(value)
    if(this.isHorizontal) this.div.style.left = `${result  }px`
    if(!this.isHorizontal) this.div.style.top = `${result  }px`
  }

  private init(View: IView): void {
    this.field = View.field.div;
    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
  } 

  private demarcateButtons(value: number): number {
    const { isHorizontal } = this;  
    const {className} = this.div

    const isButton2 = this.div.nextElementSibling!.classList.contains(className)
    const isButton = this.div.previousElementSibling

    if (isButton2) {
      let nextButtonOffset: number =
      this.div.nextElementSibling!.offsetLeft - this.div.offsetWidth;
      if (!isHorizontal) {
        nextButtonOffset = this.div.nextElementSibling!.offsetTop - this.div.offsetHeight;
      }
      if (value >= nextButtonOffset) return nextButtonOffset;
    }
    if (isButton) {
      let prevButtonOffset: number =
      this.div.previousElementSibling!.offsetLeft + this.div.offsetWidth;
      if (!isHorizontal) {
        prevButtonOffset =
        this.div.previousElementSibling!.offsetTop + this.div.offsetHeight;
      }
      if (value <= prevButtonOffset) return prevButtonOffset;
    }
    return value;
  }
}
export default ViewButton;
