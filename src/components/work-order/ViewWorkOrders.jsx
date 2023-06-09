import React, {Component} from 'react';
import {Pagination, Tabs} from 'antd';
import {withTranslation} from "react-i18next";
import DistributorsWorkOrderTabs from "./distributors/tabs/DistributorsWorkOrderTabs";
import DistributorsDeliveryTicketsTable from "./distributors/DistributorsDeliveryTicketsTable";
import DistributorsInvoiceTable from "./distributors/DistributorsInvoiceTable";


const pagination = Pagination;
pagination.pageSize = 25;
const {TabPane} = Tabs;

class ViewWorkOrders extends Component {

    render() {

        const {t} = this.props;
        return (
            <React.Fragment>
                <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                    <div className="row all-common-steps-row all-common-steps-row-distributors">
                        <div className="col-12">
                            <div className="profile-summary-details-row profile-tables-row">
                                <div className="col-12 p-0">
                                    <Tabs type="card" destroyInactiveTabPane>
                                        <TabPane tab="BONS DE COMMANDE" key="1">
                                            <DistributorsWorkOrderTabs t={t}/>
                                        </TabPane>
                                        <TabPane tab="BONS DE LIVRAISON" key="2">
                                            <DistributorsDeliveryTicketsTable t={t}/>
                                        </TabPane>
                                        <TabPane tab="FACTURES" key="3">
                                            <DistributorsInvoiceTable t={t}/>
                                        </TabPane>
                                    </Tabs>
                                    <h5 className="header-tab-heading header-tab-heading-2 position-fixed text-uppercase font-weight-bold mb-0">{t('btn_work_order')}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(ViewWorkOrders));
