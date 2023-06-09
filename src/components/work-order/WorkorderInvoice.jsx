import React, {Component} from 'react';
import WorkOrderSideBar from "../sidebar/workorder/WorkOrderSideBar";
import InformationSummary from "./distributors/work-order-view/InformationSummary";
import {WorkorderInvoiceSummaryGet} from "../../controller/API/salesOperationAPI";
import {message, Spin} from "antd";

class WorkorderInvoice extends Component {
    state = {
        data: null,
        loading: true,
    };

    componentDidMount() {
        this.fetch(this.props.match.params.id)
    }

    fetch = (id) => {
        this.setState({loading: true});
        WorkorderInvoiceSummaryGet(id)
            .then(res => {
                this.setState({data: res, loading: false})
            }).catch(err => {
            message.error("Something went wrong.");
            this.setState({loading: false})
        })
    };

    render() {
        const {data, loading} = this.state;
        return (
            <React.Fragment>
                <div id="main-content" className="main-content-div float-right position-relative mt-5">
                    <div className="container-fluid h-100">
                        <div className="row clearfix all-common-steps-row h-100">
                            <div className="steps-right-side-div dashboard-inner-second bg-white float-right">
                                <React.Fragment>
                                    <WorkOrderSideBar {...this.props}
                                                      invoice={true}
                                                      data={data}/>
                                    {loading ? <div className={'text-center mt-5 p-0'}><Spin/></div> :
                                        <div
                                            className="profile-summary-details-row work-order-view-tabs invoice-detail">
                                            <div className="col-12 heading">
                                                <h5>RÉSUMÉ DE LA FACTURE</h5>
                                            </div>
                                            <div className="col-12 p-0">
                                                <InformationSummary data={data} invoice={true}
                                                                    fetchInvoice={() => this.fetch(this.props.match.params.id)}/>
                                            </div>
                                        </div>}
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default WorkorderInvoice;
