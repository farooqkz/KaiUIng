import "KaiUI/src/components/Header/Header.scss";
import "KaiUI/src/theme/colors.scss";

interface HeaderProps {
  text: string;
  backgroundColor?: string;
}

function Header(props: HeaderProps) {
  const { backgroundColor, text } = props;
  return (
    <header
      className="kai-header"
      style={{ background: backgroundColor || "var(--header-blue-background)" }}
    >
      <h1 className="h1" $HasTextChildren>
        {text}
      </h1>
    </header>
  );
}

export default Header;
