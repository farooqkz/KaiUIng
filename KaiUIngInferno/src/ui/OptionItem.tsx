interface OptionItemProps {
  text: string;
  isFocused?: boolean;
}

export default function OptionItem({ text, isFocused }: OptionItemProps) {
  return (
    <div
      tabIndex={0}
      ref={(ref: HTMLElement | null) => {
        if (ref) {
          isFocused ? ref.focus() : ref.blur();
        }
      }}
      className="kai-om-item"
      $HasTextChildren
    >
      {text}
    </div>);
}
