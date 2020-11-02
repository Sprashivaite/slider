class Model {
  max: number;
  min: number;
  private _step: number;
  private _isHorizontal: boolean;
  constructor() {
    this.max = 105;
    this.min = 0;
    this._step = 10;
    this._isHorizontal = true;
  }

  get isHorizontal(): boolean {
    return this._isHorizontal;
  }
  set isHorizontal(boolean) {
    if (typeof boolean === "boolean") this._isHorizontal = boolean;
  }
  get step(): number {
    return this._step;
  }
  set step(value) {
    if (value === 0) {
      value = 1;
    }
    this._step = Math.abs(value);
  }

  calcBtnOffset(
    field: HTMLElement,
    button: HTMLElement,
    mouseCoords: number
  ): number {
    let fieldWidth: number = field.offsetWidth;
    let buttonWidth: number = button.offsetWidth;
    let nextButtonOffset: number = button.nextElementSibling.offsetLeft - buttonWidth;
    let prevButtonOffset: number;
    if (button.previousElementSibling) {
    prevButtonOffset = button.previousElementSibling.offsetLeft + buttonWidth;
    }
    let shiftLeft: number =
      mouseCoords - field.getBoundingClientRect().left - buttonWidth / 2;

    if (!this.isHorizontal) {
      buttonWidth = button.offsetHeight;
      shiftLeft =
        mouseCoords - field.getBoundingClientRect().top - buttonWidth / 2;
      fieldWidth = field.offsetHeight;
      nextButtonOffset = button.nextElementSibling.offsetTop - buttonWidth;
      if (button.previousElementSibling) {
      prevButtonOffset = button.previousElementSibling.offsetTop + buttonWidth;
      }
    }

    if (button.nextElementSibling.getAttribute("class") === "slider__button") {
      if (shiftLeft >= nextButtonOffset) {
        return nextButtonOffset;
      }
    } else if (shiftLeft >= fieldWidth - buttonWidth) {
      return fieldWidth - buttonWidth;
    }

    if (button.previousElementSibling) {
      if (
        button.previousElementSibling.getAttribute("class") ===
          "slider__button" &&
        shiftLeft <= prevButtonOffset
      ) {
        return prevButtonOffset;
      }
    } else if (shiftLeft <= 0) {
      return 0;
    }

    return shiftLeft;
  }

  moveToValue(field: HTMLElement, button: HTMLElement, value: number): void {
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

  calcValue(field: HTMLElement, button: HTMLElement): number {
    let buttonOffset: number = button.offsetLeft;
    let buttonWidth: number = button.offsetWidth;
    let fieldWidth: number = field.offsetWidth;

    if (!this.isHorizontal) {
      fieldWidth = field.offsetHeight;
      buttonOffset = button.offsetTop;
    }

    let fieldRange: number = fieldWidth - buttonWidth;

    let result: number =
      this.min +
      Math.trunc((buttonOffset * (this.max - this.min)) / fieldRange);

    let countStep: number = this.min;

    while (result > countStep + this.step / 2) {
      countStep += this.step;
      if (countStep > this.max) {
        return (countStep -= this.step);
      }
    }

    return +countStep.toFixed(1);
  }

  makeBreakPoint(field: HTMLElement, button: HTMLElement): number {
    let fieldWidth: number;
    let buttonOffset: number;
    this.isHorizontal
      ? ((fieldWidth = field.offsetWidth), (buttonOffset = button.offsetLeft))
      : ((fieldWidth = field.offsetHeight), (buttonOffset = button.offsetTop));

    let stepPX: number =
      ((fieldWidth - button.offsetWidth) * this.step) / (this.max - this.min);

    let arr: number[] = [];
    for (let i = 0; i <= fieldWidth - button.offsetWidth; i += stepPX) {
      arr.push(i);
    }

    let val: number = fieldWidth - button.offsetWidth;
    arr.forEach(function (item, index, array) {
      if (
        buttonOffset >= item &&
        buttonOffset <= array[index + 1] - stepPX / 2
      ) {
        val = item;
      } else if (
        buttonOffset >= item + stepPX / 2 &&
        buttonOffset <= array[index + 1]
      ) {
        val = array[index + 1];
      }
    });
    return val;
  }
}
export { Model };
