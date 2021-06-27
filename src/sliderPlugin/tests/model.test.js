import Model from '../model/Model';

let model;
const someObject = {
  pointPX: 0,
  pointPX2: 0,
  pointValue: 0,
  pointValue2: 0,
  scaleValues: [],
  updatePX(value) {
    this.pointPX = value;
  },
  updatePX2(value) {
    this.pointPX2 = value;
  },
  updateValue(value) {
    this.pointValue = value;
  },
  updateValue2(value) {
    this.pointValue2 = value;
  },
  updateScale({ scaleValues }) {
    this.scaleValues = scaleValues;
  },
};

document.body.insertAdjacentHTML(
  'afterbegin',
  "<div class='slider' style='width:100px; height: 100px;'></div>"
);
let container = document.querySelector('.slider');
container.insertAdjacentHTML(
  'afterbegin',
  "<div class='js-slider__field_horizontal'></div>"
);
container.insertAdjacentHTML(
  'beforeend',
  "<div class='js-slider__field_vertical'></div>"
);
let field_horizontal = document.querySelector('.js-slider__field_horizontal');
field_horizontal.insertAdjacentHTML(
  'afterbegin',
  "<div class='js-slider__point'></div>"
);
field_horizontal.insertAdjacentHTML(
  'beforeend',
  "<div class='js-slider__point' style='left: 66px'></div>"
);
let field_vertical = document.querySelector('.js-slider__field_vertical');
field_vertical.insertAdjacentHTML(
  'afterbegin',
  "<div class='js-slider__point' style='top: 20px'></div>"
);
let point_horizontal = document.querySelectorAll('.js-slider__point')[0];
let point_horizontal2 = document.querySelectorAll('.js-slider__point')[1];
let point_vertical = document.querySelector(
  '.js-slider__field_vertical > .js-slider__point'
);

beforeEach(() => {
  model = new Model();
  model.setElementsSize({ pointSize: 0, fieldSize: 100 });
  model.subscribe('updateFirstPointPX', someObject.updatePX.bind(someObject));
  model.subscribe(
    'updateSecondPointPX',
    someObject.updatePX2.bind(someObject)
  );
  model.subscribe(
    'updateFirstPointValue',
    someObject.updateValue.bind(someObject)
  );
  model.subscribe(
    'updateSecondPointValue',
    someObject.updateValue2.bind(someObject)
  );
  model.subscribe('scaleUpdate', someObject.updateScale.bind(someObject));
});

describe('конструктор класса', () => {
  it('Model', () => {
    expect(model).toBeDefined();
  });
  it('Model max', () => {
    model = new Model({ max: 200 });
    expect(model.config.max).toBe(200);
  });
  it('Model min', () => {
    model = new Model({ min: -5 });
    expect(model.config.min).toBe(-5);
  });
  it('Model step', () => {
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

describe('высчитывание отступа для кнопки', () => {
  it('model.calcPointOffset default', () => {
    model.calcPointOffset({
      point: point_horizontal,
      mouseCoords: 42,
    });
    expect(someObject.pointPX).toBe(42);
  });
  it('model.calcPointOffset min', () => {
    model.calcPointOffset({
      point: point_horizontal,
      mouseCoords: -42,
    });
    expect(someObject.pointPX).toBe(0);
  });
  it('model.calcPointOffset max', () => {
    model.calcPointOffset({
      point: point_horizontal,
      mouseCoords: 1002,
    });
    expect(someObject.pointPX).toBe(model.elementsSize.fieldSize);
  });
  it('model.calcPointOffset secondPoint', () => {
    model.calcPointOffset({
      point: point_horizontal2,
      mouseCoords: 42,
    });
    expect(someObject.pointPX2).toBe(42);
  });
});

describe('передвинуть кнопку к точке шага ', () => {
  it('model.calcStopPointPX horizontal', () => {
    model.config.step = 50;
    model.calcStopPointPX({
      point: point_horizontal,
      pointOffset: 20,
    });
    expect(someObject.pointPX).toBe(0);
    model.calcStopPointPX({
      point: point_horizontal,
      pointOffset: 75,
    });
    expect(someObject.pointPX).toBe(50);
    model.config.step = 1;
  });
});

describe('вычислить значение флага', () => {
  it('model.calcTooltipValue ', () => {
    model.calcStopPointPX({
      point: point_horizontal,
      pointOffset: 75,
    });
    expect(someObject.pointValue).toBe(75);
  });
  it('model.calcTooltipValue дробное', () => {
    model.config.step = 0.1;
    model.calcStopPointPX({
      point: point_horizontal,
      pointOffset: 1.5,
    });
    expect(someObject.pointValue).toBe(1.5);
    model.config.step = 1;
  });
});

describe('передвинуть кнопку к значению ', () => {
  it('model.moveToValue horizontal', () => {
    model.moveToValue({
      point: point_horizontal,
      value: 42,
    });
    expect(someObject.pointPX).toBe(42);
  });
});

describe('вычислить значения шкалы', () => {
  it('model.calcScaleValues', () => {
    model.calcScaleValues(6);
    expect(someObject.scaleValues).toEqual([0, 20, 40, 60, 80, 100]);
  });
});
