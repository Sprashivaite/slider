class ViewButton {
  button: HTMLDivElement;
  field: HTMLDivElement;
  isHorizontal: boolean;
  constructor(field: HTMLDivElement, isHorizontal: boolean){
    this.button = document.createElement("div");
    this.field = field;
    this.isHorizontal = isHorizontal;
  }
  createButton(): HTMLDivElement{
    this.button.className = "slider__button";

    this.button.style.top = "-6px";
    this.button.style.left = "0px";

    this.field.append(this.button);
    if (this.button.previousElementSibling) {
      this.button.style.left =
      this.button.previousElementSibling.offsetLeft +
      this.button.previousElementSibling.offsetWidth +
        "px";
    }

    if (!this.isHorizontal) {
      this.button.style.left = "-5px";
      this.button.style.top = "0px";
      if (this.button.previousElementSibling) {
        this.button.style.top =
        this.button.previousElementSibling.offsetTop +
        this.button.previousElementSibling.offsetHeight +
          "px";
      }
    }
    return this.button;
  }
  buttonMove(px: any): void {
    this.isHorizontal
      ? (this.button.style.left = px + "px")
      : (this.button.style.top = px + "px");
  }
}

export default ViewButton;
