class ViewContainer {
    slider!: HTMLDivElement;

  constructor(slider?: HTMLDivElement) {
      this.slider = slider;
      if(!slider){this.createContainer()}

  }
  createContainer() {
    if(document.querySelector('.slider')){return this.slider = document.querySelector('.slider')}
    if(document.querySelector('[data-slider]')){return this.slider = document.querySelector('[data-slider]')}
    let sliderDiv = document.createElement("div");
    sliderDiv.classList.add("slider");
    document.body.append(sliderDiv);
    this.slider = sliderDiv;
  }
}
export default ViewContainer;
