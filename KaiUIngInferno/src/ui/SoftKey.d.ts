interface ISoftKeyProps {
  leftCb?: () => void,
  rightCb?: () => void,
  centerCb?: () => void,
  centerText?: string,
  leftText?: string,
  rightText?: string,
  rightIcon?: string,
  centerIcon?: string,
  leftIcon?: string
}

interface IButtonProps {
  id: string;
  handleClick: (evt: any) => void;
  icon?: string;
  text?: string;
}

export { IButtonProps, ISoftKeyProps };
