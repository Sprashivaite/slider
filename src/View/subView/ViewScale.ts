import IView from '../IView';
import { scaleData } from '../../types';

class ViewScale {
  div!: HTMLDivElement;

  private slider!: HTMLElement;

  private isHorizontal!: boolean;

  private scaleOffsets!: number[];

  private isScale!: boolean;

  constructor(View: IView) {
    this.init(View);
  }

  createScale(): void {
    if (this.isHorizontal) this.div.className = 'js-slider__scale_horizontal';
    if (!this.isHorizontal) this.div.className = 'js-slider__scale_vertical';
    this.slider.append(this.div);
    if(!this.isScale) this.hideScale()
  }

  updateValues(data: scaleData): void {
    const { scaleValues, quantity } = data;
    this.calcScaleOffsets(data);
    this.div.innerHTML = '';
    for (let i = 0; i < quantity; i += 1) {
      this.div.insertAdjacentHTML('beforeend', '<div></div>');
    }
    const scaleChildren = this.div.children;
    const direction = this.isHorizontal ? 'left': 'top';
    scaleValues.forEach((item, index) => {
      scaleChildren[index].innerHTML = `${item}`;
      scaleChildren[index].style[direction] = `${this.scaleOffsets[index]}%`;
    });
  }

  hideScale(): void {
    this.div.classList.add('-js-slider__scale_hide');
  }

  showScale(): void {
    this.div.classList.remove('-js-slider__scale_hide');
  }

  private init(View: IView) {
    this.div = document.createElement('div');
    this.slider = View.slider.div;
    this.isHorizontal = View.config.isHorizontal;
    this.isScale = View.config.isScale;
  }

  private calcScaleOffsets(data: scaleData): void {
    const { scaleValues } = data;
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
