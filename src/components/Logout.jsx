import React, {Component} from 'react';
import {logout} from "../controller/localStorageHandler";
import {history} from "../controller/history";
import {routes} from "../controller/routes";


class LogOut extends Component {

    componentDidMount() {
        logout();
        history.push(routes.login);
        window.location.reload();
    }

    render() {
        return (
            <React.Fragment/>
        );
    }
}

export default LogOut;
