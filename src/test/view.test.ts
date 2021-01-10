import Model from "../Model";
import View from "../View";
import ViewContainer from "../ViewContainer";
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

describe("установка параметров View", () => {
  it("rangeSlider", () => {
    view = new View({ isRangeSlider: true });

    expect(view.isRangeSlider).toBe(true);
    view.removeElements();
  });
});

describe("Создание/поиск контайнера View", () => {
  it("Установка контейнера", () => {
    let container = document.querySelector('.slider')
    let view = new View({target: container}  );

    expect(view.slider).toBeDefined();
    view.removeElements();
  });
  it("Поиск контейнера по селектору класса", () => {
    view = new View();

    expect(view.slider).toBeDefined();
    view.removeElements();
  });
  it("Поиск контейнера по дата селектору", () => {
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<div data-slider style='width:100px;'></div>"
    );
    let div = document.querySelector('.slider');
    div.className = '';
    view = new View();

    expect(view.slider).toBeDefined();
    div.className = 'slider';
    view.removeElements();
  });
  it("Создание контейнера", () => {
    let div = document.querySelector('.slider');
    div.className = '';
    let viewContainer = new ViewContainer();
    spyOn(viewContainer, 'createContainer')
    viewContainer.createContainer();
    expect(viewContainer.slider).toBeDefined();
    div.className = 'slider';
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
  it("view.flag.showFlag", () => {
    view.flag.showFlag();
    expect(getComputedStyle(view.flag.div).display).toBe("block");
  });
  it("view.hideFlag", () => {
    view.flag.hideFlag();
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
    view = new View({ isRangeSlider: true });

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
    view = new View({ isHorizontal: false, isRangeSlider: true });

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

describe("подписка наблюдателя", () => {
  let something: object;
  it("view.register", () => {
    view.register(something);
    expect(view.subscriber).toBe(something);
  });
});

describe("оповещение наблюдателя", () => {
  it("view.notifyMouseMove", () => {
    let something: object = { mouseMoveButton: () => {} };
    view.register(something);

    spyOn(view.subscriber, "mouseMoveButton");
    view.notifyMouseMove();
    expect(view.subscriber.mouseMoveButton).toHaveBeenCalled();
  });
 
  it("view.notifyMouseMove_2", () => {
    let something: object = { mouseMoveButton_2: () => {} };
    view.register(something);

    spyOn(view.subscriber, "mouseMoveButton_2");
    view.notifyMouseMove_2();
    expect(view.subscriber.mouseMoveButton_2).toHaveBeenCalled();
  });

  it("view.notifyMouseUp", () => {
    let something: object = { mouseUp: () => {} };
    view.register(something);

    spyOn(view.subscriber, "mouseUp");
    view.notifyMouseUp();
    expect(view.subscriber.mouseUp).toHaveBeenCalled();
  });
  it("view.notifyMouseUp_2", () => {
    let something: object = { mouseUp_2: () => {} };
    view.register(something);

    spyOn(view.subscriber, "mouseUp_2");
    view.notifyMouseUp_2();
    expect(view.subscriber.mouseUp_2).toHaveBeenCalled();
  });
});

describe("координаты мыши", () => {
  afterEach(() => {
    view.removeElements();
  });
  it("view.getMouseCoords horisontal", () => {
    view = new View();
    let mousemove = new MouseEvent("mousemove", { clientX: 50 });

    view.getMouseCoords();

    document.dispatchEvent(mousemove);
    expect(view.mouseCoords).toBe(50);
  });
  it("view.getMouseCoords vertical", () => {
    view = new View({ isHorizontal: false });
    let mousemove = new MouseEvent("mousemove", { clientY: 50 });

    view.getMouseCoords();

    document.dispatchEvent(mousemove);
    expect(view.mouseCoords).toBe(50);
  });
});

describe("события мыши", () => {
  let mousedown: any, mousemove: any, mouseup: any;

  beforeEach(() => {
    view = new View({ isRangeSlider: false });
    let something: object = { mouseMoveButton: () => {}, mouseUp: () => {} };
    view.register(something);
    mousedown = new MouseEvent("mousedown");
    mousemove = new MouseEvent("mousemove", { clientX: 10 });
    mouseup = new MouseEvent("mouseup");
  });

  afterEach(() => {
    view.removeElements();
  });

  it("view.mouseEventSlider defaultPrevented", () => {
    let contextmenu = new MouseEvent("contextmenu", { cancelable: true });
    let mousedown = new MouseEvent("mousedown", { cancelable: true });

    let notify = jasmine.createSpy("notify");
    view.mouseEventSlider(notify, notify);

    let contextmenuCalled = true;
    let mousedownCalled = true;

    view.slider.addEventListener("contextmenu", (event) => {
      if (event.defaultPrevented) {
        contextmenuCalled = false;
      }
    });

    view.slider.addEventListener("mousedown", (event) => {
      if (event.defaultPrevented) {
        mousedownCalled = false;
      }
    });

    view.slider.dispatchEvent(mousedown);
    view.slider.dispatchEvent(contextmenu);

    expect(contextmenuCalled).toBeFalsy();
    expect(mousedownCalled).toBeFalsy();
  });

  it("view.mouseEventSlider mouse down", () => {
    let notify = jasmine.createSpy("notify");

    view.mouseEventSlider(notify, notify);

    view.field.div.dispatchEvent(mousedown);

    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(1);
  });

  it("view.mouseEventSlider mouse move", () => {
    let notify = jasmine.createSpy("notify");
    view.mouseEventSlider(notify, notify);
    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(2);
  });
  it("view.mouseEventSlider mouseup", () => {
    let notify = jasmine.createSpy("notify");
    view.mouseEventSlider(notify, notify);
    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(3);
  });
});

describe("события мыши range", () => {
  let mousedown: any, mousemove: any, mouseup: any;

  beforeEach(() => {
    
    let something: object = {
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

  it("view.mouseEventRange mouse event button_1", () => {
    view = new View({ isRangeSlider: true });
    let notify = jasmine.createSpy("notify");
    let notify2 = jasmine.createSpy("notify");
    view.mouseEventRange(notify, notify2, notify, notify2);
    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(3);
  });

  it("view.mouseEventRange mouse event button_1 vertical", () => {
    view = new View({ isRangeSlider: true, isHorizontal: false });
    mousemove = new MouseEvent("mousemove", { clientX: 60 });
    let notify = jasmine.createSpy("notify");
    let notify2 = jasmine.createSpy("notify");
    view.mouseEventRange(notify, notify2, notify, notify2);

    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(3);
    view.removeElements();
  });
  it("view.mouseEventRange mouse event button_2", () => {
    view = new View({ isRangeSlider: true });
    let notify = jasmine.createSpy("notify");
    let notify2 = jasmine.createSpy("notify");
    view.mouseCoords = 60;
    view.mouseEventRange(notify, notify2, notify, notify2);

    view.field.div.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);

    expect(notify2).toHaveBeenCalled();
    expect(notify2.calls.count()).toEqual(3);
  });
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
