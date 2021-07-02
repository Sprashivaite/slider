import { eventTypes } from '../types'
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
    const { model, view } = this;
    model
      .subscribe(eventTypes.stepsUpdate, view.updateScale.bind(view))
      .subscribe(eventTypes.updatePoint, view.updatePoints.bind(view))
    view
      .subscribe(eventTypes.valueChanged, model.changeValue.bind(model))
      .subscribe(eventTypes.pointMoving, model.updatePoint.bind(model))
      .subscribe(eventTypes.pointStopped, model.calcStopPoint.bind(model))
  }
}
export default Presenter;
