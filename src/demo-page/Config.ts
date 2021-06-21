import Observer from '../Observer/Observer';
import Model from '../Model/Model'
import View from '../View/View'
import Presenter from '../Presenter/Presenter'

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
  
  scaleQuantity: any;

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
    this.scaleQuantity = this.container.querySelector('#scaleQuantity');    
    this.tooltip = this.container.querySelector('#tooltip');
    this.scale = this.container.querySelector('#scale');
    this.orientation = this.container.querySelector('#orientation');
    this.range = this.container.querySelector('#range');
  }

  initValue1(): void {
    const updateValue = (value: string) => {
      this.vl.value = value;
    };
    this.model.subscribe('updateFirstButtonValue', updateValue);
    this.view.updateModel();
    const setButtonValue = () => {
      if (Number(this.vl.value) > Number(this.max.value))
        this.vl.value = this.max.value;
      if (Number(this.vl.value) < Number(this.min.value))
        this.vl.value = this.min.value;
      this.model.moveToValue({
        value: Number(this.vl.value),
        ...this.view.handler.getFirstButtonData(),
      });
      this.view.updateModel();
    };
    this.vl.addEventListener('change', setButtonValue);
  }

  initValue2(): void {
    const updateValue = (value: string) => {
      this.vl2.value = value;
    };
    if(!this.view.config.isRangeSlider) {
      this.vl2.setAttribute('disabled', 'true')
      return
    }
    if(this.view.config.isRangeSlider) this.vl2.removeAttribute('disabled')

    this.model.subscribe('updateSecondButtonValue', updateValue);
    this.view.updateModel();
    const setButtonValue = () => {
      if (Number(this.vl2.value) > Number(this.max.value))
        this.vl2.value = this.max.value;
      if (Number(this.vl2.value) < Number(this.min.value))
        this.vl.value = this.min.value;
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
      this.model.setConfig({min: Number(this.min.value)})      
      this.step.value = `${this.model.config.step}`;
      this.min.value = `${this.model.config.min}`;
      this.max.value = `${this.model.config.max}`;   
      
      this.scaleQuantity.value = `${this.model.config.scaleQuantity}`;
      this.view.updateModel();
      this.initValue2()
    };
    this.min.addEventListener('change', minChanged);
  }

  initMaxValue(): void {
    this.max.value = `${this.model.config.max}`;
    const maxChanged = () => {
      this.model.setConfig({max: Number(this.max.value)})      
      this.step.value = `${this.model.config.step}`; 
      this.min.value = `${this.model.config.min}`;  
      this.max.value = `${this.model.config.max}`;   
      
      this.scaleQuantity.value = `${this.model.config.scaleQuantity}`;
      this.view.updateModel();
      this.initValue2()
    };
    this.max.addEventListener('change', maxChanged);
  }

  initStep(): void {
    this.step.value = `${this.model.config.step}`;
    const stepChanged = () => {
      this.model.setConfig({step: Number(this.step.value)})
      this.step.value = `${this.model.config.step}`;
      
      this.scaleQuantity.value = `${this.model.config.scaleQuantity}`;
      this.view.updateModel();
      this.initValue2()
    };
    this.step.addEventListener('change', stepChanged);
  }

  initScaleQuantity(): void {
    this.scaleQuantity.value = `${this.model.config.scaleQuantity}`;
    const scaleChanged = () => {
      this.model.setConfig({scaleQuantity: Number(this.scaleQuantity.value)})
      
      
      this.scaleQuantity.value = `${this.model.config.scaleQuantity}`;
      this.view.updateModel();
      this.initValue2()
    };
    this.scaleQuantity.addEventListener('change', scaleChanged);
  }

  initTooltipe(): void {
    this.tooltip.checked = this.view.config.isFlag;
    const tooltipChanged = () => {
      if (this.tooltip.checked) {
        this.view.firstFlag.showFlag();
        this.view.config.isFlag = !this.view.config.isFlag;
      } else {
        this.view.firstFlag.hideFlag();
        this.view.config.isFlag = !this.view.config.isFlag;
      }
      if (this.view.secondFlag) {
        if (this.tooltip.checked) {
          this.view.secondFlag.showFlag();
        } else {
          this.view.secondFlag.hideFlag();
          this.view.flagTotal.hideFlag();
        }
      } 
    };
    this.tooltip.addEventListener('change', tooltipChanged);
  }

  initScale(): void {
    this.scale.checked = this.view.config.isScale;
    const scaleChanged = () => {
      if (this.scale.checked) {
        this.view.scale.showScale();
        this.view.config.isScale = !this.view.config.isScale;
      } else {
        this.view.scale.hideScale();
        this.view.config.isScale = !this.view.config.isScale;
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
      this.initValue2()
    };
    this.range.addEventListener('change', rangeChanged);
  }

  initInputs(): void {
    this.findElements();
    this.initValue1();
    this.initValue2();
    this.initMinValue();
    this.initMaxValue();
    this.initStep();
    this.initScaleQuantity();
    this.initTooltipe();
    this.initScale();
    this.initOrientation();
    this.initRange();
  }
}
export default Config;
