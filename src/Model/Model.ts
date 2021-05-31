import IModelConfig from './IModelConfig';
import Observable from '../Observable/Observable';
import {DEFAULT_MODEL_CONFIG} from '../defaults'

class Model extends Observable{

  config!: IModelConfig;

  constructor(config = DEFAULT_MODEL_CONFIG as IModelConfig) {
    super()
    this.init(config)
  }



  updateModel(data): void {
    const {value1, value2, button1 = 0, button2} = data
    this.modelData = {
      value1,
      value2, 
      button1,
      button2
    }
    // this.emit('modelUpdate', this.modelData)
    console.log(data);
    console.log(this.modelData);
  }
  
  calcBtnOffset(
    data
  ): number {
    // field: HTMLElement,
    // button: HTMLElement,
    // mouseCoords: number,
    const { isHorizontal } = this.config
    const {field, button, mouseCoords, target} = data
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;
    let shiftLeft: number = mouseCoords - field.getBoundingClientRect().left - buttonSize / 2;

    if (!isHorizontal) {
      buttonSize = button.offsetHeight;
      shiftLeft = mouseCoords - field.getBoundingClientRect().top - buttonSize / 2;
      fieldSize = field.offsetHeight;
    }

    if (shiftLeft >= fieldSize - buttonSize) {
      if (target === "button1") {
      this.emit('modelUpdate', this.demarcateFromSiblingButton(button, fieldSize - buttonSize) - this.shift)}
      else {this.emit('modelUpdate2', this.demarcateFromSiblingButton(button, fieldSize - buttonSize) - this.shift)}
      return this.demarcateFromSiblingButton(button, fieldSize - buttonSize)
    }

    if (shiftLeft <= 0) {
      if (target === "button1") {
      this.emit('modelUpdate', this.demarcateFromSiblingButton(button, 0) - this.shift)}
      else {this.emit('modelUpdate2', this.demarcateFromSiblingButton(button, 0) - this.shift)}
      return this.demarcateFromSiblingButton(button, 0);
    }
    if (target === "button1") {
    this.emit('modelUpdate', this.demarcateFromSiblingButton(button, shiftLeft) - this.shift)
    } else {
      this.emit('modelUpdate2', this.demarcateFromSiblingButton(button, shiftLeft) - this.shift)
    }

    return this.demarcateFromSiblingButton(button, shiftLeft);
  }

  calcFlagValue(data): number {
    // field: HTMLElement, button: HTMLElement
    const {max, min, step, isHorizontal} = this.config
    const {field, button, target} = data

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

    const test = Number(result.toFixed(this.calcDigitsAfterDot()))

    if(target === 'button1') this.emit('modelValueUpdate', test)
    else this.emit('modelValueUpdate2', test)

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

  calcStopPoint(data): number {
    // field: HTMLElement, button: HTMLElement
    const {max, min, step, isHorizontal} = this.config
    const {field, button, target} = data
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

    // console.log(stopPoint);
    if (target === "button1") {
    this.emit('modelUpdate', this.demarcateFromSiblingButton(button, stopPoint))
    }
    else {this.emit('modelUpdate2', this.demarcateFromSiblingButton(button, stopPoint))}
    return this.demarcateFromSiblingButton(button, stopPoint);
  }

  moveToValue(data): number {
    const {max, min, isHorizontal} = this.config
    const {field, button, value, target} = data
    let fieldSize: number = field.offsetWidth;
    let buttonSize: number = button.offsetWidth;

    if (!isHorizontal) {
      fieldSize = field.offsetHeight;
      buttonSize = button.offsetHeight;
    }

    const result: number = ((fieldSize - buttonSize) / (max - min))
      * (value - min);
    // console.log(target);
    // this.updateModel({button1: result})
    // this.setButtonPX(result)
    console.log(target);
    if (target === "button1") {
    this.emit('modelUpdate', this.demarcateFromSiblingButton(button, result))
    }
    else {this.emit('modelUpdate2', this.demarcateFromSiblingButton(button, result))}
    // this.buttonPX = result
    return this.demarcateFromSiblingButton(button, result);
  }

  calcShift(data): void {
    const {mouseCoords, button} = data
    this.shift = mouseCoords - button.getBoundingClientRect().left - button.offsetWidth/2
    if (!this.config.isHorizontal) {
      this.shift = mouseCoords - button.getBoundingClientRect().top - button.offsetHeight/2
    }
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
