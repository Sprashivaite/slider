import IView from "../IView";

class Tooltip {
  div!: HTMLDivElement;

  button!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  isTooltip!: boolean;

  constructor(View: IView, button: HTMLDivElement) {    
    this.init(View, button)    
  }

  createTooltip(): void {
    this.div = document.createElement("div");
    this.div.className = "-js-slider__tooltip";
    if(this.isHorizontal) this.div.classList.add('-js-slider__tooltip_isHorizontal')
    if(!this.isHorizontal) this.div.classList.add('-js-slider__tooltip_isVertical')
    this.div.innerHTML = "0";
    this.button.append(this.div);
    if(!this.isTooltip) this.hideTooltip()
  }

  changeTooltipValue(value: number): void {
    this.div.innerHTML = `${value}`;
  }

  hideTooltip(): void {
    this.div.classList.add("-js-slider__tooltip_hide");
  }

  showTooltip(): void {
    this.div.classList.remove("-js-slider__tooltip_hide");
  }

  private init(View: IView, button: HTMLDivElement): void { 
    this.button = button;
    this.field = View.field.div;
    this.isHorizontal = View.config.isHorizontal!
    this.isRangeSlider = View.config.isRangeSlider!
    this.isTooltip = View.config.isTooltip!
  } 
}
export default Tooltip;
