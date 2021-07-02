import { viewConfig, viewElements } from '../../types';

class Tooltip {
  divElement!: HTMLElement;

  private root!: HTMLElement; 

  private isHorizontal!: boolean;

  private isRangeSlider!: boolean;

  private hasTooltip!: boolean;

  constructor(data: viewConfig & viewElements) {
    this.init(data)
    this.createTooltip()
  }

  createTooltip(): void {
    this.divElement = document.createElement("div");
    this.divElement.className = "-js-slider__tooltip";
    if(!this.isHorizontal) this.divElement.classList.add('-js-slider__tooltip_vertical')
    this.divElement.innerHTML = "0";
    this.root.append(this.divElement);
    if(!this.hasTooltip) this.hideTooltip()
  }

  changeTooltipValue(value: number): void {
    this.divElement.innerHTML = `${value}`;
  }

  hideTooltip(): void {
    this.divElement.classList.add("-js-slider__tooltip_visibility_hide");
  }

  showTooltip(): void {
    this.divElement.classList.remove("-js-slider__tooltip_visibility_hide");
  }

  private init(data: viewConfig & viewElements): void { 
    const { isHorizontal, isRangeSlider, hasTooltip, root } = data
    this.root = root!;
    this.isHorizontal = isHorizontal
    this.isRangeSlider = isRangeSlider
    this.hasTooltip = hasTooltip
  } 
}
export default Tooltip;
