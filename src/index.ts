import {Model} from './Model';
import {View} from './View';
import {Presenter} from './Presenter';

const model: Model = new Model();
const view: View = new View();
const presenter: Presenter = new Presenter(model, view);



let vl: HTMLInputElement = document.querySelector(".vl");
let vl_2: HTMLInputElement = document.querySelector(".vl_2");
let tooltip: HTMLInputElement = document.querySelector("#tooltip");
let max: HTMLInputElement = document.querySelector("#max");
let min: HTMLInputElement = document.querySelector("#min");
let step: HTMLInputElement = document.querySelector("#step");
let orientation = document.querySelector("#orientation");
let range = document.querySelector("#range");

view.button.addEventListener('mousemove', ()=>{
  vl.value = model.calcValue(view.field, view.button) + '';
})

vl.addEventListener("input", function () {
  model.moveToValue(view.button, view.field, +vl.value);

  view.flagMove(view.flag, model.calcValue(view.field, view.button));
  view.progressBarMove();
});

view.button_2.addEventListener('mousemove', ()=>{
  vl_2.value = model.calcValue(view.field, view.button_2) + '';
})
vl_2.addEventListener("input", function () {
  model.moveToValue(view.button_2, view.field, +vl_2.value);
  view.flagMove(view.flag_2, model.calcValue(view.field, view.button_2));
  view.progressBarMove();
});

max.value = model.max + '';
max.addEventListener("input", function () {
  model.max = +max.value;
  view.flagMove(view.flag, model.calcValue(view.field, view.button));
  view.flagMove(view.flag_2, model.calcValue(view.field, view.button_2));
});
min.value = model.min + '';
min.addEventListener("input", function () {
  model.min = +min.value;
  view.flagMove(view.flag, model.calcValue(view.field, view.button));
  view.flagMove(view.flag_2, model.calcValue(view.field, view.button_2));
});
step.value = model.step + '';
step.addEventListener("input", function () {
  let value: number = Math.abs(+step.value) ;
  if(value === 0){value = 1}
  model.step = value;
  view.flagMove(view.flag, model.calcValue(view.field, view.button));
  view.flagMove(view.flag_2, model.calcValue(view.field, view.button_2));
});

orientation.addEventListener("input", function () {

    presenter.changeOrientation();
  });
tooltip.addEventListener("input", function () {
    tooltip.checked ? view.addFlag() : view.removeFlag();
  });
  range.addEventListener("input", function () {
    presenter.changeTypeButton();
  });