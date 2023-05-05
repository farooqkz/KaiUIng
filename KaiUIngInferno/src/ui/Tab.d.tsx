interface ITabProps {
  focusColor?: string;
  isActive?: boolean;
  onTabChange?: (index: number) => void;
  label: string;
  index: number;
}

export default ITabProps;
