import React, { Component } from 'react';
import { Route, Switch} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import HomePage from './HomePage';
import Navigation from './Navigation';
import Login from './users/Login';
import Logout from './users/Logout';
import Register from './users/Register';
import FollowsGraph from './vacations/FollowsGraph';
import MainVacations from './vacations/MainVacations';

class Main extends Component {
   
    render() { 
        return ( 
            <div className='container'>
                <Router>
                    <Navigation />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/vacations" component={MainVacations} />
                        <Route path="/follows" component={FollowsGraph} />
                        <Route path="/home" component={HomePage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </Router>
            </div>
         );
    }
}
 
export default Main;