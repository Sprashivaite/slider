import { separateViewConfig, separateModelConfig } from './utils/separateConfig';
import {
  ModelConfig,
  UserConfig,
  ViewConfig,
  EventName,
  EventCallback,
  EventTypes,
  PointData,
} from '../types';
import Model from '../Model/Model';
import View from '../View/View';
import Presenter from '../Presenter/Presenter';
import Observer from '../Observer/Observer';

declare global {
  interface JQuery {
    sliderPlugin: (config: UserConfig) => this;
  }
}

class SliderPlugin extends Observer<UserConfig | PointData> {
  private model: Model;

  private view: View;

  private presenter: Presenter;

  constructor(config: UserConfig) {
    super();
    this.model = new Model();
    this.view = new View();
    this.presenter = new Presenter(this.model, this.view);
    this.updateConfig(config);
  }

  setValue(point: string, value: number): void {
    const result = Number(value);
    if (!Number.isFinite(value)) return;
    if (point === 'firstPoint') {
      this.model.changeValue({ value: result, pointName: 'firstPoint', pointOffset: 0 });
    }
    if (point === 'secondPoint') {
      this.model.changeValue({ value: result, pointName: 'secondPoint', pointOffset: 0 });
    }
  }

  updateConfig(config: UserConfig): void {
    const modelUserConfig = separateModelConfig(config);
    const viewUserConfig = separateViewConfig(config);
    if (Object.keys(viewUserConfig).length > 0) {
      this.view.updateConfig(viewUserConfig);
    }
    this.model.updateConfig(modelUserConfig);
    this.emit(EventTypes.configChanged, {
      ...this.model.getConfig(),
      ...this.view.getConfig(),
    });
  }

  getPointValue(point?: string): number {
    if (point === 'firstPoint') return this.model.getConfig().firstValue;
    if (point === 'secondPoint') return this.model.getConfig().secondValue;
    return this.model.getConfig().firstValue;
  }

  getConfig(): ViewConfig & ModelConfig {
    return { ...this.model.getConfig(), ...this.view.getConfig() };
  }

  subscribe(
    event: EventName,
    listener: EventCallback<PointData | UserConfig, void>,
  ): this {
    super.subscribe(event, listener);
    this.model.subscribe(event, listener);
    this.view.subscribe(event, listener);
    return this;
  }
}

(function addFunction($) {
  jQuery.fn.sliderPlugin = function sliderPlugin(config: UserConfig) {
    return this.each(function each() {
      if (!$.data(this, 'sliderPlugin')) {
        if (this instanceof HTMLDivElement)
          $.data(this, 'sliderPlugin', new SliderPlugin({ ...config, target: this }));
      }
    });
  };
})(jQuery);
export default SliderPlugin;
