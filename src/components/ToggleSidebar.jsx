import React, {Component} from 'react';
import {Image as Images} from "./Images";
import {NavLink} from "react-router-dom";
import {routes} from "../controller/routes";
import {withTranslation} from "react-i18next";
import {reverse} from "named-urls";
import {Role} from "../utils";

class ToggleSidebar extends Component {

    render() {
        const {toggle} = this.props;
        const {t} = this.props;
        return (
            <React.Fragment>
                <div className={`toggle-sidebar-main h-100 position-fixed ${toggle ? 'toggle-sidebar-show' : ''}`}>
                    <div className="toggle-sidebar-inner w-100">
                        <div className="side-bar-div w-100">
                            <div className="w-100 side-bar-link-details h-100">
                                <ul className="list-inline w-100 h-100 d-inline-block mb-0">
                                    <Role allow={["admin"]}>
                                        <li className="d-inline-block w-100">
                                            <div className="icon-sidebar-div float-left">
                                                <NavLink to={routes.dashboard.profiles.self}
                                                         className="w-100 d-inline-block px-3 py-3 position-relative">
                                                    <img className="img-fluid icon-img-main icon-primary"
                                                         alt="profile-icon"
                                                         src={Images.new_profile_sidebar}/>
                                                    <img
                                                        className="img-fluid icon-img-main icon-white position-absolute"
                                                        alt="profile-icon"
                                                        src={Images.new_profile_sidebar_white}/>
                                                </NavLink>
                                            </div>
                                            <div className="text-sidebar-div py-3 float-left">
                                                <div className="text-sidebar-inner w-100">
                                                    <ul className="list-inline">
                                                        <li>
                                                            <NavLink to={routes.dashboard.profiles.self}
                                                                     className="d-flex align-items-center  px-3 w-100">{t('all_profiles')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to={reverse(routes.dashboard.profiles.groups.self)}
                                                                className="d-flex align-items-center  w-100 px-3">{t('grp_profiles')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to={reverse(routes.dashboard.profiles.distributor.self)}
                                                                className="d-flex align-items-center  w-100 px-3">{t('profile_dist')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to={reverse(routes.dashboard.profiles.representative.self)}
                                                                className="d-flex align-items-center  w-100 px-3">{t('sales_represents')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink
                                                                to={reverse(routes.dashboard.profiles.entity.self)}
                                                                className="d-flex align-items-center  w-100 px-3">{t('profiles_entity')}</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </Role>
                                    <Role allow={["admin"]}>
                                        <li className="d-inline-block w-100">
                                            <div className="icon-sidebar-div float-left">
                                                <NavLink to={routes.dashboard.sales.self}
                                                         className="w-100 d-inline-block px-3 py-3 position-relative">
                                                    <img className="img-fluid icon-img-main icon-primary"
                                                         alt="profile-icon"
                                                         src={Images.new_workorder_sidebar}/>
                                                    <img
                                                        className="img-fluid icon-img-main icon-white position-absolute sales_icon"
                                                        alt="profile-icon"
                                                        src={Images.new_workorder_sidebar_white}/>
                                                </NavLink>
                                            </div>
                                            <div className="text-sidebar-div py-3 float-left">
                                                <div className="text-sidebar-inner w-100">
                                                    <ul className="list-inline">
                                                        <li>
                                                            <NavLink to={routes.dashboard.sales.self}
                                                                     className="d-flex align-items-center w-100 px-3">{t('dash.sales_ops')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink to={routes.dashboard.sales.work_order.self}
                                                                     className="d-flex align-items-center w-100 px-3">{t('purchase_orders_distributor')}</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-inline-block w-100">
                                            <div className="icon-sidebar-div float-left">
                                                <NavLink to={routes.dashboard.warehouse.self}
                                                         className="w-100 d-inline-block position-relative px-3 py-3">
                                                    <img className="img-fluid icon-img-main icon-primary"
                                                         alt="profile-icon"
                                                         src={Images.new_warehouse_sidebar}/>
                                                    <img
                                                        className="img-fluid icon-img-main icon-white position-absolute"
                                                        alt="profile-icon"
                                                        src={Images.new_warehouse_sidebar_white}/>
                                                </NavLink>
                                            </div>
                                            <div className="text-sidebar-div py-3 float-left">
                                                <div className="text-sidebar-inner w-100">
                                                    <ul className="list-inline">

                                                        <li>
                                                            <NavLink to={routes.dashboard.warehouse.self}
                                                                     className="d-flex align-items-center w-100 px-3">{t('inventory_mgmt')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink to={routes.dashboard.warehouse.inventory}
                                                                     className="d-flex align-items-center w-100 px-3">{t('inventory')}</NavLink>
                                                        </li>
                                                        <Role allow={["admin"]}>
                                                            <li>
                                                                <NavLink to={routes.dashboard.warehouse.container.self}
                                                                         className="d-flex align-items-center w-100 px-3">{t('pending_containers')}</NavLink>
                                                            </li>
                                                        </Role>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-inline-block w-100">
                                            <div className="icon-sidebar-div float-left">
                                                <NavLink to={routes.dashboard.sales_workorder_analytics}
                                                         className="w-100 d-inline-block position-relative px-3 py-3">
                                                    <img className="img-fluid icon-img-main icon-primary"
                                                         alt="profile-icon"
                                                         src={Images.analystic}/>
                                                    <img
                                                        className="img-fluid icon-img-main icon-white position-absolute"
                                                        alt="profile-icon"
                                                        src={Images.analystic_white}/>
                                                </NavLink>
                                            </div>
                                            <div className="text-sidebar-div py-3 float-left">
                                                <div className="text-sidebar-inner w-100">
                                                    <ul className="list-inline">

                                                        <li>
                                                            <NavLink to={routes.dashboard.sales_workorder_analytics}
                                                                     className="d-flex align-items-center w-100 px-3">{t('analytics')}</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </Role>
                                    <Role allow={["sales_person"]}>
                                        <li className="d-inline-block w-100">
                                            <div className="icon-sidebar-div float-left">
                                                <NavLink to={routes.dashboard.distributor.self}
                                                         className="w-100 d-inline-block position-relative px-3 py-3">
                                                    <img className="img-fluid icon-img-main icon-primary"
                                                         alt="profile-icon"
                                                         src={Images.new_profile_sidebar}/>
                                                    <img
                                                        className="img-fluid icon-img-main icon-white position-absolute"
                                                        alt="profile-icon"
                                                        src={Images.new_profile_sidebar_white}/>
                                                </NavLink>
                                            </div>
                                            <div className="text-sidebar-div py-3 float-left">
                                                <div className="text-sidebar-inner w-100">
                                                    <ul className="list-inline">

                                                        <li>
                                                            <NavLink to={routes.dashboard.distributor.self}
                                                                     className="d-flex align-items-center w-100 px-3">{t('profile_dist')}</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-inline-block w-100">
                                            <div className="icon-sidebar-div float-left">
                                                <NavLink to={routes.dashboard.warehouse.self}
                                                         className="w-100 d-inline-block position-relative px-3 py-3">
                                                    <img className="img-fluid icon-img-main icon-primary"
                                                         alt="profile-icon"
                                                         src={Images.new_warehouse_sidebar}/>
                                                    <img
                                                        className="img-fluid icon-img-main icon-white position-absolute"
                                                        alt="profile-icon"
                                                        src={Images.new_warehouse_sidebar_white}/>
                                                </NavLink>
                                            </div>
                                            <div className="text-sidebar-div py-3 float-left">
                                                <div className="text-sidebar-inner w-100">
                                                    <ul className="list-inline">

                                                        <li>
                                                            <NavLink to={routes.dashboard.warehouse.self}
                                                                     className="d-flex align-items-center w-100 px-3">{t('inventory_mgmt')}</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink to={routes.dashboard.warehouse.inventory}
                                                                     className="d-flex align-items-center w-100 px-3">{t('inventory')}</NavLink>
                                                        </li>
                                                        <Role allow={["admin"]}>
                                                            <li>
                                                                <NavLink to={routes.dashboard.warehouse.container.self}
                                                                         className="d-flex align-items-center w-100 px-3">{t('pending_containers')}</NavLink>
                                                            </li>
                                                        </Role>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="d-inline-block w-100">
                                            <div className="icon-sidebar-div float-left">
                                                <NavLink to={routes.dashboard.sales_analytics}
                                                         className="w-100 d-inline-block position-relative px-3 py-3">
                                                    <img className="img-fluid icon-img-main icon-primary"
                                                         alt="profile-icon"
                                                         src={Images.analystic}/>
                                                    <img
                                                        className="img-fluid icon-img-main icon-white position-absolute"
                                                        alt="profile-icon"
                                                        src={Images.analystic_white}/>
                                                </NavLink>
                                            </div>
                                            <div className="text-sidebar-div py-3 float-left">
                                                <div className="text-sidebar-inner w-100">
                                                    <ul className="list-inline">

                                                        <li>
                                                            <NavLink to={routes.dashboard.sales_analytics}
                                                                     className="d-flex align-items-center w-100 px-3">{t('analytics')}</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </Role>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(ToggleSidebar));
