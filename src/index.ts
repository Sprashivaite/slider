let slider = $(".slider").sliderPlugin().data("sliderPlugin");


let vl: HTMLInputElement = document.querySelector(".vl");
let vl_2: HTMLInputElement = document.querySelector(".vl_2");
let max: HTMLInputElement = document.querySelector("#max");
let min: HTMLInputElement = document.querySelector("#min");
let step: HTMLInputElement = document.querySelector("#step");
let tooltip: HTMLInputElement = document.querySelector("#tooltip");
let scale: HTMLInputElement = document.querySelector("#scale");

let orientation = document.querySelector("#orientation");
let range = document.querySelector("#range");

slider.view.button.div.addEventListener("mousemove", () => {
  vl.value = slider.presenter.buttonValue + "";
});

vl.addEventListener("input", function () {
  slider.presenter.buttonValue = Number(vl.value)
});
if (slider.view.isRangeSlider) {
  slider.view.button_2.div.addEventListener("mousemove", () => {
    vl_2.value = slider.presenter.buttonValue_2 + "";
  });
  vl_2.addEventListener("input", function () {
    slider.presenter.buttonValue_2 = Number(vl_2.value)
  });
}

max.value = slider.model.max + "";
max.addEventListener("input", function () {
  slider.model.max = Number(max.value);
  slider.presenter.updateScaleValues()
  slider.presenter.mouseUp();
  slider.presenter.mouseUp_2();
});
min.value = slider.model.min + "";
min.addEventListener("input", function () {
  slider.model.min = Number(min.value);
  slider.presenter.updateScaleValues()
  slider.presenter.mouseUp();
  slider.presenter.mouseUp_2();
});
step.value = slider.model.step + "";
step.addEventListener("input", function () {
  let value: number = Math.abs(Number(step.value));
  if (value === 0) {
    value = 1;
  }
  slider.model.step = value;
  slider.presenter.mouseUp();
  slider.presenter.mouseUp_2();
});

tooltip.checked = slider.view.isFlag;
tooltip.addEventListener("input", function () {
  tooltip.checked ? slider.view.flag.showFlag() : slider.view.flag.hideFlag();
  if (slider.view.flag_2) {
    tooltip.checked ? slider.view.flag_2.showFlag() : slider.view.flag_2.hideFlag();
  }
});

scale.checked = slider.view.isScale;
scale.addEventListener("input", function () {
  scale.checked ? slider.view.scale.showScale() : slider.view.scale.hideScale();
 
});

orientation.checked = slider.view.isHorizontal;
orientation.addEventListener("input", function () {
 
  slider.presenter.changeOrientation();
  scale.checked = slider.view.isScale;
  tooltip.checked = slider.view.isFlag; 
});
range.checked = slider.view.isRangeSlider;
range.addEventListener("input", function () { 
  slider.presenter.changeTypeSlider(); 
  scale.checked = slider.view.isScale;
  tooltip.checked = slider.view.isFlag; 
});