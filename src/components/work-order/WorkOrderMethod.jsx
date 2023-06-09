import React, {Component} from 'react';
import {methods} from "../../controller/Global";
import DistributorWorkOrderCreate from "./distributors/DistributorWorkOrderCreate";
import WorkOrderView from "./distributors/WorkOrderView";
import {history} from "../../controller/history";
import {routes} from "../../controller/routes";


class WorkOrderMethod extends Component {

    setComponent = () => {
        const {match} = this.props;
        if (match.params.method === methods.create || (match.params.method === methods.edit && match.params.id)) {
            return <DistributorWorkOrderCreate {...this.props}/>
        } else if (match.params.method === methods.view && match.params.id) {
            return <WorkOrderView {...this.props}/>
        } else {
            history.push(routes.dashboard.sales.work_order.self);
        }
    };

    render() {
        return <React.Fragment>
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
    }
}

export default WorkOrderMethod