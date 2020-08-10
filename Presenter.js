import { Model } from "./Model.js";
import { View } from "./View.js";

export class Presenter {
  constructor() {
    
    let observers = [];
    function subscribe(target) {
      observers.push(target);
    }
    function broadcast(data) {
      observers.forEach((subscriber) => data(subscriber));
    }
    subscribe(View);
    subscribe(Model);

    function changeOrientation(subscriber) {
      subscriber.horizontal
        ? (subscriber.horizontal = false)
        : (subscriber.horizontal = true);
    }
    function changeType(subscriber) {
      subscriber.rangeSlider
        ? (subscriber.rangeSlider = false)
        : (subscriber.rangeSlider = true);
    }
    function removeTooltip(subscriber) {
      View.removeFlag();
    }
    // broadcast(changeOrientation);
    // broadcast(removeTooltip);
    // broadcast(changeType);
View.renderElements();
  }

  makeMove() {
    function move() {
      View.sliderMove(
        View.button,
        Model.pxLength(View.field, View.button)
      );
    }

    function changeFlag() {
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

    View.button.addEventListener("mousedown", function () {
      document.addEventListener("mousemove", move);
      document.addEventListener("mousemove", changeFlag);
      document.onmouseup = function () {
        breaker();
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mousemove", changeFlag);
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
        View.flagValue(View.flag_2, Model.calcValue(View.field, View.button_2));
      }
      function breaker_2() {
        View.sliderMove(
          View.button_2,
          Model.breakPoint(View.field, View.button_2)
        );
      }
      View.button_2.addEventListener("mousedown", function () {
        
        document.addEventListener("mousemove", move_2);
        document.addEventListener("mousemove", changeFlag_2);
        document.onmouseup = function () {
          breaker_2();
          document.removeEventListener("mousemove", changeFlag_2);
          document.removeEventListener("mousemove", move_2);
          document.onmouseup = null;
        };
      });
    }
  }
}
