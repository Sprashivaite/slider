import View from '../View/View';

const container = document.querySelector('.slider');
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
    const container = document.querySelector('.slider');
    const view = new View({ target: container });
    expect(view.slider.divElement).toEqual(container);
  });
  it('Поиск контейнера по дата селектору', () => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      "<div data-slider style='width:100px;'></div>"
    );
    container.classList = 'none';
    view = new View();
    const div = document.querySelector('[data-slider]');
    expect(view.slider.divElement).toEqual(div);
    div.remove();
    container.classList = 'slider';
  });
  it('Создание контейнера', () => {
    const div = document.querySelector('.slider');
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
    expect(view.firstPoint.divElement).toBeDefined();
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

describe('движение View point', () => {
  afterEach(() => {
    view.removeElements();
  });
  it('view.point.movePoint horizontal', () => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    view.firstPoint.movePoint(50);
    expect(getComputedStyle(view.firstPoint.divElement).left).toBe('50px');
  });
  it('view.point.movePoint Vertical', () => {
    view = new View({ isHorizontal: false, isRangeSlider: false });
    view.renderElements();
    view.firstPoint.movePoint(50);
    expect(getComputedStyle(view.firstPoint.divElement).top).toBe('50px');
  });
});

describe('toggle View tooltip', () => {
  beforeEach(() => {
    view.renderElements();
  });
  afterEach(() => {
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
    view.secondPoint.movePoint(95);
    view.progressBar.progressBarMove();
    expect(view.progressBar.divElement.offsetWidth).toBeGreaterThan(60);
    view.removeElements();
  });
  it('view.progressBar solo', () => {
    view = new View({ isRangeSlider: false });
    view.renderElements();
    view.firstPoint.movePoint(100);
    view.progressBar.progressBarMove();
    expect(view.progressBar.divElement.offsetWidth).toBeGreaterThan(90);
    view.removeElements();
  });
  it('view.progressBar Vertical', () => {
    view = new View({ isRangeSlider: false, isHorizontal: false });
    view.renderElements();
    view.firstPoint.movePoint(30);
    view.progressBar.progressBarMove();
    expect(view.progressBar.divElement.offsetHeight).toBeGreaterThan(10);
    view.removeElements();
  });
  it('view.progressBar range Vertical', () => {
    view = new View({ isHorizontal: false, isRangeSlider: true });
    view.renderElements();
    view.secondPoint.movePoint(60);
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
    const mousemove = new MouseEvent('mousemove', { clientX: 50 });
    document.dispatchEvent(mousemove);

    expect(view.handler.mouseCoords).toBe(50 - fieldOffset);
  });
  it('view.getMouseCoords vertical', () => {
    view = new View({ isHorizontal: false });
    view.renderElements();
    const fieldOffset = view.field.divElement.getBoundingClientRect().top;
    view.addHandlers();
    const mousemove = new MouseEvent('mousemove', { clientY: 50 });
    document.dispatchEvent(mousemove);
    expect(view.handler.mouseCoords).toBe(50 - fieldOffset);
  });
});

describe('события мыши', () => {
  let mousedown; let mousemove; let mouseup;

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
    const contextmenu = new MouseEvent('contextmenu', { cancelable: true });
    const mousedown = new MouseEvent('mousedown', { cancelable: true });

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

  it('view.handler.addPointHandler mouse down', () => {
    const notify = jasmine.createSpy('notify');
    view.addHandlers();
    view.handler.subscribe('firstPointMouseDown', notify);
    view.firstPoint.divElement.dispatchEvent(mousedown);

    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(1);
  });

  it('view.handler.addPointPointr mouse move', () => {
    const notify = jasmine.createSpy('notify');
    view.addHandlers();
    view.handler.subscribe('firstPointMoving', notify);
    view.firstPoint.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(2);
  });
  it('view.handler.addPointPointr mouseup', () => {
    const notify = jasmine.createSpy('notify');
    view.addHandlers();
    view.handler.subscribe('firstPointMoving', notify);
    view.handler.subscribe('firstPointStopped', notify);
    view.firstPoint.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(3);
  });
});

describe('события мыши range', () => {
  let mousedown; let mousemove; let mouseup; let something;

  beforeEach(() => {
    view = new View({ isRangeSlider: true });
    view.renderElements();
    something = {
      firstPointMovingPoint: () => {},
      firstPointStopped: () => {},
      secondPointMoves: () => {},
      secondPointStopped: () => {},
    };
    mousedown = new MouseEvent('mousedown');
    mousemove = new MouseEvent('mousemove', { clientX: 50 });
    mouseup = new MouseEvent('mouseup');
  });

  afterEach(() => {
    view.removeElements();
  });
  it('view.handler.addFieldPointr mouse event secondPoint', () => {
    const notify = jasmine.createSpy('notify');
    view.addHandlers();
    view.handler.subscribe('secondPointMoves', notify);
    view.handler.subscribe('secondPointStopped', notify);
    view.handler.mouseCoords = 60;
    view.field.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);

    expect(notify).toHaveBeenCalled();
    expect(notify.calls.count()).toEqual(2);
  });
});
