import IViewConfig from "./View/IViewConfig";
import IModelConfig from "./Model/IModelConfig";
import AppSlider from "./AppSlider";
 
(function ($) {
  class sliderPlugin {
    appSlider: AppSlider;
    constructor(options: IViewConfig | IModelConfig) {
      this.appSlider = new AppSlider(options);
    }
  }

  $.fn.sliderPlugin = function (options: IViewConfig | IModelConfig) {
    options = $.extend(
      {
        target: this,
        isHorizontal: true,
        isRangeSlider: true,
        isProgressBar: true,
        max: 100,
        min: 0,
        step: 1,
        isFlag: true,
        isScale: true,
        scaleQuantity: 6,
      },
      options
    );
    return this.each(function () {
      if (!$.data(this, "sliderPlugin")) {
        $.data(this, "sliderPlugin", new sliderPlugin(options));
      }
    });
  };
})(jQuery);
export default $ 