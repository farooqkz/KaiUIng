import { Component, VNode } from "inferno";
import { findDOMNode } from "inferno-extras";
import "KaiUI/src/components/Tabs/Tabs.scss";

const prefixCls = "kai-tabs";

interface ITabsProps {
  onChangeIndex?: (cursor: number) => void;
  defaultActiveChild?: number;
}

class Tabs extends Component<ITabsProps> {
  state: {
    activeChild: number;
  }

  handleKeyDown = (evt: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight"].includes(evt.key)) return;
    const { onChangeIndex } = this.props;
    let children = (typeof this.props.childern) === "array" ? this.props.children : [this.props.childern];
    let index = this.state.activeChild;
    children[index].props.isActive = false;
    switch (evt.key) {
      case "ArrowLeft":
        index--;
        index += children.length;
        break;
      case "ArrowRight":
        index++;
        break;
      default:
        break;
    }
    index %= children.length;
    children[index].props.isActive = true;
    findDOMNode(children[index]).scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "center",
    });
    this.setState({ activeChild: index });
    onChangeIndex && onChangeIndex(index);
  };

  constructor(props) {
    super(props);
    const { defaultActiveChild } = props;
    this.state = { activeChild: defaultActiveChild || 0 };
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  render() {
    return <div className={prefixCls}>{this.props.children}</div>;
  }
}

export default Tabs;
