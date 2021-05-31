class Config {
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

  constructor(slider: any, container: Element) {
    this.slider = slider.appSlider;
    this.container = container;
    this.initInputs();
  }

  findElements() {
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

  initInputs(): void {
    this.findElements();

    this.vl.value = `${this.slider.presenter.buttonValue1}`;
    const changeButtonValue = () => {
      this.vl.value = `${this.slider.presenter.buttonValue1}`;
    };
    const setButtonValue = () => {
      if (Number(this.vl.value) > Number(this.max.value)) this.vl.value = this.max.value
      this.slider.presenter.setButtonValue(Number(this.vl.value));
    };
    document.addEventListener("mousemove", changeButtonValue);
    document.addEventListener("click", changeButtonValue);
    this.vl.addEventListener("input", setButtonValue);

    const setButtonValue2 = () => {
    if (this.slider.view.config.isRangeSlider) {
      this.vl2.value = `${this.slider.presenter.buttonValue2}`;
      const setValue = () => {
        if (Number(this.vl2.value) > Number(this.max.value)) this.vl2.value = this.max.value
        this.slider.presenter.setButtonValue2(Number(this.vl2.value));
      };
      const changeValue = () => {
        this.vl2.value = `${this.slider.presenter.buttonValue2}`;
      };
      document.addEventListener("mousemove", changeValue);
      document.addEventListener("click", changeValue);
      this.vl2.addEventListener("input", setValue);
    }
}
    setButtonValue2()
    this.max.value = `${this.slider.model.max}`;
    const maxChanged = () => {
      this.slider.model.max = Number(this.max.value);
      this.slider.presenter.updateScaleValues();
      this.slider.presenter.mouseUp();
      this.slider.presenter.mouseUp2();
      this.vl.value = `${this.slider.presenter.buttonValue1}`;
      this.vl2.value = `${this.slider.presenter.buttonValue2}`;
    };
    this.max.addEventListener("input", maxChanged);

    this.min.value = `${this.slider.model.min}`;
    const minChanged = () => {
      if (this.min.value > this.slider.model.max) this.min.value = this.slider.model.max
      this.slider.model.min = Number(this.min.value);
      this.slider.presenter.updateScaleValues();
      this.slider.presenter.mouseUp();
      this.slider.presenter.mouseUp2();
      this.vl.value = `${this.slider.presenter.buttonValue1}`;
      this.vl2.value = `${this.slider.presenter.buttonValue2}`;
    };
    this.min.addEventListener("input", minChanged);

    this.step.value = `${this.slider.model.step}`;
    const stepChanged = () => {
      let value: number = Math.abs(Number(this.step.value));
      if (value === 0) {
        value = 1;
      }
      this.slider.model.step = value;
      this.slider.presenter.updateScaleValues();
      this.slider.presenter.mouseUp();
      this.slider.presenter.mouseUp2();
      this.vl.value = `${this.slider.presenter.buttonValue1}`;
      this.vl2.value = `${this.slider.presenter.buttonValue2}`;
    };
    this.step.addEventListener("input", stepChanged);

    this.tooltip.checked = this.slider.view.config.isFlag;
    const tooltipChanged = () => {
      if (this.tooltip.checked) this.slider.view.flag1.showFlag();
      else this.slider.view.flag1.hideFlag();
      if (this.slider.view.flag2) {
        if (this.tooltip.checked) this.slider.view.flag2.showFlag();
        else this.slider.view.flag2.hideFlag();
      }
    };
    this.tooltip.addEventListener("input", tooltipChanged);

    this.scale.checked = this.slider.view.config.isScale;
    const scaleChanged = () => {
      if (this.scale.checked) this.slider.view.scale.showScale();
      else this.slider.view.scale.hideScale();
    };
    this.scale.addEventListener("input", scaleChanged);

    this.orientation.checked = this.slider.view.config.isHorizontal;
    const orientationChanged = () => {
      this.slider.presenter.changeOrientation();
      this.scale.checked = this.slider.view.config.isScale;
      this.tooltip.checked = this.slider.view.config.isFlag;
    };
    this.orientation.addEventListener("input", orientationChanged);

    this.range.checked = this.slider.view.config.isRangeSlider;
    const rangeChanged = () => {
      this.slider.presenter.changeTypeSlider();
      this.scale.checked = this.slider.view.config.isScale;
      this.tooltip.checked = this.slider.view.config.isFlag;
      setButtonValue2();
    };
    this.range.addEventListener("input", rangeChanged);
  }

  // changeOrientation(): void {
  //   this.view.removeElements();
  //   this.model.config.isHorizontal = !this.model.config.isHorizontal;
  //   this.view.config.isHorizontal = !this.view.config.isHorizontal;
  //   this.view.renderElements();
  //   this.view.handler.getMouseCoords();
  //   this.view.handler.addFieldHandler();
  //   this.updateScaleValues();
  //   if (this.view.config.isRangeSlider) {
  //     this.mouseUp2();
  //   }
  // }

  // changeTypeSlider(): void {
  //   this.view.removeElements();
  //   this.view.config.isRangeSlider = !this.view.config.isRangeSlider;
  //   this.view.renderElements();
  //   this.view.handler.getMouseCoords();
  //   this.view.handler.addFieldHandler();
  //   this.updateScaleValues();
  //   if (this.view.config.isRangeSlider) {
  //     this.mouseUp2();
  //   }
  // }
}
export default Config;
