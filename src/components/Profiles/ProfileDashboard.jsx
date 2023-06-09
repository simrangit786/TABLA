import React, {Component} from 'react';
import {Image as Images} from "../Images";
import {Link} from "react-router-dom";
import {routes} from "../../controller/routes";
import {reverse} from "named-urls";
import {withTranslation} from "react-i18next";

class ProfileDashboard extends Component {
    render() {
        const {t} = this.props;
        return (
            <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                <div className="container-fluid margin-top-ipad-30">
                    <div className="row w-100 m-0">
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100"
                                  to={reverse(routes.dashboard.profiles.groups.self)}>
                                <div className="card active text-center">
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_groups}/>
                                    </div>
                                    <h6 className="icons-texts">{t('grp_profiles')}</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100"
                                  to={reverse(routes.dashboard.profiles.distributor.self)}>
                                <div className="card active text-center">
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_distributor_new}/>
                                    </div>
                                    <h6 className="icons-texts">{t('profile_distributor')}</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        {/*<img className="img-fluid main-img-icon primary-icon" alt="icon"*/}
                                        {/*     src={Images.profile_supplier_new}/>*/}
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_supplier_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('profile_supp')}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        {/*<img className="img-fluid main-img-icon primary-icon" alt="icon"*/}
                                        {/*     src={Images.profile_qcs_new}/>*/}
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_qcs_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('qcs_profile')}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100"
                                  to={reverse(routes.dashboard.profiles.representative.self)}>
                                <div className="card active text-center">
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.group_profile}/>
                                    </div>
                                    <h6 className="icons-texts">{t('sales_represents')}</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        {/*<img className="img-fluid main-img-icon primary-icon" alt="icon"*/}
                                        {/*     src={Images.profile_director_new}/>*/}
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_director_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('profile_director')}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        {/*<img className="img-fluid main-img-icon primary-icon" alt="icon"*/}
                                        {/*     src={Images.profile_vendor_new}/>*/}
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_vendor_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('vendor_profile')}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <div className="d-inline-block w-100">
                                <div className="card text-center">
                                    <span> {t('comming_soon')}</span>
                                    <div className="profile-img-div position-relative mt-4">
                                        {/*<img className="img-fluid main-img-icon primary-icon" alt="icon"*/}
                                        {/*     src={Images.profile_ecommerce_new}/>*/}
                                        <img className="img-fluid main-img-icon gray-icon" alt="icon"
                                             src={Images.profile_e_commerce_gray}/>
                                    </div>
                                    <h6 className="icons-texts">{t('profile_e_commerce')}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100"
                                  to={reverse(routes.dashboard.profiles.entity.method)}>
                                <div className="card active text-center">
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.profile_entity}/>
                                    </div>
                                    <h6 className="icons-texts mt-n5">{t('profiles_entity')}</h6>
                                </div>
                            </Link>
                        </div>
                        {/* this is my work */}
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100"
                                  to={reverse(routes.dashboard.profiles.tarifaire.self)}>
                                <div className="card active text-center">
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.tarifaire_groupes}/>
                                    </div>
                                    <h6 className="icons-texts mt-n5">{t('profile_tarifaire_groupes')}</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100"
                                  to={reverse(routes.dashboard.profiles.tarifs.self)}>
                                <div className="card active text-center">
                                    <div className="profile-img-div position-relative mt-4">
                                        <img className="img-fluid main-img-icon primary-icon" alt="icon"
                                             src={Images.tarifs_groupes}/>
                                    </div>
                                    <h6 className="icons-texts mt-n5">{t('tarifs')}</h6>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(ProfileDashboard));
