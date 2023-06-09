import React, {Component} from 'react';
import idx from "idx";
import {Role} from "../../../../utils";

class ComponentsGeneralInfo extends Component {
    render() {
        // debugger
        const {variant, t} = this.props;
        return (
            <div className="col-12 px-0">
                <div className="row card-details-general-row">
                    <div className="col-lg-5 col-sm-12 col-12 col-md-6">
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-50 width-100-tab m-0">{t('type_of_room')} :</li>
                            <li className="list-inline-item w-50 width-100-tab m-0">
                                <span>{idx(variant, _ => _.piece_type)}</span>
                            </li>
                        </ul>
                        {/* <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-50 width-100-tab m-0">{t('family')} :</li>
                            <li className="list-inline-item w-50 width-100-tab m-0">
                                <span>{idx(variant, _ => _.product.name)}</span>
                            </li>
                        </ul> */}
                        <Role allow={["admin"]}>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item w-50 width-100-tab m-0">{t('supplier')} :</li>
                                <li className="list-inline-item w-50 width-100-tab m-0">
                                    <span>{idx(variant, _ => _.supplier.company_name)}</span>
                                </li>
                            </ul>
                        </Role>
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-50 width-100-tab m-0">{t('native_country')} :</li>
                            <li className="list-inline-item w-50 width-100-tab m-0">
                                <span>{variant.origin_country}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-7 col-sm-12 col-12 decimal-div">
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-75 width-100-tab m-0">{t('widht')} (cm) :
                            </li>
                            <li className="list-inline-item w-25 width-100-tab m-0">
                                <span>{variant.width}</span>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-75 width-100-tab m-0">{t('height')} (cm) :
                            </li>
                            <li className="list-inline-item w-25 width-100-tab m-0">
                                <span>{variant.height}</span>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-75 width-100-tab m-0">{t('depth')} (cm) :
                            </li>
                            <li className="list-inline-item w-25 width-100-tab m-0">
                                <span>{variant.depth}</span>
                            </li>
                        </ul>
                        {/* <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-75 width-100-tab m-0">{t('weight')} (kg) :
                            </li>
                            <li className="list-inline-item w-25 width-100-tab m-0">
                                <span>{variant.weight}</span>
                            </li>
                        </ul> */}
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-75 width-100-tab m-0">M3 :
                            </li>
                            <li className="list-inline-item w-25 width-100-tab m-0">
                                <span>{variant.m3}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ComponentsGeneralInfo;
