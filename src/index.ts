import $ from "./jQueryAPI"
import Config from "./Config"


let slider_1 = $('.slider-container_1 > .slider').sliderPlugin({}).data("sliderPlugin");
let slider_2 = $('.slider-container_2 > .slider').sliderPlugin({isRangeSlider: false, scaleQuantity: 2, max: 5}).data("sliderPlugin");
let slider_3 = $('.slider-container_3 > .slider').sliderPlugin({isFlag: false, isScale: false}).data("sliderPlugin");
let slider_4 = $('.slider-container_4 > .slider').sliderPlugin({min: -1, max: 1, step: 0.1, isRangeSlider: false}).data("sliderPlugin");
let slider_5 = $('.slider-container_5 > .slider').sliderPlugin({isHorizontal: false, step: 250, max: 1500}).data("sliderPlugin");
let slider_6 = $('.slider-container_6 > .slider').sliderPlugin({isHorizontal: false,isRangeSlider: false, step: 1, max: 1000, min: -1000}).data("sliderPlugin"); 

let configContainer_1 = document.querySelector('.slider-container_1 > .config')
let configContainer_2 = document.querySelector('.slider-container_2 > .config')
let configContainer_3 = document.querySelector('.slider-container_3 > .config')
let configContainer_4 = document.querySelector('.slider-container_4 > .config')
let configContainer_5 = document.querySelector('.slider-container_5 > .config')
let configContainer_6 = document.querySelector('.slider-container_6 > .config')

let config_1 = new Config(slider_1, configContainer_1);
let config_2 = new Config(slider_2, configContainer_2);
let config_3 = new Config(slider_3, configContainer_3);
let config_4 = new Config(slider_4, configContainer_4);
let config_5 = new Config(slider_5, configContainer_5);
let config_6 = new Config(slider_6, configContainer_6);
