class Viewfield{
    div: HTMLDivElement;
    isHorizontal: boolean;
    slider: HTMLDivElement;
    constructor(slider: HTMLDivElement, isHorizontal: boolean){
        this.isHorizontal = isHorizontal;
        this.slider = slider;
        this.div = document.createElement("div");
        this.div.className = "slider__field";
        this.slider.append(this.div);
    
        if (this.isHorizontal) {
          this.div.style.width = "auto";
          this.div.style.height = "6px";
        }
        if (!this.isHorizontal) {
          this.div.style.width = "6px";
          this.div.style.height = "100%";
        }
    }

}
export default Viewfield