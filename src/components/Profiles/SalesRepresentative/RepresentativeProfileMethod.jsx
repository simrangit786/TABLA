import React, {Component} from 'react';
import {methods} from "../../../controller/Global";
import {routes} from "../../../controller/routes";
import {history} from "../../../controller/history";
import RepresentativeProfileCreate from "./RepresentativeProfileCreate";
import RepresentativeProfileView from "./RepresentativeProfileView";

class RepresentativeProfileMethod extends Component {

    setComponent() {
        const {match} = this.props;
        if (match.params.method === methods.create || (match.params.method === methods.edit && match.params.id))
            return <RepresentativeProfileCreate {...this.props}/>;
        else if (match.params.method === methods.view && match.params.id)
            return <RepresentativeProfileView {...this.props}/>;
        else
            history.push(routes.dashboard.profiles.representative.self);
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

export default RepresentativeProfileMethod;
