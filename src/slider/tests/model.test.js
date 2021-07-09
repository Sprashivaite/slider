import Model from '../model/Model';

let model;
const someObject = {
  pointPX: 0,
  pointValue: 0,
  scaleValues: [],
  updatePX(data) {
    this.pointPX = data.pointOffset;
  },
  updateValue(data) {
    this.pointValue = data.value;
  },
  updateScale(scaleValues) {
    this.scaleValues = scaleValues;
  },
};

beforeEach(() => {
  model = new Model();
  model.subscribe(
    'updateFirstPointOffset',
    someObject.updatePX.bind(someObject)
  );
  model.subscribe('updatePoint', someObject.updatePX.bind(someObject));
  model.subscribe('updatePoint', someObject.updateValue.bind(someObject));
  model.subscribe('stepsUpdate', someObject.updateScale.bind(someObject));
});

describe('конструктор класса', () => {
  it('Model', () => {
    expect(model).toBeDefined();
  });
  it('Model max 200', () => {
    model = new Model({ max: 200 });
    expect(model.config.max).toBe(200);
  });
  it('Model max large', () => {
    model = new Model({ max: 1000 });
    expect(model.config.step).toBeGreaterThan(1);
  });
  it('Model min -5', () => {
    model = new Model({ min: -5 });
    expect(model.config.min).toBe(-5);
  });
  it('Model step -5', () => {
    model = new Model({ step: -5 });
    expect(model.config.step).toBe(1);
  });

  it('Model step', () => {
    model = new Model({ step: 10 });
    expect(model.config.step).toBe(10);
  });
  it('Model step', () => {
    model = new Model({ step: 0 });
    expect(model.config.step).toBe(1);
  });
});

describe('вычислить точку шага', () => {
  it('model.calcStopPoint', () => {
    model.config.step = 50;
    model.calcStopPoint({
      point: 'firstPoint',
      pointOffset: 20,
    });
    expect(someObject.pointPX).toBe(0);
    model.calcStopPoint({
      point: 'firstPoint',
      pointOffset: 75,
    });
    expect(someObject.pointPX).toBe(50);
    model.config.step = 1;
  });
});

describe('вычислить значение подсказки', () => {
  it('целое ', () => {
    model.updatePoint({
      point: 'firstPoint',
      pointOffset: 75,
    });
    expect(someObject.pointValue).toBe(75);
  });
  it('дробное число', () => {
    model.config.step = 0.1;
    model.updatePoint({
      point: 'firstPoint',
      pointOffset: 1.5,
    });
    expect(someObject.pointValue).toBe(1.5);
    model.config.step = 1;
  });
});

describe('поменять значение', () => {
  it('model.changeValue', () => {
    model.changeValue({
      pointName: 'firstPoint',
      value: 42,
    });
    expect(someObject.pointValue).toBe(42);
    expect(someObject.pointPX).toBe(42);
  });
});

describe('вычислить шаги', () => {
  it('model.updateSteps', () => {
    model.updateConfig({ max: 100, step: 20 });
    expect(someObject.scaleValues).toEqual([0, 20, 40, 60, 80, 100]);
  });
});
