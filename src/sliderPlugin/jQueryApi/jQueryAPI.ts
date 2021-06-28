import { modelConfig, viewConfig } from '../types';
import Model from '../Model/Model';
import View from '../View/View';
import Presenter from '../Presenter/Presenter';
import { DEFAULT_CONFIG } from '../defaults';

(function addFunc($) {
  class SliderPlugin {
    private model!: Model;

    private view!: View;

    private presenter!: Presenter;

    constructor(config: viewConfig & modelConfig) {
      this.initApp(config);
    }

    private initApp(config: viewConfig & modelConfig): void {
      this.model = new Model({ ...DEFAULT_CONFIG, ...config });
      this.view = new View({ ...DEFAULT_CONFIG, ...config }); 
      this.view.renderElements();
      this.view.addHandlers();
      this.presenter = new Presenter(this.model, this.view);     
    }

    setValue(point: string, value: number): void {
      let result = value;
      if (result > this.model.config.max) result = this.model.config.max;
      if (result < this.model.config.min) result = this.model.config.min;
      if (point === 'firstPoint') {
        this.model.moveToValue({
          value: result,
          ...this.view.handler.getFirstPointData(),
        });
      }
      if (point === 'secondPoint') {
        this.model.moveToValue({
          value: result,
          ...this.view.handler.getSecondPointData(),
        });
      }
      this.view.notifyListeners();
    }

    setConfig(userConfig: viewConfig & modelConfig): void {
      this.model.setConfig(userConfig)
      this.view.setConfig(userConfig)
      this.presenter = new Presenter(this.model, this.view);
    }

    getConfig(): viewConfig & modelConfig {      
      return {...this.model.config, ...this.view.config }
    }

    subscribe(eventName, listener): void {
      this.model.subscribe(eventName, listener);
      this.view.subscribe(eventName, listener);
      this.view.handler.subscribe(eventName, listener);
      this.view.notifyListeners();
    }
  }

  jQuery.fn.sliderPlugin = function sliderPlugin(
    config: viewConfig & modelConfig
  ) {
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
