export class Model {
  max: number;
  min: number;
  step: number;
  rangeSlider: boolean;
  horizontal: boolean;
  constructor() {
    this.max = 100;
    this.min = 0;
    this.step = 5;
    this.rangeSlider = true;
    this.horizontal = true;
  }

  pxLength(field: HTMLElement, button: HTMLElement, event: MouseEventInit ): number {
    let shiftLeft: number;
    let Field: number;

    shiftLeft =
    event.clientX  -
      field.getBoundingClientRect().left -
      button.offsetWidth / 2;

    if (!this.horizontal) {
      shiftLeft =
        event.clientY -
        field.getBoundingClientRect().top -
        button.offsetWidth / 2;
    }

    this.horizontal
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
  moveToValue(button: HTMLElement, field: HTMLElement, value: number): void {
    let width: number = field.offsetWidth;
    if (!this.horizontal) {
      width = field.offsetHeight;
    }
    let result: string =
      ((width - button.offsetWidth) / (this.max - this.min)) *
        (value - this.min) +
      "px";
    this.horizontal
      ? (button.style.left = result)
      : (button.style.top = result);
  }
  calcValue(field: HTMLElement, button: HTMLElement) {
    let result: number;
    let buttonOffset: number;
    let Field: number;
    this.horizontal
    ? (Field = field.offsetWidth)
    : (Field = field.offsetHeight);
    let fieldRange = Field - button.offsetWidth;

    this.horizontal
      ? (buttonOffset = button.offsetLeft)
      : (buttonOffset = button.offsetTop);

    result =
      this.min +
      Math.trunc((buttonOffset * (this.max - this.min)) / fieldRange);
    let countStep = this.min;


    while (result > countStep + this.step / 2) {
      countStep += this.step;
      if (countStep > this.max) {
        return (countStep -= this.step);
      }
    }

    return countStep;
  }

  breakPoint(field: HTMLElement, button: HTMLElement) {
    let that = this;
    let Field: number;
    this.horizontal
    ? (Field = field.offsetWidth)
    : (Field = field.offsetHeight);

    let stepPX: number =
      ((Field - button.offsetWidth) * this.step) /
      (this.max - this.min);

    let arr: Array<number> = [];
    for (let i = 0; i <= Field - button.offsetWidth; i += stepPX) {
      arr.push(i);
    }

    let val: number;
    arr.forEach(function (item, index, array) {
      if (
        that.pxLength(field, button, event) >= item &&
        that.pxLength(field, button, event) <= array[index + 1] - stepPX / 2
      ) {
        val = item;
      } else if (
        that.pxLength(field, button, event) >= item + stepPX / 2 &&
        that.pxLength(field, button, event) <= array[index + 1]
      ) {
        val = array[index + 1];
      }
    });
    return val;
  }

  makeDistanceButton(button: HTMLElement, button_2: HTMLElement) {
    if (this.horizontal) {
      if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
        button.style.left =
          button_2.offsetLeft - button.offsetWidth + "px";
      }
    }
        if (!this.horizontal) {
    if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
        button.style.top =
          button_2.offsetTop - button.offsetWidth + "px";
      }
    }
  }
  makeDistanceButton_2(button: HTMLElement, button_2: HTMLElement) {
    if (this.horizontal) {
      if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
        button_2.style.left =
          button.offsetLeft + button.offsetWidth + "px";
      }
    }
    if (!this.horizontal) {
      if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
        button_2.style.top =
          button.offsetTop + button.offsetWidth + "px";
      }
    }
  }
}
