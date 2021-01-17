import ViewField from "./subView/ViewField";
import ViewButton from "./subView/ViewButton";
import ViewFlag from "./subView/ViewFlag";
import ViewProgressBar from "./subView/ViewProgressBar";
import ViewScale from "./subView/ViewScale";
import ViewContainer from "./subView/ViewContainer";
import IViewConfig from "./IViewConfig";
import ISubscriber from "./ISubscriber";

class View {
  readonly slider!: HTMLDivElement;
  readonly button!: ViewButton;
  button_2!: ViewButton;
  isHorizontal: boolean;
  isRangeSlider: boolean;
  field!: ViewField;
  flag!: ViewFlag;
  flag_2!: ViewFlag;
  progressBar!: ViewProgressBar;
  subscriber!: ISubscriber;
  mouseCoords: number;
  scale!: ViewScale;
  isFlag: boolean;
  isScale: boolean;
  scaleQuantity: number;
  isProgressBar: boolean;

  constructor(
    {
      target = undefined,
      isHorizontal = true,
      isRangeSlider = true,
      isFlag = true,
      isProgressBar = true,
      isScale = true,
      scaleQuantity = 6,
    } = {} as IViewConfig
  ) {
    this.slider = new ViewContainer(target).slider;
    this.isHorizontal = isHorizontal;
    this.isRangeSlider = isRangeSlider;
    this.isFlag = isFlag;
    this.isProgressBar = isProgressBar;
    this.isScale = isScale;
    this.scaleQuantity = scaleQuantity;
    this.mouseCoords = 0;
    this.validate()
  }

  private validate() {
    if (typeof this.isHorizontal !== "boolean") this.isHorizontal = true;
    if (typeof this.isRangeSlider !== "boolean") this.isRangeSlider = true;
    if (typeof this.isFlag !== "boolean") this.isFlag = true;
    if (typeof this.isProgressBar !== "boolean") this.isProgressBar = true;
    if (typeof this.isScale !== "boolean") this.isScale = true;
    if (typeof this.scaleQuantity !== "number" || this.scaleQuantity < 1)
      this.scaleQuantity = 2;
  }
  private renderField(): void {
    this.field = new ViewField(this.slider, this.isHorizontal);
    this.field.createField();
  }
  private renderButtons(): void {
    this.button = new ViewButton(this.field.div, this.isHorizontal);
    this.button.createButton();
    if (this.isRangeSlider) {
      this.button_2 = new ViewButton(this.field.div, this.isHorizontal);
      this.button_2.createButton();
    }
  }
  private renderScale(): void {
    this.scale = new ViewScale(this.field.div, this.isHorizontal);
    this.scale.createScale(this.scaleQuantity);
    if (!this.isScale) this.scale.hideScale();
  }
  private renderProgressBar() {
    if (this.isRangeSlider) {
      this.progressBar = new ViewProgressBar({
        field: this.field.div,
        button: this.button.div,
        isHorizontal: this.isHorizontal,
        isRangeSlider: this.isRangeSlider,
        button_2: this.button_2.div,
      });
    }
    if (!this.isRangeSlider) {
      this.progressBar = new ViewProgressBar({
        field: this.field.div,
        button: this.button.div,
        isHorizontal: this.isHorizontal,
        isRangeSlider: this.isRangeSlider
      });
    }
    this.progressBar.createProgressBar();
    if (!this.isProgressBar) {
      this.progressBar.hideBar();
    }
  }
  private renderFlag(): void {
    this.flag = new ViewFlag(this.button.div);
    this.flag.createFlag();
    if (!this.isFlag) {
      this.flag.hideFlag();
    }
    if (this.isRangeSlider) {
      this.flag_2 = new ViewFlag(this.button_2.div);
      this.flag_2.createFlag();
      if (!this.isFlag) {
        this.flag_2.hideFlag();
      }
    }
  }
  private notifyMouseMove() {
    this.subscriber.mouseMoveButton();
  }
  private notifyMouseUp() {
    this.subscriber.mouseUp();
  }
  private notifyMouseMove_2() {
    this.subscriber.mouseMoveButton_2();
  }
  private notifyMouseUp_2() {
    this.subscriber.mouseUp_2();
  }
  renderElements(): void {
    this.renderField();
    this.renderButtons();
    this.renderFlag();
    this.renderProgressBar();
    this.renderScale();
  }
  removeElements() {
    [
      this.flag.div,
      this.button.div,
      this.field.div,
      this.progressBar.div,
      this.scale.div,
    ].forEach((item) => item.remove());

    if (this.isRangeSlider) {
      [this.flag_2.div, this.button_2.div].forEach((item) => item.remove());
    }
  }
  getMouseCoords(): void {
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
  register(sub: ISubscriber) {
    this.subscriber = sub;
  }
  mouseEventSlider(
    MouseMove = this.notifyMouseMove,
    MouseUp = this.notifyMouseUp
  ) {
    this.slider.onmousedown = () => false;
    this.slider.oncontextmenu = () => false;
    let Handler = MouseMove.bind(this);

    if (!this.isRangeSlider) {
      this.field.div.addEventListener("mousedown", () => {
        Handler();
        document.addEventListener("mousemove", Handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", Handler);
          MouseUp.call(this);
        };
      });
    }
  }
  mouseEventRange(
    MouseMove = this.notifyMouseMove,
    MouseMove_2 = this.notifyMouseMove_2,
    MouseUp = this.notifyMouseUp,
    MouseUp_2 = this.notifyMouseUp_2
  ) {
    let Handler = MouseMove.bind(this);
    let Handler_2 = MouseMove_2.bind(this);

    this.field.div.addEventListener("mousedown", () => {
      let buttonOffset = this.button.div.getBoundingClientRect().left;
      let buttonOffset_2 = this.button_2.div.getBoundingClientRect().left;

      if (!this.isHorizontal) {
        buttonOffset = this.button.div.getBoundingClientRect().top;
        buttonOffset_2 = this.button_2.div.getBoundingClientRect().top;
      }

      if (this.mouseCoords > (buttonOffset_2 + buttonOffset) / 2) {
        Handler_2();
        document.addEventListener("mousemove", Handler_2);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", Handler_2);
          MouseUp_2.call(this);
        };
      } else {
        Handler();
        document.addEventListener("mousemove", Handler);
        document.onmouseup = () => {
          document.removeEventListener("mousemove", Handler);
          MouseUp.call(this);
        };
      }
    });
  }
}

export default View;
