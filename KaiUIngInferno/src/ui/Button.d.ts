interface IButtonProps {
  text: string;
  icon?: any;
  iconSrc?: string;
  iconSide?: "left" | "right";
  onClick?: () => void;
  focusColor?: string;
  type?: "button" | "submit" | "reset";
  isFocused?: boolean;
}

export default IButtonProps;
