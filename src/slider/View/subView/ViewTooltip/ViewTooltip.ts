import './ViewTooltip.css';
import { ViewConfig } from '../../../types';

class Tooltip {
  divElement: HTMLDivElement;

  isHorizontal: boolean;

  constructor(config: ViewConfig, root: HTMLDivElement) {
    this.isHorizontal = config.isHorizontal;
    this.divElement = this.createTooltip(config, root);
  }

  changeValue(value: number): void {
    this.divElement.innerHTML = `${value}`;
  }

  getValue(): number {
    return Number(this.divElement.innerHTML);
  }

  hide(): void {
    const modifier = 'tooltip_hidden';
    this.divElement.classList.add(modifier);
    this.divElement.classList.add(`js-${modifier}`);
  }

  show(): void {
    const modifier = 'tooltip_hidden';
    this.divElement.classList.remove(modifier);
    this.divElement.classList.remove(`js-${modifier}`);
  }

  getOffset(): number {
    return this.isHorizontal
      ? this.divElement.getBoundingClientRect().left
      : this.divElement.getBoundingClientRect().top;
  }

  addModifierTotal(): void {
    const modifier = 'tooltip_type_total';
    this.divElement.classList.add(modifier);
    this.divElement.classList.add(`js-${modifier}`);
  }

  private createTooltip(config: ViewConfig, root: HTMLDivElement): HTMLDivElement {
    this.divElement = document.createElement('div');
    const style = 'tooltip';
    this.divElement.className = `${style} js-${style}`;
    if (!this.isHorizontal) {
      const modifier = 'tooltip_vertical';
      this.divElement.classList.add(modifier);
      this.divElement.classList.add(`js-${modifier}`);
    }
    this.divElement.innerHTML = '0';
    root.append(this.divElement);
    if (!config.hasTooltip) this.hide();
    return this.divElement;
  }
}
export default Tooltip;