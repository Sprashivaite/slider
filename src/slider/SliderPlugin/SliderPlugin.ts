import {
  separateViewConfig,
  separateModelConfig,
} from './utils/separateConfig';
import {
  modelConfig,
  userConfig,
  viewConfig,
  eventName,
  eventCallback,
  eventTypes
} from '../types';
import Model from '../Model/Model';
import View from '../View/View';
import Presenter from '../Presenter/Presenter';
import Observer from '../Observer/Observer';

declare global {
  interface JQuery {
    sliderPlugin: (config: userConfig) => this;
  }
}

class SliderPlugin extends Observer {
  private model!: Model;

  private view!: View;

  private presenter!: Presenter;

  constructor(config: userConfig) {
    super()
    this.initApp(config);
  }

  private initApp(config: userConfig): void {
    const modelUserConfig = separateModelConfig(config);
    const viewUserConfig = separateViewConfig(config);
    this.view = new View(viewUserConfig);
    this.model = new Model(modelUserConfig);
    this.presenter = new Presenter(this.model, this.view);
    
  }

  setValue(point: string, value: number): void {
    let result = value;
    if (result > this.model.config.max) result = this.model.config.max;
    if (result < this.model.config.min) result = this.model.config.min;
    if (point === 'firstPoint') {
      this.model.changeValue({ value: result, pointName: 'firstPoint'});
    }
    if (point === 'secondPoint') {
      this.model.changeValue({ value: result, pointName: 'secondPoint'});
    }
    this.view.notifyListeners();
  }

  setConfig(config: userConfig): void {
    const modelUserConfig = separateModelConfig(config);
    const viewUserConfig = separateViewConfig(config);
    this.model.setConfig(modelUserConfig);
    if (Object.keys(viewUserConfig).length > 0) {
      this.view.setConfig(viewUserConfig);
    }    
    this.emit(eventTypes.configChanged, { ...this.model.config, ...this.view.config })
  }

  getConfig(): viewConfig & modelConfig {
    return { ...this.model.config, ...this.view.config };
  }

  subscribe(event: eventName, listener: eventCallback): this {
    super.subscribe(event, listener)
    this.model.subscribe(event, listener);
    this.view.subscribe(event, listener);
    this.view.notifyListeners();
    return this
  }
}

(function addFunction($) {
  
  jQuery.fn.sliderPlugin = function sliderPlugin(config: userConfig) {
    return this.each(function each() {
      if (!$.data(this, 'sliderPlugin')) {
        $.data(
          this,
          'sliderPlugin',
          new SliderPlugin({ ...config, target: this })
        );
      }
    });
  };
})(jQuery);
export default SliderPlugin;
