import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import ViewField from './subView/ViewField';
import ViewPoint from './subView/ViewPoint';
import ViewTooltip from './subView/ViewTooltip';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import ViewContainer from './subView/ViewContainer';
import ViewHandler from './subView/ViewHandler';
import IView from './IView';
import Observer from '../Observer/Observer';
import { assignTooltips, demarcatePoints } from './utils/demarcateElements';
import { DEFAULT_VIEW_CONFIG } from '../defaults';
import { scaleData, viewConfig, userViewConfig } from '../types';

class View extends Observer implements IView {
  slider!: ViewContainer;

  firstPoint!: ViewPoint;

  secondPoint!: ViewPoint;

  field!: ViewField;

  firstTooltip!: ViewTooltip;

  secondTooltip!: ViewTooltip;

  progressBar!: ViewProgressBar;

  scale!: ViewScale;

  handler!: ViewHandler;

  config!: viewConfig;

  fieldSize!: number;

  pointSize!: number;

  tooltipTotal!: ViewTooltip;

  constructor(config = DEFAULT_VIEW_CONFIG as userViewConfig) {
    super();
    this.slider = new ViewContainer(config.target);
    this.init(config);
  }

  setConfig(config: userViewConfig): void {
    this.config = {...this.config, ...config};
    this.validate();
    this.removeElements();
    this.renderElements();
    this.addHandlers();
  }

  getConfig(): userViewConfig {
    return this.config
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
    this.handler = new ViewHandler(this);
    this.handler.addFieldHandler();
    this.handler.getMouseCoords();
    this.handler.addScaleHandler();
    this.handler.addPointHandler();
    // eslint-disable-next-line no-new
    new ResizeSensor(this.slider.divElement, () => this.updateModel());
  }

  updateModel(): void {
    const { isHorizontal } = this.config;
    const offsetSize = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    this.fieldSize = this.field.divElement[offsetSize];
    this.pointSize = this.firstPoint.divElement[offsetSize];
    this.emit('updateElementsSize', {
      fieldSize: this.fieldSize,
      pointSize: this.pointSize,
    });
    this.handler.emit('firstPointMouseUp', this.handler.getFirstPointData());
    if (this.config.isRangeSlider) {
      this.handler.emit(
        'secondPointMouseUp',
        this.handler.getSecondPointData()
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
      demarcatePoints(this, event)
      assignTooltips(this);
    }
  }

  private init(config: userViewConfig): void {
    this.config = { ...DEFAULT_VIEW_CONFIG, ...config };
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
