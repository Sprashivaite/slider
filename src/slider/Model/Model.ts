import { DEFAULT_MODEL_CONFIG } from '../defaults';
import { pointData, pointValue, modelConfig, userConfig, eventTypes } from '../types';
import Observer from '../Observer/Observer';

class Model extends Observer {
  config!: modelConfig;

  constructor(config?: userConfig) {
    super();
    this.init(config);
  }

  setConfig(config: userConfig): void {
    this.config = { ...this.config, ...config };
    this.validate();
    this.notifyListeners();
  }

  calcStopPoint(data: pointData): void {
    const { max, min, step } = this.config;
    const { pointOffset } = data;
    const stepPercent: number = (100 * step) / (max - min);
    const arrStopPoints = []
    for (let i = 0; i < 100; i += stepPercent) {
      i = this.roundByStep(i)
      arrStopPoints.push(i)
    }

    arrStopPoints.push(100)
    let stopPoint;
    stopPoint = arrStopPoints.find((value, index, array) => {
      const halfStep = (value + array[index + 1]) /2
      return pointOffset <= halfStep
    })
    
    if(stopPoint === undefined) stopPoint = 100
    
    this.updatePoint({ ...data, pointOffset: stopPoint });
  }

  changeValue(data: pointValue): void {
    const { max, min } = this.config;
    const {value, pointName} = data
    const result: number = (100 / (max - min)) * (value! - min);
    this.calcStopPoint({ value, pointName, pointOffset: result });
  }

  updatePoint(data: pointData): void {
    const value = this.calcValue(data);
    this.emit(eventTypes.updatePoint, {...data, value })    
    if(data.pointName === 'firstPoint' && !Number.isNaN(value)) this.config.firstValue = value
    if(data.pointName === 'secondPoint' && !Number.isNaN(value)) this.config.secondValue = value    
  }

  private init(config?: userConfig): void {
    let newConfig = config;
    if(typeof newConfig !== 'object') newConfig = {};
    this.config = { ...DEFAULT_MODEL_CONFIG, ...newConfig };
    this.validate();
  }

  private notifyListeners(): void {
    const { firstValue, secondValue } = this.config; 
    this.changeValue({value: firstValue, pointName: 'firstPoint'})
    this.changeValue({value: secondValue, pointName: 'secondPoint'})
    this.updateSteps()
  }

  private validate(): void {
    this.validateMinMax();
    this.validateValues();
    this.validateStep();
  }

  private validateValues(): void {
    let { firstValue, secondValue } = this.config;
    if (typeof firstValue !== 'number') firstValue = 0;
    if (typeof secondValue !== 'number') secondValue = 100;
    if (firstValue >= secondValue) firstValue = secondValue - 1;
    if (secondValue <= firstValue) secondValue = firstValue + 1;
    this.config = { ...this.config, firstValue, secondValue };
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

  private updateSteps(): void {
    const steps = this.calcSteps()
    this.emit(eventTypes.stepsUpdate, steps);
  }  

  private roundByStep(value: number): number {
    const { step } = this.config;
    const isInteger= Number.isInteger(step);
    const digitsAfterDot = String(step).split('.').pop()!.length;
    return !isInteger ? Number(value.toFixed(digitsAfterDot)) : Number(value.toFixed(0));
  }

  private calcValue(data: pointData): number {
    const { max, min } = this.config;
    const { pointOffset }  = data;
    const value: number = min + (pointOffset * (max - min)) / 100;
    const roundedValue: number = this.roundByStep(value)
    if (roundedValue === max) return roundedValue
    return this.findNearestValue(roundedValue);
  }

  private calcSteps(): number[] {
    const { max, min, step } = this.config;    
    const scaleValues: Array<number> = [];
    let stepValue: number = min;
    let result: number;
    for (stepValue; stepValue < max; stepValue += step) {
      result = this.findNearestValue(stepValue);
      scaleValues.push(result);      
    }
    scaleValues.push(max);
    return scaleValues
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
