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
    div.classList.remove('slider');
    view.updateConfig({ target: undefined });
    expect(view.subViews.slider.divElement).toBeDefined();
    div.classList.add('slider');
  });
});

describe('работа фасада renderElements', () => {
  it('все элементы отрисованы', () => {
    expect(view.subViews.field).toBeDefined();
    expect(view.subViews.firstPoint.divElement).toBeDefined();
    expect(view.subViews.firstPoint.tooltip.divElement).toBeDefined();
    expect(view.subViews.scale.divElement).toBeDefined();
    expect(view.subViews.progressBar.divElement).toBeDefined();
  });
});

describe('обновить Points', () => {
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
  it('на 50', () => {
    view.subViews.secondPoint.movePoint(50);
    expect(view.subViews.secondPoint.getOffset()).toBeGreaterThan(49);
  });
});

describe('toggle View tooltip', () => {
  it('visible', () => {
    view.subViews.firstPoint.tooltip.show();
    expect(getComputedStyle(view.subViews.firstPoint.tooltip.divElement).visibility).toBe(
      'visible',
    );
  });
  it('hidden', () => {
    view.subViews.firstPoint.tooltip.hide();
    expect(getComputedStyle(view.subViews.firstPoint.tooltip.divElement).visibility).toBe(
      'hidden',
    );
  });
});

describe('значение View tooltip', () => {
  it('равно 50', () => {
    view.subViews.firstPoint.tooltip.changeValue(50);
    expect(view.subViews.firstPoint.tooltip.divElement.innerHTML).toBe('50');
  });
});

describe('слияние подсказок', () => {
  it('horizontal', () => {
    view.updatePoints({ pointName: 'firstPoint', pointOffset: 50 });
    view.updatePoints({ pointName: 'secondPoint', pointOffset: 50 });
    expect(
      view.subViews.secondPoint.tooltip.divElement.classList.contains(
        'js-tooltip_hidden',
      ),
    ).toBeTruthy();
    expect(
      view.subViews.tooltipTotal.divElement.classList.contains('js-tooltip_hidden'),
    ).toBeFalse();
  });
  it('vertical', () => {
    view.updateConfig({ isHorizontal: false });
    view.updatePoints({ pointName: 'firstPoint', pointOffset: 50 });
    view.updatePoints({ pointName: 'secondPoint', pointOffset: 50 });
    expect(
      view.subViews.secondPoint.tooltip.divElement.classList.contains(
        'js-tooltip_hidden',
      ),
    ).toBeTruthy();
    expect(
      view.subViews.tooltipTotal.divElement.classList.contains('js-tooltip_hidden'),
    ).toBeFalse();
  });
});

describe('движение View progressBar', () => {
  it('range', () => {
    view.subViews.secondPoint.movePoint(95);
    view.subViews.progressBar.changeSize();
    expect(view.subViews.progressBar.divElement.offsetWidth).toBeGreaterThan(60);
  });
  it('solo', () => {
    view.updateConfig({ isRange: false });
    view.subViews.firstPoint.movePoint(90);
    view.subViews.progressBar.changeSize();
    expect(view.subViews.progressBar.divElement.offsetWidth).toBeGreaterThan(80);
  });
});

describe('шкала', () => {
  it('3 элемента при [0, 50, 100]', () => {
    view.subViews.scale.updateValues([0, 50, 100]);
    expect(view.subViews.scale.divElement.children.length).toBe(3);
  });
});

describe('координаты мыши', () => {
  it('получение координаты', () => {
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

  it('движение', () => {
    const notify = jasmine.createSpy('notify');
    view.subscribe('pointMoving', notify);
    view.subViews.firstPoint.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
  });
  it('остановка', () => {
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
    view.subscribe('pointMoving', notify);
    let mousedown = new MouseEvent('click');
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
