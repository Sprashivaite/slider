import SliderPlugin from '../../slider/SliderPlugin/SliderPlugin';
import { EventTypes } from '../../slider/types';

enum KeyInputs {
  firstPoint = 'firstPoint',
  secondPoint = 'secondPoint',
  max = 'max',
  min = 'min',
  step = 'step',
  tooltip = 'tooltip',
  scale = 'scale',
  orientation = 'orientation',
  range = 'range',
}
type Inputs = { [key in KeyInputs]: HTMLInputElement | null };

class Config {
  private slider: SliderPlugin;

  private inputs: Inputs;

  private container: HTMLDivElement;

  constructor(slider: SliderPlugin, container: HTMLDivElement) {
    this.slider = slider;
    this.container = container;
    this.inputs = this.findElements();
    this.initInputs();
  }

  private initInputs(): void {
    this.updateValues();
    this.subscribeInputs();
    this.bindListeners();
  }

  private findElements(): Inputs {
    const firstPoint: HTMLInputElement | null =
      this.container.querySelector('[name=firstPoint]');
    const secondPoint: HTMLInputElement | null =
      this.container.querySelector('[name=secondPoint]');
    const max: HTMLInputElement | null = this.container.querySelector('[name=max]');
    const min: HTMLInputElement | null = this.container.querySelector('[name=min]');
    const step: HTMLInputElement | null = this.container.querySelector('[name=step]');
    const tooltip: HTMLInputElement | null =
      this.container.querySelector('[name=tooltip]');
    const scale: HTMLInputElement | null = this.container.querySelector('[name=scale]');
    const orientation: HTMLInputElement | null =
      this.container.querySelector('[name=orientation]');
    const range: HTMLInputElement | null = this.container.querySelector('[name=range]');

    this.inputs = {
      firstPoint,
      secondPoint,
      max,
      min,
      step,
      tooltip,
      scale,
      orientation,
      range,
    };
    return this.inputs;
  }

  private updateValues = (): void => {
    const config = this.slider.getConfig();
    const {
      firstPoint,
      secondPoint,
      min,
      max,
      step,
      tooltip,
      scale,
      orientation,
      range,
    } = this.inputs;
    if (firstPoint) firstPoint.value = `${config.firstValue}`;
    if (tooltip) tooltip.checked = config.hasTooltip;
    if (scale) scale.checked = config.hasScale;
    if (range) range.checked = config.isRange;
    if (orientation) orientation.checked = config.isHorizontal;
    if (step) step.value = `${config.step}`;
    if (min) min.value = `${config.min}`;
    if (max) max.value = `${config.max}`;
    if (secondPoint && config.isRange) {
      secondPoint.value = `${config.secondValue}`;
      secondPoint.removeAttribute('disabled');
    } else if (secondPoint) {
      secondPoint.setAttribute('disabled', 'true');
    }
  };

  private subscribeInputs(): void {
    this.slider.subscribe(EventTypes.updatePoint, this.updateValues);
    this.slider.subscribe(EventTypes.configChanged, this.updateValues);
  }

  private bindListeners(): void {
    const {
      firstPoint,
      secondPoint,
      min,
      max,
      step,
      tooltip,
      scale,
      orientation,
      range,
    } = this.inputs;
    if (firstPoint) firstPoint.addEventListener('change', this.handleFirstPointChange);
    if (secondPoint) secondPoint.addEventListener('change', this.handleSecondPointChange);
    if (min) min.addEventListener('change', this.handleMinChange);
    if (max) max.addEventListener('change', this.handleMaxChange);
    if (step) step.addEventListener('change', this.handleStepChange);
    if (tooltip) tooltip.addEventListener('change', this.handleTooltipChange);
    if (scale) scale.addEventListener('change', this.handleScaleChange);
    if (orientation) orientation.addEventListener('change', this.handleOrientationChange);
    if (range) range.addEventListener('change', this.handleRangeChange);
  }

  private handleFirstPointChange = (): void => {
    if (this.inputs.firstPoint)
      this.slider.setValue('firstPoint', this.inputs.firstPoint.valueAsNumber);
  };

  private handleSecondPointChange = (): void => {
    if (this.inputs.secondPoint)
      this.slider.setValue('secondPoint', this.inputs.secondPoint.valueAsNumber);
  };

  private handleMinChange = (): void => {
    if (this.inputs.min) this.slider.updateConfig({ min: this.inputs.min.valueAsNumber });
  };

  private handleMaxChange = (): void => {
    if (this.inputs.max) this.slider.updateConfig({ max: Number(this.inputs.max.value) });
  };

  private handleStepChange = (): void => {
    if (this.inputs.step)
      this.slider.updateConfig({ step: Number(this.inputs.step.value) });
  };

  private handleTooltipChange = (): void => {
    this.slider.updateConfig({ hasTooltip: !this.slider.getConfig().hasTooltip });
  };

  private handleScaleChange = (): void => {
    this.slider.updateConfig({ hasScale: !this.slider.getConfig().hasScale });
  };

  private handleOrientationChange = (): void => {
    this.slider.updateConfig({ isHorizontal: !this.slider.getConfig().isHorizontal });
  };

  private handleRangeChange = (): void => {
    this.slider.updateConfig({ isRange: !this.slider.getConfig().isRange });
  };
}
export default Config;
