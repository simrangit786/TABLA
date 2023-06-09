import React, {Component} from 'react';

import LoginForm from "./components/Login";
import {history} from './controller/history';
import Main from "./components/Main";
import {Router} from "react-router-dom";
import LogOut from "./components/Logout";
import {routes} from "./controller/routes";
import {PublicRoute} from "./controller/PublicPath";
import PrivateRoute from "./controller/PrivatePath";
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import ForgotPassword from "./components/auth/ForgotPassword";
import * as Sentry from "@sentry/react";

import './App.css';
import './assets/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'antd/dist/antd.css'
import './assets/scss/common.scss';
import './assets/css/responsive.css';

import 'jquery';
import 'popper.js';

class App extends Component {
    state = {
        error: null,
        eventId: null,
        lang: this.props.lang
    };

    render() {
        return (
            <Sentry.ErrorBoundary fallback={"We're updating this as soon as possible"}>
                <I18nextProvider i18n={i18n}>
                    <div className="App h-100 text-left">
                        <Router history={history}>
                            <div className="h-100">
                                <PublicRoute restricted={true} exact path={routes.login} component={LoginForm}/>
                                <PublicRoute exact path={routes.forget_password} component={ForgotPassword}/>
                                <PrivateRoute path={routes.dashboard.self} component={Main}/>
                                <PrivateRoute restricted={true} exact path={routes.logout} component={LogOut}/>
                            </div>
                        </Router>
                    </div>
                </I18nextProvider>
            </Sentry.ErrorBoundary>
        );
    }
}

export default App;
