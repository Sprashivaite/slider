import Model from "../Model/Model";
import View from "../View/View";

class Presenter{
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  subscribeListeners(): void {
    this.view.subscribe("elementsSize", this.model.setElementsSize.bind(this.model))

    this.view.handler.subscribe("mouseDown", this.model.calcShift.bind(this.model))
    this.view.handler.subscribe("mouseMove",  this.model.calcButtonOffset.bind(this.model))
    this.view.handler.subscribe("mouseUp", this.model.calcStopPointPX.bind(this.model)) 

    this.view.handler.subscribe("scaleClick", this.model.moveToValue.bind(this.model))
    this.view.handler.subscribe("scaleClick", this.model.calcFlagValue.bind(this.model))

    this.view.handler.subscribe("mouseMove",  this.model.calcFlagValue.bind(this.model))
    this.view.handler.subscribe("mouseUp", this.model.calcFlagValue.bind(this.model))  

    this.view.subscribe("scaleQuantity", this.model.calcScaleValues.bind(this.model))

    this.model.subscribe('scaleUpdate', this.view.scale.updateValues.bind(this.view.scale))

    this.model.subscribe("updateButtonValue", this.view.flag1.changeFlagValue.bind(this.view.flag1 ))

    this.model.subscribe("updateButtonPX", this.view.button1.moveButton.bind(this.view.button1))
    this.model.subscribe("updateButtonPX", this.view.flag1.moveFlag.bind(this.view.flag1 ))
    this.model.subscribe("updateButtonPX", this.view.progressBar.progressBarMove.bind(this.view.progressBar))

    if(this.view.config.isRangeSlider){

    this.view.handler.subscribe("mouseDown2", this.model.calcShift.bind(this.model))
    this.view.handler.subscribe("mouseMove2",  this.model.calcButtonOffset.bind(this.model))
    this.view.handler.subscribe("mouseUp2", this.model.calcStopPointPX.bind(this.model)) 

    this.view.handler.subscribe("scaleClick2", this.model.moveToValue.bind(this.model))
    this.view.handler.subscribe("scaleClick2", this.model.calcFlagValue.bind(this.model))

    this.view.handler.subscribe("mouseMove2",  this.model.calcFlagValue.bind(this.model))
    this.view.handler.subscribe("mouseUp2", this.model.calcFlagValue.bind(this.model)) 

    this.model.subscribe("updateButtonValue2", this.view.flag2.changeFlagValue.bind(this.view.flag2 ))

    if(this.model.config.isHorizontal) {
      this.model.subscribe("updateButtonValue", this.view.flag1.demarcateFromSiblingFlag.bind(this.view.flag1,this.view.flag1.div, this.view.flag2.div ))
      this.model.subscribe("updateButtonValue2", this.view.flag2.demarcateFromSiblingFlag.bind(this.view.flag2,this.view.flag1.div, this.view.flag2.div  ))
    }
    
    this.model.subscribe("updateButtonPX2", this.view.button2.moveButton.bind(this.view.button2))
    this.model.subscribe("updateButtonPX2", this.view.flag2.moveFlag.bind(this.view.flag2 ))
    this.model.subscribe("updateButtonPX2", this.view.progressBar.progressBarMove.bind(this.view.progressBar))

  }
  this.emitModel();
  }

    emitModel(): void {
      this.view.emit('elementsSize', {
        fieldSize: this.view.fieldSize,
        buttonSize: this.view.buttonSize
      })
      this.view.emit('scaleQuantity', this.view.config.scaleQuantity)
      this.view.handler.emit("mouseUp", this.view.handler.getFirstButtonData())
      if(this.view.config.isRangeSlider){    
        this.view.handler.emit("mouseUp2", this.view.handler.getSecondButtonData())
      }
    }

  }

export default Presenter;
