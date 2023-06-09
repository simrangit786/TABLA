import React, {Component} from 'react';
import {methods} from "../../controller/Global";
import {history} from "../../controller/history";
import {routes} from "../../controller/routes";
import ContainerCreate from "./ContainerCreate";
import ContainerView from "./ContainerView";

class ContainerMethod extends Component {
    setComponent() {
        const {match} = this.props;
        if (match.params.method === methods.create || (match.params.method === methods.edit && match.params.id))
            return <ContainerCreate {...this.props}/>;
        else if (match.params.method === methods.view && match.params.id)
            return <ContainerView {...this.props}/>;
        else
            history.push(routes.dashboard.warehouse.container.self);
    }

    render() {
        return (

            <React.Fragment>
                <div id="main-content" className="main-content-div float-right position-relative mt-5">
                    <div className="container-fluid h-100 bg-white">
                        <div className="row clearfix all-common-steps-row h-100 bg-white">
                            <div className="steps-right-side-div h-100 dashboard-inner-second bg-white float-right">
                                {this.setComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default ContainerMethod;