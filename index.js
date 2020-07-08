const slider = document.querySelector('.slider')
const field = document.querySelector('.slider__field')
const button = document.querySelector('.slider__button')
const value = document.querySelector('.slider__value')
const btn = document.querySelector('.toggle')

let typeValue = 'minmax';
let max = 100;
let min = 0;
let prevVal = min;
let step = 1;
let stepPX = (field.offsetWidth - button.offsetWidth) * step / (max - min);

function onMouseMove() {

  let shiftLeft = event.clientX - field.getBoundingClientRect().left - button.offsetWidth / 2;

  if (shiftLeft + stepPX / 2 > field.offsetWidth - button.offsetWidth) {
    button.style.left = field.offsetWidth - button.offsetWidth + 'px';
    prevVal =  field.offsetWidth - button.offsetWidth;
  }
  else if (shiftLeft - stepPX / 2 < 0) {
    button.style.left = 0;
    prevVal = 0;
  } 
  else {
    console.log(prevVal);
    if (step === 1) {button.style.left = shiftLeft + 'px'}
    else {
    if( (shiftLeft) - prevVal > stepPX/2 ) {
      button.style.left = stepPX  + prevVal + 'px';
      prevVal = stepPX  + prevVal
    }
    else if( (shiftLeft) < prevVal - stepPX/2) {
      button.style.left = prevVal - stepPX + 'px';
      prevVal = prevVal - stepPX;
    }
  }
  };
}

function sliderMove() {
  onMouseMove(event);
  document.addEventListener('mousemove', onMouseMove)
  
  document.onmouseup = function(){
  document.removeEventListener('mousemove', onMouseMove)
  document.onmouseup = null;
  };
  field.addEventListener('click', onMouseMove)
};

field.addEventListener('mousedown', function() {sliderMove(button)} );

function view(type) {
  if (type == 'percent') {  
    value.innerHTML = Math.trunc( button.offsetLeft * 100 / (field.offsetWidth - button.offsetWidth) ) + '%'; 
  }
  else if(type == 'minmax') {
    let result = ( min + Math.trunc(button.offsetLeft * (max - min) / (field.offsetWidth - button.offsetWidth) ) );
    value.innerHTML = result;
  }
  
}

document.addEventListener('mousemove', function(){
  view( typeValue )
})
document.addEventListener('click', function(){
  view( typeValue )
})






slider.onmousedown = function() {
  return false;
};
slider.oncontextmenu = function() {
  return false;
}

btn.addEventListener('click', function(){
  typeValue == 'percent' ? (typeValue = 'minmax', btn.innerHTML = 'minmax'): (typeValue = 'percent', btn.innerHTML = 'percent');
});

