import { Model } from "../Model";
import { View } from "../View";

let model: Model
let view: View;

beforeEach(function () {
  view = new View();
  model = new Model();
});

describe("наличие инстансa класса", () => {
  it("Model", () => { 
    expect(model).toBeDefined();
  });
});

describe("передвинуть кнопку к точке шага ", () => {
  it("model.makeBreakPoint", () => {
    view.renderElements();
    view.buttonMove(view.button, 10);
    view.buttonMove(
      view.button,
      model.makeBreakPoint(view.field, view.button, 10)
    );
    expect(view.button.offsetLeft).toBe(0);
    view.removeElements();
  });
});

describe("высчитывание отступа для кнопки", () => {
  beforeEach(function () {
    view.isRangeSlider = false;
    view.renderElements();
  });
  afterEach(function () {
    view.isHorizontal = true;
    view.removeElements();
  });
  it("model.calcBtnOffset", () => {
    
    expect(
      model.calcBtnOffset(
        view.field,
        view.button,
        22 +
          view.field.getBoundingClientRect().left +
          view.button.offsetWidth / 2
      )
    ).toBe(22);
  });
  it("model.calcBtnOffset min", () => {
    expect(
      model.calcBtnOffset(
        view.field,
        view.button,
        -5 +
          view.field.getBoundingClientRect().left +
          view.button.offsetWidth / 2
      )
    ).toBe(0);
  });
  it("model.calcBtnOffset max", () => {
    expect(
      model.calcBtnOffset(
        view.field,
        view.button,
        view.field.offsetWidth +
          50 +
          view.field.getBoundingClientRect().left +
          view.button.offsetWidth / 2
      )
    ).toBe(view.field.offsetWidth - view.button.offsetWidth);
  });
  it("model.calcBtnOffset vertical", () => {
    view.removeElements();
    view.isHorizontal = false;
    model.isHorizontal = false;
    view.renderElements();
    expect(
      model.calcBtnOffset(
        view.field,
        view.button,
        22 +
          view.field.getBoundingClientRect().top +
          view.button.offsetWidth / 2
      )
    ).toBe(22);
  });
});

describe("передвинуть кнопку к значению ", () => {

  it("model.moveToValue", () => {
    view.renderElements();
    model.moveToValue(view.field,view.button , 50);

    expect(view.button.offsetLeft + view.button.offsetWidth / 2).toBe(50);
    view.removeElements();
  });
});

describe("вычислить значение флага", () => {

  it("model.calcValue", () => {
    view.renderElements();
    model.moveToValue(view.field,view.button , 50);
    let value = model.calcValue(view.field, view.button);

    expect(value).toBe(50);
    view.removeElements();
  });
});

describe("дистанция между кнопками", () => {
  it("model.makeDistanceButton", () => {
    view.renderElements();
    view.buttonMove(view.button, 80);
    model.makeDistanceButton(
      view.button,
      view.button_2
    );
    expect(view.button.offsetLeft).toBeLessThan(view.button_2.offsetLeft);
    view.removeElements();
  });
  it("model.makeDistanceButton", () => {
    view.renderElements();
    view.buttonMove(view.button, 50);
    view.buttonMove(view.button_2, 30);
    model.makeDistanceButton_2(
      view.button,
      view.button_2
    );
    expect(view.button.offsetLeft).toBeLessThan(view.button_2.offsetLeft);
    view.removeElements();
  });
  it("model.makeDistanceButton", () => {
    model.isHorizontal = false;
    view.isHorizontal = false;
    view.renderElements();
    view.buttonMove(view.button, 50);
    view.buttonMove(view.button_2, 30);
    model.makeDistanceButton_2(
      view.button,
      view.button_2
    );
    expect(view.button.offsetTop).toBeLessThan(view.button_2.offsetTop);
    view.removeElements();
  });
  it("model.makeDistanceButton", () => {
    model.isHorizontal = false;
    view.isHorizontal = false;
    view.renderElements();
    view.buttonMove(view.button, 80);
    model.makeDistanceButton(
      view.button,
      view.button_2
    );
    expect(view.button.offsetTop).toBeLessThan(view.button_2.offsetTop);
    view.removeElements();
  });
});