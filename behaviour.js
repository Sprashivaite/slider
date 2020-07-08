const slider = document.querySelector(".slider");
const field = document.querySelector(".slider__field");
const button = document.querySelector(".slider__button");
const button_2 = document.querySelector(".slider__button_2");
const value = document.querySelector(".slider__value");
const char = document.querySelector(".char");
const vl = document.querySelector(".vl");
const flag = document.querySelector('.flag');

flag.style.left = button.offsetLeft + 2 +'px';
flag.style.top = button.offsetTop - 13 + 'px';

const click = new Event("click");
const mouseup = new Event("mouseup");

let max = 100;
let min = 0;
let prevVal = min;
let step = 1;
let fieldRange = field.offsetWidth - button.offsetWidth;
let stepPX = (fieldRange * step) / (max - min);

let breakPoint = [];
for (let i = 0; i <= fieldRange; i += stepPX) {
  breakPoint.push(i);
}

function pxLength() {
  let shiftLeft =
    event.clientX - field.getBoundingClientRect().left - button.offsetWidth / 2;
  if (shiftLeft >= fieldRange) {
    return fieldRange;
  } else if (shiftLeft <= 0) {
    return 0;
  } else {
    return shiftLeft;
  }
}

field.addEventListener("mousemove", pxLength);

function shiftBreakPoint(){
      breakPoint.forEach(function (item, index, array) {
      if (pxLength() >= item && pxLength() <= array[index + 1] - stepPX / 2) {
        button.style.left = item + "px";
      } else if (
        pxLength() >= item + stepPX / 2 &&
        pxLength() <= array[index + 1]
      ) {
        button.style.left = array[index + 1] + "px";
      }
    });
}

function sliderMove(button) {
  function onMouseMove() {
    button.style.left = pxLength() + "px";
    flagMove();
  }
  document.addEventListener("mousemove", onMouseMove);

  document.onmouseup = function () {
    shiftBreakPoint();
    flagMove();
    document.removeEventListener("mousemove", onMouseMove);
    document.onmouseup = null;
  };
}

button.addEventListener("mousedown", function () {
  sliderMove(button);
});
// button_2.addEventListener("mousedown", function () {
//   sliderMove(button_2);
// });
field.addEventListener('click', function(){
  button.style.left = pxLength() + "px";
  shiftBreakPoint();
    flagMove();
})

function flagMove(){
  flag.style.left = button.offsetLeft + 2 +'px';
  flag.style.top = button.offsetTop - 13 + 'px';
}


function view(button) {
  let result = min + Math.trunc((button.offsetLeft * (max - min)) / fieldRange);
  return result;
}

document.addEventListener("mousedown", function () {
  document.addEventListener("mousemove", function () {
    if (view(button) % step === 0) {
      flag.innerHTML = view(button) + char.value;
      vl.value = view(button) + char.value;
    }
  });
  document.addEventListener("mouseup", function () {
    if (view(button) % step === 0) {
      flag.innerHTML = view(button) + char.value;
      vl.value = view(button) + char.value;
    }
  });
});
document.addEventListener("click", function () {
  if (view(button) % step === 0) {
    flag.innerHTML = view(button) + char.value;
    vl.value = view(button) + char.value;
  }
    
});
// button_2.addEventListener("mousedown", function () {
//   document.addEventListener('mousemove', function(){
//     if (view(button_2) % step === 0) {  value.innerHTML =
//       view(button_2) + char.value;}
//   })
//   document.addEventListener('mouseup', function(){
//     if (view(button_2) % step === 0) {  value.innerHTML =
//     view(button) + char.value;}

//   })
// });

vl.addEventListener('input', function(){
  button.style.left = (fieldRange * vl.value) / (max - min) + 'px';
  flag.innerHTML = vl.value;
  flagMove();
})

// button_2.style.left = button.offsetLeft + 16 + "px";

// function makeDistanceButton() {
//   if (
//     button_2.getBoundingClientRect().left -
//       button.getBoundingClientRect().right <
//     0
//   ) {
//     button_2.style.left = button.offsetLeft + button.offsetWidth + stepPX + "px";
//     document.dispatchEvent(mouseup);
//   }
// }

// document.addEventListener("mousemove", makeDistanceButton);
// document.addEventListener("mousedown", makeDistanceButton);
// document.addEventListener("mouseup", makeDistanceButton);

slider.onmousedown = () => false;
slider.oncontextmenu = () => false;
