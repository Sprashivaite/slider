import IView from '../IView';

class ViewProgressBar {
  div!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  firstButton!: HTMLDivElement;

  secondButton!: HTMLDivElement;

  isProgressBar!: boolean;

  styleDirection!: string;

  constructor(View: IView) {
    this.init(View);
  }

  createProgressBar(): void {
    this.div = document.createElement('div');
    this.div.className = 'js-progressBar';
    this.styleDirection = this.isHorizontal
      ? 'js-progressBar_horizontal'
      : 'js-progressBar_vertical';
    this.div.classList.add(this.styleDirection);
    this.field.append(this.div);
    if (!this.isProgressBar) this.hideBar();
  }

  progressBarMove(): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    const size = this.isHorizontal ? 'width' : 'height';
    const offsetDirection = this.isHorizontal ? 'offsetLeft' : 'offsetTop';
    const offsetSize = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const firstButtonOffset = (
      this.firstButton[offsetDirection] + this.firstButton[offsetSize] / 2
    );
    this.div.style[size] = `${firstButtonOffset}px`;
    if (this.isRangeSlider) {
      const secondButtonOffset =
        this.secondButton[offsetDirection] + this.secondButton[offsetSize] / 2;
      this.div.style[direction] = `${firstButtonOffset}px`;
      this.div.style[size] = `${secondButtonOffset - firstButtonOffset}px`;
    }

    this.changeColorBar();
  }

  hideBar(): void {
    this.div.classList.add('-js-slider__bar_hide');
  }

  showBar(): void {
    this.div.classList.remove('-js-slider__bar_hide');
  }

  private init(View: IView): void {
    this.field = View.field.div;
    this.firstButton = View.firstButton.div;
    if (View.config.isRangeSlider) {
      this.secondButton = View.secondButton.div;
    }

    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
    this.isProgressBar = View.config.isProgressBar;
  }

  private changeColorBar(): void {
    const size = this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const fieldSize = this.field[size];
    const progressBarSize = this.div[size];
    
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
    if (progressBarSize >= fieldSize - this.firstButton.offsetWidth) {
      styleColor = `js-progressBar_color_4`;
    }
    
    this.div.className = `js-progressBar ${this.styleDirection} ${styleColor}`;
  }
}
export default ViewProgressBar;
