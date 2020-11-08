import Model from "../Model";
import View from "../View";
import Presenter from "../Presenter";

document.body.insertAdjacentHTML(
  "afterbegin",
  "<div class='slider' style='width:300px;'></div>"
);

// let view: View;
// beforeEach(function () {
//   view = new View();
// });


// describe("наличие инстансa класса", () => {
//   it("View", () => {
//     expect(view).toBeDefined();
//   });
// });

// describe("наличие отрисованных элементов у View", () => {
//   beforeEach(function () {
     
//     view.renderField();
//     view.renderButtons();
//     view.renderFlag();
//     view.renderProgressBar();
//   });
//   afterEach(function () {

//     view.removeElements();
//   });
//   it("view.field Vertical", () => {
//     view.isHorizontal = false;
//     view.renderField();
//     expect(view.field).toBeDefined();
//   });
//   it("view.field Horizontal", () => {
//     expect(view.field).toBeDefined();
//   });
//   it("view.button Vertical", () => {
//     view.isHorizontal = false;
//     view.renderButtons();
//     expect(view.button).toBeDefined();
//   });
//   it("view.button Horizontal", () => {
//     expect(view.button).toBeDefined();
//   });
//   it("view.flag", () => {
//     expect(view.flag).toBeDefined();
//   });
//   it("view.ProgressBar", () => {
//     expect(view.progressBar).toBeDefined();
//   });
//   it("view.ProgressBar", () => {
//     view.isHorizontal = false;
//     view.renderProgressBar();
//     expect(view.progressBar).toBeDefined();
//   });
// });

// describe("работа фасада View", () => {


//   it("view.renderElements", () => {
//     spyOn(view, "renderElements");
//     spyOn(view, "renderField");
//     view.renderElements();
//     expect(view.renderElements).toHaveBeenCalled();
//     // expect(view.renderField ).toBeDefined();
//     expect(view.field).toBeDefined();
//     expect(view.button).toBeDefined();
//     expect(view.flag).toBeDefined();
//     expect(view.progressBar).toBeDefined();
//   });
// });

// describe("движение View button", () => {

  
//   afterEach(function () {

//     view.removeElements();
//   });
//   it("view.buttonMove Horisontal", () => {
//     view.renderElements();
//     view.buttonMove(view.button, 50);
//     expect(getComputedStyle(view.button).left).toBe("50px");
//   });
//   it("view.buttonMove Vertical", () => {
//     view.isHorizontal = false;
//     view.renderElements();
//     view.buttonMove(view.button, 50);
//     expect(getComputedStyle(view.button).top).toBe("50px");
//   });
// });
// describe("toggle View flag", () => {
//   beforeEach(function () {
     
//     view.renderElements();
//   });
//   afterEach(function () {

//     view.removeElements();
//   });
//   it("view.addFlag", () => {
//     view.addFlag();
//     expect(getComputedStyle(view.flag).display).toBe("block");
//   });
//   it("view.removeFlag", () => {
//     view.removeFlag();
//     expect(getComputedStyle(view.flag).display).toBe("none");
//   });
// });
// describe("значение View flag", () => {
//   afterEach(function () {

//     view.removeElements();
//   });
//   it("view.flagMove", () => {
     
//     view.renderElements();
//     view.flagMove(view.flag, 50);
//     expect(view.flag.innerHTML).toBe("50");
//   });
// });

// describe("удаление элементов View", () => {


//   it("view.removeElements", () => {
//     view.renderElements();
//     view.removeElements();
//     expect(view.slider.childnodes).toBeUndefined();
//   });
// });

// describe("движение View progressBar", () => {
//   afterEach(function () {

//     view.removeElements();
//   });
//   it("view.progressBar range", () => {
     
//     view.renderElements();

//     view.buttonMove(view.button_2, 95);
//     view.progressBarMove();
//     expect(getComputedStyle(view.progressBar).width).toBe(
//       view.button_2.offsetLeft -
//         view.button.offsetLeft +
//         view.button.offsetWidth / 2 +
//         "px"
//     );
//         // expect(getComputedStyle(view.progressBar).backgroundColor).toBe('rgb(0, 154, 99)');
//   });
//   it("view.progressBar solo", () => {
     
//     view.isRangeSlider = false;
//     view.renderElements();

//     view.buttonMove(view.button, 100);
//     view.progressBarMove();
//     expect(getComputedStyle(view.progressBar).width).toBe(
//       view.button.offsetLeft + view.button.offsetWidth / 2 + "px"
//     );

//   });
//   it("view.progressBar Vertical", () => {
     
//     view.isRangeSlider = false;
//     view.isHorizontal = false;
//     view.renderElements();

//     view.buttonMove(view.button, 30);
//     view.progressBarMove();
//     expect(getComputedStyle(view.progressBar).height).toBe(
//       view.button.offsetTop + view.button.offsetWidth + "px"
//     );
//   });
//   it("view.progressBar range Vertical", () => {
     
//     view.isHorizontal = false;
//     view.renderElements();

//     view.buttonMove(view.button_2, 6);
//     view.progressBarMove();
//     expect(getComputedStyle(view.progressBar).height).toBe(
//       view.button_2.offsetTop -
//       view.button.offsetTop +
//       view.button.offsetWidth / 2 +
//               "px"
//     );
    
    
//   });
// });
