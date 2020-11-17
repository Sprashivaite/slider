let slider = $(".slider").sliderPlugin().data("sliderPlugin");


let vl: HTMLInputElement = document.querySelector(".vl");
let vl_2: HTMLInputElement = document.querySelector(".vl_2");
let tooltip: HTMLInputElement = document.querySelector("#tooltip");
let max: HTMLInputElement = document.querySelector("#max");
let min: HTMLInputElement = document.querySelector("#min");
let step: HTMLInputElement = document.querySelector("#step");
let orientation = document.querySelector("#orientation");
let range = document.querySelector("#range");

slider.view.button.div.addEventListener("mousemove", () => {
  vl.value = slider.presenter.buttonValue + "";
});

vl.addEventListener("input", function () {
  slider.presenter.buttonValue = +vl.value
});
if (slider.view.isRangeSlider) {
  slider.view.button_2.div.addEventListener("mousemove", () => {
    vl_2.value = slider.presenter.buttonValue_2 + "";
  });
  vl_2.addEventListener("input", function () {
    slider.presenter.buttonValue_2 = +vl_2.value
  });
}

max.value = slider.model.max + "";
max.addEventListener("input", function () {
  slider.model.max = +max.value;
  slider.presenter.updateScaleValues()
  slider.presenter.mouseUp();
  slider.presenter.mouseUp_2();
});
min.value = slider.model.min + "";
min.addEventListener("input", function () {
  slider.model.min = +min.value;
  slider.presenter.updateScaleValues()
  slider.presenter.mouseUp();
  slider.presenter.mouseUp_2();
});
step.value = slider.model.step + "";
step.addEventListener("input", function () {
  let value: number = Math.abs(+step.value);
  if (value === 0) {
    value = 1;
  }
  slider.model.step = value;
  slider.presenter.mouseUp();
  slider.presenter.mouseUp_2();
});

orientation.checked = slider.view.isHorizontal;
orientation.addEventListener("input", function () {
  slider.presenter.changeOrientation();
});
tooltip.addEventListener("input", function () {
  tooltip.checked ? slider.view.flag.addFlag() : slider.view.flag.removeFlag();
  if (slider.view.flag_2) {
    tooltip.checked ? slider.view.flag_2.addFlag() : slider.view.flag_2.removeFlag();
  }
});
range.checked = slider.view.isRangeSlider;
range.addEventListener("input", function () {
  slider.presenter.changeTypeSlider();
});
