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
    const reducedScaleValues = this.cutArray(scaleValues);
    const reducedSaleOffsets = this.cutArray(this.scaleOffsets);

    const direction = this.isHorizontal ? 'left' : 'top';
    const className = 'scale__value';
    const modifier = this.isHorizontal
      ? ''
      : `${className}_vertical js-${className}_vertical`;

    const values = reducedScaleValues.map((item, index) => {
      const offset = `${direction}: ${reducedSaleOffsets[index]}%`;
      return `<div class="${className} ${modifier}" style="${offset}">${item}</div>`;
    });
    this.divElement.innerHTML = values.join(' ');
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
    const className = 'scale';
    this.divElement.classList.add(className, `js-${className}`);
    if (!this.isHorizontal) {
      const modifier = 'scale_vertical';
      this.divElement.classList.add(modifier, `js-${modifier}`);
    }
    this.root.append(this.divElement);
    if (!this.hasScale) this.hideScale();
    return this.divElement;
  }

  private cutArray(scaleValues: number[]): number[] {
    if (scaleValues.length > 100) {
      const arrayValues = [...scaleValues];
      const lastValue = arrayValues.pop();
      const reducedArray = arrayValues.filter((element, index) => !(index % 2));
      if (lastValue) reducedArray.push(lastValue);
      return this.cutArray(reducedArray);
    }
    return scaleValues;
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
