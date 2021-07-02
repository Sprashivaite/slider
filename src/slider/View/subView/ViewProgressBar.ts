import { viewConfig, viewElements } from '../../types';

class ViewProgressBar {
  divElement!: HTMLElement;

  root!: HTMLElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  firstPoint!: HTMLElement;

  secondPoint!: HTMLElement;

  hasProgressBar!: boolean;

  styleDirection!: string;

  constructor(data: viewConfig & viewElements) {
    this.init(data);
    this.createProgressBar()
  }

  progressBarMove(): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    const size = this.isHorizontal ? 'width' : 'height';    
    const firstPointOffset = this.firstPoint.style[direction]    
    this.divElement.style[size] = firstPointOffset;
    if (this.isRangeSlider) {
      const secondPointOffset = this.secondPoint.style[direction]
      this.divElement.style[direction] = firstPointOffset;
      let rangePercent = parseInt(secondPointOffset, 10) - parseInt(firstPointOffset, 10)
      if(rangePercent < 0) rangePercent = 0
      this.divElement.style[size] = `${rangePercent}%`;
    }
    this.changeColorBar();
  }

  hideBar(): void {
    this.divElement.classList.add('-js-slider__bar_hide');
  }

  showBar(): void {
    this.divElement.classList.remove('-js-slider__bar_hide');
  }

  private init(data: viewConfig & viewElements): void {
    const {isHorizontal, isRangeSlider, hasProgressBar, firstPoint, secondPoint, root} = data
    this.root = root!;
    this.firstPoint = firstPoint!;
    if (isRangeSlider) this.secondPoint = secondPoint!;
    this.isHorizontal = isHorizontal;
    this.isRangeSlider = isRangeSlider;
    this.hasProgressBar = hasProgressBar;
  }
  
  private createProgressBar(): void {
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-progressBar';
    this.styleDirection = this.isHorizontal
      ? 'js-progressBar'
      : 'js-progressBar js-progressBar_vertical';
    this.divElement.className = this.styleDirection;
    this.root.append(this.divElement);
    if (!this.hasProgressBar) this.hideBar();
  }

  private changeColorBar(): void {
    const size = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const fieldSize = this.root[size];
    const progressBarSize = this.divElement[size];    
    let styleColor;
    if (progressBarSize <= fieldSize / 4) {
      styleColor = 'js-progressBar js-progressBar_color_first';
    } 
    if (progressBarSize >= fieldSize / 4) {
      styleColor = `js-progressBar_color_second`;
    } 
    if (progressBarSize >= fieldSize / 2) {
      styleColor = `js-progressBar_color_third`;
    } 
    if (progressBarSize >= fieldSize - this.firstPoint.offsetWidth) {
      styleColor = `js-progressBar_color_fourth`;
    }    
    this.divElement.className = `js-progressBar ${this.styleDirection} ${styleColor}`;
  }
}
export default ViewProgressBar;
