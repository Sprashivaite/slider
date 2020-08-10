import { Model } from "./Model.js";

export class View {
  constructor() {
    // const field = document.querySelector(".slider__field");
    // const value = document.querySelector(".slider__value");
    // const tooltip = document.querySelector("#tooltip");
    //   Model.сlickHoldListener(document, flagMove);
    //
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
  static button_2 = document.createElement("div");
  static field = document.createElement("div");
  static flag = document.createElement("div");
  static flag_2;
  static horizontal = true;
  static rangeSlider = true;

  static renderElements() {
    View.button.className = "slider__button";
    View.field.className = "slider__field";
    if (!View.horizontal) {
      View.field.style.width = "6px";
      View.field.style.height = "266px";
      View.button.style.left = "-6px";
    }

    View.slider.append(View.field);

    View.field.append(View.button);
    View.flag.className = "flag";
    View.flag.style.top = View.button.offsetTop - 15 + "px";
    View.button.after(View.flag);
    if (View.rangeSlider) {
      View.button_2.className = "slider__button_2";
      View.flag_2 = View.flag.cloneNode(true);

      View.button.after(View.button_2);
      View.horizontal
        ? (View.button_2.style.left =
            View.button.offsetWidth + View.button.offsetWidth + "px")
        : (View.button_2.style.top =
            View.button.offsetWidth + View.button.offsetWidth + "px");
      View.flag_2.style.left = View.button_2.offsetLeft + "px";
      View.button_2.after(View.flag_2);
    }
  }

  static sliderMove(button, px) {
    View.slider.onmousedown = () => false;
    View.slider.oncontextmenu = () => false;

    View.horizontal
      ? (button.style.left = px + "px")
      : (button.style.top = px + "px");

    this.flagMove();
    
  }

   static flagMove() {
    View.flag.style.left = View.button.offsetLeft + "px";
    View.flag.style.top = View.button.offsetTop - 15 + "px";
    if (View.rangeSlider) {
      View.flag_2.style.left = View.button_2.offsetLeft + "px";
      View.flag_2.style.top = View.button_2.offsetTop - 15 + "px";
    }
  }

  static flagValue(flag, value){
    flag.innerHTML = value;
  }

  static removeFlag() {
    View.flag.style.display = "none";
    if(View.flag_2) {View.flag_2.style.display = "none";}
    
  }
}
