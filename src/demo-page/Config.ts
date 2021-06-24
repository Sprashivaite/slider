import Observer from '../Observer/Observer';
import Model from '../Model/Model';
import View from '../View/View';
import Presenter from '../Presenter/Presenter';

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

  findElements(): void {
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

  initFirstValue(): void {
    const updateValue = (value: string) => {
      this.vl.value = value;
      if (Number(this.vl.value) > Number(this.vl2.value))
        this.vl.value = this.vl2.value;
    };
    this.model.subscribe('updateFirstButtonValue', updateValue);
    this.view.updateModel();
    const setButtonValue = () => {
      this.model.moveToValue({
        value: Number(this.vl.value),
        ...this.view.handler.getFirstButtonData(),
      });
      this.view.updateModel();
    };
    this.vl.addEventListener('change', setButtonValue);
  }

  initSecondValue(): void {
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

    this.model.subscribe('updateSecondButtonValue', updateValue);
    this.view.updateModel();
    const setButtonValue = () => {
      this.model.moveToValue({
        value: Number(this.vl2.value),
        ...this.view.handler.getSecondButtonData(),
      });
      this.view.updateModel();
    };
    this.vl2.addEventListener('change', setButtonValue);
  }

  initMinValue(): void {
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

  initMaxValue(): void {
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

  initStep(): void {
    this.step.value = `${this.model.config.step}`;
    const stepChanged = () => {
      this.model.setConfig({ step: Number(this.step.value) });
      this.step.value = `${this.model.config.step}`;
      this.view.updateModel();
      this.initSecondValue();
    };
    this.step.addEventListener('change', stepChanged);
  }

  initTooltip(): void {
    this.tooltip.checked = this.view.config.isFlag;
    const tooltipChanged = () => {
      this.view.removeElements();
      this.view.config.isFlag = !this.view.config.isFlag;
      this.view.renderElements();
      this.view.addHandlers();
      this.presenter.subscribeListeners();
      this.initSecondValue();
    };
    this.tooltip.addEventListener('change', tooltipChanged);
  }

  initScale(): void {
    this.scale.checked = this.view.config.isScale;
    const scaleChanged = () => {
      this.view.config.isScale = !this.view.config.isScale;
      if (this.scale.checked) {
        this.view.scale.showScale();
      } else {
        this.view.scale.hideScale();
      }
    };
    this.scale.addEventListener('change', scaleChanged);
  }

  initOrientation(): void {
    this.orientation.checked = this.view.config.isHorizontal;
    const orientationChanged = () => {
      this.view.removeElements();
      this.view.config.isHorizontal = !this.view.config.isHorizontal;
      this.view.renderElements();
      this.view.addHandlers();
      this.presenter.subscribeListeners();
      this.initSecondValue();
    };
    this.orientation.addEventListener('change', orientationChanged);
  }

  initRange(): void {
    this.range.checked = this.view.config.isRangeSlider;
    const rangeChanged = () => {
      this.view.removeElements();
      this.view.config.isRangeSlider = !this.view.config.isRangeSlider;
      this.view.renderElements();
      this.view.addHandlers();
      this.presenter.subscribeListeners();
      this.initSecondValue();
    };
    this.range.addEventListener('change', rangeChanged);
  }

  initInputs(): void {
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
}
export default Config;
