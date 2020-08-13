import {Model} from './Model.js';
import {View} from './View.js';
import {Presenter} from './Presenter.js';


const view = new View();
const model = new Model();
const presenter = new Presenter();

Presenter.makeMove();
Presenter.subscribe(View);
Presenter.subscribe(Model);




let vl = document.querySelector('.vl');
let vl_2 = document.querySelector('.vl_2');
let tooltip = document.querySelector('#tooltip');
let max = document.querySelector('#max');
let min = document.querySelector('#min');
let step = document.querySelector('#step');
let radio = document.querySelector('#radio');
let range = document.querySelector('#range');

document.addEventListener('mousemove', function(){

    vl.value = View.flag.innerHTML;
})
document.addEventListener('mousemove', function(){
    vl_2.value = View.flag_2.innerHTML;
})

vl.addEventListener('input', function(){
    Presenter.moveToValue(View.button, +vl.value)
    View.flagMove();
    View.flagValue(View.flag, Model.calcValue(View.field, View.button));
})
vl_2.addEventListener('input', function(){
    Presenter.moveToValue(View.button_2, vl_2.value)
    console.log(vl_2.value - Model.min);
    View.flagMove();
    View.flagValue(View.flag_2, Model.calcValue(View.field, View.button_2));
})
tooltip.addEventListener('input', function(){
    tooltip.checked ?  View.addFlag():View.removeFlag();
})

max.value = Model.max;
max.addEventListener('input', function(){
    Model.max = +max.value;
    View.clickMax.innerHTML = 'Max = '+Model.max;
    View.flagValue(View.flag, Model.calcValue(View.field, View.button));
    View.flagValue(View.flag_2, Model.calcValue(View.field, View.button_2));
})
min.value = Model.min;
min.addEventListener('input', function(){
    Model.min = +min.value;
    View.clickMin.innerHTML = 'Min = '+ Model.min + ' - ';
    View.flagValue(View.flag, Model.calcValue(View.field, View.button));
    View.flagValue(View.flag_2, Model.calcValue(View.field, View.button_2));
})
step.value = Model.step;
step.addEventListener('input', function(){
    Model.step = +step.value;
    View.flagValue(View.flag, Model.calcValue(View.field, View.button));
    View.flagValue(View.flag_2, Model.calcValue(View.field, View.button_2));
})

radio.addEventListener('input', function(){
Presenter.changeOrientation();
})
range.addEventListener('input', function(){
    Model.rangeSlider && View.rangeSlider ? (Model.rangeSlider = false, View.rangeSlider = false):(Model.rangeSlider = true,
    View.rangeSlider = true);


    [View.flag, View.flag_2, View.button, View.button_2, View.field].forEach((item) =>
      item.remove()
    );


    View.renderElements();
    })
