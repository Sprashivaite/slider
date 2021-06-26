import Observer from '../sliderPlugin/Observer/Observer';
import Model from '../sliderPlugin/Model/Model';
import View from '../sliderPlugin/View/View';
import Presenter from '../sliderPlugin/Presenter/Presenter';

class Config extends Observer {
  slider: any;

  firstHandle!: HTMLInputElement;

  secondHandle!: HTMLInputElement;

  max!: HTMLInputElement;

  min!: HTMLInputElement;

  step!: HTMLInputElement;

  tooltip!: HTMLInputElement;

  scale!: HTMLInputElement;

  orientation!: HTMLInputElement;

  range!: HTMLInputElement;

  container!: any;

  constructor(slider: any, container: Element) {
    super();
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
    this.firstHandle = this.container.querySelector('[name=firstHandle]');
    this.secondHandle = this.container.querySelector('[name=secondHandle]');
    this.max = this.container.querySelector('[name=max]');
    this.min = this.container.querySelector('[name=min]');
    this.step = this.container.querySelector('[name=step]');
    this.tooltip = this.container.querySelector('[name=tooltip]');
    this.scale = this.container.querySelector('[name=scale]');
    this.orientation = this.container.querySelector('[name=orientation]');
    this.range = this.container.querySelector('[name=range]');
  }

  private initFirstValue(): void {
    const updateValue = (value: string) => {
      this.firstHandle.value = value;
    };
    this.slider.subscribe('updateFirstHandleValue', updateValue);
    const setHandleValue = () => {
      this.slider.setValue('firstHandle', this.firstHandle.valueAsNumber)
    };
    this.firstHandle.addEventListener('change', setHandleValue);
  }

  private initSecondValue(): void {
    const updateValue = (value: string) => {
      this.secondHandle.value = value;
    };
    if (!this.slider.getConfig().isRangeSlider) {
      this.secondHandle.setAttribute('disabled', 'true');
      return;
    }
    if (this.slider.getConfig().isRangeSlider) this.secondHandle.removeAttribute('disabled');
    this.slider.subscribe('updateSecondHandleValue', updateValue);    
    const setHandleValue = () => {
      this.slider.setValue('secondHandle', this.secondHandle.valueAsNumber)
    };
    this.secondHandle.addEventListener('change', setHandleValue);
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
      this.slider.setConfig({isTooltip: !this.slider.getConfig().isTooltip})
      this.updateInputs()
    };
    this.tooltip.addEventListener('change', tooltipChanged);
  }

  private initScale(): void {
    const scaleChanged = () => {
      this.slider.setConfig({isScale: !this.slider.getConfig().isScale})
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
    this.tooltip.checked = this.slider.getConfig().isTooltip;
    this.scale.checked = this.slider.getConfig().isScale;
    this.range.checked = this.slider.getConfig().isRangeSlider;
    this.orientation.checked = this.slider.getConfig().isHorizontal;
    this.step.value = `${this.slider.getConfig().step}`;
    this.min.value = `${this.slider.getConfig().min}`;
    this.max.value = `${this.slider.getConfig().max}`;
    this.initSecondValue();
  }

}
export default Config;
