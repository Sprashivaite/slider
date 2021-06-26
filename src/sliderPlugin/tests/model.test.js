import Model from '../model/Model';

let model;
const someObject = {
  handlePX: 0,
  handlePX2: 0,
  handleValue: 0,
  handleValue2: 0,
  scaleValues: [],
  updatePX(value) {
    this.handlePX = value;
  },
  updatePX2(value) {
    this.handlePX2 = value;
  },
  updateValue(value) {
    this.handleValue = value;
  },
  updateValue2(value) {
    this.handleValue2 = value;
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
  "<div class='js-slider__handle'></div>"
);
field_horizontal.insertAdjacentHTML(
  'beforeend',
  "<div class='js-slider__handle' style='left: 66px'></div>"
);
let field_vertical = document.querySelector('.js-slider__field_vertical');
field_vertical.insertAdjacentHTML(
  'afterbegin',
  "<div class='js-slider__handle' style='top: 20px'></div>"
);
let handle_horizontal = document.querySelectorAll('.js-slider__handle')[0];
let handle_horizontal2 = document.querySelectorAll('.js-slider__handle')[1];
let handle_vertical = document.querySelector(
  '.js-slider__field_vertical > .js-slider__handle'
);

beforeEach(() => {
  model = new Model();
  model.setElementsSize({ handleSize: 0, fieldSize: 100 });
  model.subscribe('updateFirstHandlePX', someObject.updatePX.bind(someObject));
  model.subscribe(
    'updateSecondHandlePX',
    someObject.updatePX2.bind(someObject)
  );
  model.subscribe(
    'updateFirstHandleValue',
    someObject.updateValue.bind(someObject)
  );
  model.subscribe(
    'updateSecondHandleValue',
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
  it('model.calcHandleOffset default', () => {
    model.calcHandleOffset({
      handle: handle_horizontal,
      mouseCoords: 42,
    });
    expect(someObject.handlePX).toBe(42);
  });
  it('model.calcHandleOffset min', () => {
    model.calcHandleOffset({
      handle: handle_horizontal,
      mouseCoords: -42,
    });
    expect(someObject.handlePX).toBe(0);
  });
  it('model.calcHandleOffset max', () => {
    model.calcHandleOffset({
      handle: handle_horizontal,
      mouseCoords: 1002,
    });
    expect(someObject.handlePX).toBe(model.elementsSize.fieldSize);
  });
  it('model.calcHandleOffset secondHandle', () => {
    model.calcHandleOffset({
      handle: handle_horizontal2,
      mouseCoords: 42,
    });
    expect(someObject.handlePX2).toBe(42);
  });
});

describe('передвинуть кнопку к точке шага ', () => {
  it('model.calcStopPointPX horizontal', () => {
    model.config.step = 50;
    model.calcStopPointPX({
      handle: handle_horizontal,
      handleOffset: 20,
    });
    expect(someObject.handlePX).toBe(0);
    model.calcStopPointPX({
      handle: handle_horizontal,
      handleOffset: 75,
    });
    expect(someObject.handlePX).toBe(50);
    model.config.step = 1;
  });
});

describe('вычислить значение флага', () => {
  it('model.calcTooltipValue ', () => {
    model.calcStopPointPX({
      handle: handle_horizontal,
      handleOffset: 75,
    });
    expect(someObject.handleValue).toBe(75);
  });
  it('model.calcTooltipValue дробное', () => {
    model.config.step = 0.1;
    model.calcStopPointPX({
      handle: handle_horizontal,
      handleOffset: 1.5,
    });
    expect(someObject.handleValue).toBe(1.5);
    model.config.step = 1;
  });
});

describe('передвинуть кнопку к значению ', () => {
  it('model.moveToValue horizontal', () => {
    model.moveToValue({
      handle: handle_horizontal,
      value: 42,
    });
    expect(someObject.handlePX).toBe(42);
  });
});

describe('вычислить значения шкалы', () => {
  it('model.calcScaleValues', () => {
    model.calcScaleValues(6);
    expect(someObject.scaleValues).toEqual([0, 20, 40, 60, 80, 100]);
  });
});
