export class Model {
  constructor() {
    //   const value = document.querySelector(".slider__value");
    //   const tooltip = document.querySelector("#tooltip");
    //   const button_2 = document.querySelector(".slider__button_2");
    //   if (controler.rangeSlider) {
    //     function makeDistanceButton() {
    //       if (controler.horizontal) {
    //         if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
    //           button.style.left =
    //             button_2.offsetLeft - button.offsetWidth - stepPX + "px";
    //         }
    //       }
    //       if (!controler.horizontal) {
    //         if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
    //           button.style.top =
    //             button_2.offsetTop - button.offsetWidth - stepPX + "px";
    //         }
    //       }
    //       flagMove();
    //     }
    //     function makeDistanceButton_2() {
    //       if (controler.horizontal) {
    //         if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
    //           button_2.style.left =
    //             button.offsetLeft + button.offsetWidth + stepPX + "px";
    //         }
    //       }
    //       if (!controler.horizontal) {
    //         if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
    //           button_2.style.top =
    //             button.offsetTop + button.offsetWidth + stepPX + "px";
    //         }
    //       }
    //       flagMove();
    //     }
    //     clickListener(button, makeDistanceButton);
    //     clickListener(button_2, makeDistanceButton_2);
    //   }
    // static breakPoint() {
    //   let stepPX = (this.fieldRange * this.step) / (this.max - this.min);
    //   let arr = [];
    //   for (let i = 0; i <= this.fieldRange; i += stepPX) {
    //     arr.push(i);
    //   }
    //   arr.forEach(function (item, index, array) {
    //     if (
    //       Model.pxLength() >= item &&
    //       Model.pxLength() <= array[index + 1] - stepPX / 2
    //     ) {
    //       if (Model.horizontal) {
    //         // console.log(item);
    //         return item;
    //       }
    //     } else if (
    //       Model.pxLength() >= item + stepPX / 2 &&
    //       Model.pxLength() <= array[index + 1]
    //     ) {
    //       if (Model.horizontal) {
    //         // console.log(array[index + 1]);
    //         return array[index + 1];
    //       }
    //     }
    //   });
    // }
  }

  // static field = document.querySelector(".slider__field");
  // static button = document.querySelector(".slider__button");
  // static fieldRange = this.field.offsetWidth - this.button.offsetWidth;
  static shiftLeft;
  static max = 100;
  static min = 0;
  static step = 25;
  static rangeSlider = false;
  static horizontal = true;

  static pxLength(field, button) {
    Model.horizontal
      ? (this.shiftLeft =
          event.clientX -
          field.getBoundingClientRect().left -
          button.offsetWidth / 2)
      : (this.shiftLeft =
          event.clientY -
          field.getBoundingClientRect().top -
          button.offsetWidth / 2);

    if (this.shiftLeft >= field.offsetWidth - button.offsetWidth) {
      return field.offsetWidth - button.offsetWidth;
    }
    if (this.shiftLeft <= 0) {
      return 0;
    } else {
      return this.shiftLeft;
    }
  }
  static calcValue(field, button) {
    let result;
    let buttonOffset;
    let fieldRange = field.offsetWidth - button.offsetWidth;
    Model.horizontal
      ? (buttonOffset = button.offsetLeft)
      : (buttonOffset = button.offsetTop);

    result =
      Model.min +
      Math.trunc((buttonOffset * (Model.max - Model.min)) / fieldRange);
    return result;
  }
}
