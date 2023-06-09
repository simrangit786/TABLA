import React, {Component} from 'react';
import {Image as Images} from "../Images";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {routes} from "../../controller/routes";
import {Role} from "../../utils";

class WareHouse extends Component {
    render() {
        const {t} = this.props;
        return (
            <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                <div className="container-fluid margin-top-ipad-30">
                    <div className="row w-100 m-0">
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100" to={routes.dashboard.warehouse.inventory}>
                                <div className="card active text-center">
                                    <div className="profile-img-div mt-4">
                                        <img className="img-fluid img-h-60" alt="icon" src={Images.wareHouse_icon}/>
                                    </div>
                                    {/* <h6 className=" icons-texts ">{t('inventory')}</h6> */}
                                    <h6 className=" icons-texts ">{t('Articles')}</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="profile-card-main px-3 py-0">
                            <Link className="d-inline-block w-100" to={routes.dashboard.warehouse.component}>
                                <div className="card active text-center">
                                    <div className="profile-img-div mt-4">
                                        <img className="img-fluid img-h-60" alt="icon" src={Images.component_icon}/>
                                    </div>
                                    {/* <h6 className=" icons-texts ">{t('inventory')}</h6> */}
                                    <h6 className=" icons-texts ">{t('Components')}</h6>
                                </div>
                            </Link>
                        </div>
                        <Role allow={["admin"]}>
                            <div className="profile-card-main px-3 py-0">
                                <Link className="d-inline-block w-100" to={routes.dashboard.warehouse.container.self}>
                                    <div className="card active text-center">
                                        <div className="profile-img-div  mt-4">
                                            <img className="img-fluid img-h-60" alt="icon" src={Images.containers}/>
                                        </div>
                                        <h6 className="icons-texts">{t('pending_containers')}</h6>
                                    </div>
                                </Link>
                            </div>
                        </Role>
                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(WareHouse));
