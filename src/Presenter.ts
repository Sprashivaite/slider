import { Model } from "./Model";
import { View } from "./View";

export class Presenter {
  model: Model;
  view: View;
  
  constructor(model?: Model, view?: View) {
    this.model = model;
    this.view = view;
    this.view.renderElements();
    this.view.flagMove(view.flag, model.calcValue(view.field, view.button));
    this.view.flagMove(view.flag_2, model.calcValue(view.field, view.button_2));
    this.move_button();
    this.move_button_2();
  }



  move_button(): void{
    let that = this;

  function buttonMove(): void{
    that.view.sliderMove(that.view.button, that.model.pxLength(that.view.field, that.view.button, event));
  }
  function makeDistanceButton(): void{
    that.model.makeDistanceButton(that.view.button, that.view.button_2)
  }
  function flagMove(): void{
    that.view.flagMove(that.view.flag, that.model.calcValue(that.view.field, that.view.button))
    }
  function  breake(): void {
      that.view.sliderMove(that.view.button, that.model.breakPoint(that.view.field, that.view.button));
    }
    this.view.button.addEventListener("mousedown", function () {
      document.addEventListener("mousemove", buttonMove );
      if (that.model.rangeSlider) {
        document.addEventListener("mousemove", makeDistanceButton);
      }
      document.addEventListener("mousemove", ()=> that.view.progressBarMove());
      document.addEventListener("mousemove", flagMove);

      document.onmouseup = function () {
        breake();
        if (that.model.rangeSlider) {
          makeDistanceButton();
        }
        flagMove();
        that.view.progressBarMove();
        document.removeEventListener("mousemove", buttonMove);
        document.removeEventListener("mousemove", that.view.progressBarMove);
        document.removeEventListener("mousemove", flagMove);
        document.removeEventListener("mousemove", makeDistanceButton);

        document.onmouseup = null;
      };
    });

  }
  move_button_2(): void{
    let that = this;

  function buttonMove(){
    that.view.sliderMove(that.view.button_2, that.model.pxLength(that.view.field, that.view.button_2, event));
  }
  function makeDistanceButton(){
    that.model.makeDistanceButton_2(that.view.button, that.view.button_2)
  }
  function flagMove(){
    that.view.flagMove(that.view.flag_2, that.model.calcValue(that.view.field, that.view.button_2))
    }
  function  breake() {
      that.view.sliderMove(that.view.button_2, that.model.breakPoint(that.view.field, that.view.button_2));
    }
    this.view.button_2.addEventListener("mousedown", function () {
      document.addEventListener("mousemove", buttonMove );
      if (that.model.rangeSlider) {
        document.addEventListener("mousemove", makeDistanceButton);
      }
      document.addEventListener("mousemove", ()=> that.view.progressBarMove());
      document.addEventListener("mousemove", flagMove);

      document.onmouseup = function () {
        breake();
        if (that.model.rangeSlider) {
          makeDistanceButton();
        }
        flagMove();
        that.view.progressBarMove();
        document.removeEventListener("mousemove", buttonMove);
        document.removeEventListener("mousemove", that.view.progressBarMove);
        document.removeEventListener("mousemove", flagMove);
        document.removeEventListener("mousemove", makeDistanceButton);

        document.onmouseup = null;
      };
    });

  }

  changeOrientation() {
    this.view.removeElements();
    this.model.horizontal = !this.model.horizontal;
    this.view.horizontal = !this.view.horizontal;
    this.view.renderElements();

    this.view.flagMove(this.view.flag_2, this.model.calcValue(this.view.field, this.view.button_2));
    this.move_button_2();

  }
  changeTypeButton(){
    this.view.removeElements();
    this.model.rangeSlider = !this.model.rangeSlider;
    this.view.rangeSlider = !this.view.rangeSlider;
    this.view.renderElements();
    this.move_button_2();
  }
}
