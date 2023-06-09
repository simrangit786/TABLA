import React, {Component} from 'react';
import {Spin, Tabs} from "antd";
import {withTranslation} from "react-i18next";
import {salesRepresentativeGetOne} from "../../../controller/API/profileApi";
import RepresentativeProfileSidebar from "../../sidebar/profile/RepresentativeProfileSidebar";
import WorkOrderTable from "../distributors/ViewDistributorProfile/tabs/WorkOrderTable";
import SalesRepresentativeTable from "../distributors/ViewDistributorProfile/tabs/SalesRepresentativeTable";
import SalesAnalyticsRepresentativeWorkOrder from "../distributors/SalesAnalyticsRepresentativeWorkOrder";

const {TabPane} = Tabs;

class RepresentativeProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            representative: null,
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
        salesRepresentativeGetOne(id)
            .then(response => {
                this.setState({representative: response, loading: false})
            })
    };


    render() {
        const {representative, loading} = this.state;
        const {t} = this.props;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }

        return (
            <React.Fragment>
                <RepresentativeProfileSidebar representative={representative} {...this.props}
                                              fetch={() => this.fetch(this.props.match.params.id)}/>
                <div className="profile-summary-details-row">
                    <div className="col-12 p-0">
                        <Tabs type="card" destroyInactiveTabPane>
                            <TabPane tab={t('summary')} key="1">
                                <div className="row summary-info-row mx-0">
                                    <div className="col-12 px-0">
                                        <h6 className="text-uppercase font-weight-bold mb-4">{t('representative_info')} </h6>
                                    </div>
                                    <div className="col-12 px-0">
                                        <div className="card border-0 position-relative mb-4">
                                            <div className="card-body">
                                                <div className="row mx-0">
                                                    <div className="col-md-6 col-sm-6 col-12 col-lg-6">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('name')} :
                                                            </li>
                                                            <li
                                                                className="list-inline-item label-name-li">{representative.first_name} {representative.last_name}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('Type')} :
                                                            </li>
                                                            <li
                                                                className="list-inline-item label-name-li">{representative.title}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('email')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.email}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('phn_number')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.phone}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('number_s')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.siret_number}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-12 col-lg-6">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('address_type')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.type}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('title')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.title}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('address')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.address}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('city')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.city}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('state_dep_view')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.state_province}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('zip_code')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.zip_code}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('country')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{representative.country}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <SalesAnalyticsRepresentativeWorkOrder representative={representative}/>
                            </TabPane>
                            <TabPane tab={t('purchase_orders')} key="2">
                                <WorkOrderTable sales_representative={true} profile={representative}/>
                            </TabPane>
                            <TabPane tab={t('distributor_representant')} key="3">
                                <SalesRepresentativeTable profile={representative}/>
                            </TabPane>
                        </Tabs>
                        <h5
                            className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">{`${representative.first_name} ${representative.last_name}`}</h5>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(RepresentativeProfileView));
