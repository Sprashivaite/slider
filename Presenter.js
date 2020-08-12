import { Model } from "./Model.js";
import { View } from "./View.js";

export class Presenter {
  constructor() {
    // broadcast(changeOrientation);
    // broadcast(removeTooltip);
    // broadcast(changeType);
    View.renderElements();

  }

  static makeMove() {
    function move() {
      View.sliderMove(View.button, Model.pxLength(View.field, View.button));
    }

    function changeFlag() {
      View.flagMove();
      View.flagValue(View.flag, Model.calcValue(View.field, View.button));
    }

    function breaker() {
      View.sliderMove(
        View.button,
        Model.breakPoint(View.field, View.button),
        View.flag,
        Model.calcValue(View.field, View.button)
      );
    }
    function makeDistance() {
      Model.makeDistanceButton(View.button, View.button_2);
    }
    function makeDistance_2() {
      Model.makeDistanceButton_2(View.button, View.button_2);
    }
    changeFlag();
    View.button.addEventListener("mousedown", function () {
      document.addEventListener("mousemove", move);
      if (Model.rangeSlider) {
        document.addEventListener("mousemove", makeDistance);
      }
      document.addEventListener("mousemove", changeFlag);
      document.onmouseup = function () {
        breaker();
        if (Model.rangeSlider) {
          makeDistance();
        }
        changeFlag();
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mousemove", changeFlag);
        document.removeEventListener("mousemove", makeDistance);

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
      View.button_2.addEventListener("mousedown", function () {
        document.addEventListener("mousemove", move_2);

        document.addEventListener("mousemove", makeDistance_2);
        document.addEventListener("mousemove", changeFlag_2);
        document.onmouseup = function () {
          breaker_2();
          makeDistance_2();
          changeFlag_2();
          document.removeEventListener("mousemove", changeFlag_2);
          document.removeEventListener("mousemove", move_2);
          document.removeEventListener("mousemove", makeDistance_2);
          document.onmouseup = null;
        };
      });
    }
  }
  static moveToValue(button, value) {
    let result =
      ((View.field.offsetWidth - View.button.offsetWidth) /
        (Model.max - Model.min)) *
        (value - Model.min) +
      "px";
    Model.horizontal
      ? (button.style.left = result)
      : (button.style.top = result);
  }

  static observers = [];
  static subscribe(target) {
    Presenter.observers.push(target);
  }
  static broadcast(data) {
    Presenter.observers.forEach((subscriber) => data(subscriber));
  }

  // static changeOrientation(subscriber) {
  //   subscriber.horizontal
  //     ? (subscriber.horizontal = false)
  //     : (subscriber.horizontal = true);
  // }
  static changeOrientation() {
    [View.flag, View.flag_2, View.button, View.button_2, View.field].forEach((item) =>
      item.remove()
    );
    Model.horizontal ? (Model.horizontal = false) : (Model.horizontal = true);
    View.horizontal ? (View.horizontal = false) : (View.horizontal = true);

    View.renderElements();
    View.flagMove();
    View.flagValue(View.flag_2, Model.calcValue(View.field, View.button_2))
  }
  static removeTooltip(subscriber) {
    View.removeFlag();
  }
  static changeType(subscriber) {
    subscriber.rangeSlider
      ? (subscriber.rangeSlider = false)
      : (subscriber.rangeSlider = true);
  }
  static changeStep(value){
    Model.step = value;
  }
}
