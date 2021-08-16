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

describe('View constructor ', () => {
  it('initialized', () => {
    expect(view).toBeDefined();
  });
  it('takes valid values', () => {
    view.updateConfig({
      isRange: true,
      isHorizontal: false,
      hasProgressBar: true,
      hasScale: false,
    });
    expect(view.getConfig().isRange).toBe(true);
    expect(view.getConfig().isHorizontal).toBe(false);
    expect(view.getConfig().hasProgressBar).toBe(true);
    expect(view.getConfig().hasScale).toBe(false);
  });
});

describe('View container', () => {
  it('takes target', () => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      "<div class='slider' style='width:100px; height: 100px;'></div>",
    );
    const container = document.querySelector('.slider');
    if (container instanceof HTMLDivElement) {
      view.updateConfig({ target: container });
      expect(view.getSubViews().slider.divElement).toEqual(container);
    }
  });
  it('search with data-attribute', () => {
    document.body.insertAdjacentHTML(
      'afterbegin',
      "<div data-slider style='width:100px;'></div>",
    );
    view.updateConfig({ target: undefined });
    const div = document.querySelector('[data-slider]');
    if (div instanceof HTMLDivElement) {
      expect(view.getSubViews().slider.divElement).toEqual(div);
      div.remove();
    }
  });
  it('create if undefined', () => {
    const div = document.querySelector('.slider');
    div && div.classList.remove('slider');
    view.updateConfig({ target: undefined });
    expect(view.getSubViews().slider.divElement).toBeDefined();
    div && div.classList.add('slider');
  });
});

describe('View elements', () => {
  it('rendered', () => {
    expect(view.getSubViews().field).toBeDefined();
    expect(view.getSubViews().firstPoint.divElement).toBeDefined();
    expect(view.getSubViews().firstPoint.tooltip.divElement).toBeDefined();
    expect(view.getSubViews().scale.divElement).toBeDefined();
    expect(view.getSubViews().progressBar.divElement).toBeDefined();
  });
});

describe('View update', () => {
  it('first point', () => {
    view.updateConfig({ isRange: false });
    view.updatePoints({ pointOffset: 50, pointName: 'firstPoint', value: 50 });
    expect(view.getSubViews().firstPoint.getOffset()).toBeGreaterThan(49);
    expect(view.getSubViews().firstPoint.tooltip.divElement.innerHTML).toBe('50');
  });
  it('second point', () => {
    view.updatePoints({ pointOffset: 50, pointName: 'secondPoint', value: 50 });
    expect(view.getSubViews().secondPoint?.getOffset()).toBeGreaterThan(49);
    expect(view.getSubViews().secondPoint?.tooltip.divElement.innerHTML).toBe('50');
  });
});

describe('View should move point', () => {
  it('', () => {
    view.getSubViews().secondPoint?.movePoint(50);
    expect(view.getSubViews().secondPoint?.getOffset()).toBeGreaterThan(49);
  });
});

describe('View tooltip', () => {
  it('visible', () => {
    view.getSubViews().firstPoint.tooltip.show();
    expect(
      getComputedStyle(view.getSubViews().firstPoint.tooltip.divElement).visibility,
    ).toBe('visible');
  });
  it('hidden', () => {
    view.getSubViews().firstPoint.tooltip.hide();
    expect(
      getComputedStyle(view.getSubViews().firstPoint.tooltip.divElement).visibility,
    ).toBe('hidden');
  });
});

describe('View tooltip should change value', () => {
  it('', () => {
    view.getSubViews().firstPoint.tooltip.changeValue(50);
    expect(view.getSubViews().firstPoint.tooltip.divElement.innerHTML).toBe('50');
  });
});

describe('View tooltip should collapse', () => {
  it('horizontal', () => {
    view.updatePoints({ pointName: 'firstPoint', pointOffset: 50, value: 50 });
    view.updatePoints({ pointName: 'secondPoint', pointOffset: 50, value: 50 });
    expect(
      view
        .getSubViews()
        .secondPoint?.tooltip.divElement.classList.contains('js-tooltip_hidden'),
    ).toBeTruthy();
    expect(
      view.getSubViews().tooltipTotal?.divElement.classList.contains('js-tooltip_hidden'),
    ).toBeFalse();
  });
  it('vertical', () => {
    view.updateConfig({ isHorizontal: false });
    view.updatePoints({ pointName: 'firstPoint', pointOffset: 50, value: 50 });
    view.updatePoints({ pointName: 'secondPoint', pointOffset: 50, value: 50 });
    expect(
      view
        .getSubViews()
        .secondPoint?.tooltip.divElement.classList.contains('js-tooltip_hidden'),
    ).toBeTruthy();
    expect(
      view.getSubViews().tooltipTotal?.divElement.classList.contains('js-tooltip_hidden'),
    ).toBeFalse();
  });
});

describe('View progressbar should moving', () => {
  it('range', () => {
    view.getSubViews().secondPoint?.movePoint(95);
    view.getSubViews().progressBar.changeSize();
    expect(view.getSubViews().progressBar.divElement.offsetWidth).toBeGreaterThan(60);
  });
  it('solo', () => {
    view.updateConfig({ isRange: false });
    view.getSubViews().firstPoint.movePoint(90);
    view.getSubViews().progressBar.changeSize();
    expect(view.getSubViews().progressBar.divElement.offsetWidth).toBeGreaterThan(80);
  });
});

describe('View scale should', () => {
  it('3 elements with [0, 50, 100]', () => {
    view.getSubViews().scale.updateValues([0, 50, 100]);
    expect(view.getSubViews().scale.divElement.children.length).toBe(3);
  });
});

describe('View event mouse', () => {
  let mousedown: MouseEvent;
  let mousemove: MouseEvent;
  let mouseup: MouseEvent;
  beforeEach(() => {
    mousedown = new MouseEvent('mousedown');
    mousemove = new MouseEvent('mousemove', { clientX: 10 });
    mouseup = new MouseEvent('mouseup');
  });

  it('moving', () => {
    const notify = jasmine.createSpy('notify');
    view.subscribe('pointMoving', notify);
    view.getSubViews().firstPoint.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    expect(notify).toHaveBeenCalled();
  });
  it('stopped', () => {
    const notify = jasmine.createSpy('notify');
    view.subscribe('pointStopped', notify);
    view.getSubViews().firstPoint.divElement.dispatchEvent(mousedown);
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    expect(notify).toHaveBeenCalled();
  });
});

describe('View event mouse click', () => {
  it('on filed', () => {
    const notify = jasmine.createSpy('notify');
    view.subscribe('pointMoving', notify);
    let mousedown = new MouseEvent('click');
    view.getSubViews().field.divElement.dispatchEvent(mousedown);
    expect(notify).toHaveBeenCalled();
  });
  it('on scale', () => {
    view.updatePoints({
      pointName: 'firstPoint',
      pointOffset: 50,
      value: 50,
      steps: [0, 50, 100],
    });
    const notify = jasmine.createSpy('notify');
    view.subscribe('valueChanged', notify);
    let click = new MouseEvent('click');
    const scaleChildren = view.getSubViews().scale.divElement.querySelectorAll('div');
    scaleChildren[0].dispatchEvent(click);
    expect(notify).toHaveBeenCalled();
  });
});
