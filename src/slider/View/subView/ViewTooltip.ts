import { ViewConfig } from '../../types';

class Tooltip {
  divElement!: HTMLElement;

  constructor(config: ViewConfig, root: HTMLElement) {
    this.createTooltip(config, root)
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

  private createTooltip(config: ViewConfig, root: HTMLElement): void {
    this.divElement = document.createElement("div");
    this.divElement.className = "-js-slider__tooltip";
    if(!config.isHorizontal) this.divElement.classList.add('-js-slider__tooltip_vertical')
    this.divElement.innerHTML = "0";
    root.append(this.divElement);
    if(!config.hasTooltip) this.hide()
  }
}
export default Tooltip;
