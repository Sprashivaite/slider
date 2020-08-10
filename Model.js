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

  }

  // static field = document.querySelector(".slider__field");
  // static button = document.querySelector(".slider__button");
  // static fieldRange = this.field.offsetWidth - this.button.offsetWidth;
  static shiftLeft;
  static max = 100;
  static min = 0;
  static step = 25;
  static rangeSlider = true;
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

    let countStep = 0;

    while (result > countStep + Model.step / 2) {
      countStep += Model.step;
      if (countStep > Model.max) {return countStep -= Model.step}
    }
    return countStep;
  }

  static breakPoint(field, button) {
    let stepPX = ((field.offsetWidth - button.offsetWidth) * Model.step) / (Model.max - Model.min);

    let arr = [];
    for (let i = 0; i <= (field.offsetWidth - button.offsetWidth); i += stepPX) {
      arr.push(i);
    }

    let val;
    arr.forEach(function (item, index, array) {
      
      if (
        Model.pxLength(field, button) >= item &&
        Model.pxLength(field, button) <= array[index + 1] - stepPX / 2
      ) {

          val = item;
        
      } else if (
        Model.pxLength(field, button) >= item + stepPX / 2 &&
        Model.pxLength(field, button) <= array[index + 1]
      ) {
        
          val = array[index + 1];
        
      }
    });
    return val;
  }
}
