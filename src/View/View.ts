import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import ViewField from './subView/ViewField';
import ViewButton from './subView/ViewButton';
import ViewFlag from './subView/ViewFlag';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import IView from './IView';
import ViewHandler from './subView/ViewHandler';
import Observer from '../Observer/Observer';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { scaleData, ViewConfig } from '../types';

class View extends Observer implements IView {
  slider!: ViewContainer;

  firstButton!: ViewButton;

  secondButton!: ViewButton;

  field!: ViewField;

  firstFlag!: ViewFlag;

  secondFlag!: ViewFlag;

  progressBar!: ViewProgressBar;

  scale!: ViewScale;

  handler!: ViewHandler;

  config!: ViewConfig;

  fieldSize!: number;

  buttonSize!: number;

  flagTotal!: ViewFlag;

  constructor(config = DEFAULT_VIEW_CONFIG as ViewConfig) {
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
      this.firstFlag.div,
      this.firstButton.div,
      this.field.div,
      this.progressBar.div,
      this.scale.div,
    ].forEach((item) => item.remove());

    if (this.config.isRangeSlider) {
      [this.secondFlag.div, this.secondButton.div].forEach((item) => item.remove());
    }
  }

  addHandlers(): void {
    this.handler = new ViewHandler(this);
    this.handler.addFieldHandler();
    this.handler.getMouseCoords();
    this.handler.addScaleHandler();
    this.handler.addButtonHandler();
    // eslint-disable-next-line no-new
    new ResizeSensor(this.slider.div, (() => this.updateModel()))
  }

  updateModel(): void {
    const { isHorizontal } = this.config;
    if (isHorizontal) this.fieldSize = this.field.div.offsetWidth;
    if (!isHorizontal) this.fieldSize = this.field.div.offsetHeight;
    this.emit('updateElementsSize', {
      fieldSize: this.fieldSize,
      buttonSize: this.buttonSize,
    });
    this.handler.emit('firstButtonMouseUp', this.handler.getFirstButtonData());
    if (this.config.isRangeSlider) {
      this.handler.emit('secondButtonMouseUp', this.handler.getSecondButtonData());
    }
  }

  updateScale(values: scaleData): void {
    this.scale.updateValues(values);
    this.handler.addScaleHandler();
  }

  assignFlags(): void {
    const unValid =
      !this.secondFlag ||      
      !this.config.isFlag ||
      !this.config.isRangeSlider;
    if (unValid) return;
    const { firstFlag, secondFlag, flagTotal } = this;
    let firstFlagOffset = firstFlag.div.getBoundingClientRect().right;
    let secondFlagOffset = secondFlag.div.getBoundingClientRect().left;
    if(!this.config.isHorizontal) {
      firstFlagOffset = firstFlag.div.getBoundingClientRect().bottom;
      secondFlagOffset = secondFlag.div.getBoundingClientRect().top;
    }



    const text = `${firstFlag.div.innerHTML} - ${secondFlag.div.innerHTML}`;

    if (firstFlagOffset >= secondFlagOffset) {
      firstFlag.hideFlag();
      secondFlag.hideFlag();
      flagTotal.showFlag();
      flagTotal.div.innerHTML = text;
      const flagTotalOffset = `${(secondFlagOffset - firstFlagOffset) /2 }px`
      this.flagTotal.div.style.left = flagTotalOffset;
      if(!this.config.isHorizontal) {
        this.flagTotal.div.style.left = '150%';
      }
    } else {
      firstFlag.showFlag();
      secondFlag.showFlag();
      flagTotal.hideFlag();
    }
  }

  private init(config: ViewConfig): void {
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

    this.firstButton = new ViewButton(this);
    this.firstButton.createButton();

    if (isRangeSlider) {
      this.secondButton = new ViewButton(this);
      this.secondButton.createButton();
    }

    if (isHorizontal) {
      this.buttonSize = this.firstButton.div.offsetWidth;
    }
    if (!isHorizontal) {
      this.buttonSize = this.firstButton.div.offsetHeight;
    }
  }

  private renderFlag(): void {
    const { isRangeSlider, isFlag } = this.config;
    this.firstFlag = new ViewFlag(this, this.firstButton.div);
    this.firstFlag.createFlag();

    if (!isFlag) this.firstFlag.hideFlag();

    if (isRangeSlider) {
      this.secondFlag = new ViewFlag(this, this.secondButton.div);
      this.secondFlag.createFlag();
      this.flagTotal = new ViewFlag(this, this.firstButton.div);
      this.flagTotal.createFlag();
      this.flagTotal.hideFlag();
      this.flagTotal.div.style.position = 'absolute';

      if (!isFlag) {
        this.flagTotal.hideFlag();
        this.secondFlag.hideFlag();
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
