export class Model {
  static max = 100;
  static min = 0;
  static step = 1;
  static rangeSlider = true;
  static horizontal = true;
  
  static pxLength(field, button) {
    let shiftLeft;
    let Field;
    Model.horizontal
      ? (shiftLeft =
          event.clientX -
          field.getBoundingClientRect().left -
          button.offsetWidth / 2)
      : (shiftLeft =
          event.clientY -
          field.getBoundingClientRect().top -
          button.offsetWidth / 2);

    Model.horizontal
      ? (Field = field.offsetWidth)
      : (Field = field.offsetHeight);

    if (shiftLeft >= Field - button.offsetWidth) {
      return Field - button.offsetWidth;
    }
    if (shiftLeft <= 0) {
      return 0;
    } else {
      return shiftLeft;
    }
  }

  static calcValue(field, button) {
    let result;
    let buttonOffset;
    let Field;
    Model.horizontal
    ? (Field = field.offsetWidth)
    : (Field = field.offsetHeight);
    let fieldRange = Field - button.offsetWidth;

    Model.horizontal
      ? (buttonOffset = button.offsetLeft)
      : (buttonOffset = button.offsetTop);

    result =
      Model.min +
      Math.trunc((buttonOffset * (Model.max - Model.min)) / fieldRange);
    let countStep = Model.min;


    while (result > countStep + Model.step / 2) {
      countStep += Model.step;
      if (countStep > Model.max) {
        return (countStep -= Model.step);
      }
    }

    return countStep;
  }

  static breakPoint(field, button) {
    let Field;
    Model.horizontal
    ? (Field = field.offsetWidth)
    : (Field = field.offsetHeight);

    let stepPX =
      ((Field - button.offsetWidth) * Model.step) /
      (Model.max - Model.min);

    let arr = [];
    for (let i = 0; i <= Field - button.offsetWidth; i += stepPX) {
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
  static makeDistanceButton(button, button_2) {
    if (Model.horizontal) {
      if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
        button.style.left =
          button_2.offsetLeft - button.offsetWidth + "px";
      }
    }
        if (!Model.horizontal) {
    if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
        button.style.top =
          button_2.offsetTop - button.offsetWidth + "px";
      }
    }
  }

  static makeDistanceButton_2(button, button_2) {
    if (Model.horizontal) {
      if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
        button_2.style.left =
          button.offsetLeft + button.offsetWidth + "px";
      }
    }
    if (!Model.horizontal) {
      if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
        button_2.style.top =
          button.offsetTop + button.offsetWidth + "px";
      }
    }
  }
}
