import Model from "../Model";
import View from "../View";

let model: Model;
let view: View;

beforeEach(()=>{
model = new Model();

})

describe("конструктор класса", () => {
  it("Model", () => { 
    expect(model).toBeDefined();
  });
  it("Model max", () => {
    model = new Model({max: 200}); 
    expect(model.max).toBe(200);
  });
  it("Model min", () => {
    model = new Model({min: -5}); 
    expect(model.min).toBe(-5);
  });
  it("Model step", () => {
    model = new Model({step: -5}); 
    expect(model.step).toBe(1);
  });
  it("Model step", () => {
    model = new Model({step: 10}); 
    expect(model.step).toBe(10);
  });
  it("Model step", () => {
    model = new Model({step: 0}); 
    expect(model.step).toBe(1);
  });
  it("Model step", () => {
    model = new Model({isHorizontal: false}); 
    expect(model.isHorizontal).toBe(false);
  });
});


describe("высчитывание отступа для кнопки", () => {
  it("model.calcBtnOffset default", () => {
    view = new View({isRangeSlider: false});
    view.renderElements();
    expect(
      model.calcBtnOffset(
        view.field.div,
        view.button.div,
        42 +
          view.field.div.getBoundingClientRect().left +
          view.button.div.offsetWidth / 2
      )
    ).toBe(42);
    view.removeElements();
  });
  it("model.calcBtnOffset min", () => {
    view = new View({isRangeSlider: false});
    view.renderElements();
    expect(
      model.calcBtnOffset(
        view.field.div,
        view.button.div,
        -5 +
          view.field.div.getBoundingClientRect().left +
          view.button.div.offsetWidth / 2
      )
    ).toBe(0);
    view.removeElements();
  });
  it("model.calcBtnOffset max", () => {
    view = new View({isRangeSlider: false});
    view.renderElements();
    expect(
      model.calcBtnOffset(
        view.field.div,
        view.button.div,
        view.field.div.offsetWidth +
          50 +
          view.field.div.getBoundingClientRect().left +
          view.button.div.offsetWidth / 2
      )
    ).toBe(view.field.div.offsetWidth - view.button.div.offsetWidth);
    view.removeElements();
  });
  it("model.calcBtnOffset vertical", () => {
    
    view = new View({isHorizontal: false, isRangeSlider: false});
    view.renderElements();
    model.isHorizontal = false;
    expect(
      model.calcBtnOffset(
        view.field.div,
        view.button.div,
        22 +
          view.field.div.getBoundingClientRect().top +
          view.button.div.offsetHeight / 2
      )
    ).toBe(22);
    model.isHorizontal = true;
    view.removeElements();
  });
  it("model.calcBtnOffset buttons", () => {
    view = new View({isRangeSlider: true});
    view.renderElements();
    view.button.moveButton(
      model.calcBtnOffset(
        view.field.div,
        view.button.div,
        42 +
          view.field.div.getBoundingClientRect().left +
          view.button.div.offsetWidth / 2
      )
    );
    expect(view.button.div.offsetLeft).toBeLessThan(view.button_2.div.offsetLeft);
    view.removeElements();
  });
  it("model.calcBtnOffset buttons", () => {
    view = new View({isRangeSlider: true});
    view.renderElements();
    view.button_2.moveButton(50)
    view.button.moveButton(10)
    view.button_2.moveButton(
      model.calcBtnOffset(
        view.field.div,
        view.button_2.div,
        12 +
          view.field.div.getBoundingClientRect().left +
          view.button_2.div.offsetWidth / 2
      )
    );
    expect(view.button_2.div.offsetLeft).toBeGreaterThan(view.button.div.offsetLeft);
    view.removeElements();
  });
});

describe("передвинуть кнопку к точке шага ", () => {
  it("model.calcBreakPoint horizontal", () => {
    model = new Model({step: 10});
    view = new View({isRangeSlider: false});
    view.renderElements();
    view.button.moveButton(4);
    view.button.moveButton(
      model.calcBreakPoint(view.field.div, view.button.div)
    );
    expect(view.button.div.offsetLeft).toBe(0);
    view.removeElements();
  });
  xit("model.calcBreakPoint vertical", () => {
    model.step = 10;
    view = new View({isRangeSlider: false, isHorizontal: false});
    view.renderElements();
    model.isHorizontal = false;
    view.button.moveButton(10);
    view.button.moveButton(
      model.calcBreakPoint(view.field.div, view.button.div)
    );
    expect(view.button.div.offsetTop).toBe(0);
    model.step = 1;
    // view.removeElements();
  });
});

describe("передвинуть кнопку к значению ", () => {

  it("model.moveToValue horisontal", () => {
    view = new View({isRangeSlider: false});
    view.renderElements();
    model.max = 100;
    model.moveToValue(view.field.div,view.button.div , 100);

    expect(view.button.div.offsetLeft + view.button.div.offsetWidth).toBe(view.field.div.offsetWidth);
    view.removeElements();
  });
  it("model.moveToValue vertical", () => {
    view = new View({isRangeSlider: false, isHorizontal: false});
    view.renderElements();
    model.max = 100;
    model.isHorizontal = false;
    model.moveToValue(view.field.div,view.button.div , 100);

    expect(view.button.div.offsetTop + view.button.div.offsetHeight).toBe(view.field.div.offsetHeight);
    view.removeElements();
  });
});

describe("вычислить значение флага", () => {

  it("model.calcFlagValue", () => {
    view = new View({isRangeSlider: false});
    view.renderElements();
    model.moveToValue(view.field.div,view.button.div , 50);
    let value = model.calcFlagValue(view.field.div, view.button.div);

    expect(value).toBe(50);
    view.removeElements();
  });
  it("model.calcFlagValue vertical", () => {
    view = new View({isRangeSlider: false, isHorizontal: false});
    view.renderElements();
    model.isHorizontal = false;
    model.moveToValue(view.field.div,view.button.div , 50);
    let value = model.calcFlagValue(view.field.div, view.button.div);

    expect(value).toBe(50);
    view.removeElements();
  });
});