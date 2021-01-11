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
    let fieldWidth: number = field.offsetWidth;
    let buttonWidth: number = button.offsetWidth;
    let stepPX: number =
      ((fieldWidth - button.offsetWidth) * this.step) / (this.max - this.min);
    let shiftLeft: number =
      mouseCoords - field.getBoundingClientRect().left - buttonWidth / 2;

    let nextButtonOffset: number;
    let prevButtonOffset: number;

    if (button.previousElementSibling) {
      prevButtonOffset = button.previousElementSibling.offsetLeft + buttonWidth;
    }

    if (!this.isHorizontal) {
      buttonWidth = button.offsetHeight;
      shiftLeft =
        mouseCoords - field.getBoundingClientRect().top - buttonWidth / 2;
      fieldWidth = field.offsetHeight;

      if (button.previousElementSibling) {
        prevButtonOffset =
          button.previousElementSibling.offsetTop + buttonWidth;
      }
    }

    let isButtonNext =
      button.nextElementSibling &&
      button.nextElementSibling.getAttribute("class") === "slider__button";

    if (isButtonNext) {
      nextButtonOffset = button.nextElementSibling.offsetLeft - buttonWidth;

      if (!this.isHorizontal) {
        nextButtonOffset = button.nextElementSibling.offsetTop - buttonWidth;
      }

      if (shiftLeft >= nextButtonOffset - stepPX) {
        if (stepPX > buttonWidth) {
          return nextButtonOffset + buttonWidth - stepPX;
        }
        return nextButtonOffset;
      }
    } else if (shiftLeft >= fieldWidth - buttonWidth) {
      return fieldWidth - buttonWidth;
    }

    let isButtonPrev =
      button.previousElementSibling &&
      button.previousElementSibling.getAttribute("class") === "slider__button";

    if (isButtonPrev) {
      prevButtonOffset = button.previousElementSibling.offsetLeft + buttonWidth;
      if (!this.isHorizontal) {
        prevButtonOffset =
          button.previousElementSibling.offsetTop + buttonWidth;
      }
      if (shiftLeft <= prevButtonOffset + stepPX) {
        if (stepPX > buttonWidth) {
          return prevButtonOffset - buttonWidth + stepPX;
        }
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

  calcFlagValue(field: HTMLElement, button: HTMLElement): number {
    let buttonOffset: number = button.offsetLeft;
    let buttonWidth: number = button.offsetWidth;
    let fieldWidth: number = field.offsetWidth;

    if (!this.isHorizontal) {
      fieldWidth = field.offsetHeight;
      buttonOffset = button.offsetTop;
    }

    let fieldRange: number = fieldWidth - buttonWidth;

    let result: number =
      this.min + (buttonOffset * (this.max - this.min)) / fieldRange;

    let countStep: number = this.min;

    while (result > countStep + this.step / 2) {
      countStep += this.step;
      if (countStep > this.max) {
        return (countStep -= this.step);
      }
    }
    if (this.step < 1) {
      return Number(countStep.toFixed(2));
    }
    return Number(countStep.toFixed(1));
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

  calcBreakPoint(field: HTMLElement, button: HTMLElement): number {
    let fieldWidth: number;
    let buttonOffset: number;
    this.isHorizontal
      ? ((fieldWidth = field.offsetWidth), (buttonOffset = button.offsetLeft))
      : ((fieldWidth = field.offsetHeight), (buttonOffset = button.offsetTop));

    let stepPX: number =
      ((fieldWidth - button.offsetWidth) * this.step) / (this.max - this.min);

    let arrPoints: number[] = [];
    for (let i = 0; i <= fieldWidth - button.offsetWidth; i += stepPX) {
      arr.push(i);
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
}
export default Model;
