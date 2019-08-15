import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { TableGeneric, FormGeneric, Home, Login } from "./screen";
import * as serviceWorker from "./serviceWorker";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/table" component={TableGeneric} />
      <Route path="/form" component={FormGeneric} />
    </Route>
    <Route path="/login" component={Login} />
  </Router>,
  document.getElementById("root")
);
serviceWorker.unregister();
