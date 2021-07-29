import { ViewConfig } from '../../types';

class Tooltip {
  divElement: HTMLElement;

  isHorizontal: boolean;

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
    const modifier = 'slider__tooltip_hidden';
    this.divElement.classList.add(modifier);
    this.divElement.classList.add(`js-${modifier}`);
  }

  show(): void {
    const modifier = 'slider__tooltip_hidden';
    this.divElement.classList.remove(modifier);
    this.divElement.classList.remove(`js-${modifier}`);
  }

  getOffset(): number {
    return this.isHorizontal
      ? this.divElement.getBoundingClientRect().left
      : this.divElement.getBoundingClientRect().top;
  }

  addModifierTotal(): void {
    const modifier = 'slider__tooltip_type_total';
    this.divElement.classList.add(modifier);
    this.divElement.classList.add(`js-${modifier}`);
  }

  private createTooltip(config: ViewConfig, root: HTMLElement): void {
    this.isHorizontal = config.isHorizontal;
    this.divElement = document.createElement('div');
    const style = 'slider__tooltip';
    this.divElement.className = `${style} js-${style}`;
    if (!this.isHorizontal) {
      const modifier = 'slider__tooltip_vertical';
      this.divElement.classList.add(modifier);
      this.divElement.classList.add(`js-${modifier}`);
    }
    this.divElement.innerHTML = '0';
    root.append(this.divElement);
    if (!config.hasTooltip) this.hide();
  }
}
export default Tooltip;
