import React, {Component} from 'react';
import {Tabs} from "antd";
import SalesWorkOrderAnalyticsDropdown from "./SalesWorkOrderAnalyticsDropdown";
import {isAccessible} from "../../../../utils";
import ReviewsTabs from "../summary/inner-tabs/ReviewsTabs";
import ProductsTabs from "../summary/inner-tabs/ProductsTabs";
import SalesServiceTabs from "../summary/inner-tabs/AfterSalesServiceTabs";
import FacturesAdminAnalytics from '../summary/inner-tabs/FacturesAnalyticsTabs';
import NombersAnalyticsTabs from '../summary/inner-tabs/NombersAnalyticsTabs';
import CommandesAnalyticsTabs from '../summary/inner-tabs/CommandesAnalyticsTabs';
import NomberscomandesAnalytics from '../summary/inner-tabs/NomberscomandesAnalytics';
import InventoryTabs from '../summary/inner-tabs/InventoryTabs';

const {TabPane} = Tabs;

class SalesWorkOrderAnalytics extends Component {
    render() {
        return (
            <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                <div className="container-fluid margin-top-ipad-30 mt-3">
                    <div className="card mb-0 shadow-none border-0">
                        <div className="card-body py-3 px-0">
                            <div className="row all-common-steps-row all-common-steps-row-distributors">

                                <div className="col-12 custom-tab-update">
                                    <Tabs>
                                        {/* {isAccessible(['admin']) &&
                                            <TabPane tab="SOMMAIRE" key="1">
                                                <AnalyticsSummaryMain />
                                            </TabPane>} */}
                                        {isAccessible(['admin']) && <TabPane tab="Chiffre D'affaires" key="1">
                                            <ReviewsTabs/>
                                        </TabPane>}
                                        {isAccessible(['admin']) && <TabPane tab="Representants" key="2">
                                            <SalesWorkOrderAnalyticsDropdown/>
                                        </TabPane>}
                                        {isAccessible(['admin']) && <TabPane tab="FACTURES HT" key="3">
                                            <FacturesAdminAnalytics/>
                                        </TabPane>}
                                        {isAccessible(['admin']) && <TabPane tab="Nombre De Factures" key="4">
                                            <NombersAnalyticsTabs/>
                                        </TabPane>}
                                        {isAccessible(['admin']) && <TabPane tab="COMMANDES HT" key="5">
                                            <CommandesAnalyticsTabs/>
                                        </TabPane>}
                                        {isAccessible(['admin']) && <TabPane tab="Nombre De Commandes" key="6">
                                            <NomberscomandesAnalytics/>
                                        </TabPane>}
                                        {isAccessible(['admin']) && <TabPane tab="SAV" key="7">
                                            <SalesServiceTabs/>
                                        </TabPane>}
                                        {isAccessible(['admin']) && <TabPane tab="PRODUITS COMMANDES" key="8">
                                            <ProductsTabs/>
                                        </TabPane>}
                                        {isAccessible(['admin']) && <TabPane tab="INVENTAIRE" key="9">
                                            <InventoryTabs/>
                                        </TabPane>}

                                        {/* <TabPane tab="BONS DE COMMANDES" key="2">
                                            <PurchaseOrdersTabs />
                                        </TabPane>
                                        <TabPane tab="PRODUITS" key="3">
                                            <ProductsTabs />
                                        </TabPane> */}

                                        {/* <TabPane tab="DISTRIBUTEURS" key="5">
                                            <SalesWorkOrderAnalyticsDropdown />
                                        </TabPane> 
                                        <TabPane tab="COMMANDES HT" key="10">
                                           <YearRepresentative/>
                                        </TabPane> */}
                                        {/* <TabPane tab="NOMBRES COMMANDES" key="11">
                                           <NumberOrdersRepresentative/>
                                        </TabPane> */}
                                    </Tabs>
                                    <h5 className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">ANALYTIQUE</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesWorkOrderAnalytics;
