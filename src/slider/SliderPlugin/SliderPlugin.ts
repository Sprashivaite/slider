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
} from '../types';
import Model from '../Model/Model';
import View from '../View/View';
import Presenter from '../Presenter/Presenter';

declare global {
  interface JQuery {
    sliderPlugin: (config: userConfig) => this;
  }
}

class SliderPlugin {
  private model!: Model;

  private view!: View;

  private presenter!: Presenter;

  constructor(config: userConfig) {
    this.initApp(config);
  }

  private initApp(config: userConfig): void {
    const modelUserConfig = separateModelConfig(config);
    const viewUserConfig = separateViewConfig(config);
    this.view = new View(viewUserConfig);
    this.model = new Model(modelUserConfig);
    this.view.renderElements();
    this.view.addHandlers();
    this.presenter = new Presenter(this.model, this.view);
    
  }

  setValue(point: string, value: number): void {
    let result = value;
    if (result > this.model.config.max) result = this.model.config.max;
    if (result < this.model.config.min) result = this.model.config.min;
    if (point === 'firstPoint') {
      this.model.moveToValue({ value: result, ...this.view.getFirstPointData()});
    }
    if (point === 'secondPoint') {
      this.model.moveToValue({ value: result, ...this.view.getSecondPointData() });
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
  }

  getConfig(): viewConfig & modelConfig {
    return { ...this.model.config, ...this.view.config };
  }

  subscribe(event: eventName, listener: eventCallback): void {
    this.model.subscribe(event, listener);
    this.view.subscribe(event, listener);
    this.view.notifyListeners();
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