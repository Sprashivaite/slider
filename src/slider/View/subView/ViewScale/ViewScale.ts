import './ViewScale.css';
import { ViewConfig } from '../../../types';

class ViewScale {
  divElement: HTMLDivElement;

  private root: HTMLDivElement;

  private isHorizontal: boolean;

  private scaleOffsets: number[];

  private hasScale: boolean;

  constructor(config: ViewConfig, root: HTMLDivElement) {
    const { isHorizontal, hasScale } = config;
    this.root = root;
    this.isHorizontal = isHorizontal;
    this.hasScale = hasScale;
    this.divElement = this.createScale();
    this.scaleOffsets = [];
  }

  updateValues(scaleValues: number[]): void {
    this.calcScaleOffsets(scaleValues);
    this.divElement.innerHTML = '';
    const direction = this.isHorizontal ? 'left' : 'top';
    const scaleValueStyle = 'scale__value';
    const modifier = this.isHorizontal
      ? ''
      : `${scaleValueStyle}_vertical js-${scaleValueStyle}_vertical`;
    scaleValues.forEach((item, index) => {
      const offset = `${direction}: ${this.scaleOffsets[index]}%`;
      this.divElement.insertAdjacentHTML(
        'beforeend',
        `<div class="${scaleValueStyle} ${modifier}" style="${offset}">${item}</div>`,
      );
    });
    this.removeExtraValues();
  }

  hideScale(): void {
    const modifier = 'scale_hidden';
    this.divElement.classList.add(modifier, `js-${modifier}`);
  }

  showScale(): void {
    const modifier = 'scale_hidden';
    this.divElement.classList.remove(modifier, `js-${modifier}`);
  }

  private createScale(): HTMLDivElement {
    this.divElement = document.createElement('div');
    const scaleStyle = 'scale';
    this.divElement.classList.add(scaleStyle, `js-${scaleStyle}`);
    if (!this.isHorizontal) {
      const modifier = 'scale_vertical';
      this.divElement.classList.add(modifier, `js-${modifier}`);
    }
    this.root.append(this.divElement);
    if (!this.hasScale) this.hideScale();
    return this.divElement;
  }

  private calcScaleOffsets(scaleValues: number[]): void {
    const firstValue = scaleValues[0];
    const lastValue = scaleValues[scaleValues.length - 1];
    this.scaleOffsets = [];
    const step = 100 / (lastValue - firstValue);
    scaleValues.forEach(value => {
      const moduleValue = value - firstValue;
      this.scaleOffsets.push(moduleValue * step);
    });
  }

  private removeExtraValues(): void {
    const scaleChildren = Array.from(this.divElement.children);

    scaleChildren.forEach((item, index, array) => {
      if (index === 0) return;
      if (array.length - 1 === index) {
        if (this.isPreviousItemTooClose(item)) item.previousElementSibling?.remove();
        return;
      }
      if (this.isPreviousItemTooClose(item)) item.remove();
    });
  }

  private isPreviousItemTooClose(element: Element): boolean {
    const current = this.isHorizontal ? 'left' : 'top';
    return (
      element.getBoundingClientRect()[current] < this.calcPreviousItemOffset(element)
    );
  }

  private calcPreviousItemOffset(element: Element): number {
    const previous = this.isHorizontal ? 'right' : 'bottom';
    const OFFSET = 5;
    const result = element.previousElementSibling
      ? element.previousElementSibling.getBoundingClientRect()[previous] + OFFSET
      : 0;
    return result;
  }
}

export default ViewScale;
