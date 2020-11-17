class ViewProgressBar {
  div: HTMLDivElement;
    field: HTMLDivElement;
    isHorizontal: boolean;
    isRangeSlider: boolean;
    button: HTMLDivElement;
    button_2!: HTMLDivElement;
    constructor(field: HTMLDivElement,button: HTMLDivElement,  isHorizontal: boolean, isRangeSlider: boolean,button_2?: HTMLDivElement){
        this.field = field;
        this.button = button;
        if(isRangeSlider){this.button_2 = button_2};
            this.div = document.createElement("div");
            this.isHorizontal = isHorizontal;
            this.isRangeSlider = isRangeSlider
    }
    createProgressBar(){
        this.div.className = "progressBar";
        this.div.style.height = this.field.offsetHeight + "px";
        this.div.style.top = this.div.offsetTop - 1 + "px";
        this.div.style.left = "0";
        if (!this.isHorizontal) {
          this.div.style.left = "1px";
          this.div.style.height =
            this.button.offsetTop + this.button.offsetWidth + "px";
          this.div.style.width = this.field.offsetWidth + "px";
        }
        if (this.isRangeSlider) {
          this.div.style.left = this.button.offsetLeft + 6 + "px";
          this.div.style.width =
            this.button_2.offsetLeft -
            this.button.offsetLeft +
            this.button.offsetWidth / 2 +
            "px";
          if (!this.isHorizontal) {
            this.div.style.width = this.field.offsetWidth + "px";
            this.div.style.top =
              this.button.offsetTop + this.button.offsetWidth / 2 + "px";
            this.div.style.height =
              this.button_2.offsetTop -
              this.button.offsetTop +
              this.button.offsetWidth / 2 +
              "px";
            this.div.style.left = this.div.offsetLeft - 1 + "px";
          }
        }
    
        this.field.append(this.div);
    }
    progressBarMove(): void {
        let fieldWidth = this.field.offsetWidth;
        let progressBarWidth = this.div.offsetWidth;
    
        this.div.style.width =
          this.button.offsetLeft + this.button.offsetWidth / 2 + "px";
    
        if (!this.isHorizontal) {
          fieldWidth = this.field.offsetHeight;
          progressBarWidth = this.div.offsetHeight;
          this.div.style.height =
            this.button.offsetTop + this.button.offsetWidth + "px";
          this.div.style.width = this.field.offsetWidth + "px";
          this.div.style.left = "-1px";
        }
        if (this.isRangeSlider) {
          this.div.style.left = this.button.offsetLeft + 6 + "px";
          this.div.style.width =
            this.button_2.offsetLeft -
            this.button.offsetLeft +
            this.button.offsetWidth / 2 +
            "px";
          if (!this.isHorizontal) {
            this.div.style.width = this.field.offsetWidth + "px";
            this.div.style.top =
              this.button.offsetTop + this.button.offsetWidth / 2 + "px";
            this.div.style.height =
              this.button_2.offsetTop -
              this.button.offsetTop +
              this.button.offsetWidth / 2 +
              "px";
            this.div.style.left = "-1px";
          }
        }
    
        if (progressBarWidth <= fieldWidth / 4) {
          this.div.style.backgroundColor = "rgb(181, 184, 177)";
        }
        if (progressBarWidth >= fieldWidth / 4) {
          this.div.style.backgroundColor = "rgb(184, 134, 11)";
        }
        if (progressBarWidth >= fieldWidth / 2) {
          this.div.style.backgroundColor = "rgb(0, 154, 99)";
        }
        if (progressBarWidth >= fieldWidth - this.button.offsetWidth) {
          this.div.style.backgroundColor = "rgb(111, 207, 151)";
        }
      }
}
export default ViewProgressBar