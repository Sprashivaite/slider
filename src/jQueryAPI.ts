import IViewConfig from "./View/IViewConfig";
import IModelConfig from "./Model/IModelConfig";
import AppSlider from "./AppSlider";
import {DEFAULT_CONFIG} from './defaults'

(function ($) {
  class SliderPlugin {
    appSlider: AppSlider;
    constructor(options: IViewConfig | IModelConfig) {
      this.appSlider = new AppSlider(options);
    }
  }
  $.fn.sliderPlugin = function (options: IViewConfig | IModelConfig) {
    options = $.extend(
      {
        ...DEFAULT_CONFIG,
        ...{target: this},
      },
      options
    );
    return this.each(function () {
      if (!$.data(this, "sliderPlugin")) {
        $.data(this, "sliderPlugin", new SliderPlugin(options));
      }
    });
  };
})(jQuery);
let plug = $.fn.sliderPlugin
export default plug