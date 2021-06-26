import View from '../View/View';

let container = document.querySelector('.slider');
let view;

beforeEach(() => {
  view = new View();
});

describe('наличие класса', () => {
  it('View', () => {
    expect(view).toBeDefined();
  });
});

describe('установка параметров View', () => {
  it('валидные параметры', () => {
    view = new View({
      isRangeSlider: true,
      isHorizontal: false,
      isProgressBar: true,
      isScale: false,
    });
    expect(view.config.isRangeSlider).toBe(true);
    expect(view.config.isHorizontal).toBe(false);
    expect(view.config.isProgressBar).toBe(true);
    expect(view.config.isScale).toBe(false);
  });
  it('невалидные параметры', () => {
    view = new View({
      isRangeSlider: 22,
      isHorizontal: 'value',
      isProgressBar: '',
      isScale: null,
    });
    expect(view.config.isRangeSlider).toBe(true);
    expect(view.config.isHorizontal).toBe(true);
    expect(view.config.isProgressBar).toBe(true);
    expect(view.config.isScale).toBe(true);
  });
});

describe('Создание/поиск контейнера View', () => {
  it('Установка контейнера', () => {
    let container = document.querySelector('.slider');
    let view = new View({ target: container });
    expect(view.slider.divElement).toEqual(container);
  });
  it('Поиск контейнера по дата селектору', () => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      "<div data-slider style='width:100px;'></div>"
    );
    container.classList = 'none';
    view = new View();
    let div = document.querySelector('[data-slider]');
    expect(view.slider.divElement).toEqual(div);
    div.remove();
    container.classList = 'slider';
  });
  it('Создание контейнера', () => {
    let div = document.querySelector('.slider');
    div.className = '';
    view = new View();
    expect(view.slider.divElement).toBeDefined();
    div.className = 'slider';
  });
});

describe('работа фасада renderElements', () => {
  it('view.renderElements', () => {
    view.renderElements();
    expect(view.field).toBeDefined();
    expect(view.firstHandle.divElement).toBeDefined();
    expect(view.firstTooltip).toBeDefined();
    expect(view.progressBar.divElement).toBeDefined();
    view.removeElements();
  });
});

describe('удаление элементов View', () => {
  it('view.removeElements', () => {
    view.renderElements();
    view.removeElements();
    expect(view.slider.childnodes).toBeUndefined();
  });
});

describe('движение View handle', () => {
  afterEach(function () {
    view.removeElements();
  });
  it('view.handle.moveHandle horizontal', () => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    view.firstHandle.moveHandle(50);
    expect(getComputedStyle(view.firstHandle.divElement).left).toBe('50px');
  });
  it('view.handle.moveHandle Vertical', () => {
    view = new View({ isHorizontal: false, isRangeSlider: false });
    view.renderElements();
    view.firstHandle.moveHandle(50);
    expect(getComputedStyle(view.firstHandle.divElement).top).toBe('50px');
  });
});

describe('toggle View tooltip', () => {
  beforeEach(function () {
    view.renderElements();
  });
  afterEach(function () {
    view.removeElements();
  });
  it('view.tooltip.showTooltip', () => {
    view.firstTooltip.showTooltip();
    expect(getComputedStyle(view.firstTooltip.divElement).visibility).toBe('visible');
  });
  it('view.hideTooltip', () => {
    view.firstTooltip.hideTooltip();
    expect(getComputedStyle(view.firstTooltip.divElement).visibility).toBe('hidden');
  });
});

describe('значение View tooltip', () => {
  it('view.changeTooltipValue', () => {
    view.renderElements();
    view.firstTooltip.changeTooltipValue(50);
    expect(view.firstTooltip.divElement.innerHTML).toBe('50');
    view.removeElements();
  });
});

describe('движение View progressBar', () => {
  it('view.progressBar range', () => {
    view = new View({ isRangeSlider: true });
    view.renderElements();
    view.secondHandle.moveHandle(95);
    view.progressBar.progressBarMove();
    expect(view.progressBar.divElement.offsetWidth).toBeGreaterThan(60);
    view.removeElements();
  });
  it('view.progressBar solo', () => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    view.firstHandle.moveHandle(100);
    view.progressBar.progressBarMove();
    expect(view.progressBar.divElement.offsetWidth).toBeGreaterThan(90);
    view.removeElements();
  });
  it('view.progressBar Vertical', () => {
    view = new View({ isRangeSlider: false, isHorizontal: false });
    view.renderElements();
    view.firstHandle.moveHandle(30);
    view.progressBar.progressBarMove();
    expect(view.progressBar.divElement.offsetHeight).toBeGreaterThan(10);
    view.removeElements();
  });
  it('view.progressBar range Vertical', () => {
    view = new View({ isHorizontal: false, isRangeSlider: true });
    view.renderElements();
    view.secondHandle.moveHandle(60);
    view.progressBar.progressBarMove();
    expect(view.progressBar.divElement.offsetHeight).toBeGreaterThan(30);
    view.removeElements();
  });
});

