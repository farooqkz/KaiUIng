export const Home = () => (
  <div>
    <h1>KaiUIng</h1>
    <h3>A small and performant UI library for building KaiOS apps</h3>

    <h3>What is state of KaiUIng?</h3>
    <p>
      KaiUIng recently have been forked from{" "}
      <a href="https://github.com/AdrianMachado/KaiUI">
        Adrian Machado's KaiUI
      </a>
      . Currently, KaiUIng more or less is in beta state and usable. We haven't
      fully refactored the <a href="https://infernojs.org">InfernoJS</a>{" "}
      bindings, yet. But the older version on npm is usable.
    </p>

    <h3>Why not using AdrianMachado's KaiUI instead?</h3>
    <p>
      There are many issues with AdrianMachado's KaiUI which has made me fork
      and refactor it. Two most important issues are that
      <ol>
        <li>
          That KaiUI is written is ReactJS. React is really a bad choice for
          KaiOS feature phones due to its limited hardware. In general, React's
          performance is not even near good. However, its big community and
          support of big companies have made React wanted everywhere.
        </li>
        <li>
          AdrianMachado's KaiUI is not maintained anymore. For instance, the
          style of SoftKey component has changed in KaiStore. And{" "}
          <a href="https://github.com/farooqkz/KaiUIng/issues/2">
            we want to upgrade to the latest styling, too.
          </a>
        </li>
      </ol>
    </p>

    <h3>What Javascript framework should I use to use KaiUIng?</h3>
    <p>
      You can use any framework you want or no framework at all. You are welcome
      to build bindings for your favourite framework and publish it on npm.
      However, Farooq has already has made integration for{" "}
      <a href="https://infernojs.org">InfernoJS</a>.
      Find it above.
    </p>

    <h3>What is size of KaiUIng?</h3>
    <p>
      Size of the Inferno bindings has to be determined as we haven't made the
      port to Typescript complete, yet. However size of all KaiUIng stylings is
      around 70KiB <b>uncompressed</b>. Note that for KaiOS you want to measure
      the uncompressed size rather than the gzipped one because when your app
      gets on the phone, there is no compression
    </p>
  </div>
);
