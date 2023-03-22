import { Component, createTextVNode, VNode } from "inferno";
import "KaiUI/src/components/SoftKey/SoftKey.scss";

interface IButtonProps {
  id: string;
  handleClick: (evt: any) => void;
  icon?: string;
  text: string;
}

const prefixCls = "kai-softkey";
function Button(props: IButtonProps) {
  let renderedIcon: JSX.Element;
  if (props.icon && props.icon.toString().indexOf("kai-") === -1) {
    renderedIcon = <img src={props.icon} width={20} height={20} alt="" />;
  } else {
    renderedIcon = <span className={props.icon} />;
  }
  return (
    <button
      id={props.id}
      className={`${prefixCls}-btn`}
      onClick={props.handleClick}
      data-icon={renderedIcon ? "true" : undefined}
      $HasNonKeyedChildren
    >
      {renderedIcon} {createTextVNode(props.text)}
    </button>
  );
}

interface ISoftKeyProps {
  leftCb?: () => void,
  rightCb?: () => void,
  centerCb?: () => void,
  centerText?: string,
  leftText?: string,
  rightText?: string,
  rightIcon?: string,
  centerIcon?: string,
  leftIcon?: string
}

class SoftKey extends Component<ISoftKeyProps> {
  handleKeyDown = (evt: KeyboardEvent | { key: string }) => {
    const { centerCb, rightCb, leftCb } = this.props;
    switch (evt.key) {
      case "Enter":
        if (centerCb) centerCb();
        break;
      case "SoftLeft":
        if (leftCb) leftCb();
        break;
      case "SoftRight":
        if (rightCb) rightCb();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { leftText, leftIcon, rightText, rightIcon, centerText, centerIcon } =
      this.props;
    let softKeyAttrs = [
      {
        id: "leftSoftKey",
        text: leftText,
        icon: leftIcon,
        handleClick: () => this.handleKeyDown({ key: "SoftLeft" }),
      },
      {
        id: "centerSoftKey",
        text: centerText,
        icon: centerIcon,
        handleClick: () => this.handleKeyDown({ key: "Enter" }),
      },
      {
        id: "rightSoftKey",
        text: rightText,
        icon: rightIcon,
        handleClick: () => this.handleKeyDown({ key: "SoftRight" }),
      },
    ];

    return (
      <div className={`${prefixCls} visible`} $HasNonKeyedChildren>
        {softKeyAttrs.map((attrs) => (
          <Button {...attrs} />
        ))}
      </div>
    );
  }
}

export default SoftKey;
