import Model from "../Model/Model"; 

let model: Model;  

beforeEach(()=>{
model = new Model();
})
document.body.insertAdjacentHTML(
  "afterbegin",
  "<div class='slider' style='width:100px; height: 100px;'></div>"
);
let container  = document.querySelector('.slider');
container.insertAdjacentHTML(
  "afterbegin",
  "<div class='slider__field_horizontal'></div>"
);
container.insertAdjacentHTML(
  "beforeend",
  "<div class='slider__field_vertical'></div>"
);
let field_horizontal  = document.querySelector('.slider__field_horizontal');
field_horizontal.insertAdjacentHTML(
  "afterbegin",
  "<div class='slider__button'></div>"
);
field_horizontal.insertAdjacentHTML(
  "beforeend",
  "<div class='slider__button' style='left: 66px'></div>"
);
let field_vertical  = document.querySelector('.slider__field_vertical');
field_vertical.insertAdjacentHTML(
  "afterbegin",
  "<div class='slider__button' style='top: 20px'></div>"
);
let button_horizontal  = document.querySelectorAll('.slider__button')[0];
let button_horizontal_2  = document.querySelectorAll('.slider__button')[1];
let button_vertical  = document.querySelector('.slider__field_vertical > .slider__button');
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
    expect(
      model.calcBtnOffset(
        field_horizontal,
        button_horizontal,
        42 +
        field_horizontal.getBoundingClientRect().left +
        button_horizontal.offsetWidth / 2
      )
    ).toBe(42);    
  });
  it("model.calcBtnOffset min", () => {
    expect(
      model.calcBtnOffset(
        field_horizontal,
        button_horizontal,
        -5 +
          field_horizontal.getBoundingClientRect().left +
          button_horizontal.offsetWidth / 2
      )
    ).toBe(0);
  });
  it("model.calcBtnOffset max", () => { 
    expect(
      model.calcBtnOffset(
        field_horizontal,
        button_horizontal_2,
        field_horizontal.offsetWidth +
          50 +
          field_horizontal.getBoundingClientRect().left +
          button_horizontal_2.offsetWidth / 2
      )
    ).toBe(field_horizontal.offsetWidth - button_horizontal_2.offsetWidth); 
  });
  it("model.calcBtnOffset vertical", () => {
     
    model.isHorizontal = false;
    expect(
      model.calcBtnOffset(
        field_vertical,
        button_vertical,
        22 +
        field_vertical.getBoundingClientRect().top +
          button_vertical.offsetHeight / 2
      )
    ).toBe(22);
    model.isHorizontal = true; 
  });
  it("model.calcBtnOffset buttons", () => {  
    expect(
      model.calcBtnOffset(
        field_horizontal,
        button_horizontal_2,
        42 +
        field_horizontal.getBoundingClientRect().left +
        button_horizontal_2.offsetWidth / 2
      )
    ).toBe(42);
  });
  it("model.calcBtnOffset buttons", () => {
    expect(
      model.calcBtnOffset(
        field_horizontal,
        button_horizontal,
        90 +
        field_horizontal.getBoundingClientRect().left +
        button_horizontal.offsetWidth / 2
      )
    ).toBeLessThan(button_horizontal_2.offsetLeft);
  });
});

describe("передвинуть кнопку к точке шага ", () => {
  it("model.calcStopPoint horizontal", () => {
    model = new Model({step: 50});   
    expect(
      model.calcStopPoint(field_horizontal, button_horizontal_2) 
    ).toBeGreaterThan(80)
  });
  it("model.calcStopPoint vertical", () => {
    model = new Model({isHorizontal: false ,step: 50});   
    expect(
      model.calcStopPoint(field_vertical, button_vertical)
      ).toBe(0) 
  });
});

describe("передвинуть кнопку к значению ", () => {
  it("model.moveToValue horisontal", () => {
    expect(
    model.moveToValue(field_horizontal, button_horizontal, 50)
    ).toBeGreaterThan(25) 
  });
  it("model.moveToValue vertical", () => { 
    model = new Model({isHorizontal: false});  
    expect(
      model.moveToValue(field_vertical, button_vertical, 50)
      ).toBeGreaterThan(25) 
  });
});

describe("вычислить значение флага", () => {

  it("model.calcFlagValue", () => {
    let value = model.calcFlagValue(field_horizontal, button_horizontal);
    expect(value).toBe(0);
  });
  it("model.calcFlagValue vertical", () => {
    model = new Model({isHorizontal: false});  
    let value = model.calcFlagValue(field_vertical, button_vertical);
    expect(value).toBeGreaterThan(15); 
  });
});

describe("вычислить значения шкалы", () => {
  it("model.calcScaleValue", () => {
    expect(
    model.calcScaleValue(6)
    ).toEqual([0, 20, 40, 60, 80, 100]);
  }); 
});