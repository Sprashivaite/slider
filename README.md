# Slider
Frontend-education-program with Webpack, Pug and Stylus, TypeScript-jQuery-Jasmine-Karma
[slider-demo-page](https://sprashivaite.github.io/slider/)
<img src="./slider_gif.gif" width="75%">
# How to use it

#### Install dependencies
```commandline
npm install
```

#### Start dev server
```commandline
npm run dev
```

http://localhost:8080/ адрес локального сервера.

#### Start test
```commandline
npm run test
```

#### Production
```commandline
npm run prod
```

# Initialization

## HTML
Используемые файлы находятся в папке plugin-files. Подключить к странице index.js и style.css.
```javascript
<link rel="stylesheet" href="/dist/style.css" />
<script src="./dist/index.js"></script>
```

## CSS
В папке style.css можно изменить стили плагина. Элементы слайдер будут подстраиваться под ширину контейнера.

## JavaScript
После подключения файлов, плагин иницилизируется на элементе при помощи  JQuery.
```javascript
$(selector).sliderPlugin();
```
По умолчанию контейнер для слайдера определяется путём поиска атрибута data-slider.
```javascript
<div data-slider></div>
```
# Basic configuration & option parameters

| Параметр          | Тип                | Значение по умолчанию | Описание                                                                                        |
|-------------------|--------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| target            | element            | поиск дата селектора  | Подключение к данному элементу                                                                  | 
| min               | number             | 0                     | Минимальное значение слайдера                                                                   |
| max               | number             | 100                   | Максимальное значение слайдера                                                                  |
| step              | number             | 1                     | Шаг                                                                                             |
| isHorizontal      | boolean            | true                  | Горизонтальный/Вертикальный                                                                     |
| isRangeSlider     | boolean            | true                  | Одиночный/Диапазон                                                                               |
| isTooltip            | boolean            | true                  | Показывает/скрывает флажок                                                                      |
| isScale           | boolean            | true                  | Показывает/скрывает шкалу                                                                       |
| scaleQuantity     | number             | 11                    | Количество делений шкалы                                                                        |

# Plugin methods
Также с помощью публичных методов можно управлять элементами слайдера. Чтобы получить доступ, нужно обратиться к .data("sliderPlugin"), далее вызывать методы.
```javascript 
let slider = $(selector).sliderPlugin().data("sliderPlugin");
```
### set value
```javascript
slider.setValue('firstPoint', number)
slider.setValue('secondPoint', number)
```
### set config
```javascript
slider.setConfig(parameters)
```
### set subscribe
```javascript
slider.subscribe('valueChanged', {value})  // Подписать на изменения значения слайдера
```
Событие 
# Architecture
Всё приложение разделено на три слоя: Model, View, Presenter.
### Model 
Model содержит в себе бизнес-логику, которая вычисляет расположение бегунков, значения слайдера. Не имеет зависимости от других слоёв.
### View
View содержит логику, связанную с отображением, а также реагирует на взаимодействие пользователя с приложением. View разделён на subView, которые зависят от главного класса. Во View создаются экземпляры классов subView, и передаёт им собственные значения через параметр метода. Таким образом логика разделена на отдельные файлы, которые зависят от состояния View.
### Presenter
Presenter зависит от Model и View. Обновления данных происходит путём подписки View и Model.

## File structure
#### `coverage`

`coverage` содержить визуальное отображение тестов.

`dist` итоговые файлы.

`src` файлы разработки.
```
slider
└─── coverage
|  |  Model.js
|  |  Model.html
|  |  ...
└─── dist
|  |  index.html
|  |  style.css
|  |  index.js
└─── src
|  └─── Model
|  |  |  Model.ts
|  |  |  IModelConfig.ts
|  └─── View
|  |  |  View.ts
|  |  └─── subView
|  |  |  | ...
|  └─── Presenter
|  |  | Presenter.ts 
|  └─── tests
|  |  | Model.test.ts
|  |  | ...
```


