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
    this.subscribeModel();
    this.subscribeView();
    this.view.updateModel();
    this.model.calcScaleValues();
  }

  private subscribeModel(): void {
    const { model, view } = this;
    view
      .subscribe('updateElementsSize', model.setElementsSize.bind(model))
      .subscribe('scaleQuantity', model.calcScaleValues.bind(model));
    view.handler
      .subscribe('firstButtonScaleClick', model.moveToValue.bind(model))
      .subscribe('firstButtonMouseDown', model.calcShift.bind(model))
      .subscribe('firstButtonMouseMove', model.calcButtonOffset.bind(model))
      .subscribe('firstButtonMouseUp', model.calcStopPointPX.bind(model))
      .subscribe('secondButtonMouseDown', model.calcShift.bind(model))
      .subscribe('secondButtonMouseMove', model.calcButtonOffset.bind(model))
      .subscribe('secondButtonMouseUp', model.calcStopPointPX.bind(model))
      .subscribe('secondButtonScaleClick', model.moveToValue.bind(model));    
  }

  private subscribeView(): void {
    const { model, view } = this;
    model
      .subscribe('scaleUpdate', view.updateScale.bind(view))
      .subscribe('updateFirstButtonValue', view.firstFlag.changeFlagValue.bind(view.firstFlag))
      .subscribe('updateFirstButtonPX', view.firstButton.moveButton.bind(view.firstButton))      
      if(view.config.isRangeSlider) {
        model
          .subscribe(
            'updateSecondButtonPX',
            view.secondButton.moveButton.bind(view.secondButton),
            view.demarcateElements.bind(view, 'updateSecondButtonPX'), 
            view.progressBar.progressBarMove.bind(view.progressBar)
          )
          .subscribe(
            'updateSecondButtonValue', 
            view.secondFlag.changeFlagValue.bind(view.secondFlag)
            )        
          .subscribe(
            'updateFirstButtonPX', 
            view.demarcateElements.bind(view, 'updateFirstButtonPX')
            )        
      }
    model
      .subscribe('updateFirstButtonPX', view.progressBar.progressBarMove.bind(view.progressBar));
  }
}
export default Presenter;
