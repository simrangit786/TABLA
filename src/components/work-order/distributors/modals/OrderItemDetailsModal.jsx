import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {Image as Images} from "../../../Images";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {withTranslation} from "react-i18next";

const moment = require('moment');

class OrderItemDetailsModal extends Component {

    render() {
        const {t, item} = this.props;
        return (
            <Modal
                style={{top: 15}}
                title={item.sku}
                visible={true}
                onOk={this.props.onClose}
                onCancel={this.props.onClose}
                width="75%"
                footer={false}
                okText={t('add')}
                cancelText={t('cancel')}
                closable={false}
                className="confirm-modal-main"
            >
                <div className="row mx-0 py-4 px-3">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon close-header-second w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <div className="col-12 clearfix list-main-drawer">
                        <div className="row mx-0 add-item-list-row-header">
                            <div className="row mx-0 list-item-second-header pt-0 w-100">
                                <div className="col-sm-8 col-12 flex-align-center">

                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-0 item-detail-height">
                            <div className="row mx-0 list-item-card-row">
                                <div className="col-12">
                                    <div className="row mx-0 item_single-card w-100 bg-transparent border-0">
                                        <div className="item-img-div item-slider-div">
                                            <Carousel className="w-100">
                                                {item.item.variant_images.map(
                                                    (p, index) => <div className="w-100 h-100 flex-align-center-center">
                                                        <img key={`variant_image_${index}`} src={p.image}
                                                             alt="slider-img"
                                                             className="img-fluid w-auto"/>
                                                    </div>
                                                )}
                                            </Carousel>
                                        </div>
                                        <div
                                            className="item-data-div position-relative item-slider-data-div bg-transparent">
                                            <h5 className="font-weight-bold">{item.item.product.name}</h5>
                                            <p className="font-weight-normal">{t('product_ref')} : {item.item.sku}</p>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('selling_price')} :</li>
                                                {/*{item.coupon_price?*/}
                                                {/*<li className="list-inline-item m-0"><del>€{(parseFloat(item.price) / item.quantity).toFixed(0)}</del>  €{(item.coupon_price / item.quantity).toFixed(0)}</li>*/}
                                                {/*:*/}
                                                {/*}*/}
                                                <li className="list-inline-item m-0">€{(parseFloat(item.price) / item.quantity).toFixed(0)}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('category')} :</li>
                                                <li className="list-inline-item m-0 dark-gray">{item.item.product.category.name}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('conditioning')} :</li>
                                                <li className="list-inline-item m-0 dark-gray">{item.item.units_per_set}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('diliver_soon')} :</li>
                                                <li className="list-inline-item m-0 dark-gray">{item.item.in_stock ?
                                                    moment().add(14, 'days').format("DD/MM/YYYY") :
                                                    moment().add(21, 'days').format("DD/MM/YYYY")}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('color')} :</li>
                                                <li className="list-inline-item m-0">
                            <span key={`color_code`}
                                  style={{backgroundColor: item.item.colour_code}}
                                  className={"color-card d-inline-block mr-1 active"}/>
                                                </li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('quantity')} :</li>
                                                <li className="list-inline-item m-0">
                                                    {/*<InputNumber min={1} max={10} defaultValue={1} onChange={onChange}/>*/}
                                                    <div className="item-qty-tag-div">
                                                        <label><h6>{item.quantity} article
                                                            / {item.quantity / item.item.units_per_set} sets</h6>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div
                                                className="card-footer-div flex-align-center w-100 list-footer mt-3 position-relative">
                                                <div className="mr-3 card-text-footer">
                                                    <h6 className="mb-0 font-weight-bold">€{item.price}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default (withTranslation('common')(OrderItemDetailsModal));
