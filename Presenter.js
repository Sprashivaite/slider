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
    function removeTooltip(subscriber) {
      View.removeFlag();
    }
    // broadcast(changeOrientation);
    // broadcast(removeTooltip);

    // function сlickHoldListener(target, fn) {
    //   target.addEventListener("mousedown", function () {
    //     document.addEventListener("mousemove", fn);

    //     document.addEventListener("mouseup", function () {
    //       fn();
    //       document.removeEventListener("mousemove", fn);
    //       document.removeEventListener("mouseup", fn);
    //     });
    //   });
    // }

    // сlickHoldListener(button, move);
  }
  static fieldRange = View.field.offsetWidth - View.button.offsetWidth
  makeMove() {
    function move() {
      new View().sliderMove(Model.pxLength( View.field, View.button), Model.calcValue(View.field, View.button));
      
    }
    function breaker() {
      new View().sliderMove(Model.breakPoint( View.field, View.button), Model.calcValue(View.field, View.button));

      console.log(Model.breakPoint( View.field, View.button));
    }
    View.button.addEventListener("mousedown", function () {
      document.addEventListener("mousemove", move);

      document.addEventListener("mouseup", function () {
        new View().sliderMove(Model.breakPoint( View.field, View.button), Model.calcValue(View.field, View.button));
        document.removeEventListener("mousemove", move);

        document.removeEventListener("mouseup", move);
      });
    });
  }
}
