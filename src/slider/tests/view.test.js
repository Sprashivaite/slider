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
});

describe('Создание/поиск контейнера View', () => {
  it('Установка контейнера', () => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      "<div class='slider' style='width:100px; height: 100px;'></div>",
    );
    const container = document.querySelector('.slider');
    view.updateConfig({ target: container });
    expect(view.subViews.slider.divElement).toEqual(container);
  });
  it('Поиск контейнера по дата селектору', () => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      "<div data-slider style='width:100px;'></div>",
    );
    view.updateConfig({ target: undefined });
    const div = document.querySelector('[data-slider]');
    expect(view.subViews.slider.divElement).toEqual(div);
    div.remove();
  });
  it('Создание контейнера', () => {
    const div = document.querySelector('.slider');
    div.className = '';
    view.updateConfig({ target: undefined });
    expect(view.subViews.slider.divElement).toBeDefined();
    div.className = 'slider';
  });
});

describe('работа фасада renderElements', () => {
  it('view.renderElements', () => {
    expect(view.subViews.field).toBeDefined();
    expect(view.subViews.firstPoint.divElement).toBeDefined();
    expect(view.subViews.firstPoint.tooltip.divElement).toBeDefined();
    expect(view.subViews.scale.divElement).toBeDefined();
    expect(view.subViews.progressBar.divElement).toBeDefined();
  });
});

describe('update Points', () => {
  it('first point', () => {
    view.updateConfig({ isRange: false });
    view.updatePoints({ pointOffset: 50, pointName: 'firstPoint', value: 50 });
    expect(view.subViews.firstPoint.getOffset()).toBeGreaterThan(49);
    expect(view.subViews.firstPoint.tooltip.divElement.innerHTML).toBe('50');
  });
  it('second point', () => {
    view.updatePoints({ pointOffset: 50, pointName: 'secondPoint', value: 50 });
    expect(view.subViews.secondPoint.getOffset()).toBeGreaterThan(49);
    expect(view.subViews.secondPoint.tooltip.divElement.innerHTML).toBe('50');
  });
});

describe('движение point', () => {
  it('view.point.movePoint horizontal', () => {
    view.subViews.secondPoint.movePoint(50);
    expect(view.subViews.secondPoint.getOffset()).toBeGreaterThan(49);
  });
});

describe('toggle View tooltip', () => {
  it('view.tooltip.showTooltip', () => {
    view.subViews.firstPoint.tooltip.show();
    expect(getComputedStyle(view.subViews.firstPoint.tooltip.divElement).visibility).toBe(
      'visible',
    );
  });
  it('view.hideTooltip', () => {
    view.subViews.firstPoint.tooltip.hide();
    expect(getComputedStyle(view.subViews.firstPoint.tooltip.divElement).visibility).toBe(
      'hidden',
    );
  });
});

describe('значение View tooltip', () => {
  it('view.changeTooltipValue', () => {
    view.subViews.firstPoint.tooltip.changeValue(50);
    expect(view.subViews.firstPoint.tooltip.divElement.innerHTML).toBe('50');
  });
});

describe('слияние подсказок', () => {
  it('view.joinTooltips horizontal', () => {
    view.updatePoints({ pointName: 'firstPoint', pointOffset: 50 });
    view.updatePoints({ pointName: 'secondPoint', pointOffset: 50 });
    expect(
      view.subViews.secondPoint.tooltip.divElement.classList.contains('js-tooltip_hidden'),
    ).toBeTruthy();
    expect(view.subViews.tooltipTotal.divElement.classList.contains('js-tooltip_hidden')).toBeFalse();
  });
  it('view.joinTooltips vertical', () => {
    view.updateConfig({ isHorizontal: false });
    view.updatePoints({ pointName: 'firstPoint', pointOffset: 50 });
    view.updatePoints({ pointName: 'secondPoint', pointOffset: 50 });
    expect(
      view.subViews.secondPoint.tooltip.divElement.classList.contains('js-tooltip_hidden'),
    ).toBeTruthy();
    expect(view.subViews.tooltipTotal.divElement.classList.contains('js-tooltip_hidden')).toBeFalse();
  });
});

describe('движение View progressBar', () => {
  it(' range', () => {
    view.subViews.secondPoint.movePoint(95);
    view.subViews.progressBar.changeSize();
    expect(view.subViews.progressBar.divElement.offsetWidth).toBeGreaterThan(60);
  });
  it(' solo', () => {
    view.updateConfig({ isRange: false });
    view.subViews.firstPoint.movePoint(90);
    view.subViews.progressBar.changeSize();
    expect(view.subViews.progressBar.divElement.offsetWidth).toBeGreaterThan(80);
  });
});

describe('шкала', () => {
  it('scale.updateValues', () => {
    view.subViews.scale.updateValues([0, 50, 100]);
    expect(view.subViews.scale.divElement.children.length).toBe(3);
  });
});

describe('координаты мыши', () => {
  it('view.getMouseCoords horizontal', () => {
    const fieldOffset = view.subViews.field.divElement.getBoundingClientRect().left;
    const mousemove = new MouseEvent('mousemove', { clientX: 50 });
    document.dispatchEvent(mousemove);
    expect(view.mouseCoords).toBe(
      ((50 - fieldOffset) * 100) / view.subViews.field.divElement.offsetWidth,
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
    view.subViews.firstPoint.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
  });
  it('view notify mouseStopped', () => {
    const notify = jasmine.createSpy('notify');
    view.subscribe('pointStopped', notify);
    view.subViews.firstPoint.divElement.dispatchEvent(mousedown);
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
    view.subViews.field.divElement.dispatchEvent(mousedown);
    expect(notify).toHaveBeenCalled();
  });
});

describe('клик по шкале', () => {
  it('', () => {
    view.updateScale([0, 50, 100]);
    const notify = jasmine.createSpy('notify');
    view.subscribe('valueChanged', notify);
    let click = new MouseEvent('click');
    const scaleChildren = view.subViews.scale.divElement.querySelectorAll('div');
    scaleChildren[0].dispatchEvent(click);
    expect(notify).toHaveBeenCalled();
  });
});
