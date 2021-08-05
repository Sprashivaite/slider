/* eslint-disable no-new */
import Config from './Config/Config';

const slider1 = $('.js-slider-container_order_first .js-slider').sliderPlugin({
  max: 1000,
  isHorizontal: true,
  isRange: true,
  step: 50,
  min: 0,
  secondValue: 50,
});

const slider2 = $('.js-slider-container_order_second .js-slider').sliderPlugin({
  isRange: true,
  step: 11,
  max: 14,
  min: 0,
  secondValue: 11,
});

const slider3 = $('.js-slider-container_order_third .js-slider').sliderPlugin({
  min: -1,
  max: 1,
  step: 0.2,
  isRange: false,
});

const slider4 = $('.js-slider-container_order_fourth .js-slider').sliderPlugin({
  isHorizontal: false,
  step: 250,
  max: 1500,
  secondValue: 250,
});

const slider5 = $('.js-slider-container_order_fifth .js-slider').sliderPlugin({
  isHorizontal: false,
  isRange: false,
  step: 40,
  max: 100,
  min: -100,
});

const configContainer1 = document.querySelector(
  '.js-slider-container_order_first > .config',
);
const configContainer2 = document.querySelector(
  '.js-slider-container_order_second > .config',
);
const configContainer3 = document.querySelector(
  '.js-slider-container_order_third > .config',
);
const configContainer4 = document.querySelector(
  '.js-slider-container_order_fourth > .config',
);
const configContainer5 = document.querySelector(
  '.js-slider-container_order_fifth > .config',
);

[
  [slider1, configContainer1],
  [slider2, configContainer2],
  [slider3, configContainer3],
  [slider4, configContainer4],
  [slider5, configContainer5],
].forEach(item => {
  if (item[0] === null) return;
  if (item[1] instanceof HTMLDivElement)
    new Config(item[0].data('sliderPlugin'), item[1]);
});
