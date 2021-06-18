import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  subscribeListeners(): void {
    this.subscribeModel()
    this.subscribeView()
    this.view.updateModel();
    this.model.calcScaleValues()
  }

  private subscribeModel(): void {
    const { model, view } = this;
    view
      .subscribe('elementsSize', model.setElementsSize.bind(model))
      .subscribe('scaleQuantity', model.calcScaleValues.bind(model));
    view.handler
      .subscribe('mouseDown', model.calcShift.bind(model))
      .subscribe('mouseMove', model.calcButtonOffset.bind(model))
      .subscribe('mouseUp', model.calcStopPointPX.bind(model))
      .subscribe('scaleClick', model.moveToValue.bind(model))
    if (view.config.isRangeSlider) {
      view.handler
        .subscribe('mouseDown2', model.calcShift.bind(model))
        .subscribe('mouseMove2', model.calcButtonOffset.bind(model))
        .subscribe('mouseUp2', model.calcStopPointPX.bind(model))
        .subscribe('scaleClick2', model.moveToValue.bind(model))
    }
  }

  private subscribeView(): void {
    const { model, view } = this;
    model
      .subscribe('scaleUpdate', view.updateScale.bind(view))
      .subscribe('updateButtonValue', view.firstFlag.changeFlagValue.bind(view.firstFlag))
      .subscribe('updateButtonPX', view.firstButton.moveButton.bind(view.firstButton))   
      .subscribe('updateButtonPX', view.progressBar.progressBarMove.bind(view.progressBar)
      );
    if (view.config.isRangeSlider) {
      model
        .subscribe('updateButtonValue2', view.secondFlag.changeFlagValue.bind(view.secondFlag))        
        .subscribe('updateButtonPX2',view.secondButton.moveButton.bind(view.secondButton))
        .subscribe('updateButtonPX2',view.progressBar.progressBarMove.bind(view.progressBar))
        .subscribe('updateButtonPX', view.assignFlags.bind(view))
        .subscribe('updateButtonPX2', view.assignFlags.bind(view))
      
    }
  }
}
export default Presenter;
