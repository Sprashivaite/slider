import ViewButton from './subView/ViewButton';
import ViewContainer from './subView/ViewContainer';
import ViewField from './subView/ViewField';
import ViewFlag from './subView/ViewFlag';
import ViewHandler from './subView/ViewHandler';
import ViewProgressBar from './subView/ViewProgressBar';
import ViewScale from './subView/ViewScale';
import IViewConfig from './IViewConfig';

type IView = {
  slider: ViewContainer;
  firstButton: ViewButton;
  secondButton: ViewButton;
  field: ViewField;
  firstFlag: ViewFlag;
  secondFlag: ViewFlag;
  progressBar: ViewProgressBar;
  scale: ViewScale;
  handler: ViewHandler;
  config: IViewConfig;
};
export default IView;
