import { ViewConfig } from '../../types';

class ViewScale {
  divElement!: HTMLElement;

  private root!: HTMLElement;

  private isHorizontal!: boolean;

  private scaleOffsets!: number[];

  private hasScale!: boolean;

  constructor(config: ViewConfig, root: HTMLElement) {
    this.init(config, root);
    this.createScale();
  }

  updateValues(scaleValues: number[]): void {
    this.calcScaleOffsets(scaleValues);
    this.divElement.innerHTML = '';    
    const direction = this.isHorizontal ? 'left' : 'top';
    scaleValues.forEach((item, index) => {
      const offset = `${direction}: ${this.scaleOffsets[index]}%`
      this.divElement.insertAdjacentHTML(
        'beforeend', 
        `<div class="js-scale__value" style="${offset}">${item}</div>`
      );
    });
    this.removeExtraValues();
  }

  hideScale(): void {
    this.divElement.classList.add('-js-slider__scale_hidden');
  }

  showScale(): void {
    this.divElement.classList.remove('-js-slider__scale_hidden');
  }

  private init(config: ViewConfig, root: HTMLElement) {
    const { isHorizontal, hasScale } = config;
    this.root = root;
    this.isHorizontal = isHorizontal;
    this.hasScale = hasScale;
  }

  private createScale(): void {
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-slider__scale';
    if(!this.isHorizontal) this.divElement.classList.add('js-slider__scale_vertical')    
    this.root.append(this.divElement);
    if (!this.hasScale) this.hideScale();
  }

  private calcScaleOffsets(scaleValues: number[]): void {
    const firstValue = scaleValues[0];
    const lastValue = scaleValues[scaleValues.length - 1];
    this.scaleOffsets = [];
    const step = 100 / (lastValue - firstValue);
    scaleValues.forEach((value) => {
      const moduleValue = value - firstValue;
      this.scaleOffsets.push(moduleValue * step);
    });
  }

  private removeExtraValues(): void {
    const scaleChildren = Array.from(this.divElement.children);
    const current = this.isHorizontal ? 'left' : 'top';
    const previous = this.isHorizontal ? 'right' : 'bottom';
    const OFFSET = 5;
    const isClose = (item: Element) => (
      item.getBoundingClientRect()[current] <
      item.previousElementSibling!.getBoundingClientRect()[previous] + OFFSET
    )
    scaleChildren.forEach((item, index, array) => {
      if (index === 0) return;
      if (array.length - 1 === index) {
        if (isClose(item)) item.previousElementSibling!.remove();
        return;
      }
      if (isClose(item)) item.remove();
    });
  }
}

export default ViewScale;
