import Model from "../Model/Model";
import View from "../View/View";
import ViewButton from "../View/subView/ViewButton";
import ViewFlag from "../View/subView/ViewFlag";

class Presenter {
  model: Model;

  view: View;

  buttonValue1: number;
  
  secondButtonValue: number;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.buttonValue1 = 0;
    this.secondButtonValue = 0;
  }

  moveButton(button: ViewButton): void {
    button.moveButton(
      this.model.calcBtnOffset(
        this.view.field.div,
        button.div,
        this.view.handler.mouseCoords,
      ),
    );
  }

  changeFlagValue(button: HTMLElement, flag: ViewFlag): void {
    flag.changeFlagValue(this.model.calcFlagValue(this.view.field.div, button));
  }

  updateScaleValues(): void {
    const quantity = this.view.scale.div.children.length;
    this.view.scale.updateValues(this.model.calcScaleValue(quantity));
  }

  makeBreakpointButton(button: ViewButton): void {
    button.moveButton(this.model.calcStopPoint(this.view.field.div, button.div));
    if (!this.model.isHorizontal) {
      button.moveButton(this.model.calcStopPoint(this.view.field.div, button.div));
    }
  }

  mouseMoveButton(): void {
    this.moveButton(this.view.button1);
    this.changeFlagValue(this.view.button1.div, this.view.flag1);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.buttonValue1 = Number(this.view.flag1.div.innerHTML);
  }

  mouseMoveButton2(): void {
    this.moveButton(this.view.button2);
    this.changeFlagValue(this.view.button2.div, this.view.flag2);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.secondButtonValue = Number(this.view.flag2.div.innerHTML);
  }

  mouseUp(): void {
    this.makeBreakpointButton(this.view.button1);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.changeFlagValue(this.view.button1.div, this.view.flag1);
  }

  mouseUp2(): void {
    this.makeBreakpointButton(this.view.button2);
    this.view.progressBar.progressBarMove();
    this.view.progressBar.changeColorBar();
    this.changeFlagValue(this.view.button2.div, this.view.flag2);
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
      this.mouseUp2();
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
