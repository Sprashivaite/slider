/* eslint-disable no-new */
import $ from "./jQueryAPI"
import Config from "./Config"

const slider1 = $('.js-slider-container_1 > .js-slider').sliderPlugin().data("sliderPlugin");
const slider2 = $('.js-slider-container_2 > .js-slider').sliderPlugin({isRangeSlider: false, scaleQuantity: 2, max: 5}).data("sliderPlugin");
const slider3 = $('.js-slider-container_3 > .js-slider').sliderPlugin({isFlag: false, isScale: false}).data("sliderPlugin");
const slider4 = $('.js-slider-container_4 > .js-slider').sliderPlugin({min: -1, max: 1, step: 0.1, isRangeSlider: false}).data("sliderPlugin");
const slider5 = $('.js-slider-container_5 > .js-slider').sliderPlugin({isHorizontal: false, step: 250, max: 1500}).data("sliderPlugin");
const slider6 = $('.js-slider-container_6 > .js-slider').sliderPlugin({isHorizontal: false,isRangeSlider: false, step: 1, max: 1000, min: -1000}).data("sliderPlugin"); 

const configContainer1 = document.querySelector('.js-slider-container_1 > .config')!
const configContainer2 = document.querySelector('.js-slider-container_2 > .config')!
const configContainer3 = document.querySelector('.js-slider-container_3 > .config')!
const configContainer4 = document.querySelector('.js-slider-container_4 > .config')!
const configContainer5 = document.querySelector('.js-slider-container_5 > .config')!
const configContainer6 = document.querySelector('.js-slider-container_6 > .config')!

new Config(slider1, configContainer1);
new Config(slider2, configContainer2);
new Config(slider3, configContainer3);
new Config(slider4, configContainer4);
new Config(slider5, configContainer5);
new Config(slider6, configContainer6);
