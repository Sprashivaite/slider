import Model from "./Model/Model";
import View from "./View/View";
import Presenter from "./Presenter/Presenter";
import IViewConfig from "./View/IViewConfig";
import IModelConfig from "./Model/IModelConfig";
import { DEFAULT_CONFIG } from './defaults';

class AppSlider {
  model: Model;

  view: View;

  presenter: Presenter;

  constructor(options = DEFAULT_CONFIG as IViewConfig & IModelConfig){
    this.model = new Model(options);
    this.view = new View(options);
    this.presenter = new Presenter(this.model, this.view);
    this.initApp();
  }
  
  initApp(): void{
    this.view.renderElements();
    this.view.addHandlers();    
    this.presenter.subscribeListeners();
  }
}
export default AppSlider