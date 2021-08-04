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
  updateScale(data) {
    if(data.steps)this.scaleValues = data.steps;    
  },
};

beforeEach(() => {
  model = new Model();
  model.subscribe('updatePoint', someObject.updatePX.bind(someObject));
  model.subscribe('updatePoint', someObject.updatePX.bind(someObject));
  model.subscribe('updatePoint', someObject.updateValue.bind(someObject));
  model.subscribe('updatePoint', someObject.updateScale.bind(someObject));
});

describe('конструктор класса', () => {
  it('инициализирован', () => {
    expect(model).toBeDefined();
  });
  it('значение max === 200', () => {
    model = new Model({ max: 200 });
    expect(model.config.max).toBe(200);
  });
  it('значение min === -5', () => {
    model = new Model({ min: -5 });
    expect(model.config.min).toBe(-5);
  });
  it('значение step === -5', () => {
    model = new Model({ step: -5 });
    expect(model.config.step).toBe(1);
  });

  it('значение step === 10', () => {
    model = new Model({ step: 10 });
    expect(model.config.step).toBe(10);
  });
  it('значение step !== 0', () => {
    model = new Model({ step: 0 });
    expect(model.config.step).toBe(1);
  });
});

describe('значение подсказки', () => {
  it('целое === 75', () => {
    model.updatePoint({
      point: 'firstPoint',
      pointOffset: 75,
    });
    expect(someObject.pointValue).toBe(75);
  });
  it('дробное число === 1.5', () => {
    model.config.step = 0.1;
    model.updatePoint({
      point: 'firstPoint',
      pointOffset: 1.5,
    });
    expect(someObject.pointValue).toBe(1.5);
    model.config.step = 1;
  });
});

describe('поменять значение Point', () => {
  it('значение === 42', () => {
    model.changeValue({
      pointName: 'firstPoint',
      value: 42,
    });
    expect(someObject.pointValue).toBe(42);
    expect(someObject.pointPX).toBe(42);
  });
});

describe('вычислить шаги', () => {
  it('при шаге 20 результат [0, 20, 40, 60, 80, 100]', () => {
    model.updateConfig({ max: 100, step: 20 });
    expect(someObject.scaleValues).toEqual([0, 20, 40, 60, 80, 100]);
  });
});
