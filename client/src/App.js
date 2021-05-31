// import Login from "./views/Login";
import React from "react";
import Profile from "./views/Profile";

import Discovery from "./views/Discovery";
import EditProfile from "./views/EditProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import ShowCase from "./views/ShowCase";
import ChatPage from "./views/Chat.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Trending from "./views/Trending";
import ProtectedRoute from "./views/protected.route";
import { useSelector } from "react-redux";

import NotFound from "./views/NotFound";
import SeeAll from "./views/SeeAll";

function App() {
  // const isLogin = useSelector((state) => state.isLogin);
  const isLogin = true;
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoute path="/profile" component={Profile} isAuth={isLogin} />
        <ProtectedRoute path="/chat" component={ChatPage} isAuth={isLogin} />
        <ProtectedRoute path="/discovery" component={Discovery} isAuth={isLogin} />
        <ProtectedRoute path="/showCase" component={ShowCase} isAuth={isLogin} />
        <ProtectedRoute path="/trending" component={Trending} isAuth={isLogin} />
        <ProtectedRoute path="/editProfile/:id" component={EditProfile} isAuth={isLogin} />
        <ProtectedRoute path="/seeall/:id" component={SeeAll} isAuth={isLogin} />
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
