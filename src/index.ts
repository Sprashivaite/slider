/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import $ from "./jQueryAPI"
import Config from "./Config"


const slider_1 = $('.js-slider-container_1 > .js-slider').sliderPlugin().data("sliderPlugin");
const slider_2 = $('.js-slider-container_2 > .js-slider').sliderPlugin({isRangeSlider: false, scaleQuantity: 2, max: 5}).data("sliderPlugin");
const slider_3 = $('.js-slider-container_3 > .js-slider').sliderPlugin({isFlag: false, isScale: false}).data("sliderPlugin");
const slider_4 = $('.js-slider-container_4 > .js-slider').sliderPlugin({min: -1, max: 1, step: 0.1, isRangeSlider: false}).data("sliderPlugin");
const slider_5 = $('.js-slider-container_5 > .js-slider').sliderPlugin({isHorizontal: false, step: 250, max: 1500}).data("sliderPlugin");
const slider_6 = $('.js-slider-container_6 > .js-slider').sliderPlugin({isHorizontal: false,isRangeSlider: false, step: 1, max: 1000, min: -1000}).data("sliderPlugin"); 

const configContainer_1 = document.querySelector('.js-slider-container_1 > .config')
const configContainer_2 = document.querySelector('.js-slider-container_2 > .config')
const configContainer_3 = document.querySelector('.js-slider-container_3 > .config')
const configContainer_4 = document.querySelector('.js-slider-container_4 > .config')
const configContainer_5 = document.querySelector('.js-slider-container_5 > .config')
const configContainer_6 = document.querySelector('.js-slider-container_6 > .config')

const config_1 = new Config(slider_1, configContainer_1);
const config_2 = new Config(slider_2, configContainer_2);
const config_3 = new Config(slider_3, configContainer_3);
const config_4 = new Config(slider_4, configContainer_4);
const config_5 = new Config(slider_5, configContainer_5);
const config_6 = new Config(slider_6, configContainer_6);
