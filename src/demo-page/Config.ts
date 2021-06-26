import Observer from '../sliderPlugin/Observer/Observer';
import Model from '../sliderPlugin/Model/Model';
import View from '../sliderPlugin/View/View';
import Presenter from '../sliderPlugin/Presenter/Presenter';

class Config extends Observer {
  slider: any;

  vl!: HTMLInputElement;

  vl2!: HTMLInputElement;

  max!: HTMLInputElement;

  min!: HTMLInputElement;

  step!: HTMLInputElement;

  tooltip!: HTMLInputElement;

  scale!: HTMLInputElement;

  orientation!: HTMLInputElement;

  range!: HTMLInputElement;

  container!: any;

  presenter: Presenter;

  view: View;

  model: Model;

  constructor(slider: any, container: Element) {
    super();
    this.slider = slider;
    this.model = slider.model;
    this.view = slider.view;
    this.presenter = slider.presenter;
    this.container = container;
    this.initInputs();
  }

  private initInputs(): void {
    this.findElements();
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
    this.vl = this.container.querySelector('.vl');
    this.vl2 = this.container.querySelector('.vl_2');
    this.max = this.container.querySelector('#max');
    this.min = this.container.querySelector('#min');
    this.step = this.container.querySelector('#step');
    this.tooltip = this.container.querySelector('#tooltip');
    this.scale = this.container.querySelector('#scale');
    this.orientation = this.container.querySelector('#orientation');
    this.range = this.container.querySelector('#range');
  }

  private initFirstValue(): void {
    const updateValue = (value: string) => {
      this.vl.value = value;
      if (Number(this.vl.value) > Number(this.vl2.value))
        this.vl.value = this.vl2.value;
    };
    this.model.subscribe('updateFirstHandleValue', updateValue);
    this.view.updateModel();
    const setHandleValue = () => {
      this.model.moveToValue({
        value: Number(this.vl.value),
        ...this.view.handler.getFirstHandleData(),
      });
      this.view.updateModel();
    };
    this.vl.addEventListener('change', setHandleValue);
  }

  private initSecondValue(): void {
    const updateValue = (value: string) => {
      this.vl2.value = value;
      if (Number(this.vl2.value) < Number(this.vl.value))
        this.vl2.value = this.vl.value;
    };
    if (!this.view.config.isRangeSlider) {
      this.vl2.setAttribute('disabled', 'true');
      return;
    }
    if (this.view.config.isRangeSlider) this.vl2.removeAttribute('disabled');

    this.model.subscribe('updateSecondHandleValue', updateValue);
    this.view.updateModel();
    const setHandleValue = () => {
      this.model.moveToValue({
        value: Number(this.vl2.value),
        ...this.view.handler.getSecondHandleData(),
      });
      this.view.updateModel();
    };
    this.vl2.addEventListener('change', setHandleValue);
  }

  private initMinValue(): void {
    this.min.value = `${this.model.config.min}`;
    const minChanged = () => {
      this.model.setConfig({ min: Number(this.min.value) });
      this.step.value = `${this.model.config.step}`;
      this.min.value = `${this.model.config.min}`;
      this.max.value = `${this.model.config.max}`;
      this.view.updateModel();
      this.initSecondValue();
    };
    this.min.addEventListener('change', minChanged);
  }

  private initMaxValue(): void {
    this.max.value = `${this.model.config.max}`;
    const maxChanged = () => {
      this.model.setConfig({ max: Number(this.max.value) });
      this.step.value = `${this.model.config.step}`;
      this.min.value = `${this.model.config.min}`;
      this.max.value = `${this.model.config.max}`;
      this.view.updateModel();
      this.initSecondValue();
    };
    this.max.addEventListener('change', maxChanged);
  }

  private initStep(): void {
    this.step.value = `${this.model.config.step}`;
    const stepChanged = () => {
      this.model.setConfig({ step: Number(this.step.value) });
      this.step.value = `${this.model.config.step}`;
      this.view.updateModel();
      this.initSecondValue();
    };
    this.step.addEventListener('change', stepChanged);
  }

  private initTooltip(): void {
    this.tooltip.checked = this.view.config.isTooltip;
    const tooltipChanged = () => {
      this.slider.setConfig({isTooltip: !this.view.config.isTooltip})
      this.initSecondValue();
    };
    this.tooltip.addEventListener('change', tooltipChanged);
  }

  private initScale(): void {
    this.scale.checked = this.view.config.isScale;
    const scaleChanged = () => {
      this.slider.setConfig({isScale: !this.view.config.isScale})
    };
    this.scale.addEventListener('change', scaleChanged);
  }

  private initOrientation(): void {
    this.orientation.checked = this.view.config.isHorizontal;
    const orientationChanged = () => {
      this.slider.setConfig({isHorizontal: !this.view.config.isHorizontal})
      this.initSecondValue();
    };
    this.orientation.addEventListener('change', orientationChanged);
  }

  private initRange(): void {
    this.range.checked = this.view.config.isRangeSlider;
    const rangeChanged = () => {
      this.slider.setConfig({isRangeSlider: !this.view.config.isRangeSlider})
      this.initSecondValue();
    };
    this.range.addEventListener('change', rangeChanged);
  }


}
export default Config;
