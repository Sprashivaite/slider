import Model from "../Model/Model";
import View from "../View/View";
import ViewButton from "../View/subView/ViewButton";
import ViewFlag from "../View/subView/ViewFlag";

class Presenter{
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

  }

  subscribeListeners(): void {
    this.view.handler.subscribe("mouseDown", this.model.calcShift.bind(this.model))
    this.view.handler.subscribe("mouseMove",  this.model.calcBtnOffset.bind(this.model))
    this.view.handler.subscribe("mouseUp", this.model.calcStopPoint.bind(this.model)) 

    this.view.handler.subscribe("scaleClick", this.model.moveToValue.bind(this.model))

    this.view.handler.subscribe("mouseMove",  this.model.calcFlagValue.bind(this.model))
    this.view.handler.subscribe("mouseUp", this.model.calcFlagValue.bind(this.model))     

    this.model.subscribe("modelValueUpdate", this.view.flag1.changeFlagValue.bind(this.view.flag1 ))

    this.model.subscribe("modelUpdate", this.view.button1.moveButton.bind(this.view.button1))
    this.model.subscribe("modelUpdate", this.view.flag1.moveFlag.bind(this.view.flag1 ))
    this.model.subscribe("modelUpdate", this.view.progressBar.progressBarMove.bind(this.view.progressBar))
    /////
    this.view.subscribe("elementsSize", this.model.setElementsSize.bind(this.model))


    this.view.subscribe("scaleQuantity", this.model.calcScaleValue.bind(this.model))
    this.model.subscribe('scaleUpdate', this.view.scale.updateValues.bind(this.view.scale))
    
    
    /////////////////

    if(this.view.config.isRangeSlider){

    this.view.handler.subscribe("mouseDown2", this.model.calcShift.bind(this.model))
    this.view.handler.subscribe("mouseMove2",  this.model.calcBtnOffset.bind(this.model))
    this.view.handler.subscribe("mouseUp2", this.model.calcStopPoint.bind(this.model)) 

    this.view.handler.subscribe("scaleClick2", this.model.moveToValue.bind(this.model))

    this.view.handler.subscribe("mouseMove2",  this.model.calcFlagValue.bind(this.model))
    this.view.handler.subscribe("mouseUp2", this.model.calcFlagValue.bind(this.model)) 

    this.model.subscribe("modelValueUpdate2", this.view.flag2.changeFlagValue.bind(this.view.flag2 ))
    this.model.subscribe("modelValueUpdate", this.view.flag1.demarcateFromSiblingFlag.bind(this.view.flag1,this.view.flag1.div, this.view.flag2.div ))
    this.model.subscribe("modelValueUpdate2", this.view.flag2.demarcateFromSiblingFlag.bind(this.view.flag2,this.view.flag1.div, this.view.flag2.div  ))

    // this.model.subscribe("modelUpdate2", this.view.flag1.moveFlag.bind(this.view.flag1 ))

    this.model.subscribe("modelUpdate2", this.view.button2.moveButton.bind(this.view.button2))
    this.model.subscribe("modelUpdate2", this.view.flag2.moveFlag.bind(this.view.flag2 ))
    this.model.subscribe("modelUpdate2", this.view.progressBar.progressBarMove.bind(this.view.progressBar))
    }
    this.view.emit('elementsSize', {
      fieldSize: this.view.fieldSize,
      fieldOffset: this.view.fieldOffset,
      buttonSize: this.view.buttonSize
    })
    this.view.emit('scaleQuantity', this.view.config.scaleQuantity)
  }

}
export default Presenter;
