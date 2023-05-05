import "KaiUI/src/components/Separator/Separator.scss";
import ISeparatorProps from "./Separator.d";

const prefixCls = "kai-separator";
const textCls = `${prefixCls}-text`;

export default function Separator({ text }: ISeparatorProps) {
  return (
    <div className={prefixCls}>
      <span className={textCls} $HasTextChildren>
        {text}
      </span>
    </div>
  );
};
