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

    
    this.facadeMoveButton();
  }

  moveButton(button) {
    let that = this;
    function handlerButtonMove(): void {
      that.view.buttonMove(
        button,
        that.model.calcBtnOffset(that.view.field, button, event)
      );
      
    }
    button.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", handlerButtonMove);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", handlerButtonMove);
      });
    });
  }

  makeDistanceButton() {
    let that = this;
    function handlerMakeDistanceButton(): void {
      that.model.makeDistanceButton(that.view.button, that.view.button_2);
    }
    if (this.model.isRangeSlider) {
      that.view.button.addEventListener("mousedown", () => {
        document.addEventListener("mousemove", handlerMakeDistanceButton);

        document.addEventListener("mouseup", () => {
          handlerMakeDistanceButton();
          document.removeEventListener("mousemove", handlerMakeDistanceButton);
        });
      });
    }
  }
  makeDistanceButton_2() {
    let that = this;
    function handlerMakeDistanceButton_2(): void {
      that.model.makeDistanceButton_2(that.view.button, that.view.button_2);
    }
    if (this.model.isRangeSlider) {
      that.view.button_2.addEventListener("mousedown", () => {
        document.addEventListener("mousemove", handlerMakeDistanceButton_2);

        document.addEventListener("mouseup", () => {
          handlerMakeDistanceButton_2()
          document.removeEventListener("mousemove", handlerMakeDistanceButton_2);
        });
      });
    }
  }
  moveflag(button, flag) {
    let that = this;
    function moveFlagHandler(): void {
      that.view.flagMove(
        flag,
        that.model.calcValue(that.view.field, button)
      );
    }
    button.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", moveFlagHandler);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveFlagHandler);
      });
    });
  }

  makeBreakpointButton(button) {
    let that = this;

    function breakpointButtonHeandle() {
      that.view.buttonMove(
        button,
        that.model.makeBreakPoint(that.view.field, button)
      );

      document.removeEventListener("mouseup", breakpointButtonHeandle);
      
    }

    button.addEventListener("mousedown", () => {
      document.addEventListener("mouseup", breakpointButtonHeandle);



    });
  }

  moveProgressBar(button) {
    let that = this;

    function progressBarMoveHandler(){
      that.view.progressBarMove();
    }

    button.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", progressBarMoveHandler);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", progressBarMoveHandler);
      });
    });
  }

  facadeMoveButton(){
    
    this.moveButton(this.view.button);
        this.makeBreakpointButton(this.view.button);  
    if(this.model.isRangeSlider){this.makeDistanceButton();}
  
    this.moveProgressBar(this.view.button);
    this.moveflag(this.view.button, this.view.flag);

    if(this.model.isRangeSlider){
      this.moveButton(this.view.button_2);
      this.makeBreakpointButton(this.view.button_2);
      this.makeDistanceButton_2();
      
      this.moveProgressBar(this.view.button_2);
      this.moveflag(this.view.button_2, this.view.flag_2);
    }
  }


  changeOrientation() {
    this.view.removeElements();
    this.model.isHorizontal = !this.model.isHorizontal;
    this.view.isHorizontal = !this.view.isHorizontal;
    this.view.renderElements();

    this.view.flagMove(
      this.view.flag_2,
      this.model.calcValue(this.view.field, this.view.button_2)
    );
    this.facadeMoveButton();
  }
  changeTypeButton() {
    this.view.removeElements();
    this.model.isRangeSlider = !this.model.isRangeSlider;
    this.view.isRangeSlider = !this.view.isRangeSlider;
    this.view.renderElements();
    this.facadeMoveButton();
  }
}