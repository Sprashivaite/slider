import { ViewConfig } from '../../types';

class Tooltip {
  divElement!: HTMLElement;

  isHorizontal!: boolean;

  constructor(config: ViewConfig, root: HTMLElement) {
    this.createTooltip(config, root);
  }

  changeValue(value: number): void {
    this.divElement.innerHTML = `${value}`;
  }

  getValue(): number {
    return Number(this.divElement.innerHTML);
  }

  hide(): void {
    this.divElement.classList.add('-js-slider__tooltip_hidden');
  }

  show(): void {
    this.divElement.classList.remove('-js-slider__tooltip_hidden');
  }

  getOffset(): number {
    return this.isHorizontal
      ? this.divElement.getBoundingClientRect().left
      : this.divElement.getBoundingClientRect().top;
  }

  private createTooltip(config: ViewConfig, root: HTMLElement): void {
    this.isHorizontal = config.isHorizontal;
    this.divElement = document.createElement('div');
    this.divElement.className = '-js-slider__tooltip';
    if (!this.isHorizontal) this.divElement.classList.add('-js-slider__tooltip_vertical');
    this.divElement.innerHTML = '0';
    root.append(this.divElement);
    if (!config.hasTooltip) this.hide();
  }
}
export default Tooltip;
