import IView from "../IView";

class ViewField {
  div: HTMLDivElement;

  isHorizontal: boolean;

  slider: HTMLDivElement;

  constructor(View: IView) {
    this.isHorizontal = View.isHorizontal;
    this.slider = View.slider.div;
    this.div = document.createElement("div");
  }

  createField(): void {
    if (this.isHorizontal) this.div.className = "slider__field_horizontal";
    if (!this.isHorizontal) this.div.className = "slider__field_vertical";
    this.slider.append(this.div);
  }
}
export default ViewField;
