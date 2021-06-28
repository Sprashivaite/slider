import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import ViewField from './subView/ViewField';
import ViewPoint from './subView/ViewPoint';
import ViewTooltip from './subView/ViewTooltip';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import ViewNotifier from './subView/ViewNotifier';
import IView from './IView';
import  assignTooltips  from './utils/demarcateElements';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { viewConfig, userConfig, pointData } from '../types';

class View implements IView {
  slider!: ViewContainer;

  firstPoint!: ViewPoint;

  secondPoint!: ViewPoint;

  field!: ViewField;

  firstTooltip!: ViewTooltip;

  secondTooltip!: ViewTooltip;

  progressBar!: ViewProgressBar;

  scale!: ViewScale;

  config!: viewConfig;

  fieldSize!: number;

  pointSize!: number;

  tooltipTotal!: ViewTooltip;

  notifier!: ViewNotifier;

  constructor(config: userConfig) {
    this.slider = new ViewContainer(config.target);
    this.init(config);
  }

  setConfig(config: userConfig): void {
    this.config = {...this.config, ...config};
    this.validate();
    this.removeElements();
    this.renderElements();
    this.addHandlers();
  }

  renderElements(): void {
    this.renderField();
    this.renderPoints();
    this.renderTooltip();
    this.renderProgressBar();
    this.renderScale();
  }

  removeElements(): void {
    [
      this.firstTooltip.divElement,
      this.firstPoint.divElement,
      this.field.divElement,
      this.progressBar.divElement,
      this.scale.divElement,
    ].forEach((item) => item.remove());

    if (this.config.isRangeSlider) {
      [this.secondTooltip.divElement, this.secondPoint.divElement].forEach((item) => (
          item.remove()
        )
      );
    }
  }

  addHandlers(): void {
    this.notifier = new ViewNotifier(this);
    this.notifier.addHandlers();
    // eslint-disable-next-line no-new
    new ResizeSensor(this.slider.divElement, () => this.notifyListeners());
  }

  notifyListeners(): void {
    this.notifier.emit('firstPointStopped', this.notifier.getFirstPointData());
    if (this.config.isRangeSlider) {
      this.notifier.emit(
        'secondPointStopped',
        this.notifier.getSecondPointData()
      );
    }
  }

  changeView(data: pointData): void {
    const { pointOffset, pointName, value } = data
    
    if(pointName === 'firstPoint') {
      this.firstPoint.movePoint(pointOffset)
      this.firstTooltip.changeTooltipValue(value!)
    }
    if(pointName === 'secondPoint' && this.config.isRangeSlider) {
      this.secondPoint.movePoint(pointOffset)
      this.secondTooltip.changeTooltipValue(value!)
    }
    this.progressBar.progressBarMove()
    assignTooltips(this)
  }

  updateScale(values: number[]): void {
    this.scale.updateValues(values);
    this.notifier.addScaleHandler();
  }

  private init(config: userConfig): void {
    let newConfig = config;
    if(typeof newConfig !== 'object') newConfig = {};
    this.config = { ...DEFAULT_VIEW_CONFIG, ...newConfig };
    this.validate();
  }

  private validate(): void {
    let { isHorizontal, isRangeSlider, isTooltip, isProgressBar, isScale } =
      this.config;
    if (typeof isHorizontal !== 'boolean') isHorizontal = true;
    if (typeof isRangeSlider !== 'boolean') isRangeSlider = true;
    if (typeof isTooltip !== 'boolean') isTooltip = true;
    if (typeof isProgressBar !== 'boolean') isProgressBar = true;
    if (typeof isScale !== 'boolean') isScale = true;
    this.config = {
      ...this.config,
      isHorizontal,
      isRangeSlider,
      isTooltip,
      isProgressBar,
      isScale,
    };
  }

  private renderField(): void {
    this.field = new ViewField(this);
    this.field.createField();
  }

  private renderPoints(): void {
    const { isRangeSlider } = this.config;
    this.firstPoint = new ViewPoint(this);
    this.firstPoint.createPoint();
    if (isRangeSlider) {
      this.secondPoint = new ViewPoint(this);
      this.secondPoint.createPoint();
    }
  }

  private renderTooltip(): void {
    const { isRangeSlider } = this.config;
    this.firstTooltip = new ViewTooltip(this, this.firstPoint.divElement);
    this.firstTooltip.createTooltip();
    if (isRangeSlider) {
      this.secondTooltip = new ViewTooltip(this, this.secondPoint.divElement);
      this.secondTooltip.createTooltip();
      this.tooltipTotal = new ViewTooltip(this, this.firstPoint.divElement);
      this.tooltipTotal.createTooltip();
      this.tooltipTotal.hideTooltip();
      this.tooltipTotal.divElement.style.position = 'absolute';
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
