export class View {
  static slider = document.querySelector(".slider");
  static button = document.createElement("div");
  static button_2 = document.createElement("div");
  static field = document.createElement("div");
  static flag = document.createElement("div");
  static flag_2;
  static clickMin = document.createElement("div");
  static clickMax = document.createElement("div");
  static progressBar = document.createElement("div");
  static horizontal = true;
  static rangeSlider = true;

  static renderElements() {
    // View.renderMinMax();
    View.renderField();
    View.renderButtons();
    View.renderFlag();
    View.renderProgressBar();
  }
  static removeElements() {
    [
      View.flag,
      View.flag_2,
      View.button,
      View.button_2,
      View.field,
      View.clickMin,
      View.clickMax,
      View.progressBar,
    ].forEach((item) => item.remove());
  }


  static renderField() {
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
  }
  static renderButtons() {
    View.button.className = "slider__button";
    View.button.style.top = "-6px";
    View.button.style.left = "0px";
    if (!View.horizontal) {
      View.button.style.left = "-5px";
      View.button.style.top = "0px";
    }
    View.field.append(View.button);
    if (View.rangeSlider) {
      View.button_2.className = "slider__button_2";
      View.button.after(View.button_2);
      View.button_2.style.top = -6 + "px";
      View.horizontal
        ? ((View.button_2.style.left = View.button.offsetWidth * 2 + "px"),
        (View.button.style.top = "-6px"),
          (View.button_2.style.top = -6 + "px"))
        : ((View.button_2.style.top = View.button.offsetWidth * 2 + "px"),
          (View.button_2.style.left = -5 + "px"),
          (View.button.style.left = -5 + "px"));
    }
  }
  static renderFlag() {
    View.flag.className = "flag";
    View.flag.style.top = View.button.offsetTop - 15 + "px";
    View.button.after(View.flag);
    if (View.rangeSlider) {
      View.flag_2 = View.flag.cloneNode(true);

      View.button_2.after(View.flag_2);
      View.flag_2.style.left = View.button_2.offsetLeft + "px";
      View.flag_2.style.top =
        View.button_2.offsetTop - View.button_2.offsetWidth + "px";
    }
  }
  static renderProgressBar() {
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
    View.progressBarMove();
  }
  static renderMinMax() {
    View.slider.append(View.clickMin);
    View.slider.append(View.clickMax);
  }


  static sliderMove(button, px) {
    View.slider.onmousedown = () => false;
    View.slider.oncontextmenu = () => false;
    View.horizontal
      ? (button.style.left = px + "px")
      : (button.style.top = px + "px");
  }
  static progressBarMove() {
    View.progressBar.style.width = View.button.offsetLeft + View.button.offsetWidth / 2 + "px";
    if (!View.horizontal) {
      View.progressBar.style.height =
      View.button.offsetTop + View.button.offsetWidth + "px";
      View.progressBar.style.width = View.field.offsetWidth + "px";
    }

    if (View.rangeSlider) {
      View.progressBar.style.left =
        View.button.offsetLeft + View.button.offsetWidth / 2 + "px";
      if (View.horizontal) {
        View.progressBar.style.width =
          View.button_2.offsetLeft -
          View.button.offsetLeft +
          View.button.offsetWidth / 2 +
          "px";
      }
      if (!View.horizontal) {
        View.progressBar.style.top =
          View.button.offsetTop + View.button.offsetWidth / 2 + "px";
        View.progressBar.style.height =
          View.button_2.offsetTop -
          View.button.offsetTop +
          View.button.offsetWidth / 2 +
          "px";
        View.progressBar.style.left = View.progressBar.offsetLeft - 4 + "px";
      }
    }
    if (View.progressBar.offsetWidth <= View.field.offsetWidth / 4) {
      View.progressBar.style.backgroundColor = "grey";
    }
    if (View.progressBar.offsetWidth >= View.field.offsetWidth / 4) {
      View.progressBar.style.backgroundColor = "darkgoldenrod";
    }
    if (View.progressBar.offsetWidth >= View.field.offsetWidth / 2) {
      View.progressBar.style.backgroundColor = "green";
    }
    if (
      View.progressBar.offsetWidth >=
      View.field.offsetWidth - View.button.offsetWidth
    ) {
      View.progressBar.style.backgroundColor = "#6FCF97";
    }
    if (!View.horizontal) {
      if (View.progressBar.offsetHeight <= View.field.offsetHeight / 4) {
        View.progressBar.style.backgroundColor = "grey";
      }
      if (View.progressBar.offsetHeight >= View.field.offsetHeight / 4) {
        View.progressBar.style.backgroundColor = "darkgoldenrod";
      }
      if (View.progressBar.offsetHeight >= View.field.offsetHeight / 2) {
        View.progressBar.style.backgroundColor = "green";
      }
      if (
        View.progressBar.offsetHeight >=
        View.field.offsetHeight - View.button.offsetHeight
      ) {
        View.progressBar.style.backgroundColor = "#6FCF97";
      }
    }
  }
  static flagMove() {
    View.flag.style.left = View.button.offsetLeft + "px";
    View.flag.style.top = View.button.offsetTop - 15 + "px";
    if (View.rangeSlider) {
      View.flag_2.style.left = View.button_2.offsetLeft + "px";
      View.flag_2.style.top = View.button_2.offsetTop - 15 + "px";
      if (!View.horizontal) {
        View.flag_2.style.top =
          View.button_2.offsetTop + 5 + View.button_2.offsetWidth + "px";
      }
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
