import React, {Component} from 'react';
import {Button, Tooltip} from "antd";
import {Image as Images} from "./Images";
import {NavLink} from "react-router-dom";
import {routes} from "../controller/routes";
import {withTranslation} from "react-i18next";
import {Role} from "../utils";

class SideBar extends Component {
    render() {
        const {t} = this.props;
        return (
            <div className="side-bar-div fixed-top h-100">
                <div className="row hamburger-menu-row mx-0 align-items-center">

                    <Button id="toggle_btn" className="border-0 bg-transparent w-100 px-3">
                        <img className="img-fluid" alt="hamburger-menu" src={Images.hamburger_menu}/>
                    </Button>

                </div>
                <div className="row mx-0 side-bar-link-details">
                    <ul className="list-inline w-100 mb-0">
                        <Role allow={["sales_person"]}>
                            <li>
                                <Tooltip title={t('profile_distributor')} placement="right">
                                    <NavLink to={routes.dashboard.distributor.self}
                                             className="w-100 d-inline-block position-relative px-3 py-3">
                                        <img className="img-fluid icon-img-main icon-primary" alt="profile-icon"
                                             src={Images.new_profile_sidebar}/>
                                        <img className="img-fluid icon-img-main icon-white position-absolute"
                                             alt="profile-icon"
                                             src={Images.new_profile_sidebar_white}/>
                                    </NavLink>
                                </Tooltip>
                            </li>
                        </Role>
                        <Role allow={["admin"]}>
                            <li>
                                <Tooltip title={t('all_profiles')} placement="right">
                                    <NavLink to={routes.dashboard.profiles.self}
                                             className="w-100 d-inline-block px-3 py-3 position-relative">
                                        <img className="img-fluid icon-img-main icon-primary" alt="profile-icon"
                                             src={Images.new_profile_sidebar}/>
                                        <img className="img-fluid icon-img-main icon-white position-absolute"
                                             alt="profile-icon"
                                             src={Images.new_profile_sidebar_white}/>
                                    </NavLink>
                                </Tooltip>
                            </li>
                        </Role>
                        <Role allow={["admin"]}>
                            <li>
                                <Tooltip title={t('dash.sales_ops')} placement="right">
                                    <NavLink to={routes.dashboard.sales.self}
                                             className="w-100 d-inline-block px-3 py-3 position-relative">
                                        <img className="img-fluid icon-img-main icon-primary" alt="profile-icon"
                                             src={Images.new_workorder_sidebar}/>
                                        <img className="img-fluid icon-img-main icon-white position-absolute sales_icon"
                                             alt="profile-icon"
                                             src={Images.new_workorder_sidebar_white}/>
                                    </NavLink>
                                </Tooltip>
                            </li>
                        </Role>
                        <li>
                            <Tooltip title={t('inventory_mgmt')} placement="right">
                                <NavLink to={routes.dashboard.warehouse.self}
                                         className="w-100 d-inline-block position-relative px-3 py-3">
                                    <img className="img-fluid icon-img-main icon-primary" alt="profile-icon"
                                         src={Images.new_warehouse_sidebar}/>
                                    <img className="img-fluid icon-img-main icon-white position-absolute"
                                         alt="profile-icon"
                                         src={Images.new_warehouse_sidebar_white}/>
                                </NavLink>
                            </Tooltip>
                        </li>
                        <Role allow={["sales_person"]}>
                            <li>
                                <Tooltip title={t('analytics')} placement="right">
                                    <NavLink to={routes.dashboard.sales_analytics}
                                             className="w-100 d-inline-block position-relative px-3 py-3">
                                        <img className="img-fluid icon-img-main icon-primary" alt="profile-icon"
                                             src={Images.analystic}/>
                                        <img className="img-fluid icon-img-main icon-white position-absolute"
                                             alt="profile-icon"
                                             src={Images.analystic_white}/>
                                    </NavLink>
                                </Tooltip>
                            </li>
                        </Role>
                        <Role allow={["admin"]}>
                            <li>
                                <Tooltip title={t('analytics')} placement="right">
                                    <NavLink to={routes.dashboard.sales_workorder_analytics}
                                             className="w-100 d-inline-block position-relative px-3 py-3">
                                        <img className="img-fluid icon-img-main icon-primary" alt="profile-icon"
                                             src={Images.analystic}/>
                                        <img className="img-fluid icon-img-main icon-white position-absolute"
                                             alt="profile-icon"
                                             src={Images.analystic_white}/>
                                    </NavLink>
                                </Tooltip>
                            </li>
                        </Role>
                    </ul>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(SideBar));
