import ViewField from "./subView/ViewField";
import ViewButton from "./subView/ViewButton";
import ViewFlag from "./subView/ViewFlag";
import ViewProgressBar from "./subView/ViewProgressBar";
import ViewScale from "./subView/ViewScale";
import ViewContainer from "./subView/ViewContainer";
import IViewConfig from "./IViewConfig"; 
import IView from "./IView"; 
import ViewHandler from "./subView/ViewHandler";

import {DEFAULT_VIEW_CONFIG} from "../defaults";
import Observable from "../Observable/Observable";

class View extends Observable implements IView {
  slider!: ViewContainer;

  button1!: ViewButton;

  button2!: ViewButton;

  field!: ViewField;

  flag1!: ViewFlag;

  flag2!: ViewFlag;

  progressBar!: ViewProgressBar;

  scale!: ViewScale;

  handler!: ViewHandler;
  
  config!: IViewConfig;
  
  fieldSize: any;

  buttonSize: number;

  constructor(
    config = DEFAULT_VIEW_CONFIG as IViewConfig
  ) {
    super()
    this.slider = new ViewContainer(config.target);
    
    this.init(config)
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
      this.flag1.div,
      this.button1.div,
      this.field.div,
      this.progressBar.div,
      this.scale.div,
    ].forEach((item) => item.remove());
    const {isRangeSlider} = this.config
    if (isRangeSlider) {
      [this.flag2.div, this.button2.div].forEach((item) => item.remove());
    }    
  }

  addHandlers(): void {
    this.handler = new ViewHandler(this);
    this.handler.addFieldHandler();
    this.handler.getMouseCoords();    
    this.handler.addScaleHandler();
    this.handler.addButtonHandler();
  }

  private init(config: IViewConfig): void {
    this.config = { ...DEFAULT_VIEW_CONFIG, ...config };
    
    this.validate();
  }

  private validate(): void {
    let {isHorizontal, isRangeSlider, isFlag, isProgressBar, isScale, scaleQuantity} = this.config
    if (typeof isHorizontal !== "boolean") isHorizontal = true;
    if (typeof isRangeSlider !== "boolean") isRangeSlider = true;
    if (typeof isFlag !== "boolean") isFlag = true;
    if (typeof isProgressBar !== "boolean") isProgressBar = true;
    if (typeof isScale !== "boolean") isScale = true;
    if (typeof scaleQuantity !== "number" || scaleQuantity < 1) {
      scaleQuantity = 2;
    }
    scaleQuantity = Number(scaleQuantity.toFixed(0));
    this.config = {isHorizontal, isRangeSlider, isFlag, isProgressBar, isScale, scaleQuantity}
  }

  private renderField(): void {
    this.field = new ViewField(this);
    this.field.createField();
    
    if(this.config.isHorizontal) {
      this.fieldSize = this.field.div.offsetWidth
    }
    if(!this.config.isHorizontal) {
      this.fieldSize = this.field.div.offsetHeight
    }
  }

  private renderButtons(): void {
    const {isRangeSlider} = this.config
    this.button1 = new ViewButton(this);
    this.button1.createButton();

    if (isRangeSlider) {
      this.button2 = new ViewButton(this);
      this.button2.createButton();
    }

    if(this.config.isHorizontal) {
      this.buttonSize = this.button1.div.offsetWidth
    }
    if(!this.config.isHorizontal) {
      this.buttonSize = this.button1.div.offsetHeight
    }
  }

  private renderFlag(): void {
    const {isRangeSlider, isFlag} = this.config
    this.flag1 = new ViewFlag(this);
    this.flag1.createFlag();
    
    if (!isFlag) {
      this.flag1.hideFlag();
    }

    if (isRangeSlider) {
      this.flag2 = new ViewFlag(this);
      this.flag2.createFlag();
      if (!isFlag) {
        this.flag2.hideFlag();
      }
    }
  }

  private renderScale(): void {
    const {isScale, scaleQuantity} = this.config
    this.scale = new ViewScale(this);
    this.scale.createScale(scaleQuantity);

    if (!isScale) this.scale.hideScale();
  }

  private renderProgressBar(): void {
    const {isProgressBar} = this.config
    this.progressBar = new ViewProgressBar(this);
    this.progressBar.createProgressBar();

    if (!isProgressBar) this.progressBar.hideBar();
  }
}

export default View;
