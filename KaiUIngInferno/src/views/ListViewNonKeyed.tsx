import "KaiUI/src/views/ListView/ListView.scss";
import { Component, VNode } from "inferno";
import { findDOMNode } from "inferno-extras";
import { asArray } from "../utils";
import { ListViewProps, ListViewState } from "./ListViewTypes";

class ListViewNonKeyed extends Component<ListViewProps> {
  public state: ListViewState;

  handleKeyDown = (evt: KeyboardEvent) => {
    let cursor = this.state.cursor;
    const { cursorChangeCb, captureKeys } = this.props;
    let children = asArray(this.props.children);

    if (captureKeys instanceof Array && captureKeys.includes(evt.key)) {
      evt.stopImmediatePropagation();
    }
    if (evt.key === "ArrowUp") {
      cursor--;
    } else if (evt.key === "ArrowDown") {
      cursor++;
    }
    cursor += children.length;
    cursor %= children.length;
    this.setState({
      cursor: cursor,
    });
    cursorChangeCb && cursorChangeCb(cursor);
  };

  constructor(props: ListViewProps) {
    super(props);
    const { cursor, cursorChangeCb } = props;
    let children = asArray(props.children);
    if (cursor - 1 > children.length || cursor < 0) {
      console.error(
        `[ListView] cursor should be from 0 to ${
          children.length - 1
        } but is ${cursor}`
      );
      throw new Error("cursor is negative or bigger than length of list");
    }
    if (cursorChangeCb) cursorChangeCb(cursor);
    this.state = {
      cursor: cursor,
    };
  }

  componentDidUpdate() {
    const { children } = this.props;
    const { cursor } = this.state;
    let node: HTMLElement | null = findDOMNode(asArray(children)[cursor]) as HTMLElement;
    if (node) {
      node.scrollIntoView({ block: "start" });
    }
  }

  componentDidMount() {
    document.addEventListener(
      "keydown",
      this.handleKeyDown,
      Boolean(this.props.captureKeys)
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "keydown",
      this.handleKeyDown,
      Boolean(this.props.captureKeys)
    );
  }

  render() {
    const { height } = this.props;
    let children = asArray(this.props.children);
    const { cursor } = this.state;
    return (
      <div
        className={"kai-list-view"}
        style={{
          height: (height && height.toString()) || "calc(100vh - 60px)",
        }}
        $HasNonKeyedChildren
      >
        {children.map((child: VNode, index: number) => {
          child.props.isFocused = index == cursor;
          return child;
        })}
      </div>
    );
  }
}

export default ListViewNonKeyed;
