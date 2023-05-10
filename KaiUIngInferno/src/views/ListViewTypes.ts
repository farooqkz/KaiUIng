interface ListViewState {
  cursor: number;
}

interface ListViewProps {
  children: any;
  cursor: number;
  cursorChangeCb?: (index: number) => void;
  height?: number | string;
  captureKeys?: Array<string>;
}

export { ListViewProps, ListViewState };
