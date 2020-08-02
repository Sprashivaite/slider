const slider = document.querySelector(".slider");
const field = document.querySelector(".slider__field");
const button = document.querySelector(".slider__button");
const value = document.querySelector(".slider__value");
const char = document.querySelector(".char");
const vl = document.querySelector(".vl");
const tooltip = document.querySelector('#tooltip');
const maxBtn = document.querySelector('#max');
const minBtn = document.querySelector('#min');

let max = 100;
maxBtn.addEventListener('input', function(){
  max = maxBtn.value;
})

let min = 15;
// minBtn.addEventListener('input', function(){
//   min = minBtn.value;
//   vl.value = min / 10;
// })

let step = 15;
let fieldRange = field.offsetWidth - button.offsetWidth;

let horizontal = true;

const flag = document.createElement("div");
flag.className = "flag";
flag.style.top = button.offsetTop - 15 + "px";
flag.innerHTML = vl.value;
button.after(flag);



const button_2 = document.createElement("div");
button_2.className = "slider__button_2";

let rangeSlider = false;
if (rangeSlider) {
  button.after(button_2);
  if(horizontal){
  button_2.style.left = stepPX + 'px';}
  if(!horizontal){
    button_2.style.top = stepPX + 'px';
  }
}
const flag_2 = flag.cloneNode(true);
flag_2.innerHTML = vl.value;
button_2.after(flag_2);

tooltip.addEventListener('input', function(){
  flag.hidden = !tooltip.checked;
  flag_2.hidden = !tooltip.checked;
})
let stepPX = (fieldRange * step) / (max - min);
let breakPoint = [];
for (let i = 0; i <= fieldRange; i += stepPX) {
  breakPoint.push(i);
}

if (!horizontal) {
  field.style.width = "6px";
  field.style.height = "266px";
  button.style.left = "-6px";
  button_2.style.left = "-6px";
}

function pxLength() {
  let shiftLeft;
  if (horizontal) {
    shiftLeft =
      event.clientX -
      field.getBoundingClientRect().left -
      button.offsetWidth / 2;
  }
  if (!horizontal) {
    shiftLeft =
      event.clientY -
      field.getBoundingClientRect().top -
      button.offsetWidth / 2;
  }
  if (shiftLeft >= fieldRange) {
    return fieldRange;
  }
  if (shiftLeft <= 0) {
    return 0;
  } else {
    return shiftLeft;
  }
}

document.addEventListener("mousemove", pxLength);

function shiftBreakPoint(button) {
  breakPoint.forEach(function (item, index, array) {
    if (pxLength() >= item && pxLength() <= array[index + 1] - stepPX / 2) {
      if (horizontal) {
        button.style.left = item + "px";
      }
      if (!horizontal) {
        button.style.top = item + "px";
      }
    } else if (
      pxLength() >= item + stepPX / 2 &&
      pxLength() <= array[index + 1]
    ) {
      if (horizontal) {
        button.style.left = array[index + 1] + "px";
      }
      if (!horizontal) {
        button.style.top = array[index + 1] + "px";
      }
    }
  });
}

function sliderMove(button) {
  slider.onmousedown = () => false;
  slider.oncontextmenu = () => false;

  function onMouseMove() {
    if (horizontal) {
      button.style.left = pxLength() + "px";
    }
    if (!horizontal) {
      button.style.top = pxLength() + "px";
    }
    flagMove();
  }
  document.addEventListener("mousemove", onMouseMove);

  document.onmouseup = function () {
    shiftBreakPoint(button);
    flagMove();
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
if (!rangeSlider) {
  field.addEventListener("click", function () {
    button.style.left = pxLength() + "px";
    shiftBreakPoint(button);
    flagMove();
  });
}

function flagMove() {
  flag.style.left = button.offsetLeft + "px";
  flag.style.top = button.offsetTop - 15 + "px";
  flag_2.style.left = button_2.offsetLeft + "px";
  flag_2.style.top = button_2.offsetTop - 15 + "px";
}

function view(button) {
  let result;
  if (horizontal) {
    result = min + Math.trunc((button.offsetLeft * (max - min)) / fieldRange);
  }
  if (!horizontal) {
    result = min + Math.trunc((button.offsetTop * (max - min)) / fieldRange);
  }
  return result;
}

document.addEventListener("mousedown", function () {
  document.addEventListener("mousemove", function () {
    if (view(button) % step === 0) {
      flag.innerHTML = view(button) + char.value;
      vl.value = view(button) + char.value;
      flag_2.innerHTML = view(button_2) + char.value;
    }
  });
  document.addEventListener("mouseup", function () {
    if (view(button) % step === 0) {
      flag.innerHTML = view(button) + char.value;
      vl.value = view(button) + char.value;
      flag_2.innerHTML = view(button_2) + char.value;
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

vl.addEventListener("input", function () {
  if (horizontal) {
    button.style.left = (fieldRange * vl.value) / (max - min) + "px";
  }
  if (!horizontal) {
    button.style.top = (fieldRange * vl.value) / (max - min) + "px";
  }
  flag.innerHTML = vl.value;
  flagMove();
});
if(rangeSlider){
function makeDistanceButton() {
  if(horizontal){
  if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
    button.style.left = button_2.offsetLeft - stepPX + "px";
  }
  }
  if(!horizontal){
    if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
    button.style.top = button_2.offsetTop - stepPX + "px";
  }}
  flagMove();
}


function makeDistanceButton_2() {
  if(horizontal){
  if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
    button_2.style.left = button.offsetLeft + stepPX + "px";
  }}
  if(!horizontal){
    if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
      button_2.style.top = button.offsetTop + stepPX + "px";
    }
  }
  flagMove();
}
button.addEventListener("mousedown", function () {
  document.addEventListener("mousemove", makeDistanceButton);

  document.addEventListener("mouseup", function () {
    makeDistanceButton();
    document.removeEventListener("mousemove", makeDistanceButton);
    document.removeEventListener("mouseup", makeDistanceButton);
  });
});
button_2.addEventListener("mousedown", function () {
  document.addEventListener("mousemove", makeDistanceButton_2);

  document.addEventListener("mouseup", function () {
    makeDistanceButton_2();
    document.removeEventListener("mousemove", makeDistanceButton_2);
    document.removeEventListener("mouseup", makeDistanceButton_2);
  });
});
}