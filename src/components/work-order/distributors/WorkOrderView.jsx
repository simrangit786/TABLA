import React, {Component} from 'react';
import WorkOrderSideBar from "../../sidebar/workorder/WorkOrderSideBar";
import {Spin, Tabs} from "antd";
import InformationSummary from "./work-order-view/InformationSummary";
import Documents from "./work-order-view/Documents";
import {withTranslation} from "react-i18next";
import GenerateInvoice from './work-order-view/GenerateInvoice';
import DeliverySettings from './work-order-view/DeliverySettings';
import {workorder_view_state} from "../../../controller/Global";
import GenerateDeliveryTicket from "./work-order-view/GenerateDeliveryTicket";
import {connect} from "react-redux";
import {getOneWorkorder} from "../../../redux/Actions/workOrderAction";
import GenerateCredit from "./work-order-view/GenerateCredit";
import CreateSAV from "./work-order-view/CreateSAV";

const {TabPane} = Tabs;

class WorkOrderView extends Component {
    state = {
        data: null,
        loading: true,
        default_tab: '1',
        current_screen: workorder_view_state.summary,
    };

    componentDidMount() {
        this.fetch(this.props.match.params.id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id)
            this.fetch(this.props.match.params.id)
    }

    changeCurrentScreen = (current_screen) => {
        this.setState({current_screen})
    };

    changeTab = (key = '2') => {
        this.setState({default_tab: key})
    };

    fetch = (id) => {
        this.setState({current_screen: workorder_view_state.summary});
        this.props.getOneWorkorder(id);
        this.setState({loading: false})
    };

    render() {
        const {t, workorder} = this.props;
        const {current_screen, default_tab} = this.state;
        const data = workorder;
        if (!data) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                <WorkOrderSideBar changeScreen={(screen) => this.changeCurrentScreen(screen)} {...this.props}
                                  data={data}/>
                <div className="profile-summary-details-row work-order-view-tabs">
                    <div className="col-12 p-0">
                        <Tabs defaultActiveKey='1' activeKey={default_tab} type="card" onChange={this.changeTab}>
                            <TabPane tab={t('summary')} key="1">
                                {data && current_screen === workorder_view_state.summary &&
                                <InformationSummary data={data}/>}

                                {data && current_screen === workorder_view_state.delivery_setting &&
                                <DeliverySettings fetch={() => this.fetch(this.props.match.params.id)} data={data}/>}
                                {data && current_screen === workorder_view_state.delivery_ticket &&
                                <GenerateDeliveryTicket
                                    openDocuments={() => this.changeTab()}
                                    fetch={() => this.fetch(this.props.match.params.id)} data={data}/>}
                                {data && current_screen === workorder_view_state.generate_invoice &&
                                <GenerateInvoice openDocuments={() => this.changeTab()} data={data}
                                                 fetch={() => this.fetch(this.props.match.params.id)}
                                                 current_screen={this.state.current_screen}/>}
                                {data && current_screen === workorder_view_state.generate_credit &&
                                <GenerateCredit openDocuments={() => this.changeTab()} data={data}
                                                fetch={() => this.fetch(this.props.match.params.id)}
                                                current_screen={this.state.current_screen}/>}
                                {data && current_screen === workorder_view_state.create_sav &&
                                <CreateSAV openDocuments={() => this.changeTab()} data={data}
                                           fetch={() => this.fetch(this.props.match.params.id)}
                                           current_screen={this.state.current_screen}/>}
                            </TabPane>
                            <TabPane tab={"DOCUMENTS"} key="2">
                                <Documents activeKey={default_tab} data={data}/>
                            </TabPane>
                        </Tabs>
                        <h5
                            className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">
                            {t('summary_title')} - {data.id}</h5>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        workorder: state.current_workorder.data
    }
};

export default connect(mapStateToProps, {getOneWorkorder})(withTranslation('common')(WorkOrderView));
