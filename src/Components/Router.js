import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "Routes/Home";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Detail from "Routes/Detail";
import Header from "./Header";
import Season from "Routes/Season";

export default () => (
    <Router>
        
        <Header />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tv"  component={TV} />
            <Route path="/search" component={Search} />        
            <Route path="/movie/:id" component={Detail} />        
            <Route path="/show/:id" component={Detail} /> 
            <Route path="/season/:id/:number" component={Season} />        
            <Redirect from="*" to="/" />
        </Switch>
        
    </Router>
)