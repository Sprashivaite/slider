class ViewButton {
  createButton(field: HTMLDivElement, isHorizontal: boolean){
    let button: HTMLElement = document.createElement("div");
    button.className = "slider__button";
    
    button.style.top = "-6px";
    button.style.left = "0px";

    

    field.append(button);
    if(button.previousElementSibling){
      button.style.left = button.previousElementSibling.offsetLeft + button.previousElementSibling.offsetWidth + 'px';
    }

    if (!isHorizontal) {
      button.style.left = "-5px";
      button.style.top = "0px";
      if(button.previousElementSibling){
        button.style.top = button.previousElementSibling.offsetTop + button.previousElementSibling.offsetHeight + 'px';
      }
    }
    return button;
  }
}

export { ViewButton };
