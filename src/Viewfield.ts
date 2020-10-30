class Viewfield{
    field: HTMLDivElement;
    isHorizontal: boolean;
    slider: HTMLDivElement;
    constructor(slider: HTMLDivElement, isHorizontal: boolean){
        this.isHorizontal = isHorizontal;
        this.slider = slider;
        this.field = document.createElement("div");
        this.field.className = "slider__field";
        this.slider.append(this.field);
    
        if (this.isHorizontal) {
          this.field.style.width = "auto";
          this.field.style.height = "6px";
        }
        if (!this.isHorizontal) {
          this.field.style.width = "6px";
          this.field.style.height = "100%";
        }
    }
}
export default Viewfield