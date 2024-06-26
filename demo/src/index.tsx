import { TabViewDemo } from "components/TabView";
import { Home } from "./home";
import { Component, createRef, render } from "inferno";
import { BrowserRouter, Route, Link } from "inferno-router";

//@ts-ignore
import fs from "fs";
//@ts-ignore
const TabViewDemoCode = fs.readFileSync(
  __dirname + "/components/TabView.tsx",
  "utf8"
);

import Prism from "prismjs";
Prism.manual = true

class ComponentShowcase extends Component<{
  screen: Element;
  source_code: string;
}> {
  codeRef = createRef<HTMLPreElement>();
  render() {
    const { screen, source_code } = this.props;
    return (
      <div class="component-showcase">
        <div class="component-showcase-phone">
          <div class="screen">{screen}</div>
          TODO clickable phone buttons
        </div>
        <div class="component-showcase-source-code">
          Code for this example
          <code class="language-tsx" ref={this.codeRef}>
            {source_code}
          </code>
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    if (this.codeRef.current) {
      Prism.highlightElement(
        this.codeRef.current,
        true
      );
    }
  }
}

function Components() {
  return (
    <>
      <h1>Component Showcase</h1>
      <p>
        Here you can see all Components in Action with the infernojs library.
      </p>

      <div>
        Installing it is easy:
        <code>
          <pre>npm i kaiuing-inferno</pre>
        </code>
      </div>

      <h2>TabView</h2>
      <p>
        The tab view is useful for quick navigation between multiple screens.
        User can navigate with the left and right key.
      </p>
      <ComponentShowcase
        screen={<TabViewDemo/>}
        source_code={TabViewDemoCode}
      />
      <div>
        TODO documentation about properties of component:
        <code>
          <pre>
            {`onChangeIndex?: (tab: number) => void;
            focusColor?: string;
            tabLabels: Array<string>;
            defaultActiveTab?: number;
            children: Array<VNode>;`}
          </pre>
        </code>
      </div>
    </>
  );
}

const MyWebsite = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/components">Components</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/components" component={Components} />
    </div>
  </BrowserRouter>
);

// Render HTML on the browser
render(<MyWebsite />, document.getElementById("root"));
