import React, {Component} from 'react';
import {Role} from "../../../../utils";

class ComponentsVariantInfoSummary extends Component {
    render() {
        const {variant, t, i18n} = this.props;
        return (
            <div className="col-12 px-0">
                <div className="row card-details-general-row p-0 bg-transparent">
                    <div className="col-lg-5 col-sm-12 col-12 col-md-5">
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-50 width-100-tab m-0">{t('code_sku')} :</li>
                            <li className="list-inline-item w-50 width-100-tab m-0">
                                <Role allow={["admin"]}>
                                    <span>{variant.sku}</span>
                                </Role>
                                <Role allow={["distributor", 'sales_person']}>
                                    {/* <span>{variant.sku}-{parseInt(variant.price)}{variant.coupon_price ? `-${parseInt(variant.coupon_price)}` : ""}</span> */}
                                </Role>
                            </li>
                        </ul>
                        <ul className="list-inline  mb-0 w-100">
                            <li className="list-inline-item w-50 width-100-tab m-0">{t('color')} :</li>
                            <li className="list-inline-item w-50 width-100-tab m-0">
                                {variant.colour} ({variant.colour_code})<br/>
                                <h6 className="color-tag-rounded flex-align-center-center"
                                    style={{borderColor: `${variant.colour_code}`}}>
                            <span style={{backgroundColor: `${variant.colour_code}`}}
                                  className="color-tag-div-inner d-inline-block"/>
                                </h6>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-50 width-100-tab m-0">{t('conditioning')} :</li>
                            <li className="list-inline-item w-50 width-100-tab m-0">
                                <span>{variant.units_per_set}</span>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-50 width-100-tab m-0">{t('description_supplier')} :</li>
                            <li className="list-inline-item w-50 width-100-tab m-0">
                                <span className="small-text-tag">{variant['description_' + i18n.language]}</span>
                            </li>
                        </ul>
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-50 width-100-tab m-0">{t('description_additional')} :</li>
                            <li className="list-inline-item w-50 width-100-tab m-0">
                                <span className="small-text-tag">{variant['material_' + i18n.language]}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-7 col-sm-12 col-12 decimal-div">
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item w-75 width-100-tab m-0">{t('eco_share')} :</li>
                            <li className="list-inline-item w-25 width-100-tab m-0">
                                <span>{variant.eco_part}</span>
                            </li>
                        </ul>
                        <Role allow={["admin"]}>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item w-75 width-100-tab m-0">{t('purchase_price_new')} </li>
                                <li className="list-inline-item w-25 width-100-tab m-0">
                                    <span>{variant.factory_price_euro}</span>
                                </li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item w-75 width-100-tab m-0">{t('purchase_price_dollar_view')} :
                                </li>
                                <li className="list-inline-item w-25 width-100-tab m-0">
                                    <span>{variant.factory_price_dollar}</span>
                                </li>
                            </ul>
                        </Role>
                        <Role allow={["admin", 'sales_person']}>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item w-75 width-100-tab m-0">{t('selling_price_new')}
                                    <Role allow={["admin"]}>
                                        <span
                                            className="small">({variant.tablacasa_sales_coefficient} {t('sales_coefficent_new')})</span>
                                    </Role>
                                </li>
                                <li className="list-inline-item w-25 width-100-tab m-0">
                                    <span>{parseFloat(variant.price).toFixed(0)}</span>
                                </li>
                            </ul>
                        </Role>
                        <ul className="list-inline mb-0 w-100">
                            <li
                                className="list-inline-item w-75 width-100-tab m-0">{t('distributor_sales_suggested')}
                                <Role isReverse allow={["distributor"]}>
                <span
                    className="small">({variant.suggested_sales_coefficient} {t('suggested_margin_small')})</span>
                                </Role>
                            </li>
                            <li className="list-inline-item w-25 width-100-tab m-0">
                                <span>{parseFloat(variant.sales_price).toFixed(0)}</span>
                            </li>
                        </ul>
                        <Role allow={["admin"]}>
                            <ul className="list-inline mb-0 w-100">
                                <li
                                    className="list-inline-item w-75 width-100-tab m-0">{t('ecommerce_sales_price')} (€)
                                    :
                                    <span
                                        className="small">({variant.suggested_retail_coefficient} {t('coefficient_ecommerce_small')})</span>
                                </li>
                                <li className="list-inline-item w-25 width-100-tab m-0">
                                    <span>{parseFloat(variant.retail_price).toFixed(0)}</span>
                                </li>
                            </ul>
                        </Role>
                    </div>
                </div>
            </div>
        );
    }
}

export default ComponentsVariantInfoSummary;
