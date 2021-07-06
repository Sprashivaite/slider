import { DEFAULT_MODEL_CONFIG, DEFAULT_VIEW_CONFIG } from '../../defaults';
import { UserConfig } from '../../types';

const separateViewConfig = (config: UserConfig): UserConfig => {
  const viewConfigKeys = Object.keys(DEFAULT_VIEW_CONFIG);
  const userConfigEntries = Object.entries(config);
  let viewConfig: UserConfig = {};
  userConfigEntries.forEach(([key, value]) => {
    if (viewConfigKeys.includes(key)) viewConfig = {...viewConfig, [key]: value}
  });
  return viewConfig;
};

const separateModelConfig = (config: UserConfig): UserConfig => {
  const modelConfigKeys = Object.keys(DEFAULT_MODEL_CONFIG);
  const userConfigEntries = Object.entries(config);
  let modelConfig = {};
  userConfigEntries.forEach(([key, value]) => {
    if (modelConfigKeys.includes(key)) modelConfig = {...modelConfig, [key]: value}
  });
  return modelConfig;
};
export { separateViewConfig, separateModelConfig };
