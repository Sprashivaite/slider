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
      this.model = new Model({ ...DEFAULT_CONFIG, ...config });
      this.view = new View({ ...DEFAULT_CONFIG, ...config });
      this.presenter = new Presenter(this.model, this.view);
      this.initApp();
    }

    initApp(): void {
      this.view.renderElements();
      this.view.addHandlers();
      this.presenter.subscribeListeners();
    }

    setValue(handle: string, value: number): void {
      let result = value;
      if (result > this.model.config.max) result = this.model.config.max;
      if (result < this.model.config.min) result = this.model.config.min;
      if (handle === 'firstHandle') {
        this.model.moveToValue({
          value: result,
          ...this.view.handler.getFirstHandleData(),
        });
      }
      if (handle === 'secondHandle') {
        this.model.moveToValue({
          value: result,
          ...this.view.handler.getSecondHandleData(),
        });
      }
      this.view.updateModel();
    }

    setConfig(userConfig: viewConfig & modelConfig): void {
      this.model.setConfig(userConfig)
      this.view.setConfig(userConfig)
      this.presenter.subscribeListeners();
    }

    getConfig(): viewConfig & modelConfig {      
      return {...this.model.getConfig(), ...this.view.getConfig() }
    }

    subscribe(eventName, listener): void {
      this.model.subscribe(eventName, listener);
      this.view.subscribe(eventName, listener);
      this.view.handler.subscribe(eventName, listener);
      this.view.updateModel();
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
