import Model from "./Model";
import View from "./View";
import ViewButton from "./ViewButton";
import ViewFlag from "./ViewFlag";

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
    this.view.register(this);
    this.view.getMouseCoords();
    
    this.view.mouseEventSlider();
this.updateScaleValues();
    if (this.view.isRangeSlider) {
      this.view.mouseEventRange();
    this.mouseUp_2();}
    this.model.calcScaleValue();
  }

  moveButton(btn: ViewButton) {
    btn.buttonMove(
      this.model.calcBtnOffset(
        this.view.field.div,
        btn.div,
        this.view.mouseCoords
      )
    );
  }
  changeFlagValue(button: HTMLElement, flag: ViewFlag) {
    flag.changeFlagValue(this.model.calcFlagValue(this.view.field.div, button));
    
  }
  updateScaleValues(){
    this.view.scale.updateValues(this.model.calcScaleValue())
  }
  makeBreakpointButton(btn: ViewButton) {
    btn.buttonMove(this.model.makeBreakPoint(this.view.field.div, btn.div));
    if (!this.model.isHorizontal) {
      btn.buttonMove(this.model.makeBreakPoint(this.view.field.div, btn.div));
    }
  }
  mouseMoveButton() {
    this.moveButton(this.view.button);
    this.changeFlagValue(this.view.button.div, this.view.flag);
    this.view.progressBar.progressBarMove();
    this.buttonValue = +this.view.flag.div.innerHTML;
  }
  mouseMoveButton_2() {
    this.moveButton(this.view.button_2);
    this.changeFlagValue(this.view.button_2.div, this.view.flag_2);
    this.view.progressBar.progressBarMove();
    this.buttonValue_2 = +this.view.flag_2.div.innerHTML;
  }
  mouseUp() {
    this.makeBreakpointButton(this.view.button);
    this.view.progressBar.progressBarMove();
    this.changeFlagValue(this.view.button.div, this.view.flag);
  }
  mouseUp_2() {
    this.makeBreakpointButton(this.view.button_2);
    this.view.progressBar.progressBarMove();
    this.changeFlagValue(this.view.button_2.div, this.view.flag_2);
  }

  changeOrientation() {
    this.view.removeElements();
    this.model.isHorizontal = !this.model.isHorizontal;
    this.view.isHorizontal = !this.view.isHorizontal;
    this.view.renderElements();
    this.view.mouseEventSlider();

    if (this.view.isRangeSlider) {
      this.view.mouseEventRange();
    this.mouseUp_2();}
  }

  changeTypeSlider() {
    this.view.removeElements();
    this.view.isRangeSlider = !this.view.isRangeSlider;
    this.view.renderElements();
    this.view.mouseEventSlider();

    if (this.view.isRangeSlider) {
      this.view.mouseEventRange();
    this.mouseUp_2();}
  }
}
export default Presenter;
