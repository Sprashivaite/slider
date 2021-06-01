import IModelConfig from './IModelConfig';
import Observable from '../Observable/Observable';
import {DEFAULT_MODEL_CONFIG} from '../defaults'

class Model extends Observable{

  config!: IModelConfig;

  shift!: number;

  // elementsSize!: { fieldSize: any; buttonSize: any; };

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

  updateValue(button, value) {
    if(!this.findFirstButton(button)) this.emit('modelUpdate', this.demarcateFromSiblingButton(button, value))
    else this.emit('modelUpdate2', this.demarcateFromSiblingButton(button, value))
  }
  
  calcBtnOffset(data): number {    
    const { fieldSize, fieldOffset, buttonSize } = this.elementsSize
    const { button, mouseCoords } = data
    
    const shiftLeft: number = mouseCoords - fieldOffset - buttonSize / 2;

    if (shiftLeft >= fieldSize - buttonSize) {
      this.updateValue(button, fieldSize - buttonSize - this.shift)
    } 
    else if (shiftLeft <= 0) this.updateValue(button, 0) 
    else this.updateValue(button, shiftLeft - this.shift)
  }

  calcFlagValue(data): number {
    const {max, min, step, isHorizontal} = this.config
    const {field, button, target} = data
    const { fieldSize, buttonSize } = this.elementsSize

    let buttonOffset: number = button.offsetLeft;

    if (!isHorizontal) {
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

    return arrValues;
  }

  calcStopPoint(data): number {
    const {max, min, step, isHorizontal} = this.config
    const {button} = data
    const { fieldSize, buttonSize } = this.elementsSize

    let buttonOffset: number = button.offsetLeft;
    if (!isHorizontal) buttonOffset = button.offsetTop;   

    const stepPX: number = ((fieldSize - buttonSize) * step) / (max - min);

    const arrStopPoints: number[] = [];
    for (let i = 0; i <= fieldSize - buttonSize; i += stepPX) {
      arrStopPoints.push(i);
    }

    let stopPoint: number | undefined = arrStopPoints.find(
      item => buttonOffset <= item + stepPX / 2
    );

    if(stopPoint === undefined) stopPoint = fieldSize - buttonSize;  

    this.updateValue(button, stopPoint)

  }

  moveToValue(data): number {
    const {button, value} = data
    const {max, min} = this.config
    const { fieldSize, buttonSize } = this.elementsSize    

    const result: number = ((fieldSize - buttonSize) / (max - min))
      * (value - min);    
    
    this.updateValue(button, result)    
  }

  calcShift(data): void {
    const {mouseCoords, button} = data
    this.shift = mouseCoords - button.getBoundingClientRect().left - button.offsetWidth/2
    if (!this.config.isHorizontal) {
      this.shift = mouseCoords - button.getBoundingClientRect().top - button.offsetHeight/2
    }
  }

  setElementsSize(data): void {
    const {fieldSize = 0, fieldOffset = 0, buttonSize = 0} = data
    this.elementsSize = {
      fieldSize,
      fieldOffset,
      buttonSize
    }  
  }

  private findFirstButton(button) {
    return button.previousElementSibling ? true: false
  }

  private findSecondButton(button) {
    return button.nextElementSibling.getAttribute('class') === 'slider__button' ? true: false
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
