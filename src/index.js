import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store'
import {Provider} from "react-redux";
import * as Sentry from "@sentry/react";
import {getEnvValue} from "./controller/Environment";

Sentry.init({dsn: getEnvValue('REACT_APP_SENTRY_DSN')});


ReactDOM.render(<Provider store={store}> <App/> </Provider>, document.getElementById('root'));
