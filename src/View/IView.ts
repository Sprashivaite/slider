import ViewButton from "./subView/ViewButton";
import ViewContainer from "./subView/ViewContainer";
import ViewField from "./subView/ViewField";
import ViewFlag from "./subView/ViewFlag";
import ViewHandler from "./subView/ViewHandler";
import ViewProgressBar from "./subView/ViewProgressBar";
import ViewScale from "./subView/ViewScale";

interface IView {
  slider: ViewContainer;
  button: ViewButton;
  button_2: ViewButton;
  isHorizontal: boolean;
  isRangeSlider: boolean;
  field: ViewField;
  flag: ViewFlag;
  flag_2: ViewFlag;
  progressBar: ViewProgressBar;
  scale: ViewScale;
  handler: ViewHandler;
  isFlag: boolean;
  isScale: boolean;
  scaleQuantity: number;
  isProgressBar: boolean;
}
export default IView 