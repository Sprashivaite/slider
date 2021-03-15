import IModelConfig from './IModelConfig';

class Model implements IModelConfig {
  max: number;

  min: number;

  step: number;

  isHorizontal: boolean;

  constructor(
    {
      max = 100, min = 0, step = 1, isHorizontal = true } = {} as IModelConfig
  ) {
    this.max = max;
    this.min = min;
    this.step = step;
    this.isHorizontal = isHorizontal;
    this.validate();
  }

  validate(): void {
    if (typeof this.max !== 'number' || this.max <= this.min) this.max = 100;
    if (typeof this.min !== 'number' || this.min >= this.max) this.min = 0;
    if (typeof this.step !== 'number' || this.step <= 0) this.step = 1;
    if (typeof this.isHorizontal !== 'boolean') this.isHorizontal = true;
  }

  calcBtnOffset(
    field: HTMLElement,
    button: HTMLElement,
    mouseCoords: number,
  ): number {
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;
    let shiftLeft: number = mouseCoords - field.getBoundingClientRect().left - buttonSize / 2;

    if (!this.isHorizontal) {
      buttonSize = button.offsetHeight;
      shiftLeft = mouseCoords - field.getBoundingClientRect().top - buttonSize / 2;
      fieldSize = field.offsetHeight;
    }

    if (shiftLeft >= fieldSize - buttonSize) return this.demarcateFromSiblingButton(button, fieldSize - buttonSize)
    if (shiftLeft <= 0) return this.demarcateFromSiblingButton(button, 0);
    return this.demarcateFromSiblingButton(button, shiftLeft);

  }

  demarcateFromSiblingButton(button: HTMLElement, value: number): number {
    let buttonSize: number = button.offsetWidth;

    const isButtonPrev: boolean | null = button.previousElementSibling
    && button.previousElementSibling.getAttribute('class') === 'slider__button';
    const isButtonNext: boolean | null = button.nextElementSibling
    && button.nextElementSibling.getAttribute('class') === 'slider__button';

    if (isButtonNext) {
      let nextButtonOffset: number = button.nextElementSibling!.offsetLeft - buttonSize;
      if (!this.isHorizontal) {
        nextButtonOffset = button.nextElementSibling!.offsetTop - buttonSize;
      }
      if (value >= nextButtonOffset) return nextButtonOffset;              
    }
    if (isButtonPrev) {
      let prevButtonOffset: number = button.previousElementSibling!.offsetLeft + buttonSize;
      if (!this.isHorizontal) {
        prevButtonOffset = button.previousElementSibling!.offsetTop + buttonSize;
      }
      if (value <= prevButtonOffset) return prevButtonOffset;      
    }
    return value
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

    const result: number = this.min
      + (buttonOffset * (this.max - this.min)) / (fieldSize - buttonSize);

    const numbersAfterPoint = (x: number): number => (
      x.toString().includes('.') ?  
      x.toString().split('.').pop()!.length : 
      0)
    return Number(result.toFixed(numbersAfterPoint(this.step)));
  }



  calcScaleValue(quantity: number): Array<number> {
    const arrValues: Array<number> = [];
    let value = this.min;
    let step = this.step;
    if(quantity > 11) {quantity = 11; step = (this.max - this.min) / 10}
    for (let i = 0; i < quantity - 1; i += 1) {
      const isFractionalStep = this.step < 1 || quantity - 1 > this.max;
      if (isFractionalStep) {
        arrValues.push(Number(value.toFixed(1)));
      } else {
        arrValues.push(Number(value.toFixed(0)));
      }
      value += step
    }
    arrValues.push(this.max);
    return arrValues;
  }

  calcStopPoint(field: HTMLElement, button: HTMLElement): number {
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;
    let buttonOffset: number = button.offsetLeft;

    if (!this.isHorizontal) {
      fieldSize = field.offsetHeight;
      buttonSize = button.offsetHeight;
      buttonOffset = button.offsetTop;
    }

    const stepPX: number = ((fieldSize - buttonSize) * this.step) / (this.max - this.min);

    const arrStopPoints: number[] = [];
    for (let i = 0; i <= fieldSize - buttonSize; i += stepPX) {
      arrStopPoints.push(i);
    }
    
    const stopPoint: number = arrStopPoints.find((item) => {
      return buttonOffset <= item + stepPX / 2 
    });

    return this.demarcateFromSiblingButton(button, stopPoint);
  }

  moveToValue(field: HTMLElement, button: HTMLElement, value: number): number {
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;

    if (!this.isHorizontal) {
      fieldSize = field.offsetHeight;
      buttonSize = button.offsetHeight;
    }

    const result: number = ((fieldSize - buttonSize) / (this.max - this.min))
        * (value - this.min);

    return result;
  }
}
export default Model;
