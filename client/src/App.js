// import Login from "./views/Login";
import React from "react";
import Detail from "./views/Detail";
import { Profile } from "./views/Profile";

import { Button } from "react-bootstrap";
import Discovery from "./views/Discovery";
import EditProfile from "./views/EditProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  // const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="App">
      {/* <Login /> */}

      {/*<Register /> */}

      {/* <Profile /> */}

      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <Detail show={modalShow} onHide={() => setModalShow(false)} /> */}

      {/* <Discovery /> */}

      {/* <EditProfile /> */}

      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/edit">Edit profile</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">regis</Link>
            </li>
            <li>
              <Link to="/profile">profile</Link>
            </li>
          </ul>

          <hr />

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/">
              <Discovery />
            </Route>
            <Route path="/edit">
              <EditProfile />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
