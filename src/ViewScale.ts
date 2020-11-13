class ViewScale {
    div: HTMLDivElement;
    field: HTMLDivElement;
    isHorizontal: boolean;
    constructor(field: HTMLDivElement, isHorizontal: boolean){
      this.div = document.createElement("div");
      this.field = field;
      this.isHorizontal = isHorizontal;
    }
    createScale(): void{
      this.div.className = "slider__scale";
  
      this.div.style.top = "12px";
      this.div.style.left = "0px";
        if (!this.isHorizontal) {
        this.div.style.marginLeft = "12px";
        this.div.style.top = "0px";
        // this.div.style.position = "ab";
        this.div.style.height = this.field.offsetHeight + 'px';
        this.div.style.flexDirection = "column";
        this.div.style.justifyContent = "space-between";
      }
      this.field.prepend(this.div);


for(let i = 0; i < 5; i++){
    this.div.insertAdjacentHTML('beforeend','<span>0</span>')
}
  

    }
    updateValues(arrayVal: Array<number>){
      let spans = this.div.children;
      for (let i = 0; i< 5; i++) {
        spans[i].innerHTML = arrayVal[i] + '';
      }
    }
  }
  
  export default ViewScale;
  