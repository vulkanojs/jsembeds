import "idempotent-babel-polyfill";

import $SDK from "jquery";
import uuid from "uuid/v4";

// import facebook from './libraries/facebook';
import tracking from "./libraries/tracking";
import url from "./libraries/url";
import components from "./components/index";

const currentSession = window.sessionStorage.getItem("sdk-session-id");
if (!currentSession) {
  window.sessionStorage.setItem("sdk-session-id", uuid());
}

// Setting the sessionStorage
const currentSource = window.sessionStorage.getItem("sdk-utm-source");

if (!currentSource || currentSource === "null") {
  window.sessionStorage.setItem("sdk-utm-source", url("utm_source"));
  window.sessionStorage.setItem("sdk-utm-campaign", url("utm_campaign"));
  window.sessionStorage.setItem("sdk-utm-medium", url("utm_medium"));
  window.sessionStorage.setItem("sdk-utm-term", url("utm_term"));
  window.sessionStorage.setItem("sdk-utm-content", url("utm_content"));
}

// Public components
window.SDK = {
  myComponent(props) {
    components.myComponent.init(props);
  }
};

// Load compoments via public function
if (typeof window.onSDKLoad === "function") {
  window.onSDKLoad();
}

// Load componets via html tag
// you can add your custom tags to read every component
const eCardEmbed = $SDK('[data-embed="component"]');
if (eCardEmbed.length) {
  $SDK(eCardEmbed).each(function onEachComponentEmbedFunction() {
    window.SDK.myComponent({
      el: $SDK(this),
      attrs: $SDK(this).data()
    });
  });
}

// Start facebook
// facebook.init();

// Send tracking
// Detect if Google Analytics is not installed.
if (typeof window.ga !== "function") {
  // Snipper.
  /* eslint-disable */
  (function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    "script",
    "//www.google-analytics.com/analytics.js",
    "ga"
  );
  /* eslint-enable */
}

setTimeout(() => {
  window.ga("create", "UA-59142255-11", "auto", "SDK");
  window.ga("SDK.send", "pageview");
}, 100);

tracking({ category: "page", event: "load", value: "page" });

// Import styles
const currentDomain = window.location.href;

if (currentDomain.indexOf("localhost") !== -1) {
  // Local Environment
  $SDK("head").append(
    '<link id="sdk-style" rel="stylesheet" href="/css/sdk.css">'
  );
} else if (currentDomain.indexOf("herokuapp") !== -1) {
  // Staging Environment
  $SDK("head").append(
    '<link id="sdk-style" rel="stylesheet" href="/css/sdk.css">'
  );
} else {
  $SDK("head").append(
    '<link id="sdk-style" rel="stylesheet" href="/css/sdk.css">'
  );
}
