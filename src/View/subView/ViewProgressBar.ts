import IProgressBarConfig from "./IProgressBarConfig";

class ViewProgressBar {
  div: HTMLDivElement;
  field: HTMLDivElement;
  isHorizontal: boolean;
  isRangeSlider: boolean;
  button: HTMLDivElement;
  button_2!: HTMLDivElement;
  constructor(options = {} as IProgressBarConfig) {
    this.field = options.field;
    this.button = options.button;
    if (options.isRangeSlider) {
      this.button_2 = options.button_2;
    }    
    this.isHorizontal = options.isHorizontal;
    this.isRangeSlider = options.isRangeSlider;
    this.div = document.createElement("div");
  }
  createProgressBar() {
    this.div.className = "progressBar";
    this.div.style.height = this.field.offsetHeight + "px";
    if (!this.isHorizontal) this.div.style.top = "0px";
    this.field.append(this.div);
  }
  progressBarMove(): void {
    let fieldWidth = this.field.offsetWidth; 
    let buttonOffsetLeft = this.button.offsetLeft;
    let buttonOffsetTop = this.button.offsetTop + this.button.offsetHeight / 2;
    this.div.style.width = buttonOffsetLeft + "px";
    if (!this.isHorizontal) {
      this.div.style.height = buttonOffsetTop + "px";
      this.div.style.width = fieldWidth + "px";
    }
    if (this.isRangeSlider) {
      let buttonOffsetLeft_2 =
        this.button_2.offsetLeft + this.button_2.offsetWidth;
      this.div.style.left = buttonOffsetLeft + "px";
      this.div.style.width = buttonOffsetLeft_2 - buttonOffsetLeft + "px";
      if (!this.isHorizontal) {
        let buttonOffsetTop_2 =
          this.button_2.offsetTop + this.button_2.offsetHeight;
        this.div.style.top = buttonOffsetTop + "px";
        this.div.style.width = fieldWidth + "px";
        this.div.style.left = "0";
        this.div.style.height = buttonOffsetTop_2 - buttonOffsetTop + "px";
      }
    }
  }
  changeColorBar(){
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
