// import Login from "./views/Login";
import React from "react";
import Profile from "./views/Profile";
import { useSelector } from "react-redux";
import Discovery from "./views/Discovery";
import EditProfile from "./views/EditProfile";
import Login from "./views/Login";
import Register from "./views/Register";
import ShowCase from "./views/ShowCase";
import ChatPage from "./views/Chat.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Trending from "./views/Trending";
import Wishlist from "./views/WishList";
import DetailItemPage from "./views/detail.item.jsx";
import DetailWishlist from "./views/detail.wishlist.jsx";
import ProtectedRoute from "./views/protected.route";

import NotFound from "./views/NotFound";
import SeeAll from "./views/SeeAll";

function App() {
  const login = localStorage.getItem("isLogin");

  const isLogin = useSelector((state) => state.isLogin);
  // console.log(isLogin, 'islogin');

  return (
    <Router>
      <Navbar isLogin={isLogin} />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoute path="/profile/:id/wishlist" component={Wishlist} isAuth={isLogin} />
        <Route path="/profile/:id">
          <Profile />
        </Route>
        <Route path="/discovery">
          <Discovery />
        </Route>
        <Route path="/wishmarket">
          <Trending />
        </Route>
        <Route path="/seeall/:id">
          <SeeAll />
        </Route>
        {/* <ProtectedRoute path="/profile/" component={Profile} isAuth={isLogin} /> */}
        <ProtectedRoute path="/chat" component={ChatPage} isAuth={isLogin} />
        {/* <ProtectedRoute path="/discovery" component={Discovery} isAuth={isLogin} /> */}
        {/* <ProtectedRoute path="/trending" component={Trending} isAuth={isLogin} /> */}
        <ProtectedRoute path="/showCase" component={ShowCase} isAuth={isLogin} />
        <ProtectedRoute path="/editProfile/:id" component={EditProfile} isAuth={isLogin} />
        <ProtectedRoute path="/editItem/:id" component={DetailItemPage} isAuth={isLogin} />
        <ProtectedRoute path="/detailWishlist/:id" component={DetailWishlist} isAuth={isLogin} />
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
