import Model from '../Model/Model';
import { PointData } from '../types';

let model: Model;
type SomeObject = {
  pointPX: number | undefined;
  pointValue: number | undefined;
  scaleValues: number[];
  updatePX(data: PointData): void;
  updateValue(data: PointData): void;
  updateScale(data: PointData): void;
};
const someObject: SomeObject = {
  pointPX: 0,
  pointValue: 0,
  scaleValues: [],
  updatePX(data: PointData) {
    this.pointPX = data.pointOffset;
  },
  updateValue(data: PointData) {
    this.pointValue = data.value;
  },
  updateScale(data: PointData) {
    if (data.steps) this.scaleValues = data.steps;
  },
};

beforeEach(() => {
  model = new Model();
  model.subscribe('updatePoint', someObject.updatePX.bind(someObject));
  model.subscribe('updatePoint', someObject.updatePX.bind(someObject));
  model.subscribe('updatePoint', someObject.updateValue.bind(someObject));
  model.subscribe('updatePoint', someObject.updateScale.bind(someObject));
});

describe('Model constructor should', () => {
  it('initialized', () => {
    expect(model).toBeDefined();
  });
  it('takes valid values', () => {
    model = new Model({ max: 2, min: 1, step: 1 });
    expect(model.getConfig().max).toBe(2);
    expect(model.getConfig().min).toBe(1);
    expect(model.getConfig().step).toBe(1);
  });
  it('corrects invalid values minmax', () => {
    model = new Model({ max: 0, min: 1 });
    expect(model.getConfig().max).toBeGreaterThan(model.getConfig().min);
  });
  it('corrects invalid values step', () => {
    model = new Model({ step: 0 });
    expect(model.getConfig().step).toBe(1);
    model = new Model({ max: 1, min: 0, step: 2 });
    expect(model.getConfig().step).toBe(1);
  });
});

describe('Model point value takes an', () => {
  it('integer value', () => {
    model.updateConfig({ step: 1 });
    model.updatePoint({
      pointName: 'firstPoint',
      pointOffset: 1,
      value: 1,
    });
    expect(someObject.pointValue).toBe(1);
  });
  it('decimal value', () => {
    model.updateConfig({ step: 0.1 });
    model.updatePoint({
      pointName: 'firstPoint',
      pointOffset: 1.1,
      value: 1.1,
    });
    expect(someObject.pointValue).toBe(1.1);
    model.updateConfig({ step: 1 });
  });
});

describe('Model should change', () => {
  it('value', () => {
    model.updateConfig({ firstValue: 0, isRange: false });
    model.changeValue({
      pointName: 'firstPoint',
      value: 10,
    });
    expect(someObject.pointValue).toBe(10);
    expect(someObject.pointPX).toBe(10);
  });
});

describe('Model calc steps', () => {
  it('if max equal 100, steps is [0, 20, 40, 60, 80, 100]', () => {
    model.updateConfig({ max: 100, step: 20 });
    expect(someObject.scaleValues).toEqual([0, 20, 40, 60, 80, 100]);
  });
});
