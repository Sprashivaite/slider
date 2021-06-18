import IView from '../IView'

class ViewProgressBar {
  div!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  firstButton!: HTMLDivElement;

  secondButton!: HTMLDivElement;

  constructor(View: IView) {
    this.init(View)    
  }

  createProgressBar(): void {
    this.div = document.createElement("div");
    this.div.className = "progressBar";
    if (!this.isHorizontal) this.div.style.top = "0px";
    this.field.append(this.div);
  }

  progressBarMove(): void {
    const fieldWidth = this.field.offsetWidth; 
    const buttonOffsetLeft = this.firstButton.offsetLeft + this.firstButton.offsetWidth / 2;
    const buttonOffsetTop = this.firstButton.offsetTop + this.firstButton.offsetHeight / 2;
    this.div.style.width = `${buttonOffsetLeft}px`;
    this.div.style.left = `${0}px`;
    if (!this.isHorizontal) {
      this.div.style.height = `${buttonOffsetTop}px`;
      this.div.style.width = `${fieldWidth}px`;
    }
    if (this.isRangeSlider) {
      const buttonOffsetLeft2 =
        this.secondButton.offsetLeft + this.secondButton.offsetWidth / 2;
      this.div.style.left = `${buttonOffsetLeft}px`;
      this.div.style.width = `${buttonOffsetLeft2 - buttonOffsetLeft}px`;
      if (!this.isHorizontal) {
        const buttonOffsetTop2 =
          this.secondButton.offsetTop + this.secondButton.offsetHeight /2;
        this.div.style.top = `${buttonOffsetTop}px`;
        this.div.style.left = `${0}px`;
        this.div.style.width = `${fieldWidth}px`; 
        this.div.style.height = `${buttonOffsetTop2 - buttonOffsetTop}px`;
      }
    }
    this.changeColorBar()
  }

  hideBar(): void {
    this.div.classList.add("-js-slider__bar_hide");
  }

  showBar(): void {
    this.div.classList.remove("-js-slider__bar_hide");
  }

  private init(View: IView): void {
    this.field = View.field.div;
    this.firstButton = View.firstButton.div;
    if (View.config.isRangeSlider) {
      this.secondButton = View.secondButton.div;
    }    
    this.isHorizontal = View.config.isHorizontal!;
    this.isRangeSlider = View.config.isRangeSlider!;
  }

  private changeColorBar(): void{
    let fieldSize = this.field.offsetWidth; 
    let progressBarSize = this.div.offsetWidth;
    if (!this.isHorizontal){
      fieldSize = this.field.offsetHeight;
      progressBarSize = this.div.offsetHeight;
    }
    if (progressBarSize <= fieldSize / 4) {
      this.div.className = "js-progressBar js-progressBar_color_1";
    }
    if (progressBarSize >= fieldSize / 4) {
      this.div.className = "js-progressBar js-progressBar_color_2";
    }
    if (progressBarSize >= fieldSize / 2) {
      this.div.className = "js-progressBar js-progressBar_color_3";
    }
    if (progressBarSize >= fieldSize - this.firstButton.offsetWidth) {
      this.div.className = "js-progressBar js-progressBar_color_4";
    }
  }
}
export default ViewProgressBar;
