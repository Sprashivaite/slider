class ViewProgressBar {
    progressBar: HTMLDivElement;
    field: HTMLDivElement;
    isHorizontal: boolean;
    isRangeSlider: boolean;
    button: HTMLDivElement;
    button_2: HTMLDivElement;
    constructor(field: HTMLDivElement,button: HTMLDivElement,button_2: HTMLDivElement,  isHorizontal: boolean, isRangeSlider: boolean){
        this.field = field;
        this.button = button;
        this.button_2= button_2;
            this.progressBar = document.createElement("div");
            this.isHorizontal = isHorizontal;
            this.isRangeSlider = isRangeSlider
    }
    createProgressBar(){
        this.progressBar.className = "progressBar";
        this.progressBar.style.height = this.field.offsetHeight + "px";
        this.progressBar.style.top = this.progressBar.offsetTop - 1 + "px";
        this.progressBar.style.left = "0";
        if (!this.isHorizontal) {
          this.progressBar.style.left = "1px";
          this.progressBar.style.height =
            this.button.offsetTop + this.button.offsetWidth + "px";
          this.progressBar.style.width = this.field.offsetWidth + "px";
        }
        if (this.isRangeSlider) {
          this.progressBar.style.left = this.button.offsetLeft + 6 + "px";
          this.progressBar.style.width =
            this.button_2.offsetLeft -
            this.button.offsetLeft +
            this.button.offsetWidth / 2 +
            "px";
          if (!this.isHorizontal) {
            this.progressBar.style.width = this.field.offsetWidth + "px";
            this.progressBar.style.top =
              this.button.offsetTop + this.button.offsetWidth / 2 + "px";
            this.progressBar.style.height =
              this.button_2.offsetTop -
              this.button.offsetTop +
              this.button.offsetWidth / 2 +
              "px";
            this.progressBar.style.left = this.progressBar.offsetLeft - 1 + "px";
          }
        }
    
        this.field.append(this.progressBar);
    }
    progressBarMove(): void {
        let fieldWidth = this.field.offsetWidth;
        let progressBarWidth = this.progressBar.offsetWidth;
    
        this.progressBar.style.width =
          this.button.offsetLeft + this.button.offsetWidth / 2 + "px";
    
        if (!this.isHorizontal) {
          fieldWidth = this.field.offsetHeight;
          progressBarWidth = this.progressBar.offsetHeight;
          this.progressBar.style.height =
            this.button.offsetTop + this.button.offsetWidth + "px";
          this.progressBar.style.width = this.field.offsetWidth + "px";
          this.progressBar.style.left = "-1px";
        }
        if (this.isRangeSlider) {
          this.progressBar.style.left = this.button.offsetLeft + 6 + "px";
          this.progressBar.style.width =
            this.button_2.offsetLeft -
            this.button.offsetLeft +
            this.button.offsetWidth / 2 +
            "px";
          if (!this.isHorizontal) {
            this.progressBar.style.width = this.field.offsetWidth + "px";
            this.progressBar.style.top =
              this.button.offsetTop + this.button.offsetWidth / 2 + "px";
            this.progressBar.style.height =
              this.button_2.offsetTop -
              this.button.offsetTop +
              this.button.offsetWidth / 2 +
              "px";
            this.progressBar.style.left = "-1px";
          }
        }
    
        if (progressBarWidth <= fieldWidth / 4) {
          this.progressBar.style.backgroundColor = "rgb(181, 184, 177)";
        }
        if (progressBarWidth >= fieldWidth / 4) {
          this.progressBar.style.backgroundColor = "rgb(184, 134, 11)";
        }
        if (progressBarWidth >= fieldWidth / 2) {
          this.progressBar.style.backgroundColor = "rgb(0, 154, 99)";
        }
        if (progressBarWidth >= fieldWidth - this.button.offsetWidth) {
          this.progressBar.style.backgroundColor = "rgb(111, 207, 151)";
        }
      }
}
export default ViewProgressBar