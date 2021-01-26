class Config {
  slider: any;

  vl: HTMLInputElement;

  vl_2: HTMLInputElement;

  max: HTMLInputElement;

  min: HTMLInputElement;

  step: HTMLInputElement;

  tooltip: HTMLInputElement;

  scale: HTMLInputElement;

  orientation: HTMLInputElement;

  range: HTMLInputElement;

  constructor(slider: any, container: any) {
    this.slider = slider.appSlider;
    this.vl = container.querySelector(".vl");
    this.vl_2 = container.querySelector(".vl_2");
    this.max = container.querySelector("#max");
    this.min = container.querySelector("#min");
    this.step = container.querySelector("#step");
    this.tooltip = container.querySelector("#tooltip");
    this.scale = container.querySelector("#scale");
    this.orientation = container.querySelector("#orientation");
    this.range = container.querySelector("#range");
    this.initInputs();
  }

  initInputs(): void{
    this.vl.value = `${this.slider.presenter.firstButtonValue  }`;
    this.slider.view.field.div.addEventListener("mousemove", () => {
      this.vl.value = `${this.slider.presenter.firstButtonValue  }`;
    });
    this.slider.view.field.div.addEventListener("mouseup", () => {
      this.vl.value = `${this.slider.presenter.firstButtonValue  }`;
    });

    this.vl.addEventListener("input", () => {
      this.slider.presenter.setButtonValue( Number(this.vl.value) );
    });
    if (this.slider.view.isRangeSlider) {
      this.vl_2.value = this.slider.view.flag_2.div.innerHTML;
      this.slider.view.field.div.addEventListener("mousemove", () => {
        this.vl_2.value = `${this.slider.presenter.secondButtonValue  }`;
      });
      this.slider.view.field.div.addEventListener("mouseup", () => {
        this.vl_2.value = `${this.slider.presenter.secondButtonValue  }`;
      });
      this.vl_2.addEventListener("input", () => {
        this.slider.presenter.setButtonValue_2( Number(this.vl_2.value) );
      });
    }

    this.max.value = `${this.slider.model.max  }`;
    this.max.addEventListener("input", () => {
      this.slider.model.max = Number(this.max.value);
      this.slider.presenter.updateScaleValues();
      this.slider.presenter.mouseUp();
      this.slider.presenter.mouseUp_2();
    });
    this.min.value = `${this.slider.model.min  }`;
    this.min.addEventListener("input", () => {
      this.slider.model.min = Number(this.min.value);
      this.slider.presenter.updateScaleValues();
      this.slider.presenter.mouseUp();
      this.slider.presenter.mouseUp_2();
    });
    this.step.value = `${this.slider.model.step  }`;
    this.step.addEventListener("input", () => {
      let value: number = Math.abs(Number(this.step.value));
      if (value === 0) {
        value = 1;
      }
      this.slider.model.step = value;
      this.slider.presenter.mouseUp();
      this.slider.presenter.mouseUp_2();
    });

    this.tooltip.checked = this.slider.view.isFlag;
    this.tooltip.addEventListener("input", () => {
      this.tooltip.checked
        ? this.slider.view.flag.showFlag()
        : this.slider.view.flag.hideFlag();
      if (this.slider.view.flag_2) {
        this.tooltip.checked
          ? this.slider.view.flag_2.showFlag()
          : this.slider.view.flag_2.hideFlag();
      }
    });

    this.scale.checked = this.slider.view.isScale;
    this.scale.addEventListener("input", () => {
      this.scale.checked
        ? this.slider.view.scale.showScale()
        : this.slider.view.scale.hideScale();
    });

    this.orientation.checked = this.slider.view.isHorizontal;
    this.orientation.addEventListener("input", () => {
      this.slider.presenter.changeOrientation();
      this.scale.checked = this.slider.view.isScale;
      this.tooltip.checked = this.slider.view.isFlag;
    });
    this.range.checked = this.slider.view.isRangeSlider;
    this.range.addEventListener("input", () => {
      this.slider.presenter.changeTypeSlider();
      this.scale.checked = this.slider.view.isScale;
      this.tooltip.checked = this.slider.view.isFlag;
    });
  }
}
export default Config