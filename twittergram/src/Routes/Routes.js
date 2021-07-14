import { BrowserRouter, Switch, Route } from "react-router-dom";
import Feed from "../pages/Feed";
import Login from "../pages/Login/index";
import Friends from "../pages/Friends";
import Photos from "../pages/Photos";
import Videos from "../pages/Videos";
import Postar from "../pages/Postar/postar.jsx";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/feed" component={Feed} />
        <Route exact path="/friends" component={Friends} />
        <Route path="/photos" component={Photos} />
        <Route path="/videos" component={Videos} />
        <Route path="/postar" component={Postar} />
      </Switch>
    </BrowserRouter>
  );
}
