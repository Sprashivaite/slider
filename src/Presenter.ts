import Model from "./Model";
import { View } from "./View";

class Presenter {
  model: Model;
  view: View;
  // mouseCoords: number;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.view.register(this);
    this.view.calcMouseCoords();
    this.view.mouseEvent();

    if (this.view.isRangeSlider) {
      this.view.mouseEvent_2();
    this.mouseUp_2();}
  }

  moveButton(btn: any) {
    btn.buttonMove(
      this.model.calcBtnOffset(
        this.view.field.div,
        btn.div,
        this.view.mouseCoords
      )
    );
  }
  changeFlagValue(button: HTMLElement, flag: object) {
    flag.changeFlagValue(this.model.calcValue(this.view.field.div, button));
  }
  makeBreakpointButton(btn: any) {
    btn.buttonMove(this.model.makeBreakPoint(this.view.field.div, btn.div));
    if (!this.model.isHorizontal) {
      btn.buttonMove(this.model.makeBreakPoint(this.view.field.div, btn.div));
    }
  }
  mouseMoveButton() {
    this.moveButton(this.view.button);
    this.changeFlagValue(this.view.button.div, this.view.flag);
    this.view.progressBar.progressBarMove();
  }
  mouseMoveButton_2() {
    this.moveButton(this.view.button_2);
    this.changeFlagValue(this.view.button_2.div, this.view.flag_2);
    this.view.progressBar.progressBarMove();
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
    this.mouseUp_2();
  }

  changeTypeSlider() {
    this.view.removeElements();
    this.view.isRangeSlider = !this.view.isRangeSlider;
    this.view.renderElements();
    if (this.view.isRangeSlider) this.mouseUp_2();
  }
}
export default Presenter;
