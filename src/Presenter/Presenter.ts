import Model from "../Model/Model";
import View from "../View/View";
import ViewButton from "../View/subView/ViewButton";
import ViewFlag from "../View/subView/ViewFlag";

class Presenter {
  model: Model;
  view: View;
  buttonValue: number;
  buttonValue_2: number;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.buttonValue = 0;
    this.buttonValue_2 = 0;
  }

  moveButton(button: ViewButton): void {
    button.moveButton(
      this.model.calcBtnOffset(
        this.view.field.div,
        button.div,
        this.view.handler.mouseCoords
      )      
    );
  }
  changeFlagValue(button: HTMLElement, flag: ViewFlag): void {
    flag.changeFlagValue(this.model.calcFlagValue(this.view.field.div, button));
  }
  updateScaleValues() {
    const quantity =  this.view.scale.div.children.length;
    this.view.scale.updateValues(this.model.calcScaleValue(quantity));
  }
  makeBreakpointButton(button: ViewButton): void {
    button.moveButton(this.model.calcStopPoint(this.view.field.div, button.div));
    if (!this.model.isHorizontal) {
      button.moveButton(this.model.calcStopPoint(this.view.field.div, button.div));
    }
  }
  mouseMoveButton(): void {
    this.moveButton(this.view.button);
    this.changeFlagValue(this.view.button.div, this.view.flag);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.buttonValue = Number(this.view.flag.div.innerHTML);
  }
  mouseMoveButton_2(): void {
    this.moveButton(this.view.button_2);
    this.changeFlagValue(this.view.button_2.div, this.view.flag_2);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.buttonValue_2 = Number(this.view.flag_2.div.innerHTML);
  }
  mouseUp(): void {
    this.makeBreakpointButton(this.view.button);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.changeFlagValue(this.view.button.div, this.view.flag);
  }
  mouseUp_2(): void {
    this.makeBreakpointButton(this.view.button_2);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.changeFlagValue(this.view.button_2.div, this.view.flag_2);
  }
  changeOrientation(): void {
    this.view.removeElements();
    this.model.isHorizontal = !this.model.isHorizontal;
    this.view.isHorizontal = !this.view.isHorizontal;
    this.view.renderElements();
    this.view.register(this);
    this.view.handler.getMouseCoords();    
    this.view.handler.mouseEventSlider();
    this.updateScaleValues();
    if (this.view.isRangeSlider) { 
      this.view.handler.mouseEventRange();
      this.mouseUp_2();
    }
  }
  changeTypeSlider(): void {
    this.view.removeElements();
    this.view.isRangeSlider = !this.view.isRangeSlider;
    this.view.renderElements();
    this.view.register(this);
    this.view.handler.getMouseCoords();    
    this.view.handler.mouseEventSlider();
    this.updateScaleValues();
    if (this.view.isRangeSlider) { 
      this.view.handler.mouseEventRange();
      this.mouseUp_2();
    }
  }

  setButtonValue(value: number): void{
    this.view.button.moveButton(this.model.moveToValue(this.view.field.div, this.view.button.div, value)
    ); 
    this.mouseUp();
  }

  setButtonValue_2(value: number): void{
    this.view.button_2.moveButton(this.model.moveToValue(this.view.field.div, this.view.button_2.div, value)
    ); 
    this.mouseUp_2();
  }
}
export default Presenter;
