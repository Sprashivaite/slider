import IView from '../IView'

class ViewButton{
  div: HTMLDivElement;
  field: HTMLDivElement;
  isHorizontal: boolean;
  constructor(View: IView){
    this.div = document.createElement("div");
    this.field = View.field.div;
    this.isHorizontal = View.isHorizontal;
  }
  createButton(): HTMLDivElement{
    this.div.className = "slider__button";
    this.div.style.top = "-6px";
    this.div.style.left = "0px";
    this.field.append(this.div);

    if (this.div.previousElementSibling) {
      this.div.style.left =
      this.div.previousElementSibling.offsetLeft +
      this.div.previousElementSibling.offsetWidth +
        "px";
    }

    if (!this.isHorizontal) {
      this.div.style.left = "-5px";
      this.div.style.top = "0px";

      if (this.div.previousElementSibling) {
        this.div.style.top =
        this.div.previousElementSibling.offsetTop +
        this.div.previousElementSibling.offsetHeight +
          "px";
      }
    }
    return this.div;
  }
  
  moveButton(px: number): void {
    this.isHorizontal
      ? (this.div.style.left = px + "px")
      : (this.div.style.top = px + "px");
  }
}
export default ViewButton;
