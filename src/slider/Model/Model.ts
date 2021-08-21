import { DEFAULT_MODEL_CONFIG } from '../defaults';
import { PointData, ModelConfig, EventTypes } from '../types';
import Observer from '../Observer/Observer';

class Model extends Observer<PointData> {
  private config: ModelConfig;

  constructor(config?: Partial<ModelConfig>) {
    super();
    this.config = DEFAULT_MODEL_CONFIG;
    if (config) this.updateConfig(config);
  }

  updateConfig(config: Partial<ModelConfig>): void {
    this.setConfig(config);
    this.validate();
    this.setConfig({ steps: this.calcSteps() });
    this.notifyListeners();
  }

  getConfig(): ModelConfig {
    return this.config;
  }

  changeValue(data: PointData): void {
    const { max, min } = this.getConfig();
    const { value } = data;
    const nearestValue = this.findNearestValue(value);
    const result: number = (100 / (max - min)) * (nearestValue - min);
    this.updatePoint({ ...data, pointOffset: result });
  }

  updatePoint(data: PointData): void {
    const value = this.calcValue(data.pointOffset);
    if (data.pointName === 'firstPoint') this.setConfig({ firstValue: value });
    if (data.pointName === 'secondPoint') this.setConfig({ secondValue: value });
    this.emit(EventTypes.updatePoint, { ...data, value });
  }

  private notifyListeners(): void {
    const { firstValue, secondValue, steps } = this.getConfig();
    this.changeValue({
      steps,
      value: firstValue,
      pointName: 'firstPoint',
      pointOffset: 0,
    });
    this.changeValue({ value: secondValue, pointName: 'secondPoint', pointOffset: 0 });
  }

  private setConfig(value: Partial<ModelConfig>): void {
    this.config = { ...this.getConfig(), ...value };
  }

  private validate(): void {
    this.validateMinMax();
    this.validateValues();
    this.validateStep();
  }

  private validateValues(): void {
    let { firstValue, secondValue } = this.getConfig();
    if (typeof firstValue !== 'number') firstValue = Number(firstValue);
    if (typeof secondValue !== 'number') secondValue = Number(secondValue);
    if (!Number.isFinite(firstValue)) firstValue = 0;
    if (!Number.isFinite(secondValue)) secondValue = 1;
    if (firstValue >= secondValue) firstValue = secondValue - 1;
    if (secondValue <= firstValue) secondValue = firstValue + 1;
    this.setConfig({ firstValue, secondValue });
  }

  private validateMinMax(): void {
    let { max, min } = this.getConfig();
    if (typeof min !== 'number') min = Number(min);
    if (typeof max !== 'number') max = Number(max);
    if (!Number.isFinite(max)) max = 100;
    if (!Number.isFinite(min)) min = 0;
    if (min >= max) min = max - 1;
    if (max <= min) max = min + 1;
    this.setConfig({ max, min });
  }

  private validateStep(): void {
    const { max, min } = this.getConfig();
    let { step } = this.getConfig();
    if (typeof step !== 'number') step = Number(step);
    if (!Number.isFinite(step)) step = 1;
    if (step >= max - min) step = max - min;
    if (step <= 0) step = 1;
    this.setConfig({ step });
  }

  private roundByStep(value: number): number {
    const { step } = this.getConfig();
    const isInteger = Number.isInteger(step);
    const numAfterDot = String(step).split('.').pop();
    let digitsAfterDot = 0;
    if (numAfterDot) digitsAfterDot = numAfterDot.length;
    return !isInteger ? Number(value.toFixed(digitsAfterDot)) : Number(value.toFixed(0));
  }

  private calcValue(pointOffset: number): number {
    const { max, min } = this.getConfig();
    const value: number = min + (pointOffset * (max - min)) / 100;
    const roundedValue: number = this.roundByStep(value);
    if (roundedValue === max) return roundedValue;
    return this.findNearestValue(roundedValue);
  }

  private calcSteps(): number[] {
    const { max, min, step } = this.getConfig();
    const scaleValues: Array<number> = [];
    let stepValue: number = min;
    for (stepValue; stepValue < max; stepValue += step) {
      const roundedValue = this.roundByStep(stepValue);
      scaleValues.push(roundedValue);
    }
    scaleValues.push(max);
    return scaleValues;
  }

  private findNearestValue(value: number): number {
    const { max, steps } = this.getConfig();
    const roundedValue = this.roundByStep(value);
    const result = steps.find((item, index, array) => {
      const halfStep = (item + array[index + 1]) / 2;
      return roundedValue <= halfStep;
    });
    return this.roundByStep(result ?? max);
  }
}
export default Model;
