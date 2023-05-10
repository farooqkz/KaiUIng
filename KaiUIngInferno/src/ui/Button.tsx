import "KaiUI/src/components/Button/Button.scss";
import "KaiUI/src/theme/colors.scss";

interface ButtonProps {
  text: string;
  icon?: any;
  iconSrc?: string;
  iconSide?: "left" | "right";
  onClick?: () => void;
  focusColor?: string;
  type?: "button" | "submit" | "reset";
  isFocused?: boolean;
}

const buttonCls = "kai-button";
const inputCls = `${buttonCls}-input`;
const lineClsPrefix = `${buttonCls}-line`;
const textCls = `${buttonCls}-text`;
const iconClsPrefix = `${buttonCls}-icon-`;

export default function Button({ text, isFocused, onClick, icon, iconSrc, iconSide, focusColor, type }: ButtonProps) {
  let lineCls = lineClsPrefix + " ";
  if (iconSide === "right") {
     lineCls += "left";
  } else if (iconSide === "left") {
    lineCls += "right";
  }
  let renderedIcon = !!iconSrc ? <img src={iconSrc} alt="" /> : <span className={icon} />;
  let iconCls = iconClsPrefix + (isFocused? "focused" : "unfocused");
  let iconComp = (
    <div className={iconCls} $HasVNodeChildren>
      {renderedIcon}
    </div>
  );

  return (
    <div className={buttonCls}>
      <button
        tabIndex={0}
        className={inputCls}
        style={{ "background-color": isFocused ? (focusColor || "var(--color-purple)") : "var(--color-gs20)" }}
        type={type}
        onClick={onClick}
      >
        {iconSide === "left" ? iconComp : null}
        <div className={lineCls}>
          <span className={textCls} $HasTextChildren>{text}</span>
        </div>
        {iconSide === "right"? iconComp : null}
      </button>
    </div>
  );
};
