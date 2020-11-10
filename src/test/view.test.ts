import Model from "../Model";
import View from "../View";
import Presenter from "../Presenter";

document.body.insertAdjacentHTML(
  "afterbegin",
  "<div class='slider' style='width:100px;'></div>"
);

let view: View;


describe("наличие инстансa класса", () => {
  view = new View();
  it("View", () => {
    expect(view).toBeDefined();
  });
  view.removeElements();
});

describe("установка параметров", () => {
  
  it("rangeSlider", () => {
view = new View();
view.isRangeSlider = true;
expect(view.isRangeSlider).toBe(true);
view.removeElements();
  });
  
});


describe("работа фасада View", () => {
  it("view.renderElements", () => {
    view.renderElements();
    expect(view.field).toBeDefined();
    expect(view.button.div).toBeDefined();
    expect(view.flag).toBeDefined();
    expect(view.progressBar.div).toBeDefined();
    view.removeElements();
  });
});

describe("движение View button", () => {
  afterEach(function () {
    view.removeElements();
  });
  it("view.button.buttonMove Horisontal", () => {
    view = new View();
    view.button.buttonMove(50);
    expect(getComputedStyle(view.button.div).left).toBe("50px");
  });
  it("view.button.buttonMove Vertical", () => {
    view.isHorizontal = false;
    view.renderElements();
    view.button.buttonMove(50);
    expect(getComputedStyle(view.button.div).top).toBe("50px");
  });
});

describe("toggle View flag", () => {
  beforeEach(function () {
    view.renderElements();
  });
  afterEach(function () {
    view.removeElements();
  });
  it("view.flag.addFlag", () => {
    view.flag.addFlag();
    expect(getComputedStyle(view.flag.div).display).toBe("block");
  });
  it("view.removeFlag", () => {
    view.flag.removeFlag();
    expect(getComputedStyle(view.flag.div).display).toBe("none");
  });
});

describe("значение View flag", () => {
  it("view.changeFlagValue", () => {
    view.renderElements();
    view.flag.changeFlagValue(50);
    expect(view.flag.div.innerHTML).toBe("50");
    view.removeElements();
  });
});

describe("удаление элементов View", () => {
  it("view.removeElements", () => {
    view.renderElements();
    view.removeElements();
    expect(view.slider.childnodes).toBeUndefined();
  });
});

describe("движение View progressBar", () => {
  it("view.progressBar range", () => {
    view = new View();

    view.button_2.buttonMove(95);
    view.progressBar.progressBarMove();
    expect(getComputedStyle(view.progressBar.div).width).toBe(
      view.button_2.div.offsetLeft +
        view.button.div.offsetLeft +
        view.button.div.offsetWidth / 2 +
        "px"
    );
    // expect(getComputedStyle(view.progressBar.div).backgroundColor).toBe('rgb(184, 134, 11)');
    view.removeElements();
  });
  it("view.progressBar solo", () => {
    view = new View({ isRangeSlider: false });

    view.button.buttonMove(100);
    view.progressBar.progressBarMove();
    expect(getComputedStyle(view.progressBar.div).width).toBe(
      view.button.div.offsetLeft + view.button.div.offsetWidth / 2 + "px"
    );
    view.removeElements();
  });
  it("view.progressBar Vertical", () => {
    view = new View({ isRangeSlider: false, isHorizontal: false });

    view.button.buttonMove(30);
    view.progressBar.progressBarMove();
    expect(getComputedStyle(view.progressBar.div).height).toBe(
      view.button.div.offsetTop + view.button.div.offsetWidth + "px"
    );
    view.removeElements();
  });
  it("view.progressBar range Vertical", () => {
    view = new View({ isHorizontal: false });

    view.button_2.buttonMove(6);
    view.progressBar.progressBarMove();
    expect(getComputedStyle(view.progressBar.div).height).toBe(
      view.button_2.div.offsetTop -
        view.button.div.offsetTop +
        view.button.div.offsetWidth / 2 +
        "px"
    );

    view.removeElements();
  });
});

describe("подписка наблюдатели", () => {
  let something: object;
  it("view.register", () => {
    view.register(something);
    expect(view.subscriber).toBe(something);
  });
});

describe('координаты мыши', ()=>{
it('view.calcMouseCoords horisontal', () =>{
  view = new View();
  let mousemove = new MouseEvent("mousemove", {clientX: 50});
 
  view.calcMouseCoords();

  document.dispatchEvent(mousemove);
  expect(view.mouseCoords).toBe(50);
})
it('view.calcMouseCoords vertical', () =>{
  view = new View({isHorizontal: false});
  let mousemove = new MouseEvent("mousemove", {clientY: 50});
 
  view.calcMouseCoords();

  document.dispatchEvent(mousemove);
  expect(view.mouseCoords).toBe(50);
})
});

xdescribe("наличие отрисованных элементов у View", () => {
  beforeEach(function () {

    view.renderField();
    view.renderButtons();
    view.renderFlag();
    view.renderProgressBar();
  });
  afterEach(function () {

    view.removeElements();
  });
  it("view.field Vertical", () => {
    view.isHorizontal = false;
    view.renderField();
    expect(view.field).toBeDefined();
  });
  it("view.field Horizontal", () => {
    expect(view.field).toBeDefined();
  });
  it("view.button Vertical", () => {
    view.isHorizontal = false;
    view.renderButtons();
    expect(view.button.div).toBeDefined();
  });
  it("view.button Horizontal", () => {
    expect(view.button.div).toBeDefined();
  });
  it("view.flag", () => {
    expect(view.flag).toBeDefined();
  });
  it("view.ProgressBar", () => {
    expect(view.progressBar.div).toBeDefined();
  });
  it("view.ProgressBar", () => {
    view.isHorizontal = false;
    view.renderProgressBar();
    expect(view.progressBar.div).toBeDefined();
  });
});
