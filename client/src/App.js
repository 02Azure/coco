import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import { Profile } from "./views/Profile";
import Register  from "./views/Regis"
import Login from "./views/Login";
import ShowCase from "./views/showCase"
import ChatPage from "./views/Chat.jsx"
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/showCase">
        <ShowCase />
      </Route>
      <Route path="/chat">
        <ChatPage />
      </Route>
    </Switch>
  );
}

export default App;
