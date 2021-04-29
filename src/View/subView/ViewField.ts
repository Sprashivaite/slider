import IView from "../IView";

class ViewField {
  div!: HTMLDivElement;

  isHorizontal!: boolean;

  slider!: HTMLDivElement;

  constructor(View: IView) {
    this.init(View)    
  }

  createField(): void {
    this.div = document.createElement("div");
    if (this.isHorizontal) this.div.className = "slider__field_horizontal";
    if (!this.isHorizontal) this.div.className = "slider__field_vertical";
    this.slider.append(this.div);
  }

  private init(View: IView): void {
    this.isHorizontal = View.isHorizontal;
    this.slider = View.slider.div;
  }  
}
export default ViewField;
