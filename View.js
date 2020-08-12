export class View {
  static slider = document.querySelector(".slider");
  static button = document.createElement("div");
  static button_2 = document.createElement("div");
  static field = document.createElement("div");
  static flag = document.createElement("div");
  static flag_2;
  static horizontal = true;
  static rangeSlider = true;

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
        ? (View.button_2.style.left = View.button.offsetWidth * 2 + "px", View.flag_2.style.left = View.button_2.offsetLeft + "px", View.button_2.style.top = -6+ "px")
        : ((View.button_2.style.top = View.button.offsetWidth * 2 + "px"),
          (View.button_2.style.left = -5 + "px"),
          (View.button.style.left = -5 + "px"), View.flag_2.style.top = View.button_2.offsetTop - View.button_2.offsetWidth + "px");
    }
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
