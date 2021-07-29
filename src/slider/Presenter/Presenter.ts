import { EventTypes } from '../types';
import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.subscribeListeners();
  }

  private subscribeListeners(): void {
    const { model, view } = this;
    model.subscribe(EventTypes.updatePoint, view.updatePoints.bind(view));
    view
      .subscribe(EventTypes.valueChanged, model.changeValue.bind(model))
      .subscribe(EventTypes.pointMoving, model.updatePoint.bind(model))
      .subscribe(EventTypes.pointStopped, model.correctStepPoint.bind(model));
  }
}
export default Presenter;
