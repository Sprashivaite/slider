import { Model } from "./Model.js";

export class View {
  constructor() {
    // const field = document.querySelector(".slider__field");
    // const value = document.querySelector(".slider__value");
    // const tooltip = document.querySelector("#tooltip");
    //   Model.сlickHoldListener(document, flagMove);
    // const button_2 = document.createElement("div");
    // button_2.className = "slider__button_2";
    // const flag_2 = flag.cloneNode(true);
    // button_2.after(flag_2);
    // if (!controler.horizontal) {
    //   field.style.width = "6px";
    //   field.style.height = "266px";
    //   button.style.left = "-6px";
    //   button_2.style.left = "-6px";
    // }
    // if (controler.rangeSlider) {
    //   button.after(button_2);
    //   if (controler.horizontal) {
    //     button_2.style.left = stepPX + button.offsetWidth + "px";
    //   }
    //   if (!controler.horizontal) {
    //     button_2.style.top = stepPX + button.offsetWidth + "px";
    //   }
    // }
    // if (controler.rangeSlider) {
    //   button_2.addEventListener("mousedown", function () {
    //     sliderMove(button_2);
    //   });
    // }
    // if (!controler.rangeSlider) {
    //   field.addEventListener("click", function () {
    //     button.style.left = pxLength() + "px";
    //     shiftBreakPoint(button);
    //     flagMove();
    //   });
    // }
    //   document.addEventListener("mousedown", function () {
    //     document.addEventListener("mousemove", function () {
    //       if (view(button) % controler.step === 0) {
    //         controler.flag.innerHTML = view(button) + char;
    //         flag_2.innerHTML = view(button_2) + char;
    //       }
    //     });
    //     document.addEventListener("mouseup", function () {
    //       if (view(button) % controler.step === 0) {
    //         flag.innerHTML = view(button) + char;
    //         flag_2.innerHTML = view(button_2) + char;
    //       }
    //     });
    //   });
    //   document.addEventListener("click", function () {
    //     if (view(button) % controler.step === 0) {
    //       flag.innerHTML = view(button) + char;
    //     }
    //   });
  }

  static slider = document.querySelector(".slider");
  static button = document.createElement("div");
  static field = document.createElement("div");
  static flag = document.createElement("div");
  static horizontal = true;

  renderElements() {
    View.button.className = "slider__button";
    View.field.className = "slider__field";
    View.slider.append(View.field);
    View.field.append(View.button);
    View.flag.className = "flag";
    View.flag.style.top = View.button.offsetTop - 15 + "px";
    View.flag.innerHTML = 0;
    View.button.after(View.flag);
  }

  sliderMove(px, value) {
    View.slider.onmousedown = () => false;
    View.slider.oncontextmenu = () => false;

    View.horizontal
      ? (View.button.style.left = px + "px")
      : (View.button.style.top = px + "px");

    this.flagMove();
    View.flag.innerHTML = value;
  }

  flagMove() {
    View.flag.style.left = View.button.offsetLeft + "px";
    View.flag.style.top = View.button.offsetTop - 15 + "px";
    
  }
  static removeFlag(){
    View.flag.style.display = 'none';
  }

}
