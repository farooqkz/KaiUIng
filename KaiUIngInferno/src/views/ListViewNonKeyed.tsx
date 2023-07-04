import "KaiUI/src/views/ListView/ListView.scss";
import { VNode } from "inferno";
import { asArray } from "../utils";
import ListView from "./ListView";

class ListViewNonKeyed extends ListView {
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
