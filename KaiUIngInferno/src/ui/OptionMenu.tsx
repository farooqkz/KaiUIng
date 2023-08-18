import { Component } from "inferno";
import TextInput from "./TextInput";
import "KaiUI/src/components/OptionMenu/OptionMenu.scss";
import { asArray } from "../utils";

interface OptionMenuProps {
  header: string;
  children: any;
  onChangeIndex?: (index: number) => void;
  isActive: boolean;
  onExit: () => void;
  enableSearch?: boolean;
}

interface OptionMenuState {
  selectedItem: number;
  searchTerm: string;
}

export default class OptionMenu extends Component<OptionMenuProps, OptionMenuState> {
  public state: OptionMenuState;

  handleKeyDown = (evt: KeyboardEvent) => {
    if (!this.props.isActive) {
      return;
    }
    const childrenArray: any[] = asArray(this.props.children);
    const childrenLength = childrenArray.length;
    evt.stopPropagation();
    let index = this.state.selectedItem;
    switch (evt.key) {
      case "Backspace":
        index !== 0 && this.props.onExit();
        break;
      case "ArrowDown":
        index--;
        break;
      case "ArrowUp":
        index++;
        break;
      default:
        break;
    }
    index = (index + childrenLength) % childrenLength;
    this.setState({ selectedItem: index });
  }

  constructor(props: any) {
    super(props);
    this.state = {
      selectedItem: 0,
      searchTerm: ""
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  
  componentDidUpdate(lastProps: OptionMenuProps, lastState: OptionMenuState) {
    lastProps.onChangeIndex && lastProps.onChangeIndex(lastState.selectedItem);
  }

  render() {
    const { searchTerm, selectedItem } = this.state;
    let childrenToRender = this.props.children;
    if (this.props.enableSearch) {
      childrenToRender.unshift(
        <TextInput
          id="optMenuSearch"
          defaultValue={searchTerm}
          placeholder="Search"
          onChange={(text: string) => this.setState({ searchTerm: text })}
          label=""
          fieldType="text"
        />
      );
    }
    
    childrenToRender = childrenToRender.filter((child: any) => {
      if (child.props.fieldType === "text") {
        return true;
      }
      if (child.props.text && child.props.text.indexOf(searchTerm) >= 0) {
        return true;
      }
      return false;
    });

    childrenToRender[selectedItem].props.isFocused = true;

    return (
      <div className="kai-om">
        <header $HasTextChildren>{this.props.header}</header>
        <nav $HasKeyedChildren>
          {childrenToRender}
        </nav>
      </div>
    );
  }
};
