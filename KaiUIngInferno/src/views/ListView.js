import "KaiUI/src/views/ListView/ListView.scss";
import { Component } from "inferno";
import { findDOMNode } from "inferno-extras";

function asArray(children) {
  if (children instanceof Array) {
    return children;
  } else {
    return [children];
  }
}

class ListView extends Component {
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
    return (
      <div
        className={"kai-list-view"}
        style={{
          height: height || "calc(100vh - 60px)",
        }}
      >
        {children}
      </div>
    );
  }
}

export default ListView;
