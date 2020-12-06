# slider
TypeScript-jQuery-Jasmine-Karma
demo [GitHub](http://github.com)
# How to use it
Get started by downloading the archive which contains the plugin files. Extract and upload index.js and style.css.

## HTML
Include style.css in the head tag your HTML document.
```<link rel="stylesheet" href="/path/to/slider/dist/style.css" />```

## CSS
For  the element should have a width (or max-width) value set.

# Initialization
After files inclusion, call sliderPlugin  function on the element selector you want to add the slider
> ```$(selector).sliderPlugin();```
## Initialize via HTML
Add the class sliderPlugin to any element you want to add custom slider with default options. 
> ```<div class="slider" data-slider> </div>```
# Basic configuration & option parameters
> ```$(selector).sliderPlugin({```
>     isHorizontal: false // vertical slider
> });
> $(selector).sliderPlugin({
>     max: 1000 // max value
> });
> $(selector).sliderPlugin({
>     min: 10 // min value
> });
> $(selector).sliderPlugin({
>     step: 10 // step value
> });
> $(selector).sliderPlugin({
>     isRangeSlider: false // single slider
> });
# Plugin methods
Ways to execute various plugin actions programmatically from within your script(s).
Usage 
> ```let slider = $(selector).sliderPlugin().data("sliderPlugin");```
### change slider type
> ```slider.presenter.changeTypeSlider();```
### change orientation slider
> ```slider.presenter.changeOrientation();```
### add or remove flag
> ```slider.view.flag.addFlag()```
> ```slider.view.flag.removeFlag()```
> ```slider.view.flag_2.addFlag()```
> ```slider.view.flag_2.removeFlag();```


## Returning values
The script returns a number of values and objects related to slider that you can use in your own functions
* slider.presenter.buttonValue
* slider.presenter.buttonValue_2
* slider.model.max
* slider.model.min
* slider.model.step

