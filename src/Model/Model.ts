import IModelConfig from './IModelConfig';
import Observable from '../Observable/Observable';
import {DEFAULT_MODEL_CONFIG} from '../defaults'

class Model extends Observable{

  config!: IModelConfig;

  shift!: number;

  constructor(config = DEFAULT_MODEL_CONFIG as IModelConfig) {
    super()
    this.init(config)
  }

  updateButtonPX(button, value) {
    const result = this.demarcateFromSiblingButton(button, value)

    if(!this.findFirstButton(button)) this.emit('modelUpdate', result)
    else this.emit('modelUpdate2', result)
  }

  updateValue(button, value) {
    const result = Number(value.toFixed(this.calcDigitsAfterDot()));
    if(!this.findFirstButton(button)) this.emit('modelValueUpdate', result)
    else this.emit('modelValueUpdate2', result)
  }
  
  calcBtnOffset(data): number {    
    const { button, mouseCoords } = data    
    const { fieldSize, fieldOffset } = this.elementsSize

    const shiftLeft: number = mouseCoords - fieldOffset - this.shift;

    if(shiftLeft >= fieldSize) this.updateButtonPX(button, fieldSize)    
    else if (shiftLeft <= 0) this.updateButtonPX(button, 0) 
    else this.updateButtonPX(button, shiftLeft)
  }

  calcFlagValue(data): number {
    const {max, min, step, isHorizontal} = this.config
    const {button, target} = data
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

  calcScaleValue(quantity: number): Array<number> {
    const {max, min} = this.config
    let {step} = this.config;
    const arrValues: Array<number> = [];
    let value = min;
    let thisQuantity = quantity;

    if (thisQuantity > 11) { thisQuantity = 11; step = (max - min) / 10 }
    
    for (let i = 0; i < thisQuantity - 1; i += 1) {
      const isFractionalStep = step < 1 || thisQuantity - 1 > max;
      if (isFractionalStep) arrValues.push(Number(value.toFixed(1)));
      else arrValues.push(Number(value.toFixed(0)));
      value += step
    }

    arrValues.push(max);

    this.emit('scaleUpdate', arrValues)
    return arrValues;
  }

  calcStopPoint(data): number {
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

  moveToValue(data): number {
    const {button, value} = data
    const {max, min} = this.config
    const { fieldSize } = this.elementsSize    

    const result: number = ((fieldSize) / (max - min))
      * (value - min);    
    
    this.updateButtonPX(button, result)  
    
    
  }

  calcShift(data): void {
    const {mouseCoords, button} = data
    this.shift = mouseCoords - button.getBoundingClientRect().left
    if (!this.config.isHorizontal) {
      this.shift = mouseCoords - button.getBoundingClientRect().top
    }
  }

  setElementsSize(data): void {
    const {fieldSize = 0, fieldOffset = 0, buttonSize = 0} = data
    
    this.elementsSize = {
      fieldSize: fieldSize - buttonSize,
      fieldOffset,
      buttonSize
    }  
  }

  private findFirstButton(button) {
    return button.previousElementSibling ? true: false
  }

  private findSecondButton(button) {
    return button.nextElementSibling && button.nextElementSibling.getAttribute('class') === 'slider__button' ? true: false
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
  
  private calcDigitsAfterDot(): number{
    const { step } = this.config
    const isIncludeDot = step.toString().includes('.')
    const digitsAfterDot = step.toString().split('.').pop()!.length
    return isIncludeDot ? digitsAfterDot: 0
  }

}
export default Model;