describe('координаты мыши', () => {
  afterEach(() => view.removeElements());
  it('view.getMouseCoords horizontal', () => {
    view.renderElements();
    const fieldOffset = view.field.divElement.getBoundingClientRect().left;
    view.addHandlers();
    let mousemove = new MouseEvent('mousemove', { clientX: 50 });
    document.dispatchEvent(mousemove);

    expect(view.handler.mouseCoords).toBe(50 - fieldOffset);
  });
  it('view.getMouseCoords vertical', () => {
    view = new View({ isHorizontal: false });
    view.renderElements();
    const fieldOffset = view.field.divElement.getBoundingClientRect().top;
    view.addHandlers();
    let mousemove = new MouseEvent('mousemove', { clientY: 50 });
    document.dispatchEvent(mousemove);
    expect(view.handler.mouseCoords).toBe(50 - fieldOffset);
  });
});

describe('события мыши', () => {
  let mousedown, mousemove, mouseup;

  beforeEach(() => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    mousedown = new MouseEvent('mousedown');
    mousemove = new MouseEvent('mousemove', { clientX: 10 });
    mouseup = new MouseEvent('mouseup');
  });

  afterEach(() => {
    view.removeElements();
  });

  it('view.handler.addFieldHandler defaultPrevented', () => {
    let contextmenu = new MouseEvent('contextmenu', { cancelable: true });
    let mousedown = new MouseEvent('mousedown', { cancelable: true });

    view.renderElements();
    view.addHandlers();

    let contextmenuCalled = true;
    let mousedownCalled = true;

    view.field.divElement.addEventListener('contextmenu', (event) => {
      if (event.defaultPrevented) contextmenuCalled = false;
    });

    view.field.divElement.addEventListener('mousedown', (event) => {
      if (event.defaultPrevented) mousedownCalled = false;
    });

    view.field.divElement.dispatchEvent(mousedown);
    view.field.divElement.dispatchEvent(contextmenu);

    expect(contextmenuCalled).toBeFalsy();
    expect(mousedownCalled).toBeFalsy();
  });

  it('view.handler.addHandleHandler mouse down', () => {
    let notify = jasmine.createSpy('notify');
    view.addHandlers();
    view.handler.subscribe('firstHandleMouseDown', notify);
    view.firstHandle.divElement.dispatchEvent(mousedown);

    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(1);
  });

  it('view.handler.addHandleHandler mouse move', () => {
    let notify = jasmine.createSpy('notify');
    view.addHandlers();
    view.handler.subscribe('firstHandleMouseMove', notify);
    view.firstHandle.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(2);
  });
  it('view.handler.addHandleHandler mouseup', () => {
    let notify = jasmine.createSpy('notify');
    view.addHandlers();
    view.handler.subscribe('firstHandleMouseMove', notify);
    view.handler.subscribe('firstHandleMouseUp', notify);
    view.firstHandle.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(3);
  });
});

describe('события мыши range', () => {
  let mousedown, mousemove, mouseup, something;

  beforeEach(() => {
    view = new View({ isRangeSlider: true });
    view.renderElements();
    something = {
      firstHandleMouseMoveHandle: () => {},
      firstHandleMouseUp: () => {},
      secondHandleMouseMove: () => {},
      secondHandleMouseUp: () => {},
    };
    mousedown = new MouseEvent('mousedown');
    mousemove = new MouseEvent('mousemove', { clientX: 50 });
    mouseup = new MouseEvent('mouseup');
  });

  afterEach(() => {
    view.removeElements();
  });
  it('view.handler.addFieldHandler mouse event secondHandle', () => {
    let notify = jasmine.createSpy('notify');
    view.addHandlers();
    view.handler.subscribe('secondHandleMouseMove', notify);
    view.handler.subscribe('secondHandleMouseUp', notify);
    view.handler.mouseCoords = 60;
    view.field.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);

    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(2);
  });
});
