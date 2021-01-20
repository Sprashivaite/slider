import View from "../View/View"; 
 
let container  = document.querySelector('.slider');
let view: View;

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
    expect(view.isRangeSlider).toBe(true); 
    expect(view.isHorizontal).toBe(false); 
    expect(view.isProgressBar).toBe(true); 
    expect(view.isScale).toBe(false); 
  });
  it("невалидные параметры", () => {
    view = new View({ isRangeSlider: 22, isHorizontal: 'asdfc', isProgressBar: '', isScale: null }); 
    expect(view.isRangeSlider).toBe(true); 
    expect(view.isHorizontal).toBe(true); 
    expect(view.isProgressBar).toBe(true); 
    expect(view.isScale).toBe(true); 
  });
});

describe("Создание/поиск контайнера View", () => {
  it("Установка контейнера", () => {
    let container = document.querySelector('.slider')
    let view = new View({target: container}  ); 
    expect(view.slider.div).toEqual(container); 
  });
  it("Поиск контейнера по селектору класса", () => { 
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
    expect(view.button.div).toBeDefined();
    expect(view.flag).toBeDefined();
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
    view = new View();
    view.renderElements();
    view.button.moveButton(50);
    expect(getComputedStyle(view.button.div).left).toBe("50px");
  });
  it("view.button.moveButton Vertical", () => {
    view = new View({isHorizontal: false});
    view.renderElements();
    view.button.moveButton(50);
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
  it("view.flag.showFlag", () => {
    view.flag.showFlag();
    expect(getComputedStyle(view.flag.div).opacity).toBe("1");
  });
  it("view.hideFlag", () => {
    view.flag.hideFlag();
    expect(getComputedStyle(view.flag.div).opacity).toBe("0");
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

describe("движение View progressBar", () => { 
  it("view.progressBar range", () => {
    view = new View({ isRangeSlider: true });
    view.renderElements();
    view.button_2.moveButton(95);
    view.progressBar.progressBarMove();
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(60);
    view.removeElements()
  });
  it("view.progressBar solo", () => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    view.button.moveButton(100);
    view.progressBar.progressBarMove();
    expect(view.progressBar.div.offsetWidth).toBeGreaterThan(90)
    view.removeElements();
  });
  it("view.progressBar Vertical", () => {
    view = new View({ isRangeSlider: false, isHorizontal: false });
    view.renderElements();
    view.button.moveButton(30);
    view.progressBar.progressBarMove();
    expect(view.progressBar.div.offsetHeight).toBeGreaterThan(10)
    view.removeElements();
  });
  it("view.progressBar range Vertical", () => {
    view = new View({ isHorizontal: false, isRangeSlider: true });
    view.renderElements();
    view.button_2.moveButton(60);
    view.progressBar.progressBarMove();
    expect(view.progressBar.div.offsetHeight).toBeGreaterThan(30)
    view.removeElements();
  });
});

describe("подписка наблюдателя", () => {
  let something: object;
  it("view.register", () => {
    view.renderElements()
    view.register(something);
    expect(view.handler.subscriber).toBe(something);
    view.removeElements()
  });
});

describe("оповещение наблюдателя", () => {
  beforeEach(() => view.renderElements())
  afterEach(() => view.removeElements())
  it("view.handler.notifyMouseMove", () => {
    let something: object = { mouseMoveButton: () => {} };
    view.register(something);
    spyOn(view.handler.subscriber, "mouseMoveButton");
    view.handler.notifyMouseMove();
    expect(view.handler.subscriber.mouseMoveButton).toHaveBeenCalled();
  });
 
  it("view.handler.notifyMouseMove_2", () => {
    let something: object = { mouseMoveButton_2: () => {} };
    view.register(something);

    spyOn(view.handler.subscriber, "mouseMoveButton_2");
    view.handler.notifyMouseMove_2();
    expect(view.handler.subscriber.mouseMoveButton_2).toHaveBeenCalled();
  });

  it("view.handler.notifyMouseUp", () => {
    let something: object = { mouseUp: () => {} };
    view.register(something);

    spyOn(view.handler.subscriber, "mouseUp");
    view.handler.notifyMouseUp();
    expect(view.handler.subscriber.mouseUp).toHaveBeenCalled();
  });
  it("view.handler.notifyMouseUp_2", () => {
    let something: object = { mouseUp_2: () => {} };
    view.register(something);

    spyOn(view.handler.subscriber, "mouseUp_2");
    view.handler.notifyMouseUp_2();
    expect(view.handler.subscriber.mouseUp_2).toHaveBeenCalled();
  });
});

describe("координаты мыши", () => {
  let someObject; 
  afterEach(() => view.removeElements());
  it("view.getMouseCoords horisontal", () => { 
    view.renderElements();
    view.register(someObject);
    let mousemove = new MouseEvent("mousemove", { clientX: 50 }); 
     
    view.handler.getMouseCoords();
    document.dispatchEvent(mousemove);
    expect(view.handler.mouseCoords).toBe(50);
    
  });
  it("view.getMouseCoords vertical", () => {
    view = new View({ isHorizontal: false }); 
    view.renderElements()
    view.register(someObject)
    let mousemove = new MouseEvent("mousemove", { clientY: 50 });

    view.handler.getMouseCoords();

    document.dispatchEvent(mousemove);
    expect(view.handler.mouseCoords).toBe(50);
  });
});

describe("события мыши", () => {
  let mousedown: any, mousemove: any, mouseup: any ;

  beforeEach(() => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    let something: object = { mouseMoveButton: () => {}, mouseUp: () => {} };
    view.register(something);
    mousedown = new MouseEvent("mousedown");
    mousemove = new MouseEvent("mousemove", { clientX: 10 });
    mouseup = new MouseEvent("mouseup");
  });

  afterEach(() => {
    view.removeElements();
  });

  it("view.handler.mouseEventSlider defaultPrevented", () => {
    let contextmenu = new MouseEvent("contextmenu", { cancelable: true });
    let mousedown = new MouseEvent("mousedown", { cancelable: true });

    let notify = jasmine.createSpy("notify");
    view.handler.mouseEventSlider(notify, notify);

    let contextmenuCalled = true;
    let mousedownCalled = true;

    view.slider.div.addEventListener("contextmenu", (event) => {
      if (event.defaultPrevented) {
        contextmenuCalled = false;
      }
    });

    view.slider.div.addEventListener("mousedown", (event) => {
      if (event.defaultPrevented) {
        mousedownCalled = false;
      }
    });

    view.slider.div.dispatchEvent(mousedown);
    view.slider.div.dispatchEvent(contextmenu);

    expect(contextmenuCalled).toBeFalsy();
    expect(mousedownCalled).toBeFalsy();
  });

  it("view.handler.mouseEventSlider mouse down", () => {
    let notify = jasmine.createSpy("notify");

    view.handler.mouseEventSlider(notify, notify);

    view.field.div.dispatchEvent(mousedown);

    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(1);
  });

  it("view.handler.mouseEventSlider mouse move", () => {
    let notify = jasmine.createSpy("notify");
    view.handler.mouseEventSlider(notify, notify);
    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(2);
  });
  it("view.handler.mouseEventSlider mouseup", () => {
    let notify = jasmine.createSpy("notify");
    view.handler.mouseEventSlider(notify, notify);
    view.field.div.dispatchEvent(mousedown);
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
      mouseMoveButton_2: () => {},
      mouseUp_2: () => {},
    };
    view.register(something);
    mousedown = new MouseEvent("mousedown");
    mousemove = new MouseEvent("mousemove", { clientX: 50 });
    mouseup = new MouseEvent("mouseup");
  });

  afterEach(() => {
    view.removeElements();
  });

  it("view.handler.mouseEventRange mouse event button_1", () => { 
    let notify = jasmine.createSpy("notify");
    let notify2 = jasmine.createSpy("notify");
    view.handler.mouseEventRange(notify, notify2, notify, notify2);
    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(3);
  });

  it("view.handler.mouseEventRange mouse event button_1 vertical", () => {
    view.removeElements();
    view = new View({ isRangeSlider: true, isHorizontal: false });
    view.renderElements();
    view.register(something);
    mousemove = new MouseEvent("mousemove", { clientX: 60 });
    let notify = jasmine.createSpy("notify");
    let notify2 = jasmine.createSpy("notify");
    view.handler.mouseEventRange(notify, notify2, notify, notify2);

    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(3);
    view.removeElements();
  });
  it("view.handler.mouseEventRange mouse event button_2", () => { 
    let notify = jasmine.createSpy("notify");
    let notify2 = jasmine.createSpy("notify");
    view.handler.mouseCoords = 60;
    view.handler.mouseEventRange(notify, notify2, notify, notify2);

    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);

    expect(notify2).toHaveBeenCalled();
    expect(notify2.calls.count()).toEqual(3);
  });
});