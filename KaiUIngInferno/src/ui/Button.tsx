import { RefObject, linkEvent, Component, createRef } from "inferno";
import "KaiUI/src/components/Button/Button.scss";
import "KaiUI/src/theme/colors.scss";

interface ButtonProps {
  text: string;
  icon?: any;
  iconSrc?: string;
  iconSide?: "left" | "right";
  onClick?: () => void;
  focusColor?: string;
  type?: "button" | "submit" | "reset";
  isFocused?: boolean;
}

const buttonCls = "kai-button";
const inputCls = `${buttonCls}-input`;
const lineClsPrefix = `${buttonCls}-line`;
const textCls = `${buttonCls}-text`;
const iconClsPrefix = `${buttonCls}-icon-`;

function handleKeyDown(props: ButtonProps, evt: KeyboardEvent) {
  if (evt.key === "Enter" && props.isFocused && props.onClick) {
    props.onClick();
  }
}


export default class Button extends Component<ButtonProps, {}> {
  public state: null = null;
  private divRef: RefObject<HTMLDivElement>;
  
  constructor(props: any) {
    super(props);
    this.divRef = createRef();
  }
  
  componentDidUpdate(_prevProps: ButtonProps, newProps: ButtonProps) {
    if (this.divRef.current) {
      if (newProps.isFocused) 
        this.divRef.current.focus();
      else
        this.divRef.current.blur();
    }
  }

  render() {
    const { text, isFocused, onClick, icon, iconSrc, iconSide, focusColor, type } = this.props;
    let lineCls = lineClsPrefix + " ";
    if (iconSide === "right") {
       lineCls += "left";
    } else if (iconSide === "left") {
      lineCls += "right";
    }
    let renderedIcon = !!iconSrc ? <img src={iconSrc} alt="" /> : <span className={icon} />;
    let iconCls = iconClsPrefix + (isFocused? "focused" : "unfocused");
    let iconComp = (
      <div className={iconCls} $HasVNodeChildren>
        {renderedIcon}
      </div>
    );

    return (
      <div onKeyDown={ linkEvent(this.props, handleKeyDown) } className={buttonCls} tabIndex={0} ref={this.divRef}>
        <button
          tabIndex={0}
          className={inputCls}
          style={{ "background-color": isFocused ? (focusColor || "var(--color-purple)") : "var(--color-gs20)" }}
          type={type}
          onClick={onClick}
        >
          {iconSide === "left" ? iconComp : null}
          <div className={lineCls}>
            <span className={textCls} $HasTextChildren>{text}</span>
          </div>
          {iconSide === "right"? iconComp : null}
        </button>
      </div>
    );
  }
}
