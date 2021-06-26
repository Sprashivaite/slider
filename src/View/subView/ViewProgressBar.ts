import IView from '../IView';

class ViewProgressBar {
  divElement!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  firstHandle!: HTMLDivElement;

  secondHandle!: HTMLDivElement;

  isProgressBar!: boolean;

  styleDirection!: string;

  constructor(View: IView) {
    this.init(View);
  }

  createProgressBar(): void {
    this.divElement = document.createElement('div');
    this.divElement.className = 'js-progressBar';
    this.styleDirection = this.isHorizontal
      ? 'js-progressBar_horizontal'
      : 'js-progressBar_vertical';
    this.divElement.classList.add(this.styleDirection);
    this.field.append(this.divElement);
    if (!this.isProgressBar) this.hideBar();
  }

  progressBarMove(): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    const size = this.isHorizontal ? 'width' : 'height';
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const offsetSize = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const firstHandleOffset = (
      this.firstHandle[offsetDirection] + this.firstHandle[offsetSize] / 2
    );
    this.divElement.style[size] = `${firstHandleOffset}px`;
    if (this.isRangeSlider) {
      const secondHandleOffset =
        this.secondHandle[offsetDirection] + this.secondHandle[offsetSize] / 2;
      this.divElement.style[direction] = `${firstHandleOffset}px`;
      this.divElement.style[size] = `${secondHandleOffset - firstHandleOffset}px`;
    }

    this.changeColorBar();
  }

  hideBar(): void {
    this.divElement.classList.add('-js-slider__bar_hide');
  }

  showBar(): void {
    this.divElement.classList.remove('-js-slider__bar_hide');
  }

  private init(View: IView): void {
    this.field = View.field.divElement;
    this.firstHandle = View.firstHandle.divElement;
    if (View.config.isRangeSlider) {
      this.secondHandle = View.secondHandle.divElement;
    }

    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
    this.isProgressBar = View.config.isProgressBar;
  }

  private changeColorBar(): void {
    const size = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const fieldSize = this.field[size];
    const progressBarSize = this.divElement[size];
    
    let styleColor;
    if (progressBarSize <= fieldSize / 4) {
      styleColor = 'js-progressBar js-progressBar_color_1';
    } 
    if (progressBarSize >= fieldSize / 4) {
      styleColor = `js-progressBar_color_2`;
    } 
    if (progressBarSize >= fieldSize / 2) {
      styleColor = `js-progressBar_color_3`;
    } 
    if (progressBarSize >= fieldSize - this.firstHandle.offsetWidth) {
      styleColor = `js-progressBar_color_4`;
    }
    
    this.divElement.className = `js-progressBar ${this.styleDirection} ${styleColor}`;
  }
}
export default ViewProgressBar;
