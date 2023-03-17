import "KaiUI/src/components/Separator/Separator.scss";

const prefixCls = "kai-separator";
const textCls = `${prefixCls}-text`;

interface ISeparatorProps {
  text: string;
}

export default function Separator({ text }: ISeparatorProps) {
  return (
    <div className={prefixCls}>
      <span className={textCls} $HasTextChildren>
        {text}
      </span>
    </div>
  );
};
