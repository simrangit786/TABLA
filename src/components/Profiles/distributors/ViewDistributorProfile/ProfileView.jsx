import React, {Component} from 'react';
import {Spin, Tabs} from "antd";
import SummaryInformation from "./tabs/SummaryInformation";
import DistributorProfileSidebar from "../../../sidebar/profile/DistributorProfileSidebar";
import {withTranslation} from "react-i18next";
import {distributorProfileGetOne} from "../../../../controller/API/profileApi";
import {isAccessible} from "../../../../utils";
import DeliveryTicketTable from "./DeliveryTicketTable";
import InvoiceTable from "./InvoiceTable";
import WorkOderProfile from "./tabs/WorkOderProfile";
import SAVTable from "./SAVTable";
import CreditTable from "./CreditTable";

const {TabPane} = Tabs;

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            loading: true
        }
    }

    componentDidMount() {
        this.fetch(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id)
            this.fetch(this.props.match.params.id)
    }

    fetch = (id) => {
        distributorProfileGetOne(id)
            .then(response => {
                this.setState({profile: response, loading: false})
            })
    };

    render() {
        const {profile, loading} = this.state;
        const {t} = this.props;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                <DistributorProfileSidebar profile={profile} {...this.props}
                                           fetch={() => this.fetch(this.props.match.params.id)}/>
                {profile && <div className="profile-summary-details-row profile-tables-row">
                    <div className="col-12 p-0">
                        <Tabs type="card" destroyInactiveTabPane>
                            <TabPane tab={t('summary')} key="1">
                                <SummaryInformation fetch={this.fetch} ref={(cd) => this.child = cd} profile={profile}/>
                            </TabPane>
                            {isAccessible(['admin']) &&
                            <TabPane tab={t('purchase_orders')} key="2">
                                <WorkOderProfile profile={profile}/>
                            </TabPane>
                            }
                            {isAccessible(['admin']) &&
                            <TabPane tab="BONS DE LIVRAISON" key="3">
                                <DeliveryTicketTable profile={profile}/>
                            </TabPane>
                            }
                            {isAccessible(['admin']) &&
                            <TabPane tab="FACTURES" key="4">
                                <InvoiceTable profile={profile}/>
                            </TabPane>
                            }
                            {isAccessible(['admin']) &&
                            <TabPane tab="S.A.V." key="5">
                                <SAVTable profile={profile}/>
                            </TabPane>
                            }
                            {isAccessible(['admin']) &&
                            <TabPane tab="AVOIRS" key="6">
                                <CreditTable profile={profile}/>
                            </TabPane>
                            }
                        </Tabs>
                        <h5 className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">{profile.client_name}</h5>
                    </div>
                </div>}
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(ProfileView));
