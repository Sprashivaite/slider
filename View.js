export class View {
  static slider = document.querySelector(".slider");
  static button = document.createElement("div");
  static button_2 = document.createElement("div");
  static field = document.createElement("div");
  static flag = document.createElement("div");
  static flag_2;
  static horizontal = true;
  static rangeSlider = true;
  static clickMin = document.createElement("span");
  static clickMax = document.createElement("span");
  static progressBar = document.createElement("div");

  static renderElements() {
    View.field.className = "slider__field";
    if (View.horizontal) {
      View.field.style.width = "266px";
      View.field.style.height = "6px";
    }
    if (!View.horizontal) {
      View.field.style.width = "6px";
      View.field.style.height = "266px";
    }
    View.slider.append(View.field);

    View.clickMin.innerHTML = "0 - ";
    View.clickMax.innerHTML = " 100";
    View.slider.prepend(View.clickMax);
    View.slider.prepend(View.clickMin);

    View.button.className = "slider__button";
    View.field.append(View.button);

    View.flag.className = "flag";

    View.flag.style.top = View.button.offsetTop - 15 + "px";
    View.button.after(View.flag);

    if (View.rangeSlider) {
      View.button_2.className = "slider__button_2";
      View.button.after(View.button_2);

      View.flag_2 = View.flag.cloneNode(true);

      View.button_2.after(View.flag_2);

      View.horizontal
        ? ((View.button_2.style.left = View.button.offsetWidth * 2 + "px"),
          (View.flag_2.style.left = View.button_2.offsetLeft + "px"),
          (View.button_2.style.top = -6 + "px"))
        : ((View.button_2.style.top = View.button.offsetWidth * 2 + "px"),
          (View.button_2.style.left = -5 + "px"),
          (View.button.style.left = -5 + "px"),
          (View.flag_2.style.top =
            View.button_2.offsetTop - View.button_2.offsetWidth + "px"));
    }

    View.progressBar.className = "progressBar";
    View.progressBar.style.height = View.field.offsetHeight + "px";
    View.progressBar.style.width = View.button.offsetLeft + "px";
    View.progressBar.style.left = View.progressBar.offsetLeft - 1 + "px";
    View.progressBar.style.top = View.progressBar.offsetTop - 1 + "px";
    if (View.rangeSlider) {
      View.progressBar.style.left = View.button.offsetLeft + "px";
      View.progressBar.style.top = View.button.offsetTop + 5 + "px";
    }

    View.field.append(View.progressBar);
    View.brogressBarMove();
  }

  static sliderMove(button, px) {
    View.slider.onmousedown = () => false;
    View.slider.oncontextmenu = () => false;
    View.horizontal
      ? (button.style.left = px + "px")
      : (button.style.top = px + "px");
  }

  static flagMove() {
    View.flag.style.left = View.button.offsetLeft + "px";
    View.flag.style.top = View.button.offsetTop - 15 + "px";
    if (View.rangeSlider) {
      View.flag_2.style.left = View.button_2.offsetLeft + "px";
      View.flag_2.style.top = View.button_2.offsetTop - 15 + "px";
    }
  }
  static brogressBarMove() {
    View.progressBar.style.width =
      View.button.offsetLeft + View.button.offsetWidth / 2 + "px";
    if (View.rangeSlider) {
      View.progressBar.style.left =
        View.button.offsetLeft + View.button.offsetWidth / 2 + "px";
      View.progressBar.style.width =
        View.button_2.offsetLeft -
        View.button.offsetLeft +
        View.button.offsetWidth / 2 +
        "px";
    }
    if (View.progressBar.offsetWidth <= View.field.offsetWidth / 4) {
      View.progressBar.style.backgroundColor = "red";
    }
    if (View.progressBar.offsetWidth >= View.field.offsetWidth / 4) {
      View.progressBar.style.backgroundColor = "yellow";
    }
    if (View.progressBar.offsetWidth >= View.field.offsetWidth / 2) {
      View.progressBar.style.backgroundColor = "orange";
    }
    if (View.progressBar.offsetWidth >= View.field.offsetWidth - View.button.offsetWidth) {
      View.progressBar.style.backgroundColor = "green";
    }
  }
  static flagValue(flag, value) {
    flag.innerHTML = value;
  }

  static removeFlag() {
    View.flag.style.display = "none";
    if (View.flag_2) {
      View.flag_2.style.display = "none";
    }
  }
  static addFlag() {
    View.flag.style.display = "block";
    if (View.flag_2) {
      View.flag_2.style.display = "block";
    }
  }
}
