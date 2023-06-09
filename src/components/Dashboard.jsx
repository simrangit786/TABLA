import React, {Component} from 'react';
import {Image as Images} from "./Images";
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next';
import {routes} from "../controller/routes";
import {Role} from "../utils";


class Dashboard extends Component {
    render() {
        const {t} = this.props;
        return (
            <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                <div className="container-fluid margin-top-ipad-30">
                    <div className="row clearfix">
                        <Role allow={["admin"]}>
                            <div className="col-sm-6 col-md-6 col-lg-4 col-12">
                                <div
                                    className="card card-main-custom position-relative border-0 rounded-0 mb-4 overflow-hidden">
                                    <div className="body p-3 d-flex justify-content-end">
                                        <div className="body-div-inner float-left">
                                            <div className="relate-icon-div rounded-circle flex-align-center-center">
                                                <img className="img-fluid" src={Images.new_profile_icon} alt="profile"/>
                                            </div>
                                            <div className="header-custom w-100 d-inline-block mt-1 pt-2 py-2">
                                                <h6
                                                    className="text-white mb-0 font-weight-bold text-left ">{t('dash.account')}</h6>
                                            </div>
                                        </div>
                                        <div className="header-btn-card d-flex align-items-end">
                                            <Link to={routes.dashboard.profiles.self}
                                                  className="search-btn m-0 flex-align-center-center w-100 text-center font-weight-bold text-uppercase text-white">
                                                <span>{t('view')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Role>
                        <Role allow={["admin"]}>
                            <div className="col-sm-6 col-md-6 col-lg-4 col-12">
                                <div
                                    className="card card-main-custom card-second-pattern position-relative border-0 rounded-0 mb-4 overflow-hidden">
                                    <div className="body p-3 d-flex justify-content-end">
                                        <div className="body-div-inner float-left">
                                            <div className="relate-icon-div rounded-circle flex-align-center-center">
                                                <img className="img-fluid" alt="icon-sales"
                                                     src={Images.new_workorder_icon}/>
                                            </div>
                                            <div className="header-custom w-100 d-inline-block pt-2 mt-1 py-2">
                                                <h6
                                                    className="text-white mb-0 font-weight-bold text-left ">{t('dash.sales_ops')}</h6>
                                            </div>
                                        </div>
                                        <div className="header-btn-card d-flex align-items-end">
                                            <Link
                                                className="search-btn m-0 flex-align-center-center w-100 text-center font-weight-bold text-uppercase text-white"
                                                to={routes.dashboard.sales.work_order.self}>
                                                <span>{t('view')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Role>
                        <Role allow={["sales_person"]}>
                            <div className="col-sm-6 col-md-6 col-lg-4 col-12">
                                <div
                                    className="card card-main-custom card-second-pattern position-relative border-0 rounded-0 mb-4 overflow-hidden">
                                    <div className="body p-3 d-flex justify-content-end">
                                        <div className="body-div-inner float-left">
                                            <div className="relate-icon-div rounded-circle flex-align-center-center">
                                                <img className="img-fluid" alt="icon-sales"
                                                     src={Images.new_profile_icon}/>
                                            </div>
                                            <div className="header-custom w-100 d-inline-block pt-2 mt-1 py-2">
                                                <h6
                                                    className="text-white mb-0 font-weight-bold text-left ">{t('Mes distributeurs')}</h6>
                                            </div>
                                        </div>
                                        <div className="header-btn-card d-flex align-items-end">
                                            <Link
                                                className="search-btn m-0 flex-align-center-center w-100 text-center font-weight-bold text-uppercase text-white"
                                                to={routes.dashboard.distributor.self}>
                                                <span>{t('view')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Role>
                        <div className="col-sm-6 col-md-6 col-lg-4 col-12">
                            <div
                                className="card card-main-custom card-second-pattern position-relative border-0 rounded-0 mb-4 overflow-hidden">
                                <div className="body p-3 d-flex justify-content-end">
                                    <div className="body-div-inner float-left">
                                        <div className="relate-icon-div rounded-circle flex-align-center-center">
                                            <img className="img-fluid" alt="icon-supplier"
                                                 src={Images.new_warehouse_icon}/>
                                        </div>
                                        <div className="header-custom w-100 d-inline-block mt-1 pt-2 py-2">
                                            <h6
                                                className="text-white mb-0 font-weight-bold text-left ">{t('inventory_mgmt')}</h6>
                                        </div>
                                    </div>
                                    <div className="header-btn-card d-flex align-items-end">
                                        <Link
                                            className="search-btn m-0 flex-align-center-center w-100 text-center font-weight-bold text-uppercase text-white"
                                            to={routes.dashboard.warehouse.self}>
                                            <span>{t('view')}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Role allow={["sales_person"]}>
                            <div className="col-sm-6 col-md-6 col-lg-4 col-12">
                                <div
                                    className="card card-main-custom card-second-pattern position-relative border-0 rounded-0 mb-4 overflow-hidden">
                                    <div className="body p-3 d-flex justify-content-end">
                                        <div className="body-div-inner float-left">
                                            <div className="relate-icon-div rounded-circle flex-align-center-center">
                                                <img className="img-fluid" alt="icon-sales" src={Images.analystic}/>
                                            </div>
                                            <div className="header-custom w-100 d-inline-block pt-2 mt-1 py-2">
                                                <h6
                                                    className="text-white mb-0 font-weight-bold text-left ">{t('analytics')}</h6>
                                            </div>
                                        </div>
                                        <div className="header-btn-card d-flex align-items-end">
                                            <Link
                                                className="search-btn m-0 flex-align-center-center w-100 text-center font-weight-bold text-uppercase text-white"
                                                to={routes.dashboard.sales_analytics}>
                                                <span>{t('view')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Role>
                        <Role allow={["admin"]}>
                            <div className="col-sm-6 col-md-6 col-lg-4 col-12">
                                <div
                                    className="card card-main-custom card-second-pattern position-relative border-0 rounded-0 mb-4 overflow-hidden">
                                    <div className="body p-3 d-flex justify-content-end">
                                        <div className="body-div-inner float-left">
                                            <div className="relate-icon-div rounded-circle flex-align-center-center">
                                                <img className="img-fluid" alt="icon-sales" src={Images.analystic}/>
                                            </div>
                                            <div className="header-custom w-100 d-inline-block pt-2 mt-1 py-2">
                                                <h6
                                                    className="text-white mb-0 font-weight-bold text-left ">{t('analytics')}</h6>
                                            </div>
                                        </div>
                                        <div className="header-btn-card d-flex align-items-end">
                                            <Link
                                                className="search-btn m-0 flex-align-center-center w-100 text-center font-weight-bold text-uppercase text-white"
                                                to={routes.dashboard.sales_workorder_analytics}>
                                                <span>{t('view')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Role>
                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(Dashboard));
