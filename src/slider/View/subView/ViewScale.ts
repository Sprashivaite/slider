import { viewConfig, viewElements } from '../../types';

class ViewScale {
  divElement!: HTMLElement;

  private root!: HTMLElement;

  private isHorizontal!: boolean;

  private scaleOffsets!: number[];

  private isScale!: boolean;

  constructor(data: viewConfig & viewElements) {
    this.init(data);
    this.createScale();
  }

  createScale(): void {
    this.divElement = document.createElement('div');
    const styleAxis = this.isHorizontal
      ? 'js-slider__scale_horizontal'
      : 'js-slider__scale_vertical';
    this.divElement.className = styleAxis;
    this.root.append(this.divElement);
    if (!this.isScale) this.hideScale();
  }

  updateValues(scaleValues: number[]): void {
    this.calcScaleOffsets(scaleValues);
    this.divElement.innerHTML = '';
    for (let i = 0; i < scaleValues.length; i += 1) {
      this.divElement.insertAdjacentHTML('beforeend', '<div></div>');
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
    this.divElement.classList.add('-js-slider__scale_hide');
  }

  showScale(): void {
    this.divElement.classList.remove('-js-slider__scale_hide');
  }

  private init(data: viewConfig & viewElements) {
    const { isHorizontal, isScale, root } = data;
    this.root = root!;
    this.isHorizontal = isHorizontal;
    this.isScale = isScale;
  }

  private removeExtraValues(): void {
    const scaleChildren = Array.from(this.divElement.children);
    const current = this.isHorizontal ? 'left' : 'top';
    const previous = this.isHorizontal ? 'right' : 'bottom';
    const isClose = (item: Element) => (
      item.getBoundingClientRect()[current] <
      item.previousElementSibling!.getBoundingClientRect()[previous] + 5
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
