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
    this.view.register(this.presenter);
    this.view.handler.getMouseCoords();    
    this.view.handler.mouseEventSlider();
    this.view.handler.addButtonHandler1();
    this.presenter.updateScaleValues();
    this.presenter.mouseUp();
    if (this.view.isRangeSlider) {
      this.view.handler.mouseEventRange();
      this.view.handler.addButtonHandler2();
      this.presenter.mouseUp2();
    }
  }
}
export default AppSlider