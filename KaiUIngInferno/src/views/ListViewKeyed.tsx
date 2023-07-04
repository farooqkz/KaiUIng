import "KaiUI/src/views/ListView/ListView.scss";
import { VNode } from "inferno";
import { asArray } from "../utils";
import ListView from "./ListView";


class ListViewKeyed extends ListView {
  render() {
    const { height } = this.props;
    let children = asArray(this.props.children);
    const { cursor } = this.state;
    return (
      <div
        className={"kai-list-view"}
        style={{
          height: (height?.toString()) || "calc(100vh - 60px)",
        }}
        $HasKeyedChildren
      >
        {children.map((child: VNode, index: number) => {
          child.props.isFocused = index == cursor;
          return child;
        })}
      </div>
    );
  }
}

export default ListViewKeyed;
