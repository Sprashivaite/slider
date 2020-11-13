import Model from "./Model";
import View from "./View";
import Presenter from "./Presenter";

// (function ($) {

      
  // 'use strict'
  // $.fn.Slider = function (options) {
  //   options = $.extend({target: this}, options);


  //   return this.each(function() {
  //     var $this = $(this);
    // const model: Model = new Model(options);
    // const view: View = new View(options);
    // const presenter: Presenter = new Presenter(model, view);
  //   $this.data('Slider', new pluginMethods($this))

  //   })

    
  // };



// })(jQuery);

// $(".slider").Slider();

const model: Model = new Model();
const view: View = new View({target: document.querySelector('.slider')});
const presenter: Presenter = new Presenter(model, view);

// const model2: Model = new Model();
// const view2: View = new View({target: document.querySelector('.slider2')});
// const presenter2: Presenter = new Presenter(model2, view2);

let vl: HTMLInputElement = document.querySelector(".vl");
let vl_2: HTMLInputElement = document.querySelector(".vl_2");
let tooltip: HTMLInputElement = document.querySelector("#tooltip");
let max: HTMLInputElement = document.querySelector("#max");
let min: HTMLInputElement = document.querySelector("#min");
let step: HTMLInputElement = document.querySelector("#step");
let orientation = document.querySelector("#orientation");
let range = document.querySelector("#range");

view.button.div.addEventListener("mousemove", () => {
  vl.value = model.calcFlagValue(view.field.div, view.button.div) + "";
});
vl.addEventListener("input", function () {
  model.moveToValue(view.field.div, view.button.div, +vl.value);
  presenter.mouseUp();
});
if (view.isRangeSlider) {
  view.button_2.div.addEventListener("mousemove", () => {
    vl_2.value = model.calcFlagValue(view.field.div, view.button_2.div) + "";
  });
  vl_2.addEventListener("input", function () {
    model.moveToValue(view.field.div, view.button_2.div, +vl_2.value);
    presenter.mouseUp_2();
  });
}
max.value = model.max + "";
max.addEventListener("input", function () {
  model.max = +max.value;
  presenter.mouseUp();
  presenter.mouseUp_2();
});
min.value = model.min + "";
min.addEventListener("input", function () {
  model.min = +min.value;
  presenter.mouseUp();
  presenter.mouseUp_2();
});
step.value = model.step + "";
step.addEventListener("input", function () {
  let value: number = Math.abs(+step.value);
  if (value === 0) {
    value = 1;
  }
  model.step = value;
  presenter.mouseUp();
  presenter.mouseUp_2();
});

orientation.addEventListener("input", function () {
  presenter.changeOrientation();
});
tooltip.addEventListener("input", function () {
  tooltip.checked ? view.flag.addFlag() : view.flag.removeFlag();
  if (view.flag_2) {
    tooltip.checked ? view.flag_2.addFlag() : view.flag_2.removeFlag();
  }
});
range.addEventListener("input", function () {
  presenter.changeTypeSlider();
});
