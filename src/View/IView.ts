import ViewButton from './subView/ViewButton';
import ViewContainer from './subView/ViewContainer';
import ViewField from './subView/ViewField';
import ViewTooltip from './subView/ViewTooltip';
import ViewHandler from './subView/ViewHandler';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import { viewConfig } from '../types';

interface IView {
  slider: ViewContainer;
  firstButton: ViewButton;
  secondButton: ViewButton;
  field: ViewField;
  firstTooltip: ViewTooltip;
  secondTooltip: ViewTooltip;
  progressBar: ViewProgressBar;
  scale: ViewScale;
  handler: ViewHandler;
  config: viewConfig;
}
export default IView;
