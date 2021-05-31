import Model from "./Model/Model";
import View from "./View/View";
import Presenter from "./Presenter/Presenter";
import IViewConfig from "./View/IViewConfig";
import IModelConfig from "./Model/IModelConfig";


class AppSlider {
  model: Model;

  view: View;

  presenter: Presenter;

  constructor(options = {} as IViewConfig | IModelConfig){
    this.model = new Model(options);
    this.view = new View(options);
    this.presenter = new Presenter(this.model, this.view);
    this.initApp();
  }

  initApp(): void{
    this.view.renderElements();
    this.updateScaleValues();
    this.view.addHandlers();    
    this.presenter.subscribeListeners();
  }

  updateScaleValues(): void {
    Array.from(this.view.scale.div.children).map(i => i.remove())
    let quantity = 0;
    for(let i = this.model.config.min; i <= this.model.config.max; i += this.model.config.step){
      quantity += 1
    }
    this.view.scale.createScale(quantity)
    this.view.scale.updateValues(this.model.calcScaleValue(quantity));
  }
}
export default AppSlider