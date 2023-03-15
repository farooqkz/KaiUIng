import "KaiUI/src/theme/colors.scss";
import "KaiUI/src/components/Tab/Tab.scss";

const prefixCls = "kai-tab";

interface ITabProps {
  focusColor?: string;
  isActive?: Boolean;
  onTabChange?: (index: number) => void;
  label: string;
  index: string;
}

function Tab(props: ITabProps) {
  const actPrefixCls = `${prefixCls}${isActive ? "-active" : "-inactive"}`;
  const { focusColor, isActive, onTabChange, label, index } = props;
  return (
    <div
      onClick={() => {
        onTabChange && onTabChange(index);
      }}
      className={actPrefixCls}
      style={{
        "--tab-underline-color": focusColor || "var(--color-purple)",
      }}
    >
      <div className={`${actPrefixCls}-label`} $HasTextChildren>
        {label}
      </div>
    </div>
  );
}

export default Tab;
