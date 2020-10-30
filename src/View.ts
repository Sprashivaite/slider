import Viewfield from "./Viewfield";
import ViewButton from "./ViewButton";
import ViewFlag from "./ViewFlag";
import ViewProgressBar from "./ViewProgressBar";

class View {
  readonly slider: any;
  button: any;
  button_2: any;
  field: any;
  flag: any;
  flag_2: any;
  progressBar: any;
  private _isHorizontal: boolean;
  private _isRangeSlider: boolean;
  subscriber: any;

  constructor() {
    this.slider = document.querySelector(".slider");

    this._isHorizontal = true;
    this._isRangeSlider = true;
    this.subscriber = null;
  }

  renderElements(): void {
    this.renderField();
    this.renderButtons();
    this.renderFlag();
    this.renderProgressBar();
    this.mouseEvent();
  }
  removeElements() {
    [this.flag, this.button, this.field, this.progressBar].forEach((item) =>
      item.remove()
    );

    if (this.isRangeSlider) {
      [this.flag_2, this.button_2].forEach((item) => item.remove());
    }
  }

  renderField(): void {
    this.field = new Viewfield(this.slider, this.isHorizontal).field;
  }
  renderButtons(): void {
    this.button = new ViewButton(this.field, this.isHorizontal).createButton();
    if (this.isRangeSlider) {
      this.button_2 = new ViewButton(
        this.field,
        this.isHorizontal
      ).createButton();
    }
  }
  renderFlag(): void {
    this.flag = new ViewFlag(this.button);
    this.flag.createFlag();
    if (this.isRangeSlider) {
      this.flag_2 = new ViewFlag(this.button_2);
      this.flag_2.createFlag();
    }
  }
  renderProgressBar() {
    this.progressBar = new ViewProgressBar(
      this.field,
      this.button,
      this.button_2,
      this.isHorizontal,
      this.isRangeSlider
    );
    this.progressBar.createProgressBar();
  }

  buttonMove(button: any, px: any): void {
    this.isHorizontal
      ? (button.style.left = px + "px")
      : (button.style.top = px + "px");
  }

  register(sub: this) {
    this.subscriber = sub;
  }
  mouseEvent() {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;
    let that = this;
    function notify() {
      that.subscriber.mouseEventButton();
    }
    function notify_2() {
      that.subscriber.mouseEventButton_2();
    }
    this.button.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", notify);
      document.onmouseup = () => {
        notify();
        document.removeEventListener("mousemove", notify);
        that.subscriber.mouseUp();
      };
    });
    this.button_2.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", notify_2);
      document.onmouseup = () => {
        notify_2();
        document.removeEventListener("mousemove", notify_2);
        that.subscriber.mouseUp_2();
      };
    });
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
}
export { View };
