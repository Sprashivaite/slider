import { viewConfig, viewElements } from '../../types';

class Tooltip {
  divElement!: HTMLElement;

  root!: HTMLElement; 

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  isTooltip!: boolean;

  constructor(data: viewConfig & viewElements) {
    this.init(data)
    this.createTooltip()
  }

  createTooltip(): void {
    this.divElement = document.createElement("div");
    this.divElement.className = "-js-slider__tooltip";
    if(this.isHorizontal) this.divElement.classList.add('-js-slider__tooltip_isHorizontal')
    if(!this.isHorizontal) this.divElement.classList.add('-js-slider__tooltip_isVertical')
    this.divElement.innerHTML = "0";
    this.root.append(this.divElement);
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

  private init(data: viewConfig & viewElements): void { 
    const { isHorizontal, isRangeSlider, isTooltip, root } = data
    this.root = root!;
    this.isHorizontal = isHorizontal
    this.isRangeSlider = isRangeSlider
    this.isTooltip = isTooltip
  } 
}
export default Tooltip;
