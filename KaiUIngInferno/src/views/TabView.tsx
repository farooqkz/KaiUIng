import { Component, VNode } from "inferno";
import Tabs from "../ui/Tabs";
import Tab from "../ui/Tab";
import "KaiUI/src/views/TabView/TabView.scss";
import morecolors from "../morecolor";

const prefixCls = "kai-tab-view";
const tabViewTabs = `${prefixCls}-tabs`;
const tabViewContent = `${prefixCls}-content`;

type TabViewProps = {
  onChangeIndex?: (tab: number) => void;
  focusColor?: string;
  tabLabels: Array<string>;
  defaultActiveTab?: number;
  children: Array<VNode>;
};

interface ITabViewState {
  activeTab: number;
};

class TabView extends Component<TabViewProps> {
  public focusColor: string;
  public tabs: Array<VNode>;
  public state: ITabViewState;

  handleChangeIndex = (tabIndex: number) => {
    this.setState({ activeTab: tabIndex });
    if (this.props.onChangeIndex) this.props.onChangeIndex(tabIndex);
  };

  constructor(props: TabViewProps) {
    super(props);
    const { defaultActiveTab, focusColor } = props;
    this.focusColor = focusColor || morecolors.defaultFocusColor;
    this.tabs = this.props.tabLabels.map((label) => (
      <Tab label={label} focusColor={this.props.focusColor} key={label} />
    ));
    //this.state = window.stateStores.get("TabView") || { activeTab: 0 };
    this.state = {
      activeTab: defaultActiveTab || 0,
    };
    this.tabs[this.state.activeTab].props.isActive = true;
  }

  componentWillUnmount() {
    //window.stateStores.set("TabView", this.state);
  }

  render() {
    return (
      <div className={prefixCls}>
        <div className={tabViewTabs}>
          <Tabs
            defaultActiveChild={this.state.activeTab}
            onChangeIndex={this.handleChangeIndex}
            $HasKeyedChildren
          >
            {this.tabs}
          </Tabs>
        </div>
        <div className={tabViewContent} $HasVNodeChildren>
          {
            this.props.children
              .map(
                (content: VNode, index: number) =>
                  index === this.state.activeTab ? content : null,
                this
              )
              .filter((content: VNode | null) => Boolean(content))[0]
          }
        </div>
      </div>
    );
  }
}

export default TabView;
