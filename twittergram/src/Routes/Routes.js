import {BrowserRouter,Switch, Route} from 'react-router-dom';
import Feed from '../pages/Feed';
import Login from '../pages/Login';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/feed" component={Feed} />
            </Switch>
        </BrowserRouter>
    );
}