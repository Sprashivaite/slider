import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import ViewField from './subView/ViewField';
import ViewButton from './subView/ViewButton';
import ViewFlag from './subView/ViewFlag';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import ViewHandler from './subView/ViewHandler';
import IView from './IView';
import Observer from '../Observer/Observer';
import { assignFlags, demarcateButtons } from './utils/demarcateElements';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { scaleData, viewConfig, userViewConfig } from '../types';

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

  config!: viewConfig;

  fieldSize!: number;

  buttonSize!: number;

  flagTotal!: ViewFlag;

  constructor(config = DEFAULT_VIEW_CONFIG as userViewConfig) {
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
      [this.secondFlag.div, this.secondButton.div].forEach((item) => (
          item.remove()
        )
      );
    }
  }

  addHandlers(): void {
    this.handler = new ViewHandler(this);
    this.handler.addFieldHandler();
    this.handler.getMouseCoords();
    this.handler.addScaleHandler();
    this.handler.addButtonHandler();
    // eslint-disable-next-line no-new
    new ResizeSensor(this.slider.div, () => this.updateModel());
  }

  updateModel(): void {
    const { isHorizontal } = this.config;
    const offsetSize = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    this.fieldSize = this.field.div[offsetSize];
    this.buttonSize = this.firstButton.div[offsetSize];
    this.emit('updateElementsSize', {
      fieldSize: this.fieldSize,
      buttonSize: this.buttonSize,
    });
    this.handler.emit('firstButtonMouseUp', this.handler.getFirstButtonData());
    if (this.config.isRangeSlider) {
      this.handler.emit(
        'secondButtonMouseUp',
        this.handler.getSecondButtonData()
      );
    }
  }

  updateScale(values: scaleData): void {
    this.scale.updateValues(values);
    this.handler.addScaleHandler();
  }

  demarcateElements(event: string): void {
    const { isRangeSlider } = this.config;
    if (isRangeSlider) {
      demarcateButtons(this, event)
      assignFlags(this);
    }
  }

  private init(config: userViewConfig): void {
    this.config = { ...DEFAULT_VIEW_CONFIG, ...config };
    this.validate();
  }

  private validate(): void {
    let { isHorizontal, isRangeSlider, isFlag, isProgressBar, isScale } =
      this.config;
    if (typeof isHorizontal !== 'boolean') isHorizontal = true;
    if (typeof isRangeSlider !== 'boolean') isRangeSlider = true;
    if (typeof isFlag !== 'boolean') isFlag = true;
    if (typeof isProgressBar !== 'boolean') isProgressBar = true;
    if (typeof isScale !== 'boolean') isScale = true;
    this.config = {
      ...this.config,
      isHorizontal,
      isRangeSlider,
      isFlag,
      isProgressBar,
      isScale,
    };
  }

  private renderField(): void {
    this.field = new ViewField(this);
    this.field.createField();
  }

  private renderButtons(): void {
    const { isRangeSlider } = this.config;
    this.firstButton = new ViewButton(this);
    this.firstButton.createButton();
    if (isRangeSlider) {
      this.secondButton = new ViewButton(this);
      this.secondButton.createButton();
    }
  }

  private renderFlag(): void {
    const { isRangeSlider } = this.config;
    this.firstFlag = new ViewFlag(this, this.firstButton.div);
    this.firstFlag.createFlag();
    if (isRangeSlider) {
      this.secondFlag = new ViewFlag(this, this.secondButton.div);
      this.secondFlag.createFlag();
      this.flagTotal = new ViewFlag(this, this.firstButton.div);
      this.flagTotal.createFlag();
      this.flagTotal.hideFlag();
      this.flagTotal.div.style.position = 'absolute';
    }
  }

  private renderScale(): void {
    this.scale = new ViewScale(this);
    this.scale.createScale();
  }

  private renderProgressBar(): void {
    this.progressBar = new ViewProgressBar(this);
    this.progressBar.createProgressBar();
  }
}

export default View;
