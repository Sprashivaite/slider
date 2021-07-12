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
    for (let i = 0; i < scaleValues.length; i += 1) {
      this.divElement.insertAdjacentHTML('beforeend', '<div class="js-scale__value"></div>');
    }
    const scaleChildren = this.divElement.children;
    const direction = this.isHorizontal ? 'left' : 'top';
    scaleValues.forEach((item, index) => {
      scaleChildren[index].innerHTML = `${item}`;
      scaleChildren[index].style[direction] = `${this.scaleOffsets[index]}%`;
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

  private removeExtraValues(): void {
    const scaleChildren = Array.from(this.divElement.children);
    const current = this.isHorizontal ? 'left' : 'top';
    const previous = this.isHorizontal ? 'right' : 'bottom';
    const OFFSET = 5;
    const isClose = (item: Element) => (
      item.getBoundingClientRect()[current] <
      item.previousElementSibling!.getBoundingClientRect()[previous] + OFFSET
    )
    const isCloseMax = (item: Element) => (
      item.getBoundingClientRect()[current] <
      item.previousElementSibling!.getBoundingClientRect()[previous]
    )
    scaleChildren.forEach((item, index, array) => {
      if (index === 0) return;
      if (array[array.length - 1] === item) {
        if (isCloseMax(item)) item.previousElementSibling!.remove();
        return;
      }
      if (isClose(item)) item.remove();
    });
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
}

export default ViewScale;
