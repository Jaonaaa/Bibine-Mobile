import HelpIcon from "../../../assets/icons/HelpIcon";
import "./HelperText.sass";

interface HelperTextProps {
  textHelp: string | React.ReactNode;
}

const HelperText = (props: HelperTextProps) => {
  return (
    <div className="helper_text_container">
      <div className="left">
        <div className="icon">
          <HelpIcon />
        </div>
      </div>
      <div className="right">
        <p>{props.textHelp}</p>
      </div>
    </div>
  );
};

export default HelperText;
