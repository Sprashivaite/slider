import View from "../View/View"; 


let container  = document.querySelector('.slider');
let view: View;

const someObject = {
  mouseCoords: 0,
  buttonPX: 0,
  buttonPX2: 0,
  buttonValue: 0,
  buttonValue2: 0,
  scaleValues: [],
  updateMouseCoords(data) {this.mouseCoords = data.mouseCoords},
  updatePX(value) {this.buttonPX = value},
  updatePX2(value) {this.buttonPX2 = value},
  updateValue(value) {this.buttonValue = value},
  updateValue2(value) {this.buttonValue2 = value},
  updateScale({arrValues, quantity}) {
    this.scaleValues = arrValues
  }
};

beforeEach(()=>{
  view = new View();
})

describe("наличие инстансa класса", () => { 
  it("View", () => {
    expect(view).toBeDefined();
  });
});

describe("установка параметров View", () => {
  it("валидные параметры", () => {
    view = new View({ isRangeSlider: true, isHorizontal: false, isProgressBar: true, isScale: false }); 
    expect(view.config.isRangeSlider).toBe(true); 
    expect(view.config.isHorizontal).toBe(false); 
    expect(view.config.isProgressBar).toBe(true); 
    expect(view.config.isScale).toBe(false); 
  });
  it("невалидные параметры", () => {
    view = new View({ isRangeSlider: 22, isHorizontal: 'asdfc', isProgressBar: '', isScale: null }); 
    expect(view.config.isRangeSlider).toBe(true); 
    expect(view.config.isHorizontal).toBe(true); 
    expect(view.config.isProgressBar).toBe(true); 
    expect(view.config.isScale).toBe(true); 
  });
});

describe("Создание/поиск контайнера View", () => {
  it("Установка контейнера", () => {
    let container = document.querySelector('.slider')
    let view = new View({target: container}  ); 
    expect(view.slider.div).toEqual(container); 
  }); 
  it("Поиск контейнера по дата селектору", () => {
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<div data-slider style='width:100px;'></div>"
    );
    container.classList = 'none'
    view = new View();
    let div = document.querySelector('[data-slider]'); 
    expect(view.slider.div).toEqual(div);
    div.remove();
    container.classList = 'slider'
  });
  it("Создание контейнера", () => {
    let div = document.querySelector('.slider');
    div.className = '';
    view = new View();
    expect(view.slider.div).toBeDefined();
    div.className = 'slider'; 
  });
});

describe("работа фасада renderElements", () => {
  it("view.renderElements", () => {
    view.renderElements();
    expect(view.field).toBeDefined();
    expect(view.button1.div).toBeDefined();
    expect(view.flag1).toBeDefined();
    expect(view.progressBar.div).toBeDefined();
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

describe("движение View button", () => {
  afterEach(function () {
    view.removeElements();
  });
  it("view.button.moveButton Horisontal", () => {
    view = new View({isRangeSlider:false});
    view.renderElements();
    view.button1.moveButton(50);
    expect(getComputedStyle(view.button1.div).left).toBe("50px");
  });
  it("view.button.moveButton Vertical", () => {
    view = new View({isHorizontal: false,isRangeSlider:false});
    view.renderElements();
    view.button1.moveButton(50);
    expect(getComputedStyle(view.button1.div).top).toBe("50px");
  });
});

describe("toggle View flag", () => {
  beforeEach(function () {
    view.renderElements();
  });
  afterEach(function () {
    view.removeElements();
  });
  it("view.flag.showFlag", () => {
    view.flag1.showFlag();
    expect(getComputedStyle(view.flag1.div).visibility).toBe("visible");
  });
  it("view.hideFlag", () => {
    view.flag1.hideFlag();
    expect(getComputedStyle(view.flag1.div).visibility).toBe("hidden");
  });
});

describe("значение View flag", () => {
  it("view.changeFlagValue", () => {
    view.renderElements();
    view.flag1.changeFlagValue(50);
    expect(view.flag1.div.innerHTML).toBe("50");
    view.removeElements();
  });
});

describe("движение View progressBar", () => { 
  it("view.progressBar range", () => {
    view = new View({ isRangeSlider: true });
    view.renderElements();
    view.button2.moveButton(95);
    view.progressBar.progressBarMove();
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(60);
    view.removeElements()
  });
  it("view.progressBar solo", () => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    view.button1.moveButton(100);
    view.progressBar.progressBarMove();
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(90)
    view.removeElements();
  });
  it("view.progressBar Vertical", () => {
    view = new View({ isRangeSlider: false, isHorizontal: false });
    view.renderElements();
    view.button1.moveButton(30);
    view.progressBar.progressBarMove();
    expect(view.progressBar.div.offsetHeight).toBeGreaterThan(10)
    view.removeElements();
  });
  it("view.progressBar range Vertical", () => {
    view = new View({ isHorizontal: false, isRangeSlider: true });
    view.renderElements();
    view.button2.moveButton(60);
    view.progressBar.progressBarMove();
    expect(view.progressBar.div.offsetHeight).toBeGreaterThan(30)
    view.removeElements();
  });
});

describe("координаты мыши", () => {  
  afterEach(() => view.removeElements());
  it("view.getMouseCoords horisontal", () => {
    view.renderElements();
    const fieldOffset = view.field.div.getBoundingClientRect().left
    view.addHandlers()
    let mousemove = new MouseEvent("mousemove", { clientX: 50 });      
    document.dispatchEvent(mousemove);

    expect(view.handler.mouseCoords).toBe(50 - fieldOffset);
    
  });
  it("view.getMouseCoords vertical", () => {
    view = new View({ isHorizontal: false }); 
    view.renderElements();
    const fieldOffset = view.field.div.getBoundingClientRect().top
    view.addHandlers()
    let mousemove = new MouseEvent("mousemove", { clientY: 50 });
    document.dispatchEvent(mousemove);
    expect(view.handler.mouseCoords).toBe(50 - fieldOffset);
  });
});

describe("события мыши", () => {
  let mousedown: any, mousemove: any, mouseup: any ;

  beforeEach(() => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    // let something: object = { mouseMoveButton: () => {}, mouseUp: () => {} };
    // view.register(something);
    mousedown = new MouseEvent("mousedown");
    mousemove = new MouseEvent("mousemove", { clientX: 10 });
    mouseup = new MouseEvent("mouseup");
  });

  afterEach(() => {
    view.removeElements();
  });

  it("view.handler.addFieldHandler defaultPrevented", () => {
    let contextmenu = new MouseEvent("contextmenu", { cancelable: true });
    let mousedown = new MouseEvent("mousedown", { cancelable: true });

    view.renderElements();
    view.addHandlers()


    let contextmenuCalled = true;
    let mousedownCalled = true;

    view.field.div.addEventListener("contextmenu", (event) => {
      if (event.defaultPrevented) contextmenuCalled = false;      
    });

    view.field.div.addEventListener("mousedown", (event) => {
      if (event.defaultPrevented)  mousedownCalled = false;      
    });

    view.field.div.dispatchEvent(mousedown);
    view.field.div.dispatchEvent(contextmenu);

    expect(contextmenuCalled).toBeFalsy();
    expect(mousedownCalled).toBeFalsy();
  });

  it("view.handler.addButtonHandler mouse down", () => {
    let notify = jasmine.createSpy("notify");
    view.addHandlers()
    view.handler.subscribe('mouseDown', notify)
    view.button1.div.dispatchEvent(mousedown);

    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(1);
  });

  it("view.handler.addButtonHandler mouse move", () => {
    let notify = jasmine.createSpy("notify");
    view.addHandlers()
    view.handler.subscribe('mouseMove', notify)
    view.button1.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(2);
  });
  it("view.handler.addButtonHandler mouseup", () => {
    let notify = jasmine.createSpy("notify");
    view.addHandlers()
    view.handler.subscribe('mouseMove', notify)
    view.handler.subscribe('mouseUp', notify)
    view.button1.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(3);
  });
});

describe("события мыши range", () => {
  let mousedown: any, mousemove: any, mouseup: any, something: object;

  beforeEach(() => {
    view = new View({ isRangeSlider: true });
    view.renderElements();
    something = {
      mouseMoveButton: () => {},
      mouseUp: () => {},
      mouseMoveButton2: () => {},
      mouseUp2: () => {},
    };
    mousedown = new MouseEvent("mousedown");
    mousemove = new MouseEvent("mousemove", { clientX: 50 });
    mouseup = new MouseEvent("mouseup");
  });

  afterEach(() => {
    view.removeElements();
  });
  it("view.handler.addFieldHandler mouse event button2", () => { 
    let notify = jasmine.createSpy("notify");
    view.addHandlers()
    view.handler.subscribe('mouseMove2', notify)
    view.handler.subscribe('mouseUp2', notify)
    view.handler.mouseCoords = 60;
    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);

    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(2);
  });
});