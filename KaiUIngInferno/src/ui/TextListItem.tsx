import "KaiUI/src/components/TextListItem/TextListItem.scss";
import morecolor from "../morecolor";
import { Component, createRef } from "inferno";
import classNames from "classnames";
import ITextListItemProps from "./TextListItem.d";

const prefixCls = "kai-tl";
const itemCls = prefixCls;
const primaryCls = `${prefixCls}-primary`;

class TextListItem extends Component<ITextListItemProps> {
  private secondaryCls: string;
  private tertiaryCls: string;
  private className: string;
  private divRef: any;

  constructor(props: ITextListItemProps) {
    const { tertiary, secondary, className } = props;
    super(props);
    this.secondaryCls = `${prefixCls}-secondary ${secondary ? "" : "hidden"}`;
    this.tertiaryCls = `${prefixCls}-tertiary ${tertiary ? "" : "hidden"}`;
    this.className = className || "";
    this.divRef = createRef();
  }

  componentDidUpdate() {
    if (this.props.isFocused && this.divRef.current)
      this.divRef.current.focus();
  }

  render() {
    const { isFocused, primary, secondary, tertiary } = this.props;
    const focusedCls = isFocused
      ? `${prefixCls}-focused ${this.props.focusClass || "defaultFocusCls"}`
      : "";
    return (
      <div
        tabIndex={0}
        className={classNames(itemCls, this.className, focusedCls)}
        ref={this.divRef}
        style={`background-color: ${
          isFocused ? morecolor.focusColor : ""
        }`}
      >
        <span
          className={classNames(primaryCls, this.className)}
          $HasTextChildren
        >
          {primary}
        </span>
        <label className={this.secondaryCls} $HasTextChildren>
          {secondary}
        </label>
        <label className={this.tertiaryCls} $HasTextChildren>
          {tertiary}
        </label>
      </div>
    );
  }
}

export default TextListItem;
