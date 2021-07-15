import { BrowserRouter, Switch, Route } from "react-router-dom";
import Feed from "../pages/Feed/index2";
import Login from "../pages/Login/index";
import Friends from "../pages/Friends";
import OwnPosts from "../pages/OwnPosts";
import Postar from "../pages/Postar/postar.jsx";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/feed" component={Feed} />
        <Route exact path="/friends" component={Friends} />
        <Route path="/ownposts" component={OwnPosts} />
        <Route path="/postar" component={Postar} />
      </Switch>
    </BrowserRouter>
  );
}
