import { DEFAULT_MODEL_CONFIG, DEFAULT_VIEW_CONFIG } from '../../defaults';
import { userConfig } from '../../types';

const separateViewConfig = (config: userConfig): userConfig => {
  const viewConfigKeys = Object.keys(DEFAULT_VIEW_CONFIG);
  const userConfigEntries = Object.entries(config);
  let viewConfig: userConfig = {};
  userConfigEntries.forEach(([key, value]) => {
    if (viewConfigKeys.includes(key)) viewConfig = {...viewConfig, [key]: value}
  });
  return viewConfig;
};

const separateModelConfig = (config: userConfig): userConfig => {
  const modelConfigKeys = Object.keys(DEFAULT_MODEL_CONFIG);
  const userConfigEntries = Object.entries(config);
  let modelConfig = {};
  userConfigEntries.forEach(([key, value]) => {
    if (modelConfigKeys.includes(key)) modelConfig = {...modelConfig, [key]: value}
  });
  return modelConfig;
};
export { separateViewConfig, separateModelConfig };
