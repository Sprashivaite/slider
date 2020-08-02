const slider = document.querySelector(".slider");
const field = document.querySelector(".slider__field");
const button = document.querySelector(".slider__button");
const value = document.querySelector(".slider__value");
const tooltip = document.querySelector("#tooltip");

let max = 100;
let min = 1;

let step = 2;
let fieldRange = field.offsetWidth - button.offsetWidth;

let offsetStart = function () {
  return button.offsetLeft;
};

const flag = document.createElement("div");
flag.className = "flag";
flag.style.top = button.offsetTop - 15 + "px";
button.after(flag);
let char;
char = "";

const button_2 = document.createElement("div");
button_2.className = "slider__button_2";

let stepPX = (fieldRange * step) / (max - min);
let breakPoint = [];
for (let i = 0; i <= fieldRange; i += stepPX) {
  breakPoint.push(i);
}
let rangeSlider = true;
let horizontal = true;

if (rangeSlider) {
  button.after(button_2);
  if (horizontal) {
    button_2.style.left = stepPX + button.offsetWidth + "px";
  }
  if (!horizontal) {
    button_2.style.top = stepPX + button.offsetWidth + "px";
  }
}
const flag_2 = flag.cloneNode(true);
button_2.after(flag_2);

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
      flag.innerHTML = view(button) + char;
      flag_2.innerHTML = view(button_2) + char;
    }
  });
  document.addEventListener("mouseup", function () {
    if (view(button) % step === 0) {
      flag.innerHTML = view(button) + char;
      flag_2.innerHTML = view(button_2) + char;
    }
  });
});
document.addEventListener("click", function () {
  if (view(button) % step === 0) {
    flag.innerHTML = view(button) + char;
  }
});

if (rangeSlider) {
  function makeDistanceButton() {
    if (horizontal) {
      if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
        button.style.left =
          button_2.offsetLeft - button.offsetWidth - stepPX + "px";
      }
    }
    if (!horizontal) {
      if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
        button.style.top =
          button_2.offsetTop - button.offsetWidth - stepPX + "px";
      }
    }
    flagMove();
  }
  function makeDistanceButton_2() {
    if (horizontal) {
      if (button.offsetLeft >= button_2.offsetLeft - button_2.offsetWidth) {
        button_2.style.left =
          button.offsetLeft + button.offsetWidth + stepPX + "px";
      }
    }
    if (!horizontal) {
      if (button.offsetTop >= button_2.offsetTop - button_2.offsetWidth) {
        button_2.style.top =
          button.offsetTop + button.offsetWidth + stepPX + "px";
      }
    }
    flagMove();
  }
  clickListener(button, makeDistanceButton);
  clickListener(button_2, makeDistanceButton_2);
}

function clickListener(target, fn) {
  target.addEventListener("mousedown", function () {
    document.addEventListener("mousemove", fn);

    document.addEventListener("mouseup", function () {
      fn();
      document.removeEventListener("mousemove", fn);
      document.removeEventListener("mouseup", fn);
    });
  });
}
