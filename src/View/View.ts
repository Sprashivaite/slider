import ViewField from "./subView/ViewField";
import ViewButton from "./subView/ViewButton";
import ViewFlag from "./subView/ViewFlag";
import ViewProgressBar from "./subView/ViewProgressBar";
import ViewScale from "./subView/ViewScale";
import ViewContainer from "./subView/ViewContainer";
import IViewConfig from "./IViewConfig"; 
import IView from "./IView"; 
import ISubscriber from "./subView/ISubscriber";
import ViewHandler from "./subView/ViewHandler";

class View implements IView {
  slider: ViewContainer;

  button!: ViewButton;

  button_2!: ViewButton;

  isHorizontal: boolean;

  isRangeSlider: boolean;

  field!: ViewField;

  flag!: ViewFlag;

  flag_2!: ViewFlag;

  progressBar!: ViewProgressBar;

  scale!: ViewScale;

  handler!: ViewHandler;

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
    this.slider = new ViewContainer(target);
    this.isHorizontal = isHorizontal;
    this.isRangeSlider = isRangeSlider;
    this.isFlag = isFlag;
    this.isProgressBar = isProgressBar;
    this.isScale = isScale;
    this.scaleQuantity = scaleQuantity;
    this.validate();
  }

  renderElements(): void {
    this.renderField();
    this.renderButtons();
    this.renderFlag();
    this.renderProgressBar();
    this.renderScale();
  }

  removeElements(): void {
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

  register(subscriber: ISubscriber): void {
    this.handler = new ViewHandler(this, subscriber);
  }

  private validate(): void {
    if (typeof this.isHorizontal !== "boolean") this.isHorizontal = true;
    if (typeof this.isRangeSlider !== "boolean") this.isRangeSlider = true;
    if (typeof this.isFlag !== "boolean") this.isFlag = true;
    if (typeof this.isProgressBar !== "boolean") this.isProgressBar = true;
    if (typeof this.isScale !== "boolean") this.isScale = true;
    if (typeof this.scaleQuantity !== "number" || this.scaleQuantity < 1)
      this.scaleQuantity = 2;
    this.scaleQuantity = Number(this.scaleQuantity.toFixed(0));
  }

  private renderField(): void {
    this.field = new ViewField(this);
    this.field.createField();
  }

  private renderButtons(): void {
    this.button = new ViewButton(this);
    this.button.createButton();
    if (this.isRangeSlider) {
      this.button_2 = new ViewButton(this);
      this.button_2.createButton();
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

  private renderScale(): void {
    this.scale = new ViewScale(this);
    this.scale.createScale(this.scaleQuantity);
    if (!this.isScale) this.scale.hideScale();
  }

  private renderProgressBar(): void {
    this.progressBar = new ViewProgressBar(this);
    this.progressBar.createProgressBar();
    if (!this.isProgressBar) {
      this.progressBar.hideBar();
    }
  }
}

export default View;
