import Viewfield from "./Viewfield";
import ViewButton from "./ViewButton";
import ViewFlag from "./ViewFlag";
import ViewProgressBar from "./ViewProgressBar";

class View {
  readonly slider: any;
  button: ViewButton;
  button_2: ViewButton;
  private _isHorizontal: boolean;
  private _isRangeSlider: boolean;
  field: Viewfield;
  flag: ViewFlag;
  flag_2: ViewFlag;
  progressBar: ViewProgressBar;
  subscriber: any;
  mouseCoords: number;

  constructor(options: any = {}) {
    this.slider = options.target || document.querySelector(".slider");
    this._isHorizontal =
      typeof options.isHorizontal == "boolean" ? options.isHorizontal : true;
    this._isRangeSlider =
      typeof options.isRangeSlider == "boolean" ? options.isRangeSlider : true;
    this.subscriber = null;
    this.renderElements();
    this.mouseCoords = 0;
  }

  renderElements(): void {
    this.renderField();
    this.renderButtons();
    this.renderFlag();
    this.renderProgressBar();
  }
  removeElements() {
    [
      this.flag.div,
      this.button.div,
      this.field.div,
      this.progressBar.div,
    ].forEach((item) => item.remove());

    if (this.isRangeSlider) {
      [this.flag_2.div, this.button_2.div].forEach((item) => item.remove());
    }
  }

  private renderField(): void {
    this.field = new Viewfield(this.slider, this.isHorizontal);
  }
  private renderButtons(): void {
    this.button = new ViewButton(this.field.div, this.isHorizontal);
    this.button.createButton();
    if (this.isRangeSlider) {
      this.button_2 = new ViewButton(this.field.div, this.isHorizontal);
      this.button_2.createButton();
    }
  }
  private renderFlag(): void {
    this.flag = new ViewFlag(this.button.div);
    this.flag.createFlag();
    if (this.isRangeSlider) {
      this.flag_2 = new ViewFlag(this.button_2.div);
      this.flag_2.createFlag();
    }
  }
  private renderProgressBar() {
    if (this.isRangeSlider) {
      this.progressBar = new ViewProgressBar(
        this.field.div,
        this.button.div,
        this.isHorizontal,
        this.isRangeSlider,
        this.button_2.div
      );
    }
    if (!this.isRangeSlider) {
      this.progressBar = new ViewProgressBar(
        this.field.div,
        this.button.div,
        this.isHorizontal,
        this.isRangeSlider
      );
    }
    this.progressBar.createProgressBar();
  }
  calcMouseCoords(): void {
    let that = this;
    function Coords(event: MouseEvent) {
      if (that.isHorizontal) {
        that.mouseCoords = event.clientX;
      }
      if (!that.isHorizontal) {
        that.mouseCoords = event.clientY;
      }
    }
    document.addEventListener("mousemove", Coords);
  }

  register(sub: any) {
    this.subscriber = sub;
  }
  mouseEvent() {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;

    let that = this;

    function notify() {
      that.subscriber.mouseMoveButton();
    }

    if (!this.isRangeSlider) {
      this.field.div.addEventListener("mousedown", () => {
        that.subscriber.mouseMoveButton();
        document.addEventListener("mousemove", notify);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", notify);
          that.subscriber.mouseUp();
        };
      });
    }
  }

  private mouseEvent_2() {
    let that = this;
    function notify() {
      that.subscriber.mouseMoveButton();
    }
    function notify_2() {
      that.subscriber.mouseMoveButton_2();
    }
    if (this.isRangeSlider) {
      this.field.div.addEventListener("mousedown", () => {
        let buttonOffset = this.button.div.getBoundingClientRect().left;
        let buttonOffset_2 = this.button_2.div.getBoundingClientRect().left;
        if (!this.isHorizontal) {
          buttonOffset = this.button.div.getBoundingClientRect().top;
          buttonOffset_2 = this.button_2.div.getBoundingClientRect().top;
        }

        if (this.mouseCoords > (buttonOffset_2 + buttonOffset) / 2) {
          that.subscriber.mouseMoveButton_2();

          document.addEventListener("mousemove", notify_2);

          document.onmouseup = () => {
            document.removeEventListener("mousemove", notify_2);
            that.subscriber.mouseUp_2();
          };
        } else {
          that.subscriber.mouseMoveButton();

          document.addEventListener("mousemove", notify);

          document.onmouseup = () => {
            document.removeEventListener("mousemove", notify);
            that.subscriber.mouseUp();
          };
        }
      });
    }
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
export default View;
