import "KaiUI/src/components/Separator/Separator.scss";

const prefixCls = "kai-separator";
const textCls = `${prefixCls}-text`;

interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className={prefixCls}>
      <span className={textCls} $HasTextChildren>
        {text}
      </span>
    </div>
  );
};
