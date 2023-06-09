import React, {Component} from 'react';
import {Image as Images} from "../Images";
import {Link} from "react-router-dom";
import {routes} from "../../controller/routes";
import {withTranslation} from "react-i18next";

class WorkOrderDashboard extends Component {
    render() {
        const {t} = this.props;
        return (
            <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                <div className="container-fluid margin-top-ipad-30">
                    <div className="row w-100 m-0">
                        {/*<div className="profile-card-main px-3 py-0">*/}
                        {/*    <Link className="d-inline-block w-100"*/}
                        {/*          to={routes.dashboard.sales.work_order.self}>*/}
                        {/*        <div className="card active text-center">*/}
                        {/*            <div className="profile-img-div mt-4">*/}
                        {/*                <img className="img-fluid" alt="icon" src={Images.profile_group}/>*/}
                        {/*            </div>*/}
                        {/*            <h6 className="icons-texts">Profils groupes</h6>*/}
                        {/*        </div>*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100"
                                  to={routes.dashboard.sales.work_order.self}>
                                <div className="card active text-center">
                                    <div className="profile-img-div mt-4">
                                        <img className="img-fluid" alt="icon" src={Images.profile_distributor_new}/>
                                    </div>
                                    <h6 className="icons-texts">{t('btn_work_order')}</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_qcs_new}/>
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_qcs_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('qcs_work_order')}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_agent_new}/>
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_sales_agent_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('sales_agent_work_order')}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_director_new}/>
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_director_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('director_agent_work_order')}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_supplier_new}/>
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_supplier_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('supplier_agent_work_order')}</h6>
                                </div>
                            </div>
                        </div>

                        {/*<div className="profile-card-main px-3 py-0">*/}
                        {/*    <div className="d-inline-block w-100">*/}
                        {/*        <div className="card text-center">*/}
                        {/*            <span> {t('comming_soon')}</span>*/}
                        {/*            <div className="profile-img-div position-relative mt-4">*/}
                        {/*                <img className="img-fluid main-img-icon primary-icon" alt="icon"*/}
                        {/*                     src={Images.profile_suppliers_gray}/>*/}
                        {/*                <img className="img-fluid main-img-icon gray-icon" alt="icon"*/}
                        {/*                     src={Images.profile_director_gray}/>*/}
                        {/*            </div>*/}
                        {/*            <h6 className="icons-texts">{t('profile_supp')}</h6>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_vendor_new}/>
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_vendor_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('vendor_agent_work_order')}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_ecommerce_new}/>
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_e_commerce_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('e_commerce_agent_work_order')}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(WorkOrderDashboard));
