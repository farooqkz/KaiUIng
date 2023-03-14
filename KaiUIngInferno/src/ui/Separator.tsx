import "KaiUI/src/components/Separator/Separator.scss";

const prefixCls = "kai-separator";
const textCls = `${prefixCls}-text`;

export default function Separator({ text: string }) {
  return (
    <div className={prefixCls}>
      <span className={textCls} $HasTextChildren>
        {text}
      </span>
    </div>
  );
};
