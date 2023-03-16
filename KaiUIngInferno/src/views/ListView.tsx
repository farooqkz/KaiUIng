import "KaiUI/src/views/ListView/ListView.scss";
import { Component, VNode } from "inferno";
import { findDOMNode } from "inferno-extras";

interface IListViewState {
  cursor: number;
}

interface IListViewProps {
  childern: Array<any>;
  cursor: number;
  cursorChangeCb?: (number) => void;
  height?: number;
  captureKeys?: Array<string>;
}

function asArray(children: Array | Element | VNode) : Array<VNode | Element> {
  if (children instanceof Array) {
    return children;
  } else {
    return [children];
  }
}

class ListView extends Component<IListViewProps> {
  public state: IListViewState;
  public handleKeyDown: (evt: KeyboardEvent) => void;

  handleKeyDown = (evt) => {
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
    findDOMNode(children[cursor]).scrollIntoView();
    this.setState({
      cursor: cursor,
    });
    cursorChangeCb && cursorChangeCb(cursor);
  };

  constructor(props) {
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
    const { cursor, children } = this.props;
    findDOMNode(asArray(children)[cursor]).scrollIntoView();
  }

  componentDidMount() {
    document.addEventListener(
      "keydown",
      this.handleKeyDown,
      Boolean(this.props.capture)
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "keydown",
      this.handleKeyDown,
      Boolean(this.props.capture)
    );
  }

  render() {
    const { height, children } = this.props;
    const { cursor } = this.state;
    return (
      <div
        className={"kai-list-view"}
        style={{
          height: height || "calc(100vh - 60px)",
        }}
      >
        {children.map((child: VNode, index: number) => {
          child.props.isFocused = index == cursor;
          return child;
        }}
      </div>
    );
  }
}

export default ListView;
