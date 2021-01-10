import Model from "./Model";
import View from "./View";
import Presenter from "./Presenter";
import IViewConfig from "./IViewConfig";
import IModelConfig from "./IModelConfig";

(function ($) {
class sliderPlugin{
    model: Model;
    view: View;
    presenter: Presenter;
    constructor(options: IViewConfig | IModelConfig){
      this.model = new Model(options);
      this.view = new View(options);
      this.presenter = new Presenter(this.model, this.view);
    }
}

  $.fn.sliderPlugin = function (options: IViewConfig | IModelConfig) {
    options = $.extend(
      {
        target: this,
        isHorizontal: true,
        isRangeSlider: true,
        isFlag: false,
        isScale: false,
        max: 100,
        min: 0,
        step: 1,
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