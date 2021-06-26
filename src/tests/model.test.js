import Model from '../model/Model';

let model;
const someObject = {
  buttonPX: 0,
  buttonPX2: 0,
  buttonValue: 0,
  buttonValue2: 0,
  scaleValues: [],
  updatePX(value) {
    this.buttonPX = value;
  },
  updatePX2(value) {
    this.buttonPX2 = value;
  },
  updateValue(value) {
    this.buttonValue = value;
  },
  updateValue2(value) {
    this.buttonValue2 = value;
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
  "<div class='js-slider__button'></div>"
);
field_horizontal.insertAdjacentHTML(
  'beforeend',
  "<div class='js-slider__button' style='left: 66px'></div>"
);
let field_vertical = document.querySelector('.js-slider__field_vertical');
field_vertical.insertAdjacentHTML(
  'afterbegin',
  "<div class='js-slider__button' style='top: 20px'></div>"
);
let button_horizontal = document.querySelectorAll('.js-slider__button')[0];
let button_horizontal2 = document.querySelectorAll('.js-slider__button')[1];
let button_vertical = document.querySelector(
  '.js-slider__field_vertical > .js-slider__button'
);

beforeEach(() => {
  model = new Model();
  model.setElementsSize({ buttonSize: 0, fieldSize: 100 });
  model.subscribe('updateFirstButtonPX', someObject.updatePX.bind(someObject));
  model.subscribe(
    'updateSecondButtonPX',
    someObject.updatePX2.bind(someObject)
  );
  model.subscribe(
    'updateFirstButtonValue',
    someObject.updateValue.bind(someObject)
  );
  model.subscribe(
    'updateSecondButtonValue',
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
  it('model.calcButtonOffset default', () => {
    model.calcButtonOffset({
      button: button_horizontal,
      mouseCoords: 42,
    });
    expect(someObject.buttonPX).toBe(42);
  });
  it('model.calcButtonOffset min', () => {
    model.calcButtonOffset({
      button: button_horizontal,
      mouseCoords: -42,
    });
    expect(someObject.buttonPX).toBe(0);
  });
  it('model.calcButtonOffset max', () => {
    model.calcButtonOffset({
      button: button_horizontal,
      mouseCoords: 1002,
    });
    expect(someObject.buttonPX).toBe(model.elementsSize.fieldSize);
  });
  it('model.calcButtonOffset secondButton', () => {
    model.calcButtonOffset({
      button: button_horizontal2,
      mouseCoords: 42,
    });
    expect(someObject.buttonPX2).toBe(42);
  });
});

describe('передвинуть кнопку к точке шага ', () => {
  it('model.calcStopPointPX horizontal', () => {
    model.config.step = 50;
    model.calcStopPointPX({
      button: button_horizontal,
      buttonOffset: 20,
    });
    expect(someObject.buttonPX).toBe(0);
    model.calcStopPointPX({
      button: button_horizontal,
      buttonOffset: 75,
    });
    expect(someObject.buttonPX).toBe(50);
    model.config.step = 1;
  });
});

describe('вычислить значение флага', () => {
  it('model.calcTooltipValue ', () => {
    model.calcStopPointPX({
      button: button_horizontal,
      buttonOffset: 75,
    });
    expect(someObject.buttonValue).toBe(75);
  });
  it('model.calcTooltipValue дробное', () => {
    model.config.step = 0.1;
    model.calcStopPointPX({
      button: button_horizontal,
      buttonOffset: 1.5,
    });
    expect(someObject.buttonValue).toBe(1.5);
    model.config.step = 1;
  });
});

describe('передвинуть кнопку к значению ', () => {
  it('model.moveToValue horizontal', () => {
    model.moveToValue({
      button: button_horizontal,
      value: 42,
    });
    expect(someObject.buttonPX).toBe(42);
  });
});

describe('вычислить значения шкалы', () => {
  it('model.calcScaleValues', () => {
    model.calcScaleValues(6);
    expect(someObject.scaleValues).toEqual([0, 20, 40, 60, 80, 100]);
  });
});
