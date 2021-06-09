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
  }

  subscribeModel(): void {
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

  subscribeView(): void {
    const { model, view } = this;
    model
      .subscribe('scaleUpdate', view.updateScale.bind(view))
      .subscribe('updateButtonValue', view.flag1.changeFlagValue.bind(view.flag1))
      .subscribe('updateButtonPX', view.button1.moveButton.bind(view.button1))   
      .subscribe('updateButtonPX', view.progressBar.progressBarMove.bind(view.progressBar)
      );
    if (view.config.isRangeSlider) {
      model
        .subscribe('updateButtonValue2', view.flag2.changeFlagValue.bind(view.flag2))        
        .subscribe('updateButtonPX2',view.button2.moveButton.bind(view.button2))
        .subscribe('updateButtonPX2',view.progressBar.progressBarMove.bind(view.progressBar));
      if(view.config.isHorizontal){
        model
          .subscribe('updateButtonPX', view.assignFlags.bind(view))
          .subscribe('updateButtonPX2', view.assignFlags.bind(view))
      }
    }
  }
}
export default Presenter;
