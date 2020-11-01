import { Model } from "./Model";
import { View } from "./View";

class Presenter {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.view.register(this);
  }

  moveButton(button: HTMLElement ,event: MouseEvent) {
      this.view.buttonMove(
        button,
        this.model.calcBtnOffset(
          this.view.field,
          button,
          event.clientX
        )
      );
  }

  moveflag(button: HTMLElement, flag: { changeFlagValue: (arg0: number) => void; } ) {
    flag.changeFlagValue(
      this.model.calcValue(this.view.field, button)
    );

  }
    makeBreakpointButton(button: HTMLElement) {
      this.view.buttonMove(
        button,
        this.model.makeBreakPoint(this.view.field, button)
      );
      if (!this.model.isHorizontal) {
        this.view.buttonMove(
          button,
          this.model.makeBreakPoint(this.view.field, button)
        );
      }
  }
  mouseEventButton() {
    this.moveButton(this.view.button, event);
    this.moveflag(this.view.button, this.view.flag);
    // this.makeBreakpointButton(this.view.button, event) 
    this.view.progressBar.progressBarMove();
  }
  mouseEventButton_2() {
    this.moveButton(this.view.button_2, event);
    this.moveflag(this.view.button_2, this.view.flag_2);
    // this.makeBreakpointButton(this.view.button_2, event) 
    this.view.progressBar.progressBarMove();
  }
  mouseUp(){
    this.makeBreakpointButton(this.view.button) 
    this.view.progressBar.progressBarMove();
  }
  mouseUp_2(){
  //   this.makeBreakpointButton(this.view.button_2, event) 
  //   this.view.progressBar.progressBarMove();
  }


  changeOrientation() {
    this.view.removeElements();
    this.model.isHorizontal = !this.model.isHorizontal;
    this.view.isHorizontal = !this.view.isHorizontal;
    this.view.renderElements();

    this.view.flag.flagMove(
      this.view.flag_2,
      this.model.calcValue(this.view.field, this.view.button_2)
    );

  }

  changeTypeButton() {
    this.view.removeElements();
    this.view.isRangeSlider = !this.view.isRangeSlider;
    this.view.renderElements();
    this.view.progressBarMove();
  }
}
export { Presenter };
