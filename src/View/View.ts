import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import ViewField from './subView/ViewField';
import ViewButton from './subView/ViewButton';
import ViewFlag from './subView/ViewFlag';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import IViewConfig from './IViewConfig';
import IView from './IView';
import ViewHandler from './subView/ViewHandler';
import Observer from '../Observer/Observer';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { scaleData } from '../types';

class View extends Observer implements IView {
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

  fieldSize!: number;

  buttonSize!: number;

  flagTotal!: ViewFlag;

  constructor(config = DEFAULT_VIEW_CONFIG as IViewConfig) {
    super();
    this.slider = new ViewContainer(config.target);
    this.init(config);
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

    if (this.config.isRangeSlider) {
      [this.flag2.div, this.button2.div].forEach((item) => item.remove());
    }
  }

  addHandlers(): void {
    this.handler = new ViewHandler(this);
    this.handler.addFieldHandler();
    this.handler.getMouseCoords();
    this.handler.addScaleHandler();
    this.handler.addButtonHandler();
    new ResizeSensor(this.slider.div, (() => this.updateModel()));    
  }

  updateModel(): void {
    const { isHorizontal } = this.config;
    if (isHorizontal) this.fieldSize = this.field.div.offsetWidth;
    if (!isHorizontal) this.fieldSize = this.field.div.offsetHeight;
    this.emit('elementsSize', {
      fieldSize: this.fieldSize,
      buttonSize: this.buttonSize,
    });
    this.handler.emit('mouseUp', this.handler.getFirstButtonData());
    if (this.config.isRangeSlider) {
      this.handler.emit('mouseUp2', this.handler.getSecondButtonData());
    }

  }

  updateScale(values: scaleData): void {
    this.scale.updateValues(values);
    this.handler.addScaleHandler();
  }

  assignFlags(): void {
    const unValid =
      !this.flag2 ||
      !this.config.isHorizontal ||
      !this.config.isFlag ||
      !this.config.isRangeSlider;
    if (unValid) return;
    const { flag1, flag2, flagTotal } = this;
    const flagOffset1 = flag1.div.getBoundingClientRect().right;
    const flagOffset2 = flag2.div.getBoundingClientRect().left;
    const text = `${flag1.div.innerHTML} - ${flag2.div.innerHTML}`;

    if (flagOffset1 >= flagOffset2) {
      flag1.hideFlag();
      flag2.hideFlag();
      flagTotal.showFlag();
      flagTotal.div.innerHTML = text;
    } else {
      flag1.showFlag();
      flag2.showFlag();
      flagTotal.hideFlag();
    }
  }

  private init(config: IViewConfig): void {
    this.config = { ...DEFAULT_VIEW_CONFIG, ...config };
    this.validate();
  }

  private validate(): void {
    let {
      isHorizontal,
      isRangeSlider,
      isFlag,
      isProgressBar,
      isScale,
    } = this.config;

    if (typeof isHorizontal !== 'boolean') isHorizontal = true;
    if (typeof isRangeSlider !== 'boolean') isRangeSlider = true;
    if (typeof isFlag !== 'boolean') isFlag = true;
    if (typeof isProgressBar !== 'boolean') isProgressBar = true;
    if (typeof isScale !== 'boolean') isScale = true;


    this.config = {
      isHorizontal,
      isRangeSlider,
      isFlag,
      isProgressBar,
      isScale
    };
  }

  private renderField(): void {    
    this.field = new ViewField(this);
    this.field.createField();
  }

  private renderButtons(): void {
    const { isRangeSlider, isHorizontal } = this.config;

    this.button1 = new ViewButton(this);
    this.button1.createButton();

    if (isRangeSlider) {
      this.button2 = new ViewButton(this);
      this.button2.createButton();
    }

    if (isHorizontal) {
      this.buttonSize = this.button1.div.offsetWidth;
    }
    if (!isHorizontal) {
      this.buttonSize = this.button1.div.offsetHeight;
    }
  }

  private renderFlag(): void {
    const { isRangeSlider, isFlag } = this.config;
    this.flag1 = new ViewFlag(this, this.button1.div);
    this.flag1.createFlag();

    if (!isFlag) this.flag1.hideFlag();

    if (isRangeSlider) {
      this.flag2 = new ViewFlag(this, this.button2.div);
      this.flag2.createFlag();
      this.flagTotal = new ViewFlag(this, this.button1.div);
      this.flagTotal.createFlag();
      this.flagTotal.hideFlag();
      this.flagTotal.div.style.position = 'absolute';
      this.flagTotal.div.style.left = '-50%';
      if (!isFlag) {
        this.flagTotal.hideFlag();
        this.flag2.hideFlag();
      }
    }
  }

  private renderScale(): void {
    const { isScale } = this.config;
    this.scale = new ViewScale(this);
    this.scale.createScale();
    if (!isScale) this.scale.hideScale();
  }

  private renderProgressBar(): void {
    const { isProgressBar } = this.config;
    this.progressBar = new ViewProgressBar(this);
    this.progressBar.createProgressBar();
    if (!isProgressBar) this.progressBar.hideBar();
  }
}

export default View;
