/* eslint-disable no-new */
import Config from './Config';

const slider1 = $('.js-slider-container_order_first > .js-slider')
  .sliderPlugin({
    max: 1000,
    isHorizontal: true,
    isRangeSlider: true,
    step: 50,
    min: 0,
  })
  .data('sliderPlugin');

const slider2 = $('.js-slider-container_order_second > .js-slider')
  .sliderPlugin({
    isRangeSlider: true,
    step: 11,
    max: 14,
    min: 0,
  })
  .data('sliderPlugin');

const slider3 = $('.js-slider-container_order_third > .js-slider')
  .sliderPlugin({ min: -1, max: 1, step: 0.2, isRangeSlider: false })
  .data('sliderPlugin');

const slider4 = $('.js-slider-container_order_fourth > .js-slider')
  .sliderPlugin({ isHorizontal: false, step: 250, max: 1500 })
  .data('sliderPlugin');

const slider5 = $('.js-slider-container_order_fifth > .js-slider')
  .sliderPlugin({
    isHorizontal: false,
    isRangeSlider: false,
    step: 40,
    max: 100,
    min: -100,
  })
  .data('sliderPlugin');

const configContainer1 = document.querySelector(
  '.js-slider-container_order_first > .config'
)!;
const configContainer2 = document.querySelector(
  '.js-slider-container_order_second > .config'
)!;
const configContainer3 = document.querySelector(
  '.js-slider-container_order_third > .config'
)!;
const configContainer4 = document.querySelector(
  '.js-slider-container_order_fourth > .config'
)!;
const configContainer5 = document.querySelector(
  '.js-slider-container_order_fifth > .config'
)!;

new Config(slider1, configContainer1);
new Config(slider2, configContainer2);
new Config(slider3, configContainer3);
new Config(slider4, configContainer4);
new Config(slider5, configContainer5);
