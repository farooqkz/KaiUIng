import { Component } from "inferno";
import { TabView } from "kaiuing-inferno";

export class TabViewDemo extends Component {
  onTabChange(new_index) {
    console.log(new_index);
  }

  defaultTab = 0;

  tabs = ["One", "Two", "Three"];

  render() {
    return (
      <TabView
        tabLabels={this.tabs}
        onChangeIndex={this.onTabChange}
        defaultActiveTab={this.defaultTab}
      >
        <div>Screen 1</div>
        <div>Screen 2</div>
        <div>Screen 3</div>
      </TabView>
    );
  }
}
