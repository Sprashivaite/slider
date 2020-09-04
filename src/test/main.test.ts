import { Model } from "../Model";
import { View } from "../View";
import { Presenter } from "../Presenter";

document.body.insertAdjacentHTML("afterbegin", "<div class='slider' width='100px'></div>");


let view: View;


describe("наличие инстансов классов", () => {
  it("Model", () => {
    const model: Model = new Model();
    expect(model).toBeDefined();
  });
  it("View", () => {
    const view: View = new View();
    expect(view).toBeDefined();
  });
  it("Presenter", () => {
    const presenter: Presenter = new Presenter();
    expect(presenter).toBeDefined();
  });
});



describe("наличие отрисованных элементов у View", () => {
  beforeEach(function () {
    view = new View();
    view.renderField();
    view.renderButtons();
    view.renderFlag();
    view.renderProgressBar();
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
    expect(view.button).toBeDefined();
  });
  it("view.button Horizontal", () => {
    expect(view.button).toBeDefined();
  });
  it("view.flag", () => {
    expect(view.flag).toBeDefined();
  });
  it("view.ProgressBar", () => {
    expect(view.progressBar).toBeDefined();
  });
  it("view.ProgressBar", () => {
    view.isHorizontal = false;
    view.renderProgressBar();
    expect(view.progressBar).toBeDefined();
  });

});

describe('работа фасада View', ()=>{
    beforeEach(function () {
        view = new View();
        
      });
        it('view.renderElements', ()=>{
            spyOn(view, 'renderElements');
            view.renderElements();
            expect(view.renderElements).toHaveBeenCalled();
            expect(view.field).toBeDefined();
            expect(view.button).toBeDefined();
            expect(view.flag).toBeDefined();
            expect(view.progressBar).toBeDefined();
  })
})

describe('движение View button', ()=>{
    beforeEach(function () {
        view = new View();
      });
        it('view.buttonMove Horisontal', ()=>{
            view.renderElements();
            view.buttonMove(view.button, 50);
            expect(getComputedStyle(view.button).left).toBe('50px');
  })
  it('view.buttonMove Vertical', ()=>{
    view.isHorizontal = false;
    view.renderElements();
    view.buttonMove(view.button, 50);
    expect(getComputedStyle(view.button).top).toBe('50px');
})
})
describe('toggle View flag', ()=>{
    beforeEach(function () {
        view = new View();
        view.renderElements();
      });
    it('view.addFlag', ()=>{
        view.addFlag();
        expect(getComputedStyle(view.flag).display).toBe('block');
})
it('view.removeFlag', ()=>{
    view.removeFlag();
    expect(getComputedStyle(view.flag).display).toBe('none');
})
})
describe('значение View flag', ()=>{

    it('view.buttonMove', ()=>{
        view = new View();
        view.renderElements();
        view.flagMove(view.flag, 50);
        expect(view.flag.innerHTML).toBe('50');
})
})

describe('удаление элементов View', ()=>{
    beforeEach(function () {
        view = new View();
        view.renderElements();
       
      });
        it('view.removeElements', ()=>{
 view.removeElements();
            
            
            
            expect(view.slider.childnodes).toBeUndefined();
  })
})

describe('движение View progressBar', ()=>{
    beforeEach(function () {
        view = new View();

      });
        it('view.progressBar Horisontal', ()=>{
            view.isRangeSlider = false;
            view.renderElements();
            spyOn(view, 'progressBarMove')
            view.progressBarMove();
            expect(view.progressBarMove).toHaveBeenCalled();
  })

})

