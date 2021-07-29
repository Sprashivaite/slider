import SliderPlugin from '../slider/SliderPlugin/SliderPlugin';
import { EventTypes } from '../slider/types';

class Config {
  private slider: SliderPlugin;

  private firstPoint: HTMLInputElement;

  private secondPoint: HTMLInputElement;

  private max: HTMLInputElement;

  private min: HTMLInputElement;

  private step: HTMLInputElement;

  private tooltip: HTMLInputElement;

  private scale: HTMLInputElement;

  private orientation: HTMLInputElement;

  private range: HTMLInputElement;

  private container: HTMLElement;

  constructor(slider: JQuery<HTMLElement>, container: HTMLElement) {
    this.slider = slider.data('sliderPlugin');
    this.container = container;
    this.initInputs();
  }

  private initInputs(): void {
    this.findElements();
    this.updateValues();
    this.subscribeInputs();
    this.bindListeners();
  }

  private findElements(): void {
    this.firstPoint = <HTMLInputElement>this.container.querySelector('[name=firstPoint]');
    this.secondPoint = <HTMLInputElement>(
      this.container.querySelector('[name=secondPoint]')
    );
    this.max = <HTMLInputElement>this.container.querySelector('[name=max]');
    this.min = <HTMLInputElement>this.container.querySelector('[name=min]');
    this.step = <HTMLInputElement>this.container.querySelector('[name=step]');
    this.tooltip = <HTMLInputElement>this.container.querySelector('[name=tooltip]');
    this.scale = <HTMLInputElement>this.container.querySelector('[name=scale]');
    this.orientation = <HTMLInputElement>(
      this.container.querySelector('[name=orientation]')
    );
    this.range = <HTMLInputElement>this.container.querySelector('[name=range]');
  }

  private updateValues(): void {
    const config = this.slider.getConfig();
    this.firstPoint.value = `${config.firstValue}`;
    this.secondPoint.value = `${config.secondValue}`;
    this.tooltip.checked = config.hasTooltip;
    this.scale.checked = config.hasScale;
    this.range.checked = config.isRange;
    this.orientation.checked = config.isHorizontal;
    this.step.value = `${config.step}`;
    this.min.value = `${config.min}`;
    this.max.value = `${config.max}`;
    if (config.isRange) {
      this.secondPoint.removeAttribute('disabled');
    } else {
      this.secondPoint.setAttribute('disabled', 'true');
    }
  }

  private subscribeInputs(): void {
    this.slider.subscribe(EventTypes.configChanged, this.updateValues.bind(this));
    this.slider.subscribe(EventTypes.updatePoint, this.updateValues.bind(this));
  }

  private bindListeners(): void {
    this.firstPoint.addEventListener('change', this.handleFirstPointChange.bind(this));
    this.secondPoint.addEventListener('change', this.handleSecondPointChange.bind(this));
    this.min.addEventListener('change', this.handleMinChange.bind(this));
    this.max.addEventListener('change', this.handleMaxChange.bind(this));
    this.step.addEventListener('change', this.handleStepChange.bind(this));
    this.tooltip.addEventListener('change', this.handleTooltipChange.bind(this));
    this.scale.addEventListener('change', this.handleScalseChange.bind(this));
    this.orientation.addEventListener('change', this.handleOrientationChange.bind(this));
    this.range.addEventListener('change', this.handleRangeChange.bind(this));
  }

  private handleFirstPointChange(): void {
    this.slider.setValue('firstPoint', this.firstPoint.valueAsNumber);
  }

  private handleSecondPointChange(): void {
    this.slider.setValue('secondPoint', this.secondPoint.valueAsNumber);
  }

  private handleMinChange(): void {
    this.slider.updateConfig({ min: this.min.valueAsNumber });
  }

  private handleMaxChange(): void {
    this.slider.updateConfig({ max: Number(this.max.value) });
  }

  private handleStepChange(): void {
    this.slider.updateConfig({ step: Number(this.step.value) });
  }

  private handleTooltipChange(): void {
    this.slider.updateConfig({ hasTooltip: !this.slider.getConfig().hasTooltip });
  }

  private handleScalseChange(): void {
    this.slider.updateConfig({ hasScale: !this.slider.getConfig().hasScale });
  }

  private handleOrientationChange(): void {
    this.slider.updateConfig({ isHorizontal: !this.slider.getConfig().isHorizontal });
  }

  private handleRangeChange(): void {
    this.slider.updateConfig({ isRange: !this.slider.getConfig().isRange });
  }
}
export default Config;
