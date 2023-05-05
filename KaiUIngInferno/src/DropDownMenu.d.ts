interface IDropDownMenuState {
  cursor: number;
}

interface IDropDownMenuProps {
  title: string;
  selectCb: (label: string) => void;
  labels: Array<string>;
  children: any;
}

export { IDropDownMenuProps, IDropDownMenuState };
