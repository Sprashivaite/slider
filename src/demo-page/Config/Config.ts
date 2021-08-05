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
type Inputs = { [key in KeyInputs]: HTMLInputElement };

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
    const firstPoint = this.container.querySelector('[name=firstPoint]');
    if (firstPoint instanceof HTMLInputElement)
      this.inputs = { ...this.inputs, firstPoint };

    const secondPoint = this.container.querySelector('[name=secondPoint]');
    if (secondPoint instanceof HTMLInputElement)
      this.inputs = { ...this.inputs, secondPoint };

    const max = this.container.querySelector('[name=max]');
    if (max instanceof HTMLInputElement) this.inputs = { ...this.inputs, max };

    const min = this.container.querySelector('[name=min]');
    if (min instanceof HTMLInputElement) this.inputs = { ...this.inputs, min };

    const step = this.container.querySelector('[name=step]');
    if (step instanceof HTMLInputElement) this.inputs = { ...this.inputs, step };

    const tooltip = this.container.querySelector('[name=tooltip]');
    if (tooltip instanceof HTMLInputElement) this.inputs = { ...this.inputs, tooltip };

    const scale = this.container.querySelector('[name=scale]');
    if (scale instanceof HTMLInputElement) this.inputs = { ...this.inputs, scale };

    const orientation = this.container.querySelector('[name=orientation]');
    if (orientation instanceof HTMLInputElement)
      this.inputs = { ...this.inputs, orientation };

    const range = this.container.querySelector('[name=range]');
    if (range instanceof HTMLInputElement) this.inputs = { ...this.inputs, range };

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
    firstPoint.value = `${config.firstValue}`;
    secondPoint.value = `${config.secondValue}`;
    tooltip.checked = config.hasTooltip;
    scale.checked = config.hasScale;
    range.checked = config.isRange;
    orientation.checked = config.isHorizontal;
    step.value = `${config.step}`;
    min.value = `${config.min}`;
    max.value = `${config.max}`;
    if (config.isRange) {
      secondPoint.removeAttribute('disabled');
    } else {
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
    firstPoint.addEventListener('change', this.handleFirstPointChange);
    secondPoint.addEventListener('change', this.handleSecondPointChange);
    min.addEventListener('change', this.handleMinChange);
    max.addEventListener('change', this.handleMaxChange);
    step.addEventListener('change', this.handleStepChange);
    tooltip.addEventListener('change', this.handleTooltipChange);
    scale.addEventListener('change', this.handleScalseChange);
    orientation.addEventListener('change', this.handleOrientationChange);
    range.addEventListener('change', this.handleRangeChange);
  }

  private handleFirstPointChange = (): void => {
    this.slider.setValue('firstPoint', this.inputs.firstPoint.valueAsNumber);
  };

  private handleSecondPointChange = (): void => {
    this.slider.setValue('secondPoint', this.inputs.secondPoint.valueAsNumber);
  };

  private handleMinChange = (): void => {
    this.slider.updateConfig({ min: this.inputs.min.valueAsNumber });
  };

  private handleMaxChange = (): void => {
    this.slider.updateConfig({ max: Number(this.inputs.max.value) });
  };

  private handleStepChange = (): void => {
    this.slider.updateConfig({ step: Number(this.inputs.step.value) });
  };

  private handleTooltipChange = (): void => {
    this.slider.updateConfig({ hasTooltip: !this.slider.getConfig().hasTooltip });
  };

  private handleScalseChange = (): void => {
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
