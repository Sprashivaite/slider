import {Model} from './Model.js';
import {View} from './View.js';
import {Presenter} from './Presenter.js';


const view = new View();
view.renderElements();

const model = new Model();

const presenter = new Presenter();
presenter.makeMove();

// presenter.changeOrientation();

