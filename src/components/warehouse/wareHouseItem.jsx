import React, {Component} from 'react';
import {methods} from "../../controller/Global";
import CreateItem from "./all-items/CreateItem";
import ViewItem from "./all-items/ViewItem";
import {history} from "../../controller/history";
import {routes} from "../../controller/routes";

class WareHouseItem extends Component {

    setComponent() {
        const {match} = this.props;
        if (match.params.method === methods.create)
            return <CreateItem {...this.props}/>;
        else if (match.params.method === methods.view && match.params.id)
            return <ViewItem {...this.props}/>;
        else
            history.push(routes.dashboard.warehouse.inventory);
    }

    render() {
        return (
            <div id="main-content" className="main-content-div float-right position-relative mt-5">
                <div className="container-fluid h-100">
                    <div className="row clearfix all-common-steps-row h-100">
                        {this.setComponent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default WareHouseItem;
