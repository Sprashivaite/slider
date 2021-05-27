import IModelConfig from './IModelConfig';
import {DEFAULT_MODEL_CONFIG} from '../defaults'

class Model {

  config!: IModelConfig;

  constructor(config = DEFAULT_MODEL_CONFIG as IModelConfig) {
    this.init(config)
  }

  calcBtnOffset(
    field: HTMLElement,
    button: HTMLElement,
    mouseCoords: number,
  ): number {
    const { isHorizontal } = this.config
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;
    let shiftLeft: number = mouseCoords - field.getBoundingClientRect().left - buttonSize / 2;

    if (!isHorizontal) {
      buttonSize = button.offsetHeight;
      shiftLeft = mouseCoords - field.getBoundingClientRect().top - buttonSize / 2;
      fieldSize = field.offsetHeight;
    }

    if (shiftLeft >= fieldSize - buttonSize) {
      return this.demarcateFromSiblingButton(button, fieldSize - buttonSize)
    }

    if (shiftLeft <= 0) {
      return this.demarcateFromSiblingButton(button, 0);
    }

    return this.demarcateFromSiblingButton(button, shiftLeft);
  }

  calcFlagValue(field: HTMLElement, button: HTMLElement): number {
    const {max, min, step, isHorizontal} = this.config
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;
    let buttonOffset: number = button.offsetLeft;

    if (!isHorizontal) {
      fieldSize = field.offsetHeight;
      buttonSize = button.offsetHeight;
      buttonOffset = button.offsetTop;
    }

    let result: number = min + 
    (buttonOffset * (max - min)) / 
    ((fieldSize - buttonSize));

    result = Number(result.toFixed(this.calcDigitsAfterDot()));

    const stepsPoints: number[] = [];

    for (let i = min; i <= max; i += step) {
      stepsPoints.push(i);         
    }

    let nearestValue: number | undefined = stepsPoints.find((item, index, array) => {
      const halfStepRes = result + (step/2)
      return halfStepRes >= item && halfStepRes < array[index + 1]
    });

    if (nearestValue === undefined) nearestValue = stepsPoints.pop()
    else result = nearestValue;

    return Number(result.toFixed(this.calcDigitsAfterDot()));
  }

  calcScaleValue(quantity: number): Array<number> {
    const {max, min} = this.config
    const arrValues: Array<number> = [];
    let value = min;
    let {step} = this.config;
    let thisQuantity = quantity;

    if (thisQuantity > 11) { thisQuantity = 11; step = (max - min) / 10 }
    
    for (let i = 0; i < thisQuantity - 1; i += 1) {
      const isFractionalStep = step < 1 || thisQuantity - 1 > max;
      if (isFractionalStep) arrValues.push(Number(value.toFixed(1)));
      else arrValues.push(Number(value.toFixed(0)));
      value += step
    }

    arrValues.push(max);

    return arrValues;
  }

  calcStopPoint(field: HTMLElement, button: HTMLElement): number {
    const {max, min, step, isHorizontal} = this.config
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;
    let buttonOffset: number = button.offsetLeft;

    if (!isHorizontal) {
      fieldSize = field.offsetHeight;
      buttonSize = button.offsetHeight;
      buttonOffset = button.offsetTop;
    }

    const stepPX: number = ((fieldSize - buttonSize) * step) / (max - min);

    const arrStopPoints: number[] = [];
    for (let i = 0; i <= fieldSize - buttonSize; i += stepPX) {
      arrStopPoints.push(i);
    }

    let stopPoint: number | undefined = arrStopPoints.find(
      item => buttonOffset <= item + stepPX / 2
    );

    if(stopPoint === undefined) stopPoint = fieldSize - buttonSize;   

    return this.demarcateFromSiblingButton(button, stopPoint);
  }

  moveToValue(field: HTMLElement, button: HTMLElement, value: number): number {
    const {max, min, isHorizontal} = this.config
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;

    if (!isHorizontal) {
      fieldSize = field.offsetHeight;
      buttonSize = button.offsetHeight;
    }

    const result: number = ((fieldSize - buttonSize) / (max - min))
      * (value - min);

    return this.demarcateFromSiblingButton(button, result);
  }

  private init(config: IModelConfig): void {  
    this.config = { ...DEFAULT_MODEL_CONFIG, ...config };
    this.validate();
  }

  private validate(): void {
    let {max, min, step, isHorizontal} = this.config

    if (typeof max !== 'number' || max <= min) max = 100;

    if (typeof min !== 'number' || min >= max) min = 0;

    if (typeof step !== 'number' || step <= 0) step = 1;

    if (typeof isHorizontal !== 'boolean') isHorizontal = true;

    this.config = {max, min, step, isHorizontal}
  }

  private demarcateFromSiblingButton(button: HTMLElement, value: number): number {
    const { isHorizontal} = this.config
    const buttonSize: number = button.offsetWidth;
    const isButtonPrev: boolean | null = button.previousElementSibling
      && button.previousElementSibling.getAttribute('class') === 'slider__button';

    const isButtonNext: boolean | null = button.nextElementSibling
      && button.nextElementSibling.getAttribute('class') === 'slider__button';

    if (isButtonNext) {
      let nextButtonOffset: number = button.nextElementSibling!.offsetLeft - buttonSize;
      if (!isHorizontal) {
        nextButtonOffset = button.nextElementSibling!.offsetTop - buttonSize;
      }

      if (value >= nextButtonOffset) return nextButtonOffset;
    }

    if (isButtonPrev) {
      let prevButtonOffset: number = button.previousElementSibling!.offsetLeft + buttonSize;
      if (!isHorizontal) {
        prevButtonOffset = button.previousElementSibling!.offsetTop + buttonSize;
      }

      if (value <= prevButtonOffset) return prevButtonOffset;
    }

    return value
  }
  
  private calcDigitsAfterDot(): number{
    const { step } = this.config
    const isIncludeDot = step.toString().includes('.')
    const digitsAfterDot = step.toString().split('.').pop()!.length
    return isIncludeDot ? digitsAfterDot: 0
  }

}
export default Model;
