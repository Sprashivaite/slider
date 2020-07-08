const slider = document.querySelector(".slider");
const field = document.querySelector(".slider__field");
const button = document.querySelector(".slider__button");
const button_2 = document.querySelector(".slider__button_2");
const value = document.querySelector(".slider__value");
const char = document.querySelector(".char");
const vl = document.querySelector(".vl");


let click = new Event("click");
let mouseup = new Event("mouseup");

let max = 20;
let min = 10;
let prevVal = min;
let step = 1;
let fieldRange = field.offsetWidth - button.offsetWidth;
let stepPX = (fieldRange * step) / (max - min);

let breakPoint = [];
for(let i = 0; i <= fieldRange; i += stepPX){
  breakPoint.push(i);
};
console.log(breakPoint);
// vl.addEventListener('input', function(){
//   console.log(prevVal);
//   prevVal = +vl.value;
//   sliderMove(button);
//   console.log(vl.value);
// })

function pxLength() {
  let shiftLeft =
    event.clientX - field.getBoundingClientRect().left - button.offsetWidth / 2;

  if (shiftLeft + stepPX / 2 > field.offsetWidth - button.offsetWidth) {
    return (prevVal = field.offsetWidth - button.offsetWidth);
  } else if (shiftLeft - stepPX / 2 < 0) {
    return (prevVal = 0);
  } else {
    if (step === 1) {
      return shiftLeft;
    } else {
      if (shiftLeft - prevVal > stepPX / 2) {
        return (prevVal = stepPX + prevVal);
      } else if (shiftLeft < prevVal - stepPX / 2) {
        return (prevVal = prevVal - stepPX);
      }
    }
  }
}

field.addEventListener("mousemove", pxLength);

function sliderMove(button) {
  function onMouseMove() {
    button.style.left = pxLength() + "px";
    // makeDistanceButton();
  }
  document.addEventListener("mousemove", onMouseMove);

  document.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    document.onmouseup = null;
  };
}

button.addEventListener("mousedown", function () {
  sliderMove(button);
});

button_2.addEventListener("mousedown", function () {
  sliderMove(button_2);
});

function view(button) {
  let result =
    min +
    Math.trunc(
      (button.offsetLeft * (max - min)) /
        (field.offsetWidth - button.offsetWidth)
    );
  return result;
}

button.addEventListener("mousemove", function () {
  value.innerHTML =
    view(button) + char.value + " - " + view(button_2) + char.value;
});
button_2.addEventListener("mousemove", function () {
  value.innerHTML =
    view(button) + char.value + " - " + view(button_2) + char.value;
});

button_2.style.left = button.offsetLeft + 16 + "px";

function makeDistanceButton() {
  if (
    button_2.getBoundingClientRect().left -
      button.getBoundingClientRect().right <
    0
  ) {
    button_2.style.left = button.offsetLeft + button.offsetWidth + 1 + "px";
    document.dispatchEvent(mouseup);
  }
}

// document.addEventListener("mousemove", makeDistanceButton);
// document.addEventListener("mousedown", makeDistanceButton);
// document.addEventListener("mouseup", makeDistanceButton);

slider.onmousedown = () => false;
slider.oncontextmenu = () => false;
