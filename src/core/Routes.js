import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import Signup from '../auth/Signup';
import Signin from '../auth/Signin';
import Activate from '../auth/Activate';
import Private from './pages/Private/Private';
import Admin from './pages/Admin/Admin';
import PrivateRoute from '../auth/PrivateRoute';
import AdminRoute from '../auth/AdminRoute';
import Update from '../auth/UpdatePassword';
import Reset from '../auth/ResetPassword';
import AllLessons from './pages/AllLessons/AllLessons';
import Lesson from './pages/Lesson/Lesson';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/lessons/all" exact component={AllLessons} />
                <Route path="/lesson/:id" exact component={Lesson} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <PrivateRoute path="/private" exact component={Private} />
                <AdminRoute path="/admin-dash" exact component={Admin} />
                <Route path="/auth/password/update" exact component={Update} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;