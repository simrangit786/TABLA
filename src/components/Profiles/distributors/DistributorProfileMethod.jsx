import React, {Component} from 'react';
import {methods} from "../../../controller/Global";
import DistributorProfileCreate from "./DistributorProfileCreate";
import ProfileView from "./ViewDistributorProfile/ProfileView";
import {routes} from "../../../controller/routes";
import {history} from "../../../controller/history";

class DistributorProfileMethod extends Component {

    setComponent() {
        const {match} = this.props;
        if (match.params.method === methods.create || (match.params.method === methods.edit && match.params.id))
            return <DistributorProfileCreate {...this.props}/>;
        else if (match.params.method === methods.view && match.params.id)
            return <ProfileView {...this.props}/>;
        else
            history.push(routes.dashboard.profiles.self);
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
        );
    }
}

export default DistributorProfileMethod;
