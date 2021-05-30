// import Login from "./views/Login";
import React from "react";
import Profile  from "./views/Profile";

import Discovery from "./views/Discovery";
import EditProfile from "./views/EditProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import ShowCase from "./views/showCase"
import ChatPage from "./views/Chat.jsx"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Trending from "./views/Trending";
import ProtectedRoute from "./views/protected.route"
import PageNotFound from "./views/notFound.jsx"
import { useSelector } from "react-redux"
function App() {
  const isLogin = useSelector((state) => state.isLogin)
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
            <ProtectedRoute path="/editProfile" component={EditProfile} isAuth={isLogin} />
            <Route component={PageNotFound}>

            </Route>
          </Switch>
      </Router>
  );
}

export default App;

{/* <Route path="/discovery">
              <Discovery />
            </Route>
            <Route path="/edit">
              <EditProfile />
            </Route>
            <Route path="/trending">
              <Trending />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/showCase">
              <ShowCase />
            </Route>
            <Route path="/chat">
              <ChatPage />
            </Route> */}
