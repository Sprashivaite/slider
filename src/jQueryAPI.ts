import Model from "./Model/Model";
import View from "./View/View";
import Presenter from "./Presenter/Presenter";
import IViewConfig from "./View/IViewConfig";
import IModelConfig from "./Model/IModelConfig";

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