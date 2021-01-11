import Model from "./Model";
import View from "./View";
import ViewButton from "./subView/ViewButton";
import ViewFlag from "./subView/ViewFlag";

class Presenter {
  model: Model;
  view: View;
  _buttonValue: number;
  _buttonValue_2: number;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this._buttonValue = 0;
    this._buttonValue_2 = 0;
    this.view.renderElements();
    this.view.getMouseCoords();
    this.view.register(this);

    this.view.mouseEventSlider();
    this.updateScaleValues();
    if (this.view.isRangeSlider) {
      this.view.mouseEventRange();
      this.mouseUp_2();
    } 
  }

  moveButton(button: ViewButton) {
    button.moveButton(
      this.model.calcBtnOffset(
        this.view.field.div,
        button.div,
        this.view.mouseCoords
      )
    );
  }
  changeFlagValue(button: HTMLElement, flag: ViewFlag) {
    flag.changeFlagValue(this.model.calcFlagValue(this.view.field.div, button));
  }
  updateScaleValues() {
    let quantity =  this.view.scale.div.children.length;
    this.view.scale.updateValues(this.model.calcScaleValue(quantity));
  }
  makeBreakpointButton(button: ViewButton) {
    button.moveButton(this.model.calcBreakPoint(this.view.field.div, button.div));
    if (!this.model.isHorizontal) {
      button.moveButton(this.model.calcBreakPoint(this.view.field.div, button.div));
    }
  }
  mouseMoveButton() {
    this.moveButton(this.view.button);
    this.changeFlagValue(this.view.button.div, this.view.flag);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this._buttonValue = Number(this.view.flag.div.innerHTML);
  }
  mouseMoveButton_2() {
    this.moveButton(this.view.button_2);
    this.changeFlagValue(this.view.button_2.div, this.view.flag_2);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this._buttonValue_2 = Number(this.view.flag_2.div.innerHTML);
  }
  mouseUp() {
    this.makeBreakpointButton(this.view.button);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.changeFlagValue(this.view.button.div, this.view.flag);
  }
  mouseUp_2() {
    this.makeBreakpointButton(this.view.button_2);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.changeFlagValue(this.view.button_2.div, this.view.flag_2);
  }
  changeOrientation() {
    this.view.removeElements();
    this.model.isHorizontal = !this.model.isHorizontal;
    this.view.isHorizontal = !this.view.isHorizontal;
    this.view.renderElements();
    this.view.mouseEventSlider();
    this.updateScaleValues();
    if (this.view.isRangeSlider) {
      this.view.mouseEventRange();
      this.mouseUp_2();
    }
  }
  changeTypeSlider() {
    this.view.removeElements();
    this.view.isRangeSlider = !this.view.isRangeSlider;
    this.view.renderElements();
    this.view.mouseEventSlider();
    this.updateScaleValues();
    if (this.view.isRangeSlider) {
      this.view.mouseEventRange();
      this.mouseUp_2();
    }
  }
  get buttonValue(){
    return this._buttonValue
  }
  set buttonValue(value){
    this.model.moveToValue(this.view.field.div, this.view.button.div, value);
    this.mouseUp();
  }
  get buttonValue_2(){
    return this._buttonValue_2
  }
  set buttonValue_2(value){
    this.model.moveToValue(this.view.field.div, this.view.button_2.div, value);
    this.mouseUp_2();
  }
}
export default Presenter;
