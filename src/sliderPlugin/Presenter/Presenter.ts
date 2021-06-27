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
      .subscribe('firstPointScaleClick', model.moveToValue.bind(model))
      .subscribe('firstPointMouseDown', model.calcShift.bind(model))
      .subscribe('firstPointMouseMove', model.calcPointOffset.bind(model))
      .subscribe('firstPointMouseUp', model.calcStopPointPX.bind(model))
      .subscribe('secondPointMouseDown', model.calcShift.bind(model))
      .subscribe('secondPointMouseMove', model.calcPointOffset.bind(model))
      .subscribe('secondPointMouseUp', model.calcStopPointPX.bind(model))
      .subscribe('secondPointScaleClick', model.moveToValue.bind(model));    
  }

  private subscribeView(): void {
    const { model, view } = this;
    model
      .subscribe('scaleUpdate', view.updateScale.bind(view))
      .subscribe('updateFirstPointValue', view.firstTooltip.changeTooltipValue.bind(view.firstTooltip))
      .subscribe('updateFirstPointPX', view.firstPoint.movePoint.bind(view.firstPoint))      
      if(view.config.isRangeSlider) {
        model
          .subscribe(
            'updateSecondPointPX',
            view.secondPoint.movePoint.bind(view.secondPoint),
            view.demarcateElements.bind(view, 'updateSecondPointPX'), 
            view.progressBar.progressBarMove.bind(view.progressBar)
          )
          .subscribe(
            'updateSecondPointValue', 
            view.secondTooltip.changeTooltipValue.bind(view.secondTooltip)
            )        
          .subscribe(
            'updateFirstPointPX', 
            view.demarcateElements.bind(view, 'updateFirstPointPX')
            )        
      }
    model
      .subscribe('updateFirstPointPX', view.progressBar.progressBarMove.bind(view.progressBar));
  }
}
export default Presenter;
