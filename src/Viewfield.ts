class ViewField{
    div: HTMLDivElement;
    isHorizontal: boolean;
    slider: HTMLDivElement;
    constructor(slider: HTMLDivElement, isHorizontal: boolean){
        this.isHorizontal = isHorizontal;
        this.slider = slider;
        this.div = document.createElement("div");
        if (this.isHorizontal) this.div.className = "slider__field_horizontal";
        if (!this.isHorizontal) this.div.className = "slider__field_vertical";
        this.slider.append(this.div);
    }

}
export default ViewField