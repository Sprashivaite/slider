import IModelConfig from "./IConfig/IModelConfig";

class Model {
  max: number;
  min: number;
  step: number;
  isHorizontal: boolean;
  constructor(
    { max = 100, min = 0, step = 1, isHorizontal = true } = {} as IModelConfig
  ) {
    this.max = max;
    this.min = min;
    this.step = step;
    this.isHorizontal = isHorizontal;
    this.validate();
  }

  validate() {
    if (typeof this.max !== "number" || this.max <= this.min) this.max = 100;
    if (typeof this.min !== "number" || this.min >= this.max) this.min = 0;
    if (typeof this.step !== "number" || this.step <= 0) this.step = 1;
    if (typeof this.isHorizontal !== "boolean") this.isHorizontal = true;
  }
  calcBtnOffset(
    field: HTMLElement,
    button: HTMLElement,
    mouseCoords: number
  ): number {
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;
    let shiftLeft: number =
      mouseCoords - field.getBoundingClientRect().left - buttonSize / 2;

    if (!this.isHorizontal) {
      buttonSize = button.offsetHeight;
      shiftLeft =
        mouseCoords - field.getBoundingClientRect().top - buttonSize / 2;
      fieldSize = field.offsetHeight;
    }
    if (shiftLeft >= fieldSize - buttonSize) {
      return fieldSize - buttonSize;
    }
    if (shiftLeft <= 0) {
      return 0;
    }

    let stepPX: number =
      ((fieldSize - buttonSize) * this.step) / (this.max - this.min);
    let isButtonNext: boolean =
      button.nextElementSibling &&
      button.nextElementSibling.getAttribute("class") === "slider__button";

    if (isButtonNext) {
      let nextButtonOffset: number =
        button.nextElementSibling.offsetLeft - buttonSize;
      if (!this.isHorizontal) {
        nextButtonOffset = button.nextElementSibling.offsetTop - buttonSize;
      }
      if (shiftLeft >= nextButtonOffset - stepPX) {
        if (stepPX > buttonSize) {
          return nextButtonOffset + buttonSize - stepPX;
        }
        return nextButtonOffset;
      }
    }

    let isButtonPrev =
      button.previousElementSibling &&
      button.previousElementSibling.getAttribute("class") === "slider__button";

    if (isButtonPrev) {
      let prevButtonOffset: number =
        button.previousElementSibling.offsetLeft + buttonSize;
      if (!this.isHorizontal) {
        prevButtonOffset = button.previousElementSibling.offsetTop + buttonSize;
      }
      if (shiftLeft <= prevButtonOffset + stepPX) {
        if (stepPX > buttonSize) {
          return prevButtonOffset - buttonSize + stepPX;
        }
        return prevButtonOffset;
      }
    }
    return shiftLeft;
  }
  calcFlagValue(field: HTMLElement, button: HTMLElement): number {
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;
    let buttonOffset: number = button.offsetLeft;

    if (!this.isHorizontal) {
      fieldSize = field.offsetHeight;
      buttonSize = button.offsetHeight;
      buttonOffset = button.offsetTop;
    }

    const result: number =
      this.min +
      (buttonOffset * (this.max - this.min)) / (fieldSize - buttonSize);

    const numbersAfterPoint = (x: number) =>
      x.toString().includes(".") ? x.toString().split(".").pop().length : 0;

    return Number(result.toFixed(numbersAfterPoint(this.step)));
  }
  calcScaleValue(quantity: number): Array<number> {
    let arrValues: Array<number> = [];
    let value = this.min;
    for (let i = 0; i < quantity - 1; i++) {
      let isFractionalStep = this.step < 1 || quantity - 1 > this.max;
      if (isFractionalStep) {
        arrValues.push(Number(value.toFixed(1)));
      } else {
        arrValues.push(Number(value.toFixed(0)));
      }

      value += this.max / (quantity - 1);
    }
    arrValues.push(this.max);
    return arrValues;
  }
  calcStopPoint(field: HTMLElement, button: HTMLElement): number {
    let fieldWidth: number;
    let buttonOffset: number;
    this.isHorizontal
      ? ((fieldWidth = field.offsetWidth), (buttonOffset = button.offsetLeft))
      : ((fieldWidth = field.offsetHeight), (buttonOffset = button.offsetTop));

    let stepPX: number =
      ((fieldWidth - button.offsetWidth) * this.step) / (this.max - this.min);

    let arrPoints: number[] = [];
    for (let i = 0; i <= fieldWidth - button.offsetWidth; i += stepPX) {
      arrPoints.push(i);
    }

    let breakPoint: number = fieldWidth - button.offsetWidth;
    arrPoints.forEach(function (item, index, array) {
      let isButtonBeforePoint =
        buttonOffset >= item && buttonOffset <= array[index + 1] - stepPX / 2;
      let isButtonAfterPoint =
        buttonOffset >= item + stepPX / 2 && buttonOffset <= array[index + 1];
      if (isButtonBeforePoint) {
        breakPoint = item;
      } else if (isButtonAfterPoint) {
        breakPoint = array[index + 1];
      }
    });
    return breakPoint;
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
}
export default Model;
