class View {
  slider: any;
  button: HTMLElement;
  button_2: any;
  field: HTMLDivElement;
  flag: HTMLElement;
  flag_2: any;
  progressBar: HTMLElement;
  isHorizontal: boolean;
  isRangeSlider: boolean;

  constructor() {
    this.slider = document.querySelector(".slider");
    this.button = document.createElement("div");
    this.button_2;
    this.field = document.createElement("div");
    this.flag = document.createElement("div");
    this.flag_2;
    this.progressBar = document.createElement("div");
    this.isHorizontal = true;
    this.isRangeSlider = true;
  }
  renderElements(): void {
    this.renderField();
    this.renderButtons();
    this.renderFlag();
    this.renderProgressBar();
  }
  removeElements() {
    [
      this.flag,
      // this.flag_2,
      this.button,
      // this.button_2,
      this.field,
      this.progressBar,
    ].forEach((item) => item.remove());
    if(this.isRangeSlider){
    [
      this.flag_2,
      this.button_2,
    ].forEach((item) => item.remove());}
  }

  renderField(): void {
    this.field.className = "slider__field";
    this.slider.append(this.field);

    if (this.isHorizontal) {
      this.field.style.width = "auto";
      this.field.style.height = "6px";
    }
    if (!this.isHorizontal) {
      this.field.style.width = "6px";
      this.field.style.height = "auto";
    }
  }
  renderButtons(): void {
    this.button.className = "slider__button";

    this.button.style.top = "-6px";
    this.button.style.left = "0px";

    this.field.append(this.button);

    if (!this.isHorizontal) {
      this.button.style.left = "-5px";
      this.button.style.top = "0px";
    }

    if (this.isRangeSlider) {
      this.button_2 = this.button.cloneNode(true);
      this.button_2.style.left = this.button.offsetWidth * 2 + "px";

      this.button.after(this.button_2);

      if (!this.isHorizontal) {
        this.button_2.style.top = this.button.offsetWidth * 2 + "px";
        this.button_2.style.left = "-5px";
      }
    }

    
  }
  renderFlag(): void {
    this.flag.className = "flag";
    this.flag.style.top =  "-17px";
    this.button.append(this.flag);

    if (this.isRangeSlider) {
      this.flag_2 = this.flag.cloneNode(true);
      this.button_2.append(this.flag_2);
    }
  }
  renderProgressBar() {
    this.progressBar.className = "progressBar";
    this.progressBar.style.height = this.field.offsetHeight + "px";
    this.progressBar.style.top = this.progressBar.offsetTop - 1 + "px";
    this.progressBar.style.left = '0';
    if (!this.isHorizontal) {
      this.progressBar.style.left = '1px';
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

  sliderMove(button:any, px:any): void {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;
    this.isHorizontal
      ? (button.style.left = px + "px")
      : (button.style.top = px + "px");
  }
  flagMove(flag:HTMLElement, value:number): void {
    // this.flag.style.top = this.button.offsetTop - 15 + "px";
    flag.innerHTML = value + '';
    if (this.isRangeSlider) {
      // this.flag_2.style.left = this.button_2.offsetLeft + "px";
      // this.flag_2.style.top = this.button_2.offsetTop - 15 + "px";
      if (!this.isHorizontal) {
        // this.flag_2.style.top =
        //   this.button_2.offsetTop + 5 + this.button_2.offsetWidth + "px";
      }
    }
  }
  progressBarMove(): void {
    this.progressBar.style.width = this.button.offsetLeft + this.button.offsetWidth / 2 + "px";
    if (!this.isHorizontal) {
      this.progressBar.style.height =
      this.button.offsetTop + this.button.offsetWidth + "px";
      this.progressBar.style.width = this.field.offsetWidth + "px";
      this.progressBar.style.left = '0px';
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

    if (this.progressBar.offsetWidth <= this.field.offsetWidth / 4) {
      this.progressBar.style.backgroundColor = "grey";
    }
    if (this.progressBar.offsetWidth >= this.field.offsetWidth / 4) {
      this.progressBar.style.backgroundColor = "darkgoldenrod";
    }
    if (this.progressBar.offsetWidth >= this.field.offsetWidth / 2) {
      this.progressBar.style.backgroundColor = "green";
    }
    if (
      this.progressBar.offsetWidth >=
      this.field.offsetWidth - this.button.offsetWidth
    ) {
      this.progressBar.style.backgroundColor = "#6FCF97";
    }
    if (!this.isHorizontal) {
      if (this.progressBar.offsetHeight <= this.field.offsetHeight / 4) {
        this.progressBar.style.backgroundColor = "grey";
      }
      if (this.progressBar.offsetHeight >= this.field.offsetHeight / 4) {
        this.progressBar.style.backgroundColor = "darkgoldenrod";
      }
      if (this.progressBar.offsetHeight >= this.field.offsetHeight / 2) {
        this.progressBar.style.backgroundColor = "green";
      }
      if (
        this.progressBar.offsetHeight >=
        this.field.offsetHeight - this.button.offsetHeight
      ) {
        this.progressBar.style.backgroundColor = "#6FCF97";
      }
    }
  }

  removeFlag(): void {
    this.flag.style.display = "none";
    if (this.flag_2) {
      this.flag_2.style.display = "none";
    }
  }
  addFlag(): void {
    this.flag.style.display = "block";
    if (this.flag_2) {
      this.flag_2.style.display = "block";
    }
  }
}
export {View}