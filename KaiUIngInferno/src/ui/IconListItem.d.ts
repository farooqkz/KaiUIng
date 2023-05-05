import { VNode } from "inferno";


interface IIconListItemProps {
  isFocused?: boolean;
  disabled?: boolean;
  primary: string;
  secondary?: string;
  iconSrc?: string;
  iconWidth: number;
  onClick?: () => void;
  icon?: VNode | string;
  className?: string;
  focusClass?: string;
}

export default IIconListItemProps;
