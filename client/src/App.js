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
import Navbar from "./components/Navbar";
import Trending from "./views/Trending";

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
        <Navbar />
        <div>
          {/* <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">regis</Link>
            </li>
          </ul> */}

          <Switch>
            <Route exact path="/">
              <Discovery />
            </Route>
            <Route path="/edit">
              <EditProfile />
            </Route>
            <Route path="/trending">
              <Trending />
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
