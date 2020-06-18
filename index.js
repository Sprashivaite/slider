const slider = document.querySelector('.slider')
const field = document.querySelector('.slider__field')
const button = document.querySelector('.slider__button')
const button_2 = document.querySelector('.slider__button-2')
const value = document.querySelector('.slider__value')
const btn = document.querySelector('.toggle')


let typeValue = 'minmax';
let max = 100;
let min = 0;


button.addEventListener('mousedown', function(){ sliderMove(button)});

button_2.addEventListener('mousedown', function(){ sliderMove(button_2)});

// field.addEventListener('click', sliderMove);

function sliderMove(button){

    function moveAt(clientX) {
    let fieldLeft = field.getBoundingClientRect().left;
    let fieldRight = field.getBoundingClientRect().right;
    let shiftLeft = clientX - fieldLeft - button.offsetWidth / 2;

        if (clientX  > fieldRight - button.offsetWidth / 2) {button.style.left = fieldRight - button.offsetWidth / 2}

        else if (clientX < fieldLeft + button.offsetWidth / 2) {button.style.left = fieldLeft + button.offsetWidth / 2;}

        else {
          button.style.left = shiftLeft + 'px';
      };
    }

    function onMouseMove(event) {
        moveAt(event.clientX);
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('click', onMouseMove)
      document.onmouseup = function(){
      document.removeEventListener('mousemove', onMouseMove)
      document.onmouseup = null;
    };

    slider.ondragstart = function() {
      return false;
    };
    slider.onmousedown = function() {
      return false;
    };
    slider.oncontextmenu = function() {
      return false;
    }
}





document.addEventListener('mousemove', function(){ view( typeValue )})

function view(type){
  
  if (type == 'percent') {  value.innerHTML = Math.round(
  button.offsetLeft * 100 / (field.offsetWidth - button.offsetWidth) ) + '%'; }

  else if(type == 'minmax') {
    console.log( min + (
      button.offsetLeft * (max - min) / (field.offsetWidth - button.offsetWidth) ) );
    
    value.innerHTML = min + Math.round(
      button.offsetLeft * (max - min) / (field.offsetWidth - button.offsetWidth) );
  }
}











btn.addEventListener('click', function(){
  typeValue == 'percent' ? (typeValue = 'minmax', btn.innerHTML = 'minmax'): (typeValue = 'percent', btn.innerHTML = 'percent');
});