import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {withTranslation} from "react-i18next";
import {Carousel} from "react-responsive-carousel";
import idx from "idx";
import {variantGetOne} from "../../../controller/API/itemApi";
import {Image as Images} from "../../Images";

class PreviewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variant: null,
            loading: true,
            id: props.itemId,
            imageList: props.images
        }
    }

    componentDidMount() {
        const {id} = this.state;
        this.fetch(id);
    }

    fetch(id) {
        this.setState({loading: true});
        variantGetOne(id)
            .then(item => {
                this.setState({variant: item, loading: false})
            })
    }

    render() {
        const {t} = this.props;
        const {variant} = this.state;
        return (
            <Modal
                style={{top: '10%'}}
                title={t('previewArticle')}
                visible={this.props.visible}
                onOk={this.props.onClose}
                onCancel={this.props.onClose}
                okText={t('yes')}
                cancelText={t('no')}
                closable={false}
                width="80%"
                className="confirm-modal-main"
            >
                {variant && <div className="row mx-0 summary-info-row ml-2">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon close-header-second w-auto flex-align-center-center px-2 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <div className="col-12 p-0 ">
                        <div className="row mx-0 py-5">
                            <div className="col-sm-12 col-12 col-md-4 col-lg-4 pl-0">
                                <div className="row mx-0">
                                    <Carousel key={`slider_image_${variant.images.map(d => d.id)}`} className="w-100">
                                        {variant.images.map((img) =>
                                            <div key={`inner_image_${img.id}`} className="w-100">
                                                <img src={img.image} alt="slider-img" className="img-fluid"/>
                                            </div>
                                        )}
                                    </Carousel>
                                </div>
                            </div>
                            <div className="col-sm-12 col-12 col-md-8 col-lg-8 pr-0">
                                <div className="row mx-0 view-item-details-row">
                                    <div className="col-12">
                                        <h5 className="font-weight-bold mb-4">{t('item_details')}</h5>
                                        <h6 className="font-weight-bold heading-inner">{t('general')}</h6>
                                    </div>
                                    <div className="col-12">
                                        <div className="row card-details-general-row">
                                            <div className="col-lg-6 col-sm-12 col-12 col-md-6">
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('category')} :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{idx(variant, _ => _.product.category.name)}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('family')} :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{idx(variant, _ => _.product.name)}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('supplier')} :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{idx(variant, _ => _.supplier.company_name)}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('code_sku')}:</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.sku}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('native_country')} :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.origin_country}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6 col-sm-12 col-12 col-md-6">
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('factory_price')} ($) :
                                                    </li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.price}</span>
                                                    </li>
                                                </ul>

                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">
                                                        {t('purchase_price_new')}:
                                                    </li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.factory_price_euro}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">
                                                        {t('purchase_price_dollar_view')} :
                                                    </li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.factory_price_dollar}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">
                                                        {t('selling_price_new')}
                                                        <small
                                                            className="w-100">({variant.tablacasa_sales_coefficient} {t('sales_coefficent_new')})</small>
                                                    </li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{parseFloat(variant.price).toFixed(2)}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">
                                                        {t('distributor_sales_suggested')}
                                                        <small
                                                            className="w-100">({variant.suggested_sales_coefficient} {t('suggested_margin_small')})</small>
                                                    </li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{parseFloat(variant.sales_price).toFixed(2)}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">
                                                        {t('ecommerce_sales_price')} ($) :
                                                        <small
                                                            className="small">({variant.suggested_sales_coefficient} {t('suggested_margin_small')})</small>
                                                    </li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{parseFloat(variant.retail_price).toFixed(2)}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <h6 className="font-weight-bold heading-inner">{t('description_item')}</h6>
                                    </div>
                                    <div className="col-12">
                                        <div className="row card-details-general-row p-0 bg-transparent">
                                            <div className="col-lg-6 col-sm-12 col-12 col-md-6">
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('length')} (cm) :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.depth}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('width')} (cm) :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.width}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('height')} (cm):</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.height}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6 col-sm-12 col-12 col-md-6">
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('conditioning')} :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.units_per_set}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('color')} :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <h6 className="color-tag-rounded flex-align-center-center"
                                                            style={{borderColor: `${variant.colour_code}`}}>
                                                        <span style={{backgroundColor: `${variant.colour_code}`}}
                                                              className="color-tag-div-inner d-inline-block"/>
                                                        </h6>
                                                    </li>
                                                </ul>
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('material')} :
                                                    </li>
                                                    <li className="list-inline-item w-50 m-0"
                                                        style={{fontSize: '11px', lineHeight: '16px'}}>
                                                        {variant.material}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4 py-2">
                                        <h5 className="font-weight-bold mb-4">{t('stock_info')}</h5>
                                    </div>
                                    <div className="col-12">
                                        <div className="row card-details-general-row py-2">
                                            <div className="col-lg-6 col-sm-12 col-12 col-md-6">
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('in_stock')} :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span className="text-success">{variant.in_stock}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6 col-sm-12 col-12 col-md-6">
                                                <ul className="list-inline d-inline-block mb-0 w-100">
                                                    <li className="list-inline-item w-50 m-0">{t('in_trasit')} :</li>
                                                    <li className="list-inline-item w-50 m-0">
                                                        <span>{variant.in_transit}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {/*<div>*/}
                {/*<Button key="back" onClick={this.props.onClose}>*/}
                {/*{t('no')}*/}
                {/*</Button>,*/}
                {/*<Button key="submit" type="primary" onClick={this.props.onClose}>*/}
                {/*{t('yes')}*/}
                {/*</Button>*/}
                {/*</div>*/}
                
            </Modal>
        );
    }
}


export default (withTranslation('common')(PreviewItem));
