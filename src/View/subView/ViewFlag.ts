import IView from "../IView";

class Flag {
  div!: HTMLDivElement;

  button!: HTMLDivElement;

  field!: any;

  isHorizontal!: any;

  constructor(View: IView) {    
    this.init(View)    
  }

  createFlag(): void {
    this.div = document.createElement("div");
    this.div.className = "-js-slider__flag";
    this.div.innerHTML = "0";
    this.field.append(this.div);
    this.moveFlag(0)
  }

  changeFlagValue(value: number): void {
    this.div.innerHTML = `${value}`;
  }

  moveFlag(value: number): void {
    const flagWidth = (this.div.offsetWidth - this.button.offsetWidth) / 2
    let result = value
    if(this.isRangeSlider) result = this.demarcateFlags(value)

    if(this.isHorizontal) {
    this.div.style.left = `${result - flagWidth}px`;
    }
    if(!this.isHorizontal) {
      this.div.style.left = `22px`;
      this.div.style.top = `${result}px`;
    }
  } 

  hideFlag(): void {
    this.div.classList.add("-js-slider__flag_hide");
  }

  showFlag(): void {
    this.div.classList.remove("-js-slider__flag_hide");
  }

  private init(View: IView): void { 
    this.button = View.button1.div;
    this.field = View.field.div;
    this.isHorizontal = View.config.isHorizontal
    this.isRangeSlider = View.config.isRangeSlider
  } 

  private demarcateFlags(value: number): number {
    const { isHorizontal } = this; 
    const {className} = this.div

    const isFlag2 = this.div.nextElementSibling && this.div.nextElementSibling!.classList.contains(className)
    const isFlag = this.div.previousElementSibling && this.div.previousElementSibling.classList.contains(className)

    if (isFlag2) {
      let nextButtonOffset: number =
      this.div.nextElementSibling!.offsetLeft - this.div.offsetWidth;
      if (!isHorizontal) {
        nextButtonOffset = this.div.nextElementSibling!.offsetTop - this.div.offsetHeight;
      }
      if (value >= nextButtonOffset) return nextButtonOffset;
    }
    if (isFlag) {
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
export default Flag;
