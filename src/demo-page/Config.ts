import SliderPlugin from '../slider/SliderPlugin/SliderPlugin';
import { pointData } from '../slider/types';

class Config {
  private slider: SliderPlugin;

  private firstPoint!: HTMLInputElement;

  private secondPoint!: HTMLInputElement;

  private max!: HTMLInputElement;

  private min!: HTMLInputElement;

  private step!: HTMLInputElement;

  private tooltip!: HTMLInputElement;

  private scale!: HTMLInputElement;

  private orientation!: HTMLInputElement;

  private range!: HTMLInputElement;

  private container!: HTMLElement;

  constructor(slider: SliderPlugin, container: HTMLElement) {
    this.slider = slider;
    this.container = container;
    this.initInputs();
  }

  private initInputs(): void {
    this.findElements();
    this.updateInputs()
    this.initFirstValue();
    this.initSecondValue();
    this.initMinValue();
    this.initMaxValue();
    this.initStep();
    this.initTooltip();
    this.initScale();
    this.initOrientation();
    this.initRange();
  }

  private findElements(): void {
    this.firstPoint = this.container.querySelector('[name=firstPoint]')!;
    this.secondPoint = this.container.querySelector('[name=secondPoint]')!;
    this.max = this.container.querySelector('[name=max]')!;
    this.min = this.container.querySelector('[name=min]')!;
    this.step = this.container.querySelector('[name=step]')!;
    this.tooltip = this.container.querySelector('[name=tooltip]')!;
    this.scale = this.container.querySelector('[name=scale]')!;
    this.orientation = this.container.querySelector('[name=orientation]')!;
    this.range = this.container.querySelector('[name=range]')!;
  }

  private initFirstValue(): void {
    const updateValue = (data: pointData) => {
      const { value, pointName } = data
      if(pointName === 'firstPoint') this.firstPoint.value = `${value}`;      
    };
    this.slider.subscribe('updatePoint', updateValue);
    const setPointValue = () => {
      this.slider.setValue('firstPoint', this.firstPoint.valueAsNumber)
    };
    this.firstPoint.addEventListener('change', setPointValue);
  }

  private initSecondValue(): void {
    if (!this.slider.getConfig().isRangeSlider) {
      this.secondPoint.setAttribute('disabled', 'true');
      return;
    }
    const updateValue = (data: pointData) => {
      const { value, pointName } = data
      if(pointName === 'secondPoint') this.secondPoint.value = `${value}`;
    };    
    if (this.slider.getConfig().isRangeSlider) this.secondPoint.removeAttribute('disabled');
    this.slider.subscribe('updatePoint', updateValue);    
    const setPointValue = () => {
      this.slider.setValue('secondPoint', this.secondPoint.valueAsNumber)
    };
    this.secondPoint.addEventListener('change', setPointValue);
  }

  private initMinValue(): void {
    const minChanged = () => {
      this.slider.setConfig({ min: this.min.valueAsNumber });
      this.updateInputs()
    };
    this.min.addEventListener('change', minChanged);
  }

  private initMaxValue(): void {
    const maxChanged = () => {
      this.slider.setConfig({ max: Number(this.max.value) });
      this.updateInputs()
    };
    this.max.addEventListener('change', maxChanged);
  }

  private initStep(): void {
    const stepChanged = () => {
      this.slider.setConfig({ step: Number(this.step.value) });
      this.updateInputs()
    };
    this.step.addEventListener('change', stepChanged);
  }

  private initTooltip(): void {
    const tooltipChanged = () => {
      this.slider.setConfig({hasTooltip: !this.slider.getConfig().hasTooltip})
      this.updateInputs()
    };
    this.tooltip.addEventListener('change', tooltipChanged);
  }

  private initScale(): void {
    const scaleChanged = () => {
      this.slider.setConfig({hasScale: !this.slider.getConfig().hasScale})
      this.updateInputs()
    };
    this.scale.addEventListener('change', scaleChanged);
  }

  private initOrientation(): void {
    const orientationChanged = () => {
      this.slider.setConfig({isHorizontal: !this.slider.getConfig().isHorizontal})
      this.updateInputs()
    };
    this.orientation.addEventListener('change', orientationChanged);
  }

  private initRange(): void {
    const rangeChanged = () => {
      this.slider.setConfig({isRangeSlider: !this.slider.getConfig().isRangeSlider})
      this.updateInputs()
    };
    this.range.addEventListener('change', rangeChanged);
  }

  private updateInputs(): void {
    this.tooltip.checked = this.slider.getConfig().hasTooltip;
    this.scale.checked = this.slider.getConfig().hasScale;
    this.range.checked = this.slider.getConfig().isRangeSlider;
    this.orientation.checked = this.slider.getConfig().isHorizontal;
    this.step.value = `${this.slider.getConfig().step}`;
    this.min.value = `${this.slider.getConfig().min}`;
    this.max.value = `${this.slider.getConfig().max}`;
    this.initSecondValue();
  }

}
export default Config;
