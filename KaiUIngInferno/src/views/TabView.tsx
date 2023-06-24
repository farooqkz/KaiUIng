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

interface TabViewState {
  activeTab: number;
};

class TabView extends Component<TabViewProps, TabViewState> {
  public focusColor: string;
  public tabs: Array<any>;
  public state: TabViewState;
  handleChangeIndex = (tabIndex: number) => {
    this.setState({ activeTab: tabIndex });
    if (this.props.onChangeIndex) this.props.onChangeIndex(tabIndex);
  };

  constructor(props: TabViewProps) {
    super(props);
    const { defaultActiveTab, focusColor, tabLabels } = props;
    this.focusColor = focusColor || morecolors.focusColor;
    this.tabs = tabLabels.map((label: string, index: number) => (
      <Tab label={label} focusColor={this.props.focusColor} key={label} index={index} />
    ));
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
