import Observer from '../Observer/Observer';
import { DEFAULT_MODEL_CONFIG } from '../defaults';
import { elementsData, elementsSize, modelConfig, userModelConfig } from '../types';

class Model extends Observer {
  config!: modelConfig;

  private shift: number;

  private elementsSize!: { fieldSize: number; handleSize: number };

  constructor(config = DEFAULT_MODEL_CONFIG as userModelConfig) {
    super();
    this.shift = 0;
    this.init(config);
  }

  setConfig(config: userModelConfig): void {
    this.config = { ...this.config, ...config };
    this.validate();
    this.calcScaleValues()
  }

  setElementsSize(data: elementsSize): void {
    const { fieldSize = 0, handleSize = 0 } = data;
    this.elementsSize = {
      handleSize,
      fieldSize: fieldSize - handleSize,
    };
  }

  calcShift(data: elementsData): void {
    const { handleOffset, mouseCoords } = data;
    this.shift = mouseCoords - handleOffset;
  }

  calcHandleOffset(data: elementsData): void {
    const { fieldSize } = this.elementsSize;
    const { mouseCoords } = data;
    const shiftLeft: number = mouseCoords - this.shift;
    if (shiftLeft >= fieldSize) {
      this.updateHandle({ ...data, value: fieldSize });
    } else if (shiftLeft <= 0) {
      this.updateHandle({ ...data, value: 0 });
    } else {
      this.updateHandle({ ...data, value: shiftLeft });
    }
  }

  calcStopPointPX(data: elementsData): void {
    const { max, min, step } = this.config;
    const { fieldSize } = this.elementsSize;
    const { handleOffset } = data;
    const stepPX: number = (fieldSize * step) / (max - min);
    const arrStopPoints = []
    for (let i = 0; i < fieldSize; i += stepPX) {
      i = this.roundByStep(i)
      arrStopPoints.push(i)
    }

    arrStopPoints.push(fieldSize)
    let stopPoint;
    stopPoint = arrStopPoints.find((value, index, array) => {
      const halfStep = (value + array[index + 1]) /2
      return handleOffset <= halfStep
    })
    
    if(stopPoint === undefined) stopPoint = fieldSize
    this.updateHandle({ ...data, value: stopPoint });
  }

  calcTooltipValue(data: number): number {
    const { max, min } = this.config;
    const { fieldSize } = this.elementsSize;
    const  handleOffset   = data;
    const value: number = min + (handleOffset * (max - min)) / fieldSize;
    const roundedValue: number = this.roundByStep(value)
    if (roundedValue === max) return roundedValue
    return this.findNearestValue(roundedValue);
  }

  moveToValue(data: elementsData): void {
    const { max, min } = this.config;
    const { fieldSize } = this.elementsSize;
    const { value } = data;
    const result: number = (fieldSize / (max - min)) * (value - min);
    this.updateHandle({ ...data, value: result });
  }

  calcScaleValues(): void {
    const { max, min, step } = this.config;    
    const scaleValues: Array<number> = [];
    let stepValue: number = min;
    let result: number;
    for (stepValue; stepValue < max; stepValue += step) {
      result = this.findNearestValue(stepValue);
      scaleValues.push(result);      
    }

    scaleValues.push(max);
    this.emit('scaleUpdate', { scaleValues, quantity: scaleValues.length });
  }

  private init(config: userModelConfig): void {
    this.config = { ...DEFAULT_MODEL_CONFIG, ...config };
    this.validate();
  }

  private validate(): void {
    this.validateMinMax();
    this.validateStep();
  }

  private validateMinMax(): void {
    let { max, min } = this.config;
    if (typeof min !== 'number') min = 0;
    if (typeof max !== 'number') max = 100;
    if (min >= max) min = max - 1;
    if (max <= min) max = min + 1;
    this.config = { ...this.config, max, min };
  }

  private validateStep(): void {
    const { max, min } = this.config;
    let { step } = this.config;
    if (typeof step !== 'number') step = 1;
    if (step >= max - min) step = max - min;
    if (step <= 0) step = 1;
    const validateLargeNumbers = (value: number): number => {
      if (value * 200 > max - min) return value;
      return validateLargeNumbers(value + 1);
    };

    step = validateLargeNumbers(step);
    this.config = { ...this.config, step };
  }

  private updateHandle(data: elementsData): void {
    const { value, handleName } = data;
    const tooltipValue = this.calcTooltipValue(value);
    if (handleName === 'first') {
      this.emit('updateFirstHandlePX', value);
      this.emit('updateFirstHandleValue', tooltipValue);
    }
    
    if (handleName === 'second') {
      this.emit('updateSecondHandlePX', value);
      this.emit('updateSecondHandleValue', tooltipValue);
    }
  }

  private roundByStep(value: number): number {
    const { step } = this.config;
    const isFractional = Number.isInteger(step);
    const digitsAfterDot = String(step).split('.').pop()!.length;
    return !isFractional ? Number(value.toFixed(digitsAfterDot)) : Number(value.toFixed(0));
  }

  private findNearestValue(value: number): number {
    const { max, min, step } = this.config;
    const roundedValue = this.roundByStep(value)
    const arrStopPoints = []
    for (let i = min; i < max; i += step) {
      this.roundByStep(i)
      arrStopPoints.push(i)
    }

    arrStopPoints.push(max)
    let result;
    result = arrStopPoints.find((item, index, array) => {
      const halfStep = (item + array[index + 1]) /2
      return roundedValue <= halfStep
    })

    if(result === undefined) result = max
    return this.roundByStep(result);
  }
}
export default Model;
