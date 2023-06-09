import React, { Component } from 'react'
import GroupProfileView from './GroupProfileView';
import {methods} from "../../../controller/Global";
import {routes} from "../../../controller/routes";
import {history} from "../../../controller/history";
import TarifsGroupCreate from './TarifsGroupCreate';

export class TarifsGroupMethod extends Component {
    setComponent() {
        console.log(this.props,"svhjvbf");
        const {match} = this.props;
        if (match.params.method === methods.create || (match.params.method === methods.edit && match.params.id))
            return <TarifsGroupCreate {...this.props}/>;
        else if (match.params.method === methods.view && match.params.id)
            return <GroupProfileView {...this.props}/>;
        else
            history.push(routes.dashboard.profiles.tarifs.self);
    }
  render() {
    return (
        <React.Fragment>
        <div id="main-content" className="main-content-div float-right position-relative mt-5">
            <div className="container-fluid h-100">
                <div className="row clearfix all-common-steps-row h-100">
                    <div className="steps-right-side-div dashboard-inner-second bg-white float-right">
                        {this.setComponent()}
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
  }
}

export default TarifsGroupMethod