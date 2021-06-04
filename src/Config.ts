import Observer from "./Observer/Observer";

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

  presenter: any;

  view: any;

  model: any;

  constructor(slider: any, container: Element) {
    super()
    this.model = slider.appSlider.model;
    this.view = slider.appSlider.view;
    this.presenter = slider.appSlider.presenter;
    this.container = container;
    this.initInputs();
  }

  findElements(): void {
    this.vl = this.container.querySelector(".vl");
    this.vl2 = this.container.querySelector(".vl_2");
    this.max = this.container.querySelector("#max");
    this.min = this.container.querySelector("#min");
    this.step = this.container.querySelector("#step");
    this.tooltip = this.container.querySelector("#tooltip");
    this.scale = this.container.querySelector("#scale");
    this.orientation = this.container.querySelector("#orientation");
    this.range = this.container.querySelector("#range");
  }

  initValue1(): void {
    const updateValue = (value: any) => {this.vl.value = value}    
    this.model.subscribe("updateButtonValue", updateValue)
    
    const setButtonValue = () => {
      if (Number(this.vl.value) > Number(this.max.value)) this.vl.value = this.max.value
      this.model.moveToValue({value: Number(this.vl.value), button: this.view.button1.div});
    };    
    this.vl.addEventListener("input", setButtonValue);
  }

  initValue2(): void {
    const updateValue = (value: any) => {this.vl2.value = value}    
    this.model.subscribe("updateButtonValue2", updateValue)
    
    const setButtonValue = () => {
      if (Number(this.vl2.value) > Number(this.max.value)) this.vl2.value = this.max.value
      this.model.moveToValue({value: Number(this.vl2.value), button: this.view.button2.div});
    };    
    this.vl2.addEventListener("input", setButtonValue);
  }

  initMinValue(): void {
    this.min.value = `${this.model.config.min}`;
    const minChanged = () => {
      if (this.min.value > this.model.config.max) this.min.value = this.model.config.max
      this.model.config.min = Number(this.min.value);
      this.view.updateModel()
    };
    this.min.addEventListener("input", minChanged);
  }

  initMaxValue(): void {
    this.max.value = `${this.model.config.max}`;
    const maxChanged = () => {
      this.model.config.max = Number(this.max.value);
      this.view.updateModel()
    };
    this.max.addEventListener("input", maxChanged);
  }

  initStep(): void {
    this.step.value = `${this.model.config.step}`;
    const stepChanged = () => {
      let value: number = Math.abs(Number(this.step.value));
      if (value === 0) {
        value = 1;
      }
      this.model.config.step = value;
      this.view.updateModel()
    };
    this.step.addEventListener("input", stepChanged);
  }

  initTooltipe(): void {
    this.tooltip.checked = this.view.config.isFlag;
    const tooltipChanged = () => {
      if(this.tooltip.checked) {
        this.view.flag1.showFlag()
        this.view.config.isFlag = !this.view.config.isFlag;
      } else { 
        this.view.flag1.hideFlag();    
        this.view.config.isFlag = !this.view.config.isFlag;
      }
      if (this.view.flag2) {
        if(this.tooltip.checked) {
          this.view.flag2.showFlag()
        } else { 
          this.view.flag2.hideFlag();    
        }
      }
    };
    this.tooltip.addEventListener("input", tooltipChanged);
  }

  initScale(): void {
    this.scale.checked = this.view.config.isScale;
    const scaleChanged = () => {
      if (this.scale.checked) {
        this.view.scale.showScale();
        this.view.config.isScale = !this.view.config.isScale
      }
      else {
        this.view.scale.hideScale();
        this.view.config.isScale = !this.view.config.isScale
      }
    };
    this.scale.addEventListener("input", scaleChanged);
  }

  initOrientation(): void {
    this.orientation.checked = this.view.config.isHorizontal;
    const orientationChanged = () => {
      this.view.removeElements();
      this.model.config.isHorizontal = !this.model.config.isHorizontal;
      this.view.config.isHorizontal = !this.view.config.isHorizontal;
      this.view.renderElements();
      this.view.addHandlers();
      this.presenter.subscribeListeners();
    };
    this.orientation.addEventListener("input", orientationChanged);
  }

  initRange(): void{
    this.range.checked = this.view.config.isRangeSlider;
    const rangeChanged = () => {
      this.view.removeElements();
      this.view.config.isRangeSlider = !this.view.config.isRangeSlider;
      this.view.renderElements();
      this.view.addHandlers();
      this.presenter.subscribeListeners();
    };
    this.range.addEventListener("input", rangeChanged);
  }

  initInputs(): void {
    this.findElements();
    this.initValue1();
    this.initValue2();
    this.initMinValue()
    this.initMaxValue()
    this.initStep()
    this.initTooltipe();
    this.initScale();
    this.initOrientation();
    this.initRange()
  }

}
export default Config;
