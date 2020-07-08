const slider = document.querySelector(".slider");
const field = document.querySelector(".slider__field");
const button = document.querySelector(".slider__button");
const button_2 = document.querySelector(".slider__button_2");
const value = document.querySelector(".slider__value");
const toggle = document.querySelector(".toggle");

let max = 30;
let min = 0;
let prevVal = min;
let step = 5;
let stepPX = ((field.offsetWidth - button.offsetWidth) * step) / (max - min);

function sliderMove(button) {
  function onMouseMove() {
    let shiftLeft =
      event.clientX -
      field.getBoundingClientRect().left -
      button.offsetWidth / 2;

    if (shiftLeft + stepPX / 2 > field.offsetWidth - button.offsetWidth) {
      button.style.left = field.offsetWidth - button.offsetWidth + "px";
      prevVal = field.offsetWidth - button.offsetWidth;
    } else if (shiftLeft - stepPX / 2 < 0) {
      button.style.left = 0;
      prevVal = 0;
    } else {
      if (step === 1) {
        button.style.left = shiftLeft + "px";
      } else {
        if (shiftLeft - prevVal > stepPX / 2) {
          button.style.left = stepPX + prevVal + "px";
          prevVal = stepPX + prevVal;
        } else if (shiftLeft < prevVal - stepPX / 2) {
          button.style.left = prevVal - stepPX + "px";
          prevVal = prevVal - stepPX;
        }
      }
    }
  }
  onMouseMove(event);
  document.addEventListener("mousemove", onMouseMove);

  document.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    document.onmouseup = null;
  };
  // field.addEventListener('click', onMouseMove)
}



button.addEventListener("mousedown", function () {
  sliderMove(button);
});
button_2.addEventListener("mousedown", function () {
  sliderMove(button_2);
});

function move(px){
  button.style.left = px + 'px'
}

button.addEventListener('mousedown', move)

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
    view(button) + toggle.value + " - " + view(button_2) + toggle.value;
});
button_2.addEventListener("mousemove", function () {
  value.innerHTML =
    view(button) + toggle.value + " - " + view(button_2) + toggle.value;
});

button_2.style.left = button.offsetLeft + 16 + "px";

function makeDistanceButton() {
  if (
    button_2.getBoundingClientRect().left -
      button.getBoundingClientRect().right <
    0
  ) {
    if (event.target == button) {
      if (button_2.offsetLeft > field.offsetWidth - button_2.offsetWidth) {
        button_2.style.left = field.offsetWidth - button_2.offsetWidth + "px";
      } else {
        button_2.style.left = button.offsetLeft + 16 + "px";
      }
    }
    if (event.target == button_2) {
      if (button.offsetLeft < 0) return;
      button.style.left = button_2.offsetLeft - 16 + "px";
    }
  }
}

document.addEventListener("mousemove", makeDistanceButton);
document.addEventListener("mouseup", makeDistanceButton);

slider.onmousedown = () => false;
slider.oncontextmenu = () => false;
