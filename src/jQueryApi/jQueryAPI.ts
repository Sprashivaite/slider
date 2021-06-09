/* eslint-disable no-param-reassign */
import IViewConfig from "../View/IViewConfig";
import IModelConfig from "../Model/IModelConfig";
import Model from '../Model/Model'
import View from '../View/View'
import Presenter from '../Presenter/Presenter'
import {DEFAULT_CONFIG} from '../defaults'

(function ($) {
  class SliderPlugin {
    model: Model;

    view: View;
  
    presenter: Presenter;
  
    constructor(options: IViewConfig & IModelConfig){
      this.model = new Model(options);
      this.view = new View(options);
      this.presenter = new Presenter(this.model, this.view);
      this.initApp();
    }
    
    initApp(): void{
      ;
      this.view.renderElements();
      this.view.addHandlers();    
      this.presenter.subscribeListeners();
    }
  }
  $.fn.sliderPlugin = function (options: IViewConfig & IModelConfig) {
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