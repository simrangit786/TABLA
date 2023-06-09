import React, {Component} from 'react';
import {Button, Icon, InputNumber, Modal} from "antd";
import {Image as Images} from "../../Images";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {withTranslation} from "react-i18next";

const moment = require('moment');

class ItemDetailsModal extends Component {
    state = {
        selected: 0,
    }

    changeSelected = (selected) => {
        this.setState({selected})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selected !== this.state.selected)
            this.forceUpdate();
    }

    render() {
        const {t, product, handleSubmit, onChange, quantity, location, container} = this.props;
        const {selected} = this.state;
        return (
            <Modal
                style={{top: 15}}
                title={product.variant[selected].sku}
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
                                    {container ? '' : <h6 className="m-0 font-weight-bold">
                                        <div className="img-cart-add-tag position-relative float-left">
                                            <img src={Images.warehouse_black_icon} alt="ware-house-icon"
                                                 className="img-fluid mr-1"/>
                                            {/*to show cart is not empty*/}
                                            <span className="position-absolute tag-cart-notification"> </span>
                                        </div>
                                        {location.address_json.type} : <p>0 Article(s) ajuote(s)</p>

                                    </h6>}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-0 item-detail-height">
                            <div className="row mx-0 list-item-card-row">
                                <div className="col-12">
                                    <div className="row mx-0 item_single-card w-100 bg-transparent border-0">
                                        <div className="item-img-div item-slider-div">
                                            <Carousel className="w-100">
                                                {product.variant[selected].variant_images.map(
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
                                            <h5 className="font-weight-bold">{product.name}</h5>
                                            <p className="font-weight-normal">{t('product_ref')} : {product.variant[selected].sku}</p>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('selling_price')} :</li>
                                                <li
                                                    className="list-inline-item m-0">€{(product.variant[selected].factory_price_euro * product.variant[selected].tablacasa_sales_coefficient).toFixed(2)}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('category')} :</li>
                                                <li className="list-inline-item m-0 dark-gray">{product.category.name}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('in_stock')} :</li>
                                                <li className="list-inline-item m-0 text-success">{product.variant[selected].in_stock}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('conditioning')} :</li>
                                                <li className="list-inline-item m-0 dark-gray">{product.variant[selected].units_per_set}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('diliver_soon')} :</li>
                                                <li className="list-inline-item m-0 dark-gray">{product.variant[selected].in_stock ?
                                                    moment().add(14, 'days').format("DD/MM/YYYY") :
                                                    moment().add(21, 'days').format("DD/MM/YYYY")}</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('color')} :</li>
                                                <li className="list-inline-item m-0">
                                                    {product.variant.map((variant, index) =>
                                                        <span key={`color_code_${index}`}
                                                              style={{backgroundColor: variant.colour_code}}
                                                              onClick={() => this.changeSelected(index)}
                                                              className={`color-card d-inline-block mr-1 ${selected === index ? 'active' : null}`}/>
                                                    )}
                                                </li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item m-0">{t('quantity')} :</li>
                                                <li className="list-inline-item m-0">
                                                    {/*<InputNumber min={1} max={10} defaultValue={1} onChange={onChange}/>*/}
                                                    <div className="item-qty-tag-div">
                                                        <InputNumber defaultValue={quantity} onChange={onChange}
                                                                     step={product.variant[selected].units_per_set}
                                                                     min={product.variant[selected].units_per_set}/>
                                                        <h6>{quantity / product.variant[selected].units_per_set} sets</h6>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div
                                                className="card-footer-div flex-align-center w-100 list-footer mt-3 position-relative">
                                                <div className="mr-3 card-text-footer">
                                                    <h6 className="mb-0 font-weight-bold">€125.95</h6>
                                                </div>
                                                <Button onClick={handleSubmit} style={{width: '40%', marginLeft: '10%'}}
                                                        type="primary">
                                                    <Icon type="plus"/>
                                                    {t('add')}
                                                </Button>
                                            </div>
                                            {/*<div className="promotions-div col-12 p-0 w-100 mt-5 pt-4">*/}
                                            {/*    <h6 className="w-100 font-weight-bold">Promotions</h6>*/}
                                            {/*    <Button*/}
                                            {/*        className="add-btn p-0 bg-white flex-align-center-center float-left mr-2">*/}
                                            {/*        <img src={Images.plus_icon} alt="plus icon" className="img-fluid"/>*/}
                                            {/*    </Button>*/}
                                            {/*    <span className="hover-common-div-down flex-align-center float-left">*/}
                                            {/*    <img src={Images.cross_icon} alt="plus icon"*/}
                                            {/*         className="img-fluid mr-2"/>*/}
                                            {/*    DEC20OFF*/}
                                            {/*    </span>*/}
                                            {/*</div>*/}
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

export default (withTranslation('common')(ItemDetailsModal));
