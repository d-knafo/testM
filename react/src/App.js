import React from "react";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Card from "./pages/Home/Card";

import "bootstrap/dist/css/bootstrap.min.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <ReactNotification />

      <header className="site-header sticky-top py-1">
        <nav className="container d-flex flex-column flex-md-row justify-content-between">
          <span className="py-2">TestM</span>
          <Link className="py-2 d-none d-md-inline-block" to="/home">
            Home
          </Link>
          <Link className="py-2 d-none d-md-inline-block" to="/admin">
            Admin
          </Link>
          <Link className="py-2 d-none d-md-inline-block" to="/stats">
            Stats
          </Link>

          <Card />
        </nav>
      </header>

      <main>
        <div className="container">
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
}
