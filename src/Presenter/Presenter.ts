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
      .subscribe('mouseMove', model.calcFlagValue.bind(model))
      .subscribe('mouseUp', model.calcStopPointPX.bind(model))
      .subscribe('mouseUp', model.calcFlagValue.bind(model))
      .subscribe('scaleClick', model.moveToValue.bind(model))
      .subscribe('scaleClick', model.calcFlagValue.bind(model));
    if (view.config.isRangeSlider) {
      view.handler
        .subscribe('mouseDown2', model.calcShift.bind(model))
        .subscribe('mouseMove2', model.calcButtonOffset.bind(model))
        .subscribe('mouseMove2', model.calcFlagValue.bind(model))
        .subscribe('mouseUp2', model.calcStopPointPX.bind(model))
        .subscribe('mouseUp2', model.calcFlagValue.bind(model))
        .subscribe('scaleClick2', model.moveToValue.bind(model))
        .subscribe('scaleClick2', model.calcFlagValue.bind(model));
    }
  }

  subscribeView(): void {
    const { model, view } = this;
    model
      .subscribe('scaleUpdate', view.scale.updateValues.bind(view.scale))
      .subscribe('updateButtonValue', view.flag1.changeFlagValue.bind(view.flag1))
      .subscribe('updateButtonPX', view.button1.moveButton.bind(view.button1))
      .subscribe('updateButtonPX', view.flag1.moveFlag.bind(view.flag1))
      .subscribe('updateButtonPX', view.progressBar.progressBarMove.bind(view.progressBar)
      );
    if (view.config.isRangeSlider) {
      model
        .subscribe('updateButtonValue2', view.flag2.changeFlagValue.bind(view.flag2))
        .subscribe('updateButtonPX2',view.button2.moveButton.bind(view.button2))
        .subscribe('updateButtonPX2', view.flag2.moveFlag.bind(view.flag2))
        .subscribe('updateButtonPX2',view.progressBar.progressBarMove.bind(view.progressBar));
    }
  }
}
export default Presenter;
