import { VNode } from "inferno";
import classNames from "classnames";
import "KaiUI/src/components/IconListItem/IconListItem.scss";
import morecolor from "../morecolor";

const prefixCls = "kai-il";
const lineCls = `${prefixCls}-line`;
const itemCls = prefixCls;
const primaryCls = `${prefixCls}-line`;

interface IIconListItemProps {
  isFocused?: boolean;
  disabled?: boolean;
  primary: string;
  secondary?: string;
  iconSrc?: string;
  iconWidth: number;
  onClick?: () => void;
  icon?: VNode | string;
  className?: string;
  focusClass?: string;
}

function IconListItem(props: IIconListItemProps) {
  const { isFocused, focusClass, disabled, secondary, primary, icon, iconSrc, iconWidth, onClick, className } = props;
  const focusedCls = isFocused
    ? `${prefixCls}-focused ${focusClass || ""}`
    : "";
  const iconCls = `${prefixCls}-icon-${isFocused ? "focused" : "unfocused"}`;
  const secondaryCls = `${prefixCls}-secondary ${secondary ? "" : "hidden"}`;
  const disabledCls = disabled ? `${prefixCls}-disabled` : "";
  let renderedIcon;
  if (iconSrc)
    renderedIcon = <img src={iconSrc} alt="" width={iconWidth || 50} />;
  else if (typeof icon === "string" && icon.startsWith("kai"))
    renderedIcon = <span className={icon} style={{ width: iconWidth.toString() }} />;
  // Then we assume it is a valid element TODO: check for this
  else renderedIcon = <span>{icon}</span>;

  return (
    <div
      tabIndex={disabled ? undefined : 1}
      className={classNames(itemCls, disabledCls, className, focusedCls)}
      onClick={onClick}
      ref={(div) => {
        if (div) {
          if (isFocused) div.focus();
          else div.blur();
        }
      }}
      style={{
        "background-color": isFocused ? morecolor.focusColor : "",
      }}
    >
      <div className={iconCls} $HasVNodeChildren>
        {renderedIcon}
      </div>
      <div className={lineCls}>
        <label className={secondaryCls} $HasTextChildren>
          {secondary}
        </label>
        <span className={primaryCls} $HasTextChildren>
          {primary}
        </span>
      </div>
    </div>
  );
}

export default IconListItem;
