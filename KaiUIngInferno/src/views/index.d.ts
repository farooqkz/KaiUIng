import { VNode } from "inferno";


interface IListViewState {
  cursor: number;
}

interface IListViewProps {
  children: any;
  cursor: number;
  cursorChangeCb?: (index: number) => void;
  height?: number | string;
  captureKeys?: Array<string>;
}


type TabViewProps = {
  onChangeIndex?: (tab: number) => void;
  focusColor?: string;
  tabLabels: Array<string>;
  defaultActiveTab?: number;
  children: Array<VNode>;
};

interface ITabViewState {
  activeTab: number;
}


export {
  IListViewProps,
  IListViewState,
  TabViewProps,
  ITabViewState,
};
