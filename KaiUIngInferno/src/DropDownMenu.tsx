import ListView from "./views/ListView";
import Header from "./ui/Header";
import SoftKey from "./ui/SoftKey";
import { Component } from "inferno";
import { asArray } from "./utils";
import {
  IDropDownMenuProps,
  IDropDownMenuState,
} from "./DropDownMenu.d";


class DropDownMenu extends Component<IDropDownMenuProps> {
  public state: IDropDownMenuState;
  constructor(props: IDropDownMenuProps) {
    super(props);
    this.state = {
      cursor: 0,
    };
  }

  render() {
    const { title, selectCb, labels } = this.props;
    const cursor = this.state.cursor;
    let children = asArray(this.props.children);
    const listViewHeight: number =
      children.length * 6 + 3;
    const divLength: number = listViewHeight + 6;
    return (
      <div
        style={{
          "min-height": `calc(100vh - ${divLength}rem - 1.6rem)`,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: "auto",
          "z-index": 9999,
          width: "100%",
        }}
      >
        <Header text={title} />
        <ListView
          cursorChangeCb={(cur: number) => this.setState((state: IDropDownMenuState) => {
            state.cursor = cur;
            return;
          })}
          cursor={cursor}
          height={listViewHeight.toString() + "rem"}
          captureKeys={[
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "SoftLeft",
            "SoftRight",
            "Call",
          ]}
          $HasNonKeyedChildren
        >
          {children}
        </ListView>
        <SoftKey
          centerText="Select"
          centerCb={() => selectCb(labels[cursor])}
        />
      </div>
    );
  }
}

export default DropDownMenu;
