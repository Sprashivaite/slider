import {ViewButton} from './ViewButton'
class View {
  readonly slider: any;
  button: HTMLElement;
  button_2: any;
  readonly field: HTMLDivElement;
  readonly flag: HTMLElement;
  flag_2: any;
  readonly progressBar: HTMLElement;
  private _isHorizontal: boolean;
  private _isRangeSlider: boolean;

  constructor() {
    this.slider = document.querySelector(".slider");
    this.field = document.createElement("div");
    this.flag = document.createElement("div");
    this.progressBar = document.createElement("div");
    this._isHorizontal = true;
    this._isRangeSlider = true;
  }
  get isHorizontal() {
    return this._isHorizontal;
  }
  set isHorizontal(boolean) {
    this._isHorizontal = boolean;
  }
  get isRangeSlider() {
    return this._isRangeSlider;
  }
  set isRangeSlider(boolean) {
    this._isRangeSlider = boolean;
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
      this.button,
      this.field,
      this.progressBar,
    ].forEach((item) => item.remove());
    if (this.isRangeSlider) {
      [this.flag_2, this.button_2].forEach((item) => item.remove());
    }
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
      this.field.style.height = "100%";
    }
  }
  renderButtons(): void {
    this.button = new ViewButton().createButton(this.field, this.isHorizontal);
    if (this.isRangeSlider) {
      this.button_2 = new ViewButton().createButton(
        this.field,
        this.isHorizontal
      );
    }

  }
  renderFlag(): void {
    this.flag.className = "flag";
    this.flag.style.top = "-17px";
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

  buttonMove(button: any, px: any): void {
    this.isHorizontal
      ? (button.style.left = px + "px")
      : (button.style.top = px + "px");
  }
  flagMove(flag: HTMLElement, value: number): void {
    flag.innerHTML = value + "";
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