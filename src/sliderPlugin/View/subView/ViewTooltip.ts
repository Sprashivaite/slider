import IView from "../IView";

class Tooltip {
  divElement!: HTMLDivElement;

  point!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  isTooltip!: boolean;

  constructor(View: IView, point: HTMLDivElement) {    
    this.init(View, point)    
  }

  createTooltip(): void {
    this.divElement = document.createElement("div");
    this.divElement.className = "-js-slider__tooltip";
    if(this.isHorizontal) this.divElement.classList.add('-js-slider__tooltip_isHorizontal')
    if(!this.isHorizontal) this.divElement.classList.add('-js-slider__tooltip_isVertical')
    this.divElement.innerHTML = "0";
    this.point.append(this.divElement);
    if(!this.isTooltip) this.hideTooltip()
  }

  changeTooltipValue(value: number): void {
    this.divElement.innerHTML = `${value}`;
  }

  hideTooltip(): void {
    this.divElement.classList.add("-js-slider__tooltip_hide");
  }

  showTooltip(): void {
    this.divElement.classList.remove("-js-slider__tooltip_hide");
  }

  private init(View: IView, point: HTMLDivElement): void { 
    this.point = point;
    this.isHorizontal = View.config.isHorizontal!
    this.isRangeSlider = View.config.isRangeSlider!
    this.isTooltip = View.config.isTooltip!
  } 
}
export default Tooltip;
