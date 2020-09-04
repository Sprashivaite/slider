class Model {
  max: number;
  min: number;
  step: number;
  isRangeSlider: boolean;
  isHorizontal: boolean;
  constructor(step?: number) {
    this.max = 100;
    this.min = 0;
    this.step = Math.abs(step) || 10;
    if(this.step === 0) {this.step = 1}
    this.isRangeSlider = true;
    this.isHorizontal = true;
  }

  calcBtnOffset(
    field: HTMLElement,
    button: HTMLElement,
    mouseCoords: number
  ): number {
    let fieldWidth: number = field.offsetWidth;
    let buttonWidth: number = button.offsetWidth;

    let shiftLeft: number =
      mouseCoords - field.getBoundingClientRect().left - buttonWidth / 2;

    if (!this.isHorizontal) {
      shiftLeft =
        mouseCoords - field.getBoundingClientRect().top - buttonWidth / 2;
      fieldWidth = field.offsetHeight;
    }

    if (shiftLeft >= fieldWidth - buttonWidth) {
      return fieldWidth - buttonWidth;
    }
    if (shiftLeft <= 0) {
      return 0;
    }
    return shiftLeft;
  }
  moveToValue(button: HTMLElement, field: HTMLElement, value: number): void {
    let fieldWidth: number = field.offsetWidth;
    let buttonWidth: number = button.offsetWidth;

    if (!this.isHorizontal) {
      fieldWidth = field.offsetHeight;
    }
    let result: string =
      ((fieldWidth - buttonWidth) / (this.max - this.min)) *
        (value - this.min) +
      "px";

    this.isHorizontal
      ? (button.style.left = result)
      : (button.style.top = result);
  }
  calcValue(field: HTMLElement, button: HTMLElement) {
    let buttonOffset: number = button.offsetLeft;
    let buttonWidth: number = button.offsetWidth;
    let fieldWidth: number = field.offsetWidth;
    

    if (!this.isHorizontal) {
      fieldWidth = field.offsetHeight;
      buttonOffset = button.offsetTop;
    }

    let fieldRange: number = fieldWidth - buttonWidth;

let result: number;

    result =
      this.min +
      Math.trunc((buttonOffset * (this.max - this.min)) / fieldRange);

    let countStep: number = this.min;

    while (result > countStep + this.step / 2) {
      countStep += this.step;
      if (countStep > this.max) {
        return (countStep -= this.step);
      }
    }

    return +countStep.toFixed(1) ;
  }

  makeBreakPoint(field: HTMLElement, button: HTMLElement,mouseCoords: number): number {
    let that = this;
    let fieldWidth: number;
    this.isHorizontal
      ? (fieldWidth = field.offsetWidth)
      : (fieldWidth = field.offsetHeight);

    let stepPX: number =
      ((fieldWidth - button.offsetWidth) * this.step) / (this.max - this.min);

    let arr: Array<number> = [];
    for (let i = 0; i <= fieldWidth - button.offsetWidth; i += stepPX) {
      arr.push(i);
    }

    let val: number;
    arr.forEach(function (item, index, array) {
      if (
        that.calcBtnOffset(field, button, mouseCoords) >= item &&
        that.calcBtnOffset(field, button, mouseCoords) <= array[index + 1] - stepPX / 2
      ) {
        val = item;
      } else if (
        that.calcBtnOffset(field, button, mouseCoords) >= item + stepPX / 2 &&
        that.calcBtnOffset(field, button, mouseCoords) <= array[index + 1]
      ) {
        val = array[index + 1];
      }
    });
    return val;
  }

  makeDistanceButton(button: HTMLElement, button_2: HTMLElement) {
    if (this.isHorizontal) {
      if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
        button.style.left = button_2.offsetLeft - button.offsetWidth + "px";
      }
    }
    if (!this.isHorizontal) {
      if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
        button.style.top = button_2.offsetTop - button.offsetWidth + "px";
      }
    }
  }
  makeDistanceButton_2(button: HTMLElement, button_2: HTMLElement) {
    if (this.isHorizontal) {
      if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
        button_2.style.left = button.offsetLeft + button.offsetWidth + "px";
      }
    }
    if (!this.isHorizontal) {
      if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
        button_2.style.top = button.offsetTop + button.offsetWidth + "px";
      }
    }
  }
}
export {Model}