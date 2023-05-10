import "KaiUI/src/theme/colors.scss";
import "KaiUI/src/components/Tab/Tab.scss";

const prefixCls = "kai-tab";

interface TabProps {
  focusColor?: string;
  isActive?: boolean;
  onTabChange?: (index: number) => void;
  label: string;
  index: number;
}

function Tab({ focusColor, isActive, onTabChange, label, index }: TabProps) {
  const actPrefixCls = `${prefixCls}${isActive ? "-active" : "-inactive"}`;
  return (
    <div
      onClick={() => {
        onTabChange && onTabChange(index);
      }}
      className={actPrefixCls}
      style={{
        // @ts-ignore
        "--tab-underline-color": focusColor || "var(--color-purple)",
	// underline styles are supposed to be allowed but they are not. ignoreing this.
	// later we must report to inferno team I suppose... --Farooq
      }}
    >
      <div className={`${actPrefixCls}-label`} $HasTextChildren>
        {label}
      </div>
    </div>
  );
}

export default Tab;
