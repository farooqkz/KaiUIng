import { Component } from "inferno";
import { findDOMNode } from "inferno-extras";
import "KaiUI/src/components/Tabs/Tabs.scss";
import { asArray } from "../utils";

const prefixCls = "kai-tabs";

interface ITabsProps {
  onChangeIndex?: (cursor: number) => void;
  defaultActiveChild?: number;
  children: any;
}

class Tabs extends Component<ITabsProps> {
  state: {
    activeChild: number;
  }

  handleKeyDown = (evt: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight"].includes(evt.key)) return;
    const { onChangeIndex } = this.props;
    let children = asArray(this.props.children);
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
    let child: HTMLElement | null = findDOMNode(children[index]) as HTMLElement;
    child && child.scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "center",
    });
    this.setState({ activeChild: index });
    onChangeIndex && onChangeIndex(index);
  };

  constructor(props: ITabsProps) {
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
