import View from '../View/View';

let view = new View();
afterEach(function () {
  view.updateConfig({
    target: undefined,
    isHorizontal: true,
    isRange: true,
    hasProgressBar: true,
    hasScale: true,
    hasTooltip: true,
  });
});

describe('наличие класса', () => {
  it('View', () => {
    expect(view).toBeDefined();
  });
});

describe('установка параметров View', () => {
  it('валидные параметры', () => {
    view.updateConfig({
      isRange: true,
      isHorizontal: false,
      hasProgressBar: true,
      hasScale: false,
    });
    expect(view.config.isRange).toBe(true);
    expect(view.config.isHorizontal).toBe(false);
    expect(view.config.hasProgressBar).toBe(true);
    expect(view.config.hasScale).toBe(false);
  });
  it('невалидные параметры', () => {
    view.updateConfig({
      isRange: 22,
      isHorizontal: 'value',
      hasProgressBar: '',
      hasScale: null,
    });
    expect(view.config.isRange).toBe(true);
    expect(view.config.isHorizontal).toBe(true);
    expect(view.config.hasProgressBar).toBe(true);
    expect(view.config.hasScale).toBe(true);
  });
});

describe('Создание/поиск контейнера View', () => {
  it('Установка контейнера', () => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      "<div class='slider' style='width:100px; height: 100px;'></div>",
    );
    const container = document.querySelector('.slider');
    view.updateConfig({ target: container });
    expect(view.slider.divElement).toEqual(container);
  });
  it('Поиск контейнера по дата селектору', () => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      "<div data-slider style='width:100px;'></div>",
    );
    view.updateConfig({ target: undefined });
    const div = document.querySelector('[data-slider]');
    expect(view.slider.divElement).toEqual(div);
    div.remove();
  });
  it('Создание контейнера', () => {
    const div = document.querySelector('.slider');
    div.className = '';
    view.updateConfig({ target: undefined });
    expect(view.slider.divElement).toBeDefined();
    div.className = 'slider';
  });
});

describe('работа фасада renderElements', () => {
  it('view.renderElements', () => {
    expect(view.field).toBeDefined();
    expect(view.firstPoint.divElement).toBeDefined();
    expect(view.firstPoint.tooltip.divElement).toBeDefined();
    expect(view.scale.divElement).toBeDefined();
    expect(view.progressBar.divElement).toBeDefined();
  });
});

describe('update Points', () => {
  it('first point', () => {
    view.updateConfig({ isRange: false });
    view.updatePoints({ pointOffset: 50, pointName: 'firstPoint', value: 50 });
    expect(view.firstPoint.getOffset()).toBeGreaterThan(49);
    expect(view.firstPoint.tooltip.divElement.innerHTML).toBe('50');
  });
  it('second point', () => {
    view.updatePoints({ pointOffset: 50, pointName: 'secondPoint', value: 50 });
    expect(view.secondPoint.getOffset()).toBeGreaterThan(49);
    expect(view.secondPoint.tooltip.divElement.innerHTML).toBe('50');
  });
});

describe('движение point', () => {
  it('view.point.movePoint horizontal', () => {
    view.secondPoint.movePoint(50);
    expect(view.secondPoint.getOffset()).toBeGreaterThan(49);
  });
});

describe('toggle View tooltip', () => {
  it('view.tooltip.showTooltip', () => {
    view.firstPoint.tooltip.show();
    expect(getComputedStyle(view.firstPoint.tooltip.divElement).visibility).toBe(
      'visible',
    );
  });
  it('view.hideTooltip', () => {
    view.firstPoint.tooltip.hide();
    expect(getComputedStyle(view.firstPoint.tooltip.divElement).visibility).toBe(
      'hidden',
    );
  });
});

describe('значение View tooltip', () => {
  it('view.changeTooltipValue', () => {
    view.firstPoint.tooltip.changeValue(50);
    expect(view.firstPoint.tooltip.divElement.innerHTML).toBe('50');
  });
});

describe('слияние подсказок', () => {
  it('view.joinTooltips horizontal', () => {
    view.updatePoints({ pointName: 'firstPoint', pointOffset: 50 });
    view.updatePoints({ pointName: 'secondPoint', pointOffset: 50 });
    expect(
      view.secondPoint.tooltip.divElement.classList.contains('-js-tooltip_hidden'),
    ).toBeTruthy();
    expect(view.tooltipTotal.divElement.style.visibility).toBe('visible');
  });
  it('view.joinTooltips vertical', () => {
    view.updateConfig({ isHorizontal: false });
    view.updatePoints({ pointName: 'firstPoint', pointOffset: 50 });
    view.updatePoints({ pointName: 'secondPoint', pointOffset: 50 });
    expect(
      view.secondPoint.tooltip.divElement.classList.contains('-js-tooltip_hidden'),
    ).toBeTruthy();
    expect(view.tooltipTotal.divElement.style.visibility).toBe('visible');
  });
});

describe('движение View progressBar', () => {
  it(' range', () => {
    view.secondPoint.movePoint(95);
    view.progressBar.changeSize();
    expect(view.progressBar.divElement.offsetWidth).toBeGreaterThan(60);
  });
  it(' solo', () => {
    view.updateConfig({ isRange: false });
    view.firstPoint.movePoint(90);
    view.progressBar.changeSize();
    expect(view.progressBar.divElement.offsetWidth).toBeGreaterThan(80);
  });
});

describe('шкала', () => {
  it('scale.updateValues', () => {
    view.scale.updateValues([0, 50, 100]);
    expect(view.scale.divElement.children.length).toBe(3);
  });
});

describe('координаты мыши', () => {
  it('view.getMouseCoords horizontal', () => {
    const fieldOffset = view.field.divElement.getBoundingClientRect().left;
    const mousemove = new MouseEvent('mousemove', { clientX: 50 });
    document.dispatchEvent(mousemove);
    expect(view.mouseCoords).toBe(
      ((50 - fieldOffset) * 100) / view.field.divElement.offsetWidth,
    );
  });
});

describe('события мыши', () => {
  let mousedown;
  let mousemove;
  let mouseup;
  beforeEach(() => {
    mousedown = new MouseEvent('mousedown');
    mousemove = new MouseEvent('mousemove', { clientX: 10 });
    mouseup = new MouseEvent('mouseup');
  });

  it('view notify mouseMoving', () => {
    const notify = jasmine.createSpy('notify');
    view.subscribe('pointMoving', notify);
    view.firstPoint.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
  });
  it('view notify mouseStopped', () => {
    const notify = jasmine.createSpy('notify');
    view.subscribe('pointStopped', notify);
    view.firstPoint.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
  });
});

describe('клик по полю', () => {
  it('', () => {
    const notify = jasmine.createSpy('notify');
    view.subscribe('pointStopped', notify);
    let mousedown = new MouseEvent('mousedown');
    view.field.divElement.dispatchEvent(mousedown);
    expect(notify).toHaveBeenCalled();
  });
});

describe('клик по шкале', () => {
  it('', () => {
    view.updateScale([0, 50, 100]);
    const notify = jasmine.createSpy('notify');
    view.subscribe('valueChanged', notify);
    let click = new MouseEvent('click');
    const scaleChildren = view.scale.divElement.querySelectorAll('div');
    scaleChildren[0].dispatchEvent(click);
    expect(notify).toHaveBeenCalled();
  });
});
