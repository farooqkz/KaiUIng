import { IDropDownMenuState, IDropDownMenuProps } from "./DropDownMenu.d";
import {
  IListViewProps,
  IListViewState,
  TabViewProps,
  ITabViewState,
} from "./views/index.d";


export function toast(message: string, timeout: number, container: HTMLElement);
export function asArray(children: VNode | Array<VNode>): Array<VNode>;

export {
  IDropDownMenuProps,
  IDropDownMenuState,
  IListViewProps,
  IListViewState,
  TabViewProps,
  ITabViewState,
};
