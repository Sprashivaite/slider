import IModelConfig from './IModelConfig';
import Observable from '../Observable/Observable';
import {DEFAULT_MODEL_CONFIG} from '../defaults'

class Model extends Observable{

  config!: IModelConfig;

  shift!: number;

  elementsSize!: { buttonSize: any, fieldSize: any };

  constructor(config = DEFAULT_MODEL_CONFIG as IModelConfig) {
    super()
    this.init(config)
  }

  updateButtonPX(button: any, value: any): void {
    const result = this.demarcateFromSiblingButton(button, value)

    if(!this.findFirstButton(button)) this.emit('modelUpdate', result)
    else this.emit('modelUpdate2', result)
  }

  updateValue(button: any, value: any): void {
    const result = Number(value.toFixed(this.calcDigitsAfterDot()));
    if(!this.findFirstButton(button)) this.emit('modelValueUpdate', result)
    else this.emit('modelValueUpdate2', result)
  }
  
  calcBtnOffset(data: any): void {    
    const { button, mouseCoords } = data    
    const { fieldSize } = this.elementsSize

    const shiftLeft: number = mouseCoords - this.shift;

    if(shiftLeft >= fieldSize) this.updateButtonPX(button, fieldSize)    
    else if (shiftLeft <= 0) this.updateButtonPX(button, 0) 
    else this.updateButtonPX(button, shiftLeft)
  }

  calcFlagValue(data: any): void {
    const {max, min, step, isHorizontal} = this.config
    const {button} = data
    const { fieldSize } = this.elementsSize

    let buttonOffset: number = button.offsetLeft;
    if(!isHorizontal)  buttonOffset = button.offsetTop;        

    let result: number = min + 
    (buttonOffset * (max - min)) / 
    ((fieldSize));

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

    this.updateValue(button, result)
  }

  calcScaleValue(quantity: number): void {
    const {max, min} = this.config
    let {step} = this.config;
    const arrValues: Array<number> = [];
    
    let value = min;
    const thisQuantity = quantity;
    step = (max - min) / (thisQuantity -1)
    
    for (let i = 0; i < thisQuantity - 1; i += 1) {
      const isFractionalStep = step < 1 || thisQuantity - 1 > max;
      if (isFractionalStep) {
        arrValues.push(Number(value.toFixed(1)));
        value += Number(step.toFixed(1))
      }
      else {
        arrValues.push(Number(value.toFixed(0)));
        value += Number(step.toFixed(0))
      }      
    }
    arrValues.push(max);

    this.emit('scaleUpdate', arrValues)
  }

  calcStopPoint(data: any): void {
    const {max, min, step, isHorizontal} = this.config
    const {button} = data
    const { fieldSize } = this.elementsSize

    let buttonOffset: number = button.offsetLeft;
    if (!isHorizontal) buttonOffset = button.offsetTop;   

    const stepPX: number = ((fieldSize) * step) / (max - min);

    const arrStopPoints: number[] = [];
    for (let i = 0; i <= fieldSize; i += stepPX) {
      arrStopPoints.push(i);
    }

    let stopPoint: number | undefined = arrStopPoints.find(
      item => buttonOffset <= item + stepPX / 2
    );

    if(stopPoint === undefined) stopPoint = fieldSize;  

    this.updateButtonPX(button, stopPoint)
  }

  moveToValue(data: any): void {
    const {button, value} = data
    const {max, min} = this.config
    const { fieldSize } = this.elementsSize    

    const result: number = ((fieldSize) / (max - min))
      * (value - min);    
    
    this.updateButtonPX(button, result)
  }

  calcShift(data: any): void {
    const {mouseCoords, button} = data 

    this.shift = mouseCoords - button.offsetLeft
    if (!this.config.isHorizontal) this.shift = mouseCoords - button.offsetTop   
  }

  setElementsSize(data: any): void {
    const {fieldSize = 0, buttonSize = 0} = data

    this.elementsSize = {
      fieldSize: fieldSize - buttonSize,
      buttonSize
    }  
  }

  
  private init(config: IModelConfig): void {  
    this.config = { ...DEFAULT_MODEL_CONFIG, ...config };
    this.validate();
    this.shift = 0
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
    const { isHorizontal } = this.config
    const { buttonSize } = this.elementsSize

    if (this.findSecondButton(button)) {      
      let nextButtonOffset: number = button.nextElementSibling!.offsetLeft - buttonSize;
      if (!isHorizontal) {
        nextButtonOffset = button.nextElementSibling!.offsetTop - buttonSize;
      }
      if (value >= nextButtonOffset) return nextButtonOffset;
    }

    if (this.findFirstButton(button)) {
      let prevButtonOffset: number = button.previousElementSibling!.offsetLeft + buttonSize;
      if (!isHorizontal) {
        prevButtonOffset = button.previousElementSibling!.offsetTop + buttonSize;
      }
      if (value <= prevButtonOffset) return prevButtonOffset;
    }

    return value
  }
  
  private findFirstButton(button: any): boolean {
    return !!button.previousElementSibling
  }

  private findSecondButton(button: any): boolean {
    return !!(button.nextElementSibling.getAttribute('class') === 'slider__button')
  }

  private calcDigitsAfterDot(): number{
    const { step } = this.config
    const isIncludeDot = step.toString().includes('.')
    const digitsAfterDot = step.toString().split('.').pop()!.length
    return isIncludeDot ? digitsAfterDot: 0
  }

}
export default Model;
