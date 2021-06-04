import IView from '../IView'

class ViewProgressBar {
  div!: HTMLDivElement;

  field!: HTMLDivElement;

  isHorizontal!: boolean;

  isRangeSlider!: boolean;

  button1!: HTMLDivElement;

  button2!: HTMLDivElement;

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
    const buttonOffsetLeft = this.button1.offsetLeft + this.button1.offsetWidth / 2;
    const buttonOffsetTop = this.button1.offsetTop + this.button1.offsetHeight / 2;
    this.div.style.width = `${buttonOffsetLeft}px`;
    this.div.style.left = `${0}px`;
    if (!this.isHorizontal) {
      this.div.style.height = `${buttonOffsetTop}px`;
      this.div.style.width = `${fieldWidth}px`;
    }
    if (this.isRangeSlider) {
      const buttonOffsetLeft2 =
        this.button2.offsetLeft + this.button2.offsetWidth / 2;
      this.div.style.left = `${buttonOffsetLeft}px`;
      this.div.style.width = `${buttonOffsetLeft2 - buttonOffsetLeft}px`;
      if (!this.isHorizontal) {
        const buttonOffsetTop2 =
          this.button2.offsetTop + this.button2.offsetHeight /2;
        this.div.style.top = `${buttonOffsetTop}px`;
        this.div.style.left = `${0}px`;
        this.div.style.width = `${fieldWidth}px`; 
        this.div.style.height = `${buttonOffsetTop2 - buttonOffsetTop}px`;
      }
    }
    this.changeColorBar()
  }

  changeColorBar(): void{
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
    if (progressBarSize >= fieldSize - this.button1.offsetWidth) {
      this.div.className = "js-progressBar js-progressBar_color_4";
    }
  }

  hideBar(): void {
    this.div.classList.add("-js-slider__bar_hide");
  }

  showBar(): void {
    this.div.classList.remove("-js-slider__bar_hide");
  }

  private init(View: IView): void {
    this.field = View.field.div;
    this.button1 = View.button1.div;
    if (View.config.isRangeSlider) {
      this.button2 = View.button2.div;
    }    
    this.isHorizontal = View.config.isHorizontal;
    this.isRangeSlider = View.config.isRangeSlider;
  }
}
export default ViewProgressBar;
