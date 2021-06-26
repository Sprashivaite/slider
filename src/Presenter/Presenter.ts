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
      .subscribe('firstHandleScaleClick', model.moveToValue.bind(model))
      .subscribe('firstHandleMouseDown', model.calcShift.bind(model))
      .subscribe('firstHandleMouseMove', model.calcHandleOffset.bind(model))
      .subscribe('firstHandleMouseUp', model.calcStopPointPX.bind(model))
      .subscribe('secondHandleMouseDown', model.calcShift.bind(model))
      .subscribe('secondHandleMouseMove', model.calcHandleOffset.bind(model))
      .subscribe('secondHandleMouseUp', model.calcStopPointPX.bind(model))
      .subscribe('secondHandleScaleClick', model.moveToValue.bind(model));    
  }

  private subscribeView(): void {
    const { model, view } = this;
    model
      .subscribe('scaleUpdate', view.updateScale.bind(view))
      .subscribe('updateFirstHandleValue', view.firstTooltip.changeTooltipValue.bind(view.firstTooltip))
      .subscribe('updateFirstHandlePX', view.firstHandle.moveHandle.bind(view.firstHandle))      
      if(view.config.isRangeSlider) {
        model
          .subscribe(
            'updateSecondHandlePX',
            view.secondHandle.moveHandle.bind(view.secondHandle),
            view.demarcateElements.bind(view, 'updateSecondHandlePX'), 
            view.progressBar.progressBarMove.bind(view.progressBar)
          )
          .subscribe(
            'updateSecondHandleValue', 
            view.secondTooltip.changeTooltipValue.bind(view.secondTooltip)
            )        
          .subscribe(
            'updateFirstHandlePX', 
            view.demarcateElements.bind(view, 'updateFirstHandlePX')
            )        
      }
    model
      .subscribe('updateFirstHandlePX', view.progressBar.progressBarMove.bind(view.progressBar));
  }
}
export default Presenter;
