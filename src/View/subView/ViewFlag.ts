import IView from "../IView";

class Flag {
  div!: HTMLDivElement;

  button!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  isFlag!: boolean;

  constructor(View: IView, button: HTMLDivElement) {    
    this.init(View, button)    
  }

  createFlag(): void {
    this.div = document.createElement("div");
    this.div.className = "-js-slider__flag";
    if(this.isHorizontal) this.div.classList.add('-js-slider__flag_isHorizontal')
    if(!this.isHorizontal) this.div.classList.add('-js-slider__flag_isVertical')
    this.div.innerHTML = "0";
    this.button.append(this.div);
    if(!this.isFlag) this.hideFlag()
  }

  changeFlagValue(value: number): void {
    this.div.innerHTML = `${value}`;
  }

  hideFlag(): void {
    this.div.classList.add("-js-slider__flag_hide");
  }

  showFlag(): void {
    this.div.classList.remove("-js-slider__flag_hide");
  }

  private init(View: IView, button: HTMLDivElement): void { 
    this.button = button;
    this.field = View.field.div;
    this.isHorizontal = View.config.isHorizontal!
    this.isRangeSlider = View.config.isRangeSlider!
    this.isFlag = View.config.isFlag!
  } 
}
export default Flag;
