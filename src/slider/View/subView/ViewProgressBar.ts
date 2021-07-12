import { ViewConfig, ProgressBar } from '../../types';
import ViewPoint from './ViewPoint';

class ViewProgressBar {
  divElement!: HTMLElement;

  private root!: HTMLElement;

  private isHorizontal!: boolean;

  private firstPoint!: ViewPoint;

  private secondPoint?: ViewPoint;

  private hasProgressBar!: boolean;

  private styleDirection!: string;

  constructor(data: ViewConfig & ProgressBar) {
    this.init(data);
    this.createProgressBar()
  }

  progressBarMove(): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    const size = this.isHorizontal ? 'width' : 'height';    
    const firstPointOffset = this.firstPoint.getPointOffset()   
    this.divElement.style[size] = `${firstPointOffset}%`;
    if (this.secondPoint) {
      const secondPointOffset = this.secondPoint.getPointOffset()
      this.divElement.style[direction] = `${firstPointOffset}%`;
      let rangePercent = secondPointOffset - firstPointOffset
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

  private init(data: ViewConfig & ProgressBar): void {
    const {isHorizontal, hasProgressBar, firstPoint, secondPoint, root} = data
    this.root = root!;
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.isHorizontal = isHorizontal;
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
    if (progressBarSize >= fieldSize) {
      styleColor = `js-progressBar_color_fourth`;
    }    
    this.divElement.className = `js-progressBar ${this.styleDirection} ${styleColor}`;
  }
}
export default ViewProgressBar;
