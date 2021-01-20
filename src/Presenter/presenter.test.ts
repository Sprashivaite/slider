import Model from "../Model/Model";
import View from "../View/View";
import Presenter from "./Presenter";

let model: Model;
let view: View;
let presenter: Presenter;

beforeEach(()=>{
  view = new View({isRangeSlider: false});  
  model = new Model();
  presenter = new Presenter(model, view);
})
afterEach(() => view.removeElements())
 
describe("наличие инстансa класса Presenter", () => {
  it("Presenter", () => { 
    expect(presenter).toBeDefined(); 
  });
});

describe("изменить тип слайдера", () => {
  it("presenter.changeTypeSlider", () => {    
    presenter.changeTypeSlider(); 
    expect(view.isRangeSlider).toBe(true)
    presenter.changeTypeSlider(); 
    expect(view.isRangeSlider).toBe(false) 
  });
});

describe("изменить ориентацию слайдера", () => {
  it("presenter.changeOrientation", () => {   
    presenter.changeOrientation(); 
    expect(view.isHorizontal).toBe(false)
    presenter.changeOrientation(); 
    expect(view.isHorizontal).toBe(true) 
  });
});

describe("изменить значение флага", () => {
  it("presenter.changeFlagValue", () => {     
    view.button.moveButton(view.field.div.offsetWidth - view.button.div.offsetWidth);
    presenter.changeFlagValue(view.button.div, view.flag); 
    expect(view.flag.div.innerHTML).toBeCloseTo(100)
  });
});

describe("передвинуть button", () => {
  it("presenter.moveButton", () => {     
    view.handler.mouseCoords = 80;
    presenter.moveButton(view.button); 
    expect(view.button.div.offsetLeft).toBeGreaterThan(0) 
  });
});

describe("реакция на mouse Move", () => {
  it("presenter.mouseMoveButton", () => {     
    view.handler.mouseCoords = 80;
    presenter.mouseMoveButton(); 
    expect(view.button.div.offsetLeft).toBeGreaterThan(0);
    expect(view.flag.div.innerHTML).toBeGreaterThan(0);
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(10); 
  });
});

describe("реакция на mouse Move", () => {
  it("presenter.mouseMoveButton_2", () => {    
    presenter.changeTypeSlider();
    view.handler.mouseCoords = 80;
    presenter.mouseMoveButton_2(); 
    expect(view.button_2.div.offsetLeft).toBeGreaterThan(0);
    expect(view.flag_2.div.innerHTML).toBeGreaterThan(0);
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(10); 
  });
});

describe("реакция на mouse Up", () => {
  it("presenter.mouseUp", () => {    
    view.removeElements();
    view = new View({isRangeSlider: false}); 
    model = new Model({step: 20});
    presenter = new Presenter(model, view);
    view.button.moveButton(view.field.div.offsetWidth - 5 - view.button.div.offsetWidth);
    presenter.mouseUp();
    expect(view.button.div.offsetLeft + view.button.div.offsetWidth).toBe(view.field.div.offsetWidth);
    expect(view.flag.div.innerHTML).toBe('100');
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(80);
    
  });
});

describe("реакция на mouse Up 2", () => {
  it("presenter.mouseUp_2", () => {
    view.removeElements();
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
describe("установить новое значение button", () => {
  it("presenter.setValue", () => {    
    presenter.setButtonValue(55)
    expect(view.flag.div.innerHTML).toBe('55')
  });
  it("presenter.setValue_2", () => {
    view.removeElements();
    view = new View({isRangeSlider: true});  
    presenter = new Presenter(model, view);    
    presenter.setButtonValue_2(55)
    expect(view.flag_2.div.innerHTML).toBe('55')
  });
});