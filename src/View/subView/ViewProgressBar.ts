import IView from '../IView'

class ViewProgressBar {
  div: HTMLDivElement;

  field: HTMLDivElement;

  isHorizontal: boolean;

  isRangeSlider: boolean;

  button: HTMLDivElement;

  button_2!: HTMLDivElement;

  constructor(View: IView) {
    this.field = View.field.div;
    this.button = View.button.div;
    if (View.isRangeSlider) {
      this.button_2 = View.button_2.div;
    }    
    this.isHorizontal = View.isHorizontal;
    this.isRangeSlider = View.isRangeSlider;
    this.div = document.createElement("div");
  }

  createProgressBar(): void {
    this.div.className = "progressBar";
    this.div.style.height = `${this.field.offsetHeight}px`;
    if (!this.isHorizontal) this.div.style.top = "0px";
    this.field.append(this.div);
  }

  progressBarMove(): void {
    const fieldWidth = this.field.offsetWidth; 
    const buttonOffsetLeft = this.button.offsetLeft;
    const buttonOffsetTop = this.button.offsetTop + this.button.offsetHeight / 2;
    this.div.style.width = `${buttonOffsetLeft}px`;
    this.div.style.left = `${-1}px`;
    if (!this.isHorizontal) {
      this.div.style.height = `${buttonOffsetTop}px`;
      this.div.style.width = `${fieldWidth}px`;
      
    }
    if (this.isRangeSlider) {
      const buttonOffsetLeft_2 =
        this.button_2.offsetLeft + this.button_2.offsetWidth;
      this.div.style.left = `${buttonOffsetLeft}px`;
      this.div.style.width = `${buttonOffsetLeft_2 - buttonOffsetLeft}px`;
      if (!this.isHorizontal) {
        const buttonOffsetTop_2 =
          this.button_2.offsetTop + this.button_2.offsetHeight;
        this.div.style.top = `${buttonOffsetTop}px`;
        this.div.style.left = `${-1}px`;
        this.div.style.width = `${fieldWidth}px`; 
        this.div.style.height = `${buttonOffsetTop_2 - buttonOffsetTop}px`;
      }
    }
  }

  changeColorBar(): void{
    let fieldSize = this.field.offsetWidth; 
    let progressBarSize = this.div.offsetWidth;
    if (!this.isHorizontal){
      fieldSize = this.field.offsetHeight;
      progressBarSize = this.div.offsetHeight;
    }
    if (progressBarSize <= fieldSize / 4) {
      this.div.style.backgroundColor = "#915E4E";
    }
    if (progressBarSize >= fieldSize / 4) {
      this.div.style.backgroundColor = "#CF866F";
    }
    if (progressBarSize >= fieldSize / 2) {
      this.div.style.backgroundColor = "#4E9179";
    }
    if (progressBarSize >= fieldSize - this.button.offsetWidth) {
      this.div.style.backgroundColor = "#6fcf97";
    }
  }

  hideBar(): void {
    this.div.classList.add("-js-slider__bar_hide");
  }

  showBar(): void {
    this.div.classList.remove("-js-slider__bar_hide");
  }
}
export default ViewProgressBar;
