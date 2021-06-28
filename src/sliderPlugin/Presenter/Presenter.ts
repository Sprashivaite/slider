import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.subscribeListeners()
  }

  private subscribeListeners(): void {
    this.subscribe();
    this.view.notifier.notifyListeners();
    this.model.notifyListeners();
  }

  private subscribe(): void {
    const { model, view } = this;
    model
      .subscribe('stepsUpdate', view.updateScale.bind(view))
      .subscribe('updatePoint', view.changeView.bind(view))    
    view.notifier
      .subscribe('valueChanged', model.moveToValue.bind(model))
      .subscribe('pointStopped', model.calcStopPoint.bind(model))
      .subscribe('pointMoving', model.updatePoint.bind(model))   
  }
}
export default Presenter;
