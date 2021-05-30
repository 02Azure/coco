// import Login from "./views/Login";
import React from "react";
import { Profile } from "./views/Profile";

import Discovery from "./views/Discovery";
import EditProfile from "./views/EditProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import ShowCase from "./views/showCase";
import ChatPage from "./views/Chat.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Trending from "./views/Trending";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Discovery />
        </Route>
        <Route path="/edit/:id">
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
        <Route path="/showCase">
          <ShowCase />
        </Route>
        <Route path="/chat">
          <ChatPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
