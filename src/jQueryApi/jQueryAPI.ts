import IViewConfig from "../View/IViewConfig";
import IModelConfig from "../Model/IModelConfig";
import Model from '../Model/Model'
import View from '../View/View'
import Presenter from '../Presenter/Presenter'
import {DEFAULT_CONFIG} from '../defaults'

(function addFunc($) {
  class SliderPlugin {
    model!: Model;

    view!: View;
  
    presenter!: Presenter;
  
    constructor(config: IViewConfig & IModelConfig){
      this.model = new Model({...DEFAULT_CONFIG, ...config});
      this.view = new View({...DEFAULT_CONFIG, ...config});
      this.presenter = new Presenter(this.model, this.view);
      this.initApp();
    }
    
    initApp(): void{
      this.view.renderElements();
      this.view.addHandlers();    
      this.presenter.subscribeListeners();
    }
  }
  
  jQuery.fn.sliderPlugin = function sliderPlugin(config: IViewConfig & IModelConfig) {
    return this.each(function each() {
      if (!$.data(this, "sliderPlugin")) {
        $.data(this, "sliderPlugin", new SliderPlugin({target:this, ...config}));
      }
    });
  };
})(jQuery);