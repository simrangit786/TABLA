import React, {Component} from 'react';
import AnalytiqueRepresentative from "./Profiles/SalesRepresentative/AnalytiqueRepresentative";
import {getUserID} from "../controller/localStorageHandler";
import {Tabs} from "antd";
import YearRepresentative from "./Profiles/SalesRepresentative/YearRepresentative";
import NumberOrdersRepresentative from "./Profiles/SalesRepresentative/NumberOrdersRepresentative";

const {TabPane} = Tabs;

class SalesPersonAnalytics extends Component {
    render() {
        return (
            <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                <div className="container-fluid margin-top-ipad-30">
                    <div className="row all-common-steps-row all-common-steps-row-distributors">
                        <div className="col-12">
                            <Tabs type="card" destroyInactiveTabPane>
                                <TabPane tab="DISTRIBUTEURS" key="1">
                                    <AnalytiqueRepresentative representative={{id: getUserID()}}/>
                                </TabPane>
                                <TabPane tab="COMMANDES HT" key="2">
                                    <YearRepresentative/>
                                </TabPane>
                                <TabPane tab="NOMBRES COMMANDES" key="3">
                                    <NumberOrdersRepresentative/>
                                </TabPane>
                            </Tabs>
                            <h5 className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">ANALYTIQUE</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesPersonAnalytics;
