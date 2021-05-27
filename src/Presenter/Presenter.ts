import Model from "../Model/Model";
import View from "../View/View";
import ViewButton from "../View/subView/ViewButton";
import ViewFlag from "../View/subView/ViewFlag";

class Presenter {
  model: Model;

  view: View;

  buttonValue1: number;
  
  buttonValue2: number;

  shift!: number;

  shift1!: number;

  shift2!: number;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.buttonValue1 = 0;
    this.buttonValue2 = 0;

  }

  moveButton(button: ViewButton): void {
    button.moveButton(
      this.model.calcBtnOffset(
        this.view.field.div,
        button.div,
        this.view.handler.mouseCoords
      ),
    );
  }

  moveShift(button: ViewButton, shift): void {
    button.moveButton(
      this.model.calcBtnOffset(
        this.view.field.div,
        button.div,
        this.view.handler.mouseCoords - shift
      ),
    );
  }

  moveFlag(button: HTMLElement, flag: ViewFlag): void { 
    if(this.view.config.isHorizontal) flag.moveFlag(button.offsetLeft )
    if(!this.view.config.isHorizontal) flag.moveFlag(button.offsetTop)
  }

  changeFlagValue(button: HTMLElement, flag: ViewFlag): void {
    flag.changeFlagValue(this.model.calcFlagValue(this.view.field.div, button));
    
  }

  updateScaleValues(): void {
    Array.from(this.view.scale.div.children).map(i => i.remove())
    let quantity = 0;
    for(let i = this.model.config.min; i <= this.model.config.max; i += this.model.config.step){
      quantity += 1
    }
    this.view.scale.createScale(quantity)
    this.view.scale.updateValues(this.model.calcScaleValue(quantity));
    this.view.handler.addScaleHandler();
  }

  makeBreakpointButton(button: ViewButton): void {
    button.moveButton(this.model.calcStopPoint(this.view.field.div, button.div));
    if (!this.model.config.isHorizontal) {
      button.moveButton(this.model.calcStopPoint(this.view.field.div, button.div));
    }
  }

  mouseDownButton(): void {
    this.shift1 = this.view.handler.mouseCoords - this.view.button1.div.getBoundingClientRect().left - this.view.button1.div.offsetWidth/2
    if (!this.view.config.isHorizontal) {
      this.shift1 = this.view.handler.mouseCoords - this.view.button1.div.getBoundingClientRect().top - this.view.button1.div.offsetWidth/2
    }
  }

  mouseDownButton2(): void {
    this.shift2 = this.view.handler.mouseCoords - this.view.button2.div.getBoundingClientRect().left - this.view.button2.div.offsetWidth/2
    if (!this.view.config.isHorizontal) {
    this.shift2 = this.view.handler.mouseCoords - this.view.button2.div.getBoundingClientRect().top - this.view.button2.div.offsetWidth/2
  }
  }

  mouseMoveButton(): void {
    this.moveButton(this.view.button1);
    this.moveShift(this.view.button1, this.shift1)
    this.changeFlagValue(this.view.button1.div, this.view.flag1);
    this.moveFlag(this.view.button1.div, this.view.flag1)  
    if (this.view.config.isRangeSlider) {
    this.moveFlag(this.view.button2.div, this.view.flag2)   
    if(this.view.config.isHorizontal) {
      this.view.flag1.demarcateFromSiblingFlag(this.view.flag1.div, this.view.flag2.div)
    }
    }
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.buttonValue1 = Number(this.view.flag1.div.innerHTML);
  }

  mouseMoveButton2(): void {
    this.moveButton(this.view.button2);
    this.moveShift(this.view.button2, this.shift2)
    this.changeFlagValue(this.view.button2.div, this.view.flag2);
    this.moveFlag(this.view.button2.div, this.view.flag2)    
    if(this.view.config.isHorizontal) {
      this.view.flag1.demarcateFromSiblingFlag(this.view.flag1.div, this.view.flag2.div)
    }
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.buttonValue2 = Number(this.view.flag2.div.innerHTML);
  }

  mouseUp(): void {
    this.makeBreakpointButton(this.view.button1);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.changeFlagValue(this.view.button1.div, this.view.flag1);
    this.moveFlag(this.view.button1.div, this.view.flag1)  
    if (this.view.config.isRangeSlider) {
      if(this.view.config.isHorizontal) {
        this.view.flag1.demarcateFromSiblingFlag(this.view.flag1.div, this.view.flag2.div)
      } 
    }
    this.buttonValue1 = Number(this.view.flag1.div.innerHTML);
  }

  scaleClick(value): void {
    this.setButtonValue(value)
  }

  scaleClick2(value): void {
    this.setButtonValue2(value)
  }

  mouseUp2(): void {
    this.makeBreakpointButton(this.view.button2);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.changeFlagValue(this.view.button2.div, this.view.flag2);
    this.moveFlag(this.view.button1.div, this.view.flag1)  
    this.moveFlag(this.view.button2.div, this.view.flag2)    
    if(this.view.config.isHorizontal) {
      this.view.flag1.demarcateFromSiblingFlag(this.view.flag1.div, this.view.flag2.div)
    } 
    this.buttonValue2 = Number(this.view.flag2.div.innerHTML);
  }

  changeOrientation(): void {
    this.view.removeElements();
    this.model.config.isHorizontal = !this.model.config.isHorizontal;
    this.view.config.isHorizontal = !this.view.config.isHorizontal;
    this.view.renderElements();
    this.view.register(this);
    this.view.handler.getMouseCoords();
    this.view.handler.mouseEventSlider();
    this.updateScaleValues();
    if (this.view.config.isRangeSlider) {
      this.view.handler.mouseEventRange();
      this.mouseUp2();
    }
  }

  changeTypeSlider(): void {
    this.view.removeElements();
    this.view.config.isRangeSlider = !this.view.config.isRangeSlider;
    this.view.renderElements();
    this.view.register(this);
    this.view.handler.getMouseCoords();
    this.view.handler.mouseEventSlider();
    this.updateScaleValues();
    if (this.view.config.isRangeSlider) {
      this.view.handler.mouseEventRange();
      this.mouseUp2();
    }
  }

  setButtonValue(value: number): void {
    this.view.button1.moveButton(
      this.model.moveToValue(this.view.field.div, this.view.button1.div, value),
    );
    this.mouseUp();
  }

  setButtonValue2(value: number): void {
    
    this.view.button2.moveButton(
      this.model.moveToValue(this.view.field.div, this.view.button2.div, value),
    );
    this.mouseUp2();
  }
}
export default Presenter;
