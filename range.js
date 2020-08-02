const slider = document.querySelector(".slider");
const field = document.querySelector(".slider__field");
const button = document.querySelector(".slider__button");
const value = document.querySelector(".slider__value");
const char = document.querySelector(".char");
const vl = document.querySelector(".vl");

const flag = document.createElement("div");
flag.className = "flag";
flag.style.top = button.offsetTop - 15 + "px";
flag.innerHTML = vl.value;
button.after(flag);
flag.hidden = false;

const button_2 = document.createElement("div");
button_2.className = "slider__button_2";
button_2.style.left = button.offsetLeft + button.offsetWidth + 20 + "px";
let rangeSlider = true;
if (rangeSlider) {
  button.after(button_2);
}
const flag_2 = flag.cloneNode(true);
flag_2.innerHTML = vl.value;
button_2.after(flag_2);

let max = 100;
let min = 0;
let step = 1;
let fieldRange = field.offsetWidth - button.offsetWidth;
let stepPX = (fieldRange * step) / (max - min);
let horizontal = true;

let breakPoint = [];
for (let i = 0; i <= fieldRange; i += stepPX) {
  breakPoint.push(i);
}

if (!horizontal) {
  field.style.width = "6px";
  field.style.height = "266px";
  button.style.left = "-6px";
}

function pxLength(btn) {
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
      btn.offsetWidth / 2;
  }
  if (btn.nextElementSibling === button_2 &&
    shiftLeft >=
    btn.nextElementSibling.offsetLeft - btn.offsetWidth
  ) {
    return
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

function shiftBreakPoint(btn) {
  breakPoint.forEach(function (item, index, array) {
    if (pxLength() >= item && pxLength() <= array[index + 1] - stepPX / 2) {
      if (horizontal) {
        btn.style.left = item + "px";
      }
      if (!horizontal) {
        btn.style.top = item + "px";
      }
    } else if (
      pxLength() >= item + stepPX / 2 &&
      pxLength() <= array[index + 1]
    ) {
      if (horizontal) {
        btn.style.left = array[index + 1] + "px";
      }
      if (!horizontal) {
        btn.style.top = array[index + 1] + "px";
      }
    }
  });
}

function sliderMove(btn) {
  slider.onmousedown = () => false;
  slider.oncontextmenu = () => false;

  function onMouseMove() {
    if (horizontal) {
      btn.style.left = pxLength(btn) + "px";
    }
    if (!horizontal) {
      btn.style.top = pxLength(btn) + "px";
    }
    flagMove();
  }
  document.addEventListener("mousemove", onMouseMove);

  document.onmouseup = function () {
      
    shiftBreakPoint(btn);
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

function view(btn) {
  let result;
  if (horizontal) {
    result = min + Math.trunc((btn.offsetLeft * (max - min)) / fieldRange);
  }
  if (!horizontal) {
    result = min + Math.trunc((btn.offsetTop * (max - min)) / fieldRange);
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

// function makeDistanceButton() {
//   let shiftLeft =
//     event.clientX - field.getBoundingClientRect().left - button.offsetWidth / 2;
//   if (event.target == button) {
//     if (shiftLeft >= button_2.offsetLeft - button_2.offsetWidth) {
//       button.style.left = button_2.offsetLeft - button_2.offsetWidth + "px";
//     }
//   }
// }

// document.addEventListener("mousemove", makeDistanceButton);
// document.addEventListener("mousedown", makeDistanceButton);
// document.addEventListener("mouseup", makeDistanceButton);
