import Model from "../Model/Model";
import View from "../View/View";
import Presenter from "./Presenter";

let model: Model;
let view: View;
let presenter: Presenter;

afterEach(()=>{
  model = new Model();
})
 
describe("наличие инстансa класса Presenter", () => {
  it("Presenter", () => {
    model = new Model();
    view = new View();
    presenter = new Presenter(model, view);
    expect(presenter).toBeDefined();
    view.removeElements();
  });
});

describe("изменить тип слайдера", () => {
  it("presenter.changeTypeSlider", () => {
    
    view = new View({isRangeSlider: false}); 
    model = new Model();
    presenter = new Presenter(model, view);
    presenter.changeTypeSlider();
 
    expect(view.isRangeSlider).toBe(true)
    view.removeElements();
  });
});

describe("изменить ориентацию слайдера", () => {
  it("presenter.changeOrientation", () => {
    
    view = new View({isRangeSlider: true}); 
    model = new Model();
    presenter = new Presenter(model, view);
    presenter.changeOrientation();
 
    expect(view.isHorizontal).toBe(false)
    view.removeElements();
  });
});

describe("изменить значение флага", () => {
  it("presenter.changeFlagValue", () => {
    
    view = new View({isRangeSlider: false}); 
    model = new Model();
    presenter = new Presenter(model, view);
    view.button.moveButton(view.field.div.offsetWidth);
    presenter.changeFlagValue(view.button.div, view.flag);
 
    expect(view.flag.div.innerHTML).toBeCloseTo(100)
    view.removeElements();
  });
});

describe("передвинуть button", () => {
  it("presenter.moveButton", () => {
    
    view = new View({isRangeSlider: false}); 
    model = new Model();
    presenter = new Presenter(model, view);
    view.mouseCoords = 80;
    presenter.moveButton(view.button);
 
    expect(view.button.div.offsetLeft).toBeGreaterThan(0)
    view.removeElements();
  });
});

describe("реакция на mouse Move", () => {
  it("presenter.mouseMoveButton", () => {
    
    view = new View({isRangeSlider: false}); 
    model = new Model();
    presenter = new Presenter(model, view);
    view.mouseCoords = 80;
    presenter.mouseMoveButton();

 
    expect(view.button.div.offsetLeft).toBeGreaterThan(0);
    expect(view.flag.div.innerHTML).toBeGreaterThan(0);
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(10);
    view.removeElements();
  });
});

describe("реакция на mouse Move", () => {
  it("presenter.mouseMoveButton_2", () => {
    
    view = new View({isRangeSlider: true}); 
    model = new Model();
    presenter = new Presenter(model, view);
    view.mouseCoords = 80;
    presenter.mouseMoveButton_2();
 
    expect(view.button_2.div.offsetLeft).toBeGreaterThan(0);
    expect(view.flag_2.div.innerHTML).toBeGreaterThan(0);
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(10);
    view.removeElements();
  });
});

describe("реакция на mouse Up", () => {
  it("presenter.mouseUp", () => {
    
    view = new View({isRangeSlider: false}); 
    model = new Model({step: 20});
    presenter = new Presenter(model, view);

    view.button.moveButton(view.field.div.offsetWidth - 5 - view.button.div.offsetWidth);
    presenter.mouseUp();
    expect(view.button.div.offsetLeft + view.button.div.offsetWidth).toBe(view.field.div.offsetWidth);

    expect(view.flag.div.innerHTML).toBe('100');
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(80);
    view.removeElements();
  });
});

describe("реакция на mouse Up 2", () => {
  it("presenter.mouseUp_2", () => {
    
    view = new View({isRangeSlider: true}); 
    model = new Model({step: 20});
    presenter = new Presenter(model, view);

    view.button_2.moveButton(view.field.div.offsetWidth - 5 - view.button.div.offsetWidth);
    presenter.mouseUp_2();

    expect(view.button_2.div.offsetLeft + view.button.div.offsetWidth).toBe(view.field.div.offsetWidth);

    expect(view.flag_2.div.innerHTML).toBe('100');
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(80);
    view.removeElements();
  });
});
