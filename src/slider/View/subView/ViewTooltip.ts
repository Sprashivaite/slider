import { ViewConfig, ViewElements } from '../../types';

class Tooltip {
  divElement!: HTMLElement;

  private root!: HTMLElement; 

  private isHorizontal!: boolean;

  private isRangeSlider!: boolean;

  private hasTooltip!: boolean;

  constructor(data: ViewConfig & ViewElements) {
    this.init(data)
    this.createTooltip()
  }

  createTooltip(): void {
    this.divElement = document.createElement("div");
    this.divElement.className = "-js-slider__tooltip";
    if(!this.isHorizontal) this.divElement.classList.add('-js-slider__tooltip_vertical')
    this.divElement.innerHTML = "0";
    this.root.append(this.divElement);
    if(!this.hasTooltip) this.hide()
  }

  changeValue(value: number): void {
    this.divElement.innerHTML = `${value}`;
  }

  getValue(): number {
    return Number(this.divElement.innerHTML)
  }

  hide(): void {
    this.divElement.classList.add("-js-slider__tooltip_hidden");
  }

  show(): void {
    this.divElement.classList.remove("-js-slider__tooltip_hidden");
  }

  private init(data: ViewConfig & ViewElements): void { 
    const { isHorizontal, isRangeSlider, hasTooltip, root } = data
    this.root = root!;
    this.isHorizontal = isHorizontal
    this.isRangeSlider = isRangeSlider
    this.hasTooltip = hasTooltip
  } 
}
export default Tooltip;
