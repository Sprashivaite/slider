import { Model } from "./Model.js";
import { View } from "./View.js";

export class Presenter {
  constructor() {
    View.renderElements();
    Presenter.changeFlag();
    Presenter.makeMove();
  }

  static move() {

    View.sliderMove(View.button, Model.pxLength(View.field, View.button))

  }
  static changeFlag() {
    View.flagMove();
    View.flagValue(View.flag, Model.calcValue(View.field, View.button));
  }
  static breaker() {
    View.sliderMove(View.button, Model.breakPoint(View.field, View.button));
  }
  static makeDistance() {
    Model.makeDistanceButton(View.button, View.button_2);
  }

  static makeMove() {
    View.button.addEventListener("mousedown", function () {
      document.addEventListener("mousemove", Presenter.move);

      if (Model.rangeSlider) {
        document.addEventListener("mousemove", Presenter.makeDistance);
      }
      document.addEventListener("mousemove", View.progressBarMove);
      document.addEventListener("mousemove", Presenter.changeFlag);

      document.onmouseup = function () {
        Presenter.breaker();
        if (Model.rangeSlider) {
          Presenter.makeDistance();
        }
        Presenter.changeFlag();
        View.progressBarMove();
        document.removeEventListener("mousemove", Presenter.move);
        document.removeEventListener("mousemove", View.progressBarMove);
        document.removeEventListener("mousemove", Presenter.changeFlag);
        document.removeEventListener("mousemove", Presenter.makeDistance);

        document.onmouseup = null;
      };
    });
    if (Model.rangeSlider) {
      function move_2() {
        View.sliderMove(
          View.button_2,
          Model.pxLength(View.field, View.button_2)
        );
      }
      function changeFlag_2() {
        View.flagMove();
        View.flagValue(View.flag_2, Model.calcValue(View.field, View.button_2));
      }
      function breaker_2() {
        View.sliderMove(
          View.button_2,
          Model.breakPoint(View.field, View.button_2)
        );
      }
      changeFlag_2();
      function makeDistance_2() {
        Model.makeDistanceButton_2(View.button, View.button_2);
      }
      View.button_2.addEventListener("mousedown", function () {
        document.addEventListener("mousemove", move_2);

        document.addEventListener("mousemove", makeDistance_2);
        document.addEventListener("mousemove", View.progressBarMove);
        document.addEventListener("mousemove", changeFlag_2);
        document.onmouseup = function () {
          breaker_2();
          makeDistance_2();
          changeFlag_2();
          View.progressBarMove();
          document.removeEventListener("mousemove", View.progressBarMove);
          document.removeEventListener("mousemove", changeFlag_2);
          document.removeEventListener("mousemove", move_2);
          document.removeEventListener("mousemove", makeDistance_2);
          document.onmouseup = null;
        };
      });
    }
  }

  static moveToValue(button, value) {
    let width = View.field.offsetWidth;
    if (!Model.horizontal) {
      width = View.field.offsetHeight;
    }
    console.log(width);
    let result =
      ((width - View.button.offsetWidth) / (Model.max - Model.min)) *
        (value - Model.min) +
      "px";
    Model.horizontal
      ? (button.style.left = result)
      : (button.style.top = result);
  }
  static changeOrientation() {
    View.removeElements();
    Model.horizontal ? (Model.horizontal = false) : (Model.horizontal = true);
    View.horizontal ? (View.horizontal = false) : (View.horizontal = true);
    View.renderElements();
    View.flagMove();
    View.flagValue(View.flag_2, Model.calcValue(View.field, View.button_2));
  }
}
