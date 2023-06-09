import React, {Component} from 'react';
import {Button, Spin} from "antd";
import {Image as Images} from "../../../Images";
import {distributorWorkorderUpdate} from "../../../../controller/API/salesOperationAPI";
import {history} from "../../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../../controller/routes";
import {methods, order_type, profiles} from "../../../../controller/Global";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import ConfirmPopup from "../../../modal/ConfirmPopup";
import {STATUS} from "../../../../controller/enums"
import {connect} from "react-redux";
import {getOneWorkorder} from "../../../../redux/Actions/workOrderAction";
import {AdditionalDiscount} from "../modals/AdditionalDiscount";
import DeliveryFees from "../work-order-view/workOrderComponents/DeliveryFees";

const moment = require('moment');


class StepInfo extends Component {
    state = {
        data: null,
        loading: false,
        confirmPopup: false,
        discountVisible: false,
        deliveryFeesVisible: false
    };
    fetch = (id) => {
        this.props.getOneWorkorder(id)
    };

    handleDeliveryFeesPopup = (deliveryFeesVisible) => {
        this.setState({deliveryFeesVisible})
        if (!deliveryFeesVisible) {
            this.props.getOneWorkorder(this.props.workorder.id)
        }
    }

    updateWorkOrderStatus = () => {
        this.setState({loading: true});
        const status = this.props.work_order.status === 'draft' ? "processing" : this.props.work_order.status
        distributorWorkorderUpdate(this.props.work_order.id, {"status": status})
            .then(() => {
                this.setState({loading: false});
            })
        this.handleConfirmPopup(true);
    };

    handleDiscountPopup = (discountVisible) => {
        if (!discountVisible) {
            this.props.getOneWorkorder(this.props.workorder.id)
        }
        this.setState({discountVisible})
    };

    onOkWorkOrderButton = () => {
        history.push(reverse(routes.dashboard.sales.work_order.method, {
            method: methods.view,
            type: profiles.distributor,
            id: this.props.work_order.id
        }))
    };


    handleConfirmPopup = (confirmPopup) => {
        this.setState({confirmPopup})
    };

    componentDidMount() {
        this.fetch(this.props.work_order.id)
    }

    render() {
        const {t, workorder} = this.props;
        const {loading, confirmPopup} = this.state;
        const data = workorder;
        return (
            <React.Fragment>
                <div className="information-summary-work-order">
                    {data ?
                        <React.Fragment>
                            <div className="step-info-div">
                                <div className="row mx-0">
                                    <div className="col-sm-8 col-12 step-info-left">
                                        <div className="row step-info-div">
                                            <div className="col-12">
                                                <h5>{t('info')}</h5>
                                            </div>
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-sm-7 col-12">
                                                        <p className="font-weight-normal">{t('purchase_ourder_no')} :</p>
                                                    </div>
                                                    <div className="col-sm-5 col-12 p-0">
                                                        <p>{data.id}</p>
                                                    </div>
                                                </div>
                                                <div className="row my-2">
                                                    <div className="col-sm-7 col-12">
                                                        <p className="font-weight-normal">{t('order_status')} :</p>
                                                    </div>
                                                    <div className="col-sm-5 col-12 p-0">
                                                        {/*<p>Draft</p>*/}
                                                        <div className="row mx-0 align-items-center">
                                                            <Button
                                                                className={"text-uppercase font-weight-bold mr-2 pl-2 status-btn status-gray-btn " + t(`${data.status}`)}>{STATUS[data.status]}</Button>
                                                            <a className="d-inline-block" href="#">
                                                                <img src={Images.info_icon} alt="info icon"
                                                                     className="img-fluid"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-7 col-12">
                                                        <p className="font-weight-normal">{t('date_creted_purchase_order')} :</p>
                                                    </div>
                                                    <div className="col-sm-5 col-12 p-0">
                                                        <p>{moment(data.workorder_creation_date).format('DD/MM/YYYY')}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-7 col-12">
                                                        <p className="font-weight-normal">{t('pay_method')} :</p>
                                                    </div>
                                                    <div className="col-sm-5 col-12 p-0">
                                                        <p>{data.payment_mode.title}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-7 col-12">
                                                        <p className="font-weight-normal">{t('pay_status')} :</p>
                                                    </div>
                                                    <div className="col-sm-5 col-12 p-0">
                                                        <p>{t('outstanting_payment')}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-7 col-12">
                                                        <p className="font-weight-normal">{t('total_items')} :</p>
                                                    </div>
                                                    <div className="col-sm-5 col-12 p-0">
                                                        <p>{data.total_items}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-7 col-12">
                                                        <p className="font-weight-normal">{t('internal_note')} :</p>
                                                    </div>
                                                    <div className="col-sm-5 col-12 p-0">
                                                        <p>{data.internal_note}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-7 col-12">
                                                        <h5>{t('distributor_info')}</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-7 col-12">
                                                        <p className="font-weight-normal">{t('client_name')} :</p>
                                                        <p className="font-weight-normal">{t('email_address')} : </p>
                                                        <p className="font-weight-normal">{t('company_number')} :</p>
                                                        <p className="font-weight-normal">{t('address')} : </p>
                                                    </div>
                                                    <div className="col-sm-5 col-12 p-0">
                                                        <p>{data.client.client_name}</p>
                                                        <p>{data.client.client_email}</p>
                                                        <p>{data.client.address.length > 0 ? `(${data.client.address[0].country_code}) ${data.client.address[0].phone_number?.match(/.{1,2}/g).join(" - ")}` : 'N/A'}</p>
                                                        <p>{data.client.address.length > 0 ? `${data.client.address[0].address}, ${data.client.address[0].zip_code}, ${data.client.address[0].city}, ${data.client.address[0].country}` : 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-12 step-info-right">
                                        <h4>{t('payment_details')} : </h4>
                                        <div className="row">
                                            <div className="col-sm-7 col-12">
                                                <p>Total HT :</p>
                                            </div>
                                            <div className="col-sm-5 col-12">
                                                <p className="text-right"><span
                                                    className="mr-1">&euro;</span> {data.total_amount.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-7 col-12">
                                                <p>Net HT <small>({data.total_items} articles)</small> :</p>
                                            </div>
                                            <div className="col-sm-5 col-12">
                                                <p className="text-right"><span
                                                    className="mr-1">&euro;</span> {data.total_amount.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-7 col-12">
                                                <p>Total Eco-Part HT :</p>
                                            </div>
                                            <div className="col-sm-5 col-12">
                                                <p className="text-right"><span
                                                    className="mr-1">&euro;</span> {data.net_eco_part.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-7 col-12">
                                                <p>{t('additional_discount') + '(€)'}:</p>
                                            </div>
                                            <div className="col-sm-5 col-12">
                                                <p className="text-right">€ {data.discount_price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-7 col-12">
                                                <p>{t('additional_discount') + '(%)'}:</p>
                                            </div>
                                            <div className="col-sm-5 col-12">
                                                <p className="text-right">% {data.discount_percentage.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                      <div className="col-sm-7 col-12">
                        <p>Frais de livraison :</p>
                      </div>
                      <div className="col-sm-5 col-12">
                        <p className="text-right">
                          <Button onClick={() => this.handleDeliveryFeesPopup(true)}
                                  className={"plus-add-btn"}><Icon type="plus"/>
                          </Button> € {data.delivery_fees}
                        </p>
                      </div>
                    </div> */}
                                        <div className="row">
                                            <div className="col-sm-7 col-12">
                                                <p>Total TVA (20%) :</p>
                                            </div>
                                            <div className="col-sm-5 col-12">
                                                <p className="text-right"><span
                                                    className="mr-1">&euro;</span> {data.total_tva.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-7 col-12">
                                                <p>Net TTC :</p>
                                            </div>
                                            <div className="col-sm-5 col-12">
                                                <p className="text-right"><span
                                                    className="mr-1">&euro;</span> {data.net_ttc.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="row total-row-info">
                                            <div className="col-sm-7 col-12">
                                                <h5>Net TTC a regler (avec Eco-Part) :</h5>
                                            </div>
                                            <div className="col-sm-5 col-12">
                                                <h5 className="float-right"><span
                                                    className="mr-1">&euro;</span> {data.final_amount.toFixed(2)}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="row total-row-info">
                                            <div className="col-sm-12 col-12">
                                                <Button className="discount-btn"
                                                        onClick={() => this.handleDiscountPopup(true)}>{t('add_additional_discount')}</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {data.locations.map((loc, index) =>
                                    <div key={`location_group_${index}`}
                                         className="row mx-0 shopping-address-details-row mt-3 mb-3">
                                        <div
                                            className="col-12 col-lg-3 col-md-12 col-sm-6 pl-0 padding-responsive-left">
                                            <div className="address-heading row mx-0">
                                                <h6 className="text-uppercase mb-0 flex-align-center">
                                                    <img src={Images.delivery_gray_icon} alt="delivery icon"
                                                         className="img-fluid mr-3"/>
                                                    <span>{t('shipping_address')}</span>
                                                </h6>
                                            </div>
                                            <div className="row shopping-address-cart">
                                                <div className="col-12 pr-0">
                                                    <div className="text-center w-100 card-shopping">
                                                        <img src={Images.ware_house_big} alt="delivery icon"
                                                             className="img-fluid"/>
                                                        <h5>{loc.address_json.type}</h5>
                                                        <p>{loc.address_json.title}</p>
                                                        <p
                                                            className="mb-0">{`${loc.address_json.address}, ${loc.address_json.zip_code}, ${loc.address_json.city}, ${loc.address_json.country}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="col-12 col-lg-8 offset-lg-1 col-md-12 col-sm-6 pr-0 padding-responsive-right">
                                            {loc.group && loc.group.map((d, index) =>
                                                <div key={`group_card_${index}`} className="row mx-0">
                                                    <div className="col-12 p-0">
                                                        <div className="address-heading row mx-0">
                                                            <div className="col-12">
                                                                <h5 className="text-uppercase mb-0 flex-align-center">
                                                                    {d.name} : <span>{moment(d.delivery_date).format('DD/MM/YYYY')} </span><span>&nbsp;&nbsp;{d.comment}</span>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="row mx-0 shopping-address-cart">
                                                            <div className="col-12 pr-0">
                                                                {d.items.map((item, index) => {
                                                                    return <div key={index}
                                                                                className="w-100 card-shopping card-details-main mb-3">
                                                                        <div
                                                                            className="row mx-0 flex-align-center-between">
                                                                            <div className="icon-img">
                                                                                <img
                                                                                    src={item.item.variant_images.length > 0 ? item.item.variant_images[0].image : ""}
                                                                                    alt="chair_furtif"
                                                                                    className="img-fluid mb-0"/>
                                                                            </div>
                                                                            <div
                                                                                className="product-details position-relative">
                                                                                <h5 className="text-left">{item.item.product.name}
                                                                                    <small
                                                                                        className="font-weight-normal ml-1">{item.item.sku}
                                                                                        <span
                                                                                            style={{marginLeft: "10px"}}
                                                                                            className={item.item.in_stock > 0 ? "text-success" : "text-danger"}>{item.item.in_stock} en stock</span>
                                                                                    </small>
                                                                                </h5>
                                                                                <div
                                                                                    className="item-color position-relative d-inline-block w-100 mb-1 font-weight-normal">
                                                                                    <p className="added-color">
                                                                                        <small
                                                                                            className={"workorder-item-size"}>{item.item.product.category.name}</small>
                                                                                        &nbsp;
                                                                                        <i style={{backgroundColor: `${item.item.colour_code}`}}
                                                                                           className="fa fa-circle"> </i>{item.item.colour}
                                                                                    </p>
                                                                                </div>
                                                                                {/*{item.coupon_price ?*/}
                                                                                {/*  <div className="item-price font-weight-normal d-inline-block w-100 mb-1">*/}
                                                                                {/*    <del>€{(item.price / item.quantity).toFixed(2)}</del>*/}
                                                                                {/*    <span*/}
                                                                                {/*      className="ml-2">€{(item.coupon_price / item.quantity).toFixed(2)}</span>*/}
                                                                                {/*  </div>*/}
                                                                                {/*  :*/}
                                                                                {/* }*/}
                                                                                <div
                                                                                    className="item-price font-weight-normal d-inline-block w-100 mb-1">
                                                                                    €{(item.price / item.quantity).toFixed(2)}
                                                                                </div>
                                                                                <div
                                                                                    className="item-qunty font-weight-normal d-inline-block w-100 workorder-item-size">
                                                                                    {item.quantity} article
                                                                                    ({item.quantity / item.item.units_per_set} sets)
                                                                                </div>
                                                                                <div
                                                                                    className="item-price-div position-absolute">
                                                                                    <h6
                                                                                        className="mb-0 font-weight-bold w-100 text-right">
                                                                                        €{parseFloat(item.price).toFixed(2)}
                                                                                        {/*{item.coupon_price ? parseFloat(item.coupon_price).toFixed(2) : }*/}
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="customer-purchase-details px-3">
                                                                                <h6 className="mb-0 w-100 font-weight-bold text-center">{t(order_type[item.order_type])}</h6>
                                                                                {item.order_type === order_type.customer_purchase &&
                                                                                <small
                                                                                    className="text-center d-inline-block font-weight-normal w-100">{item.customer_note}
                                                                                </small>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="total-amount-fix-footer position-fixed">
                                <div className="row mx-0 total-fix-amount flex-align-center px-4 justify-content-end">
                                    <h6 className="mb-0 font-weight-bold">Total ({data.total_items} articles) :
                                        €{data.total_amount.toFixed(2)}</h6>
                                </div>
                                <div className="row mx-0 mt-2 button-step-info px-4 justify-content-end">
                                    <Button onClick={this.props.prev}
                                            className="font-weight-bold mr-3">{t('return')}</Button>
                                    <Button loading={loading} onClick={() => this.updateWorkOrderStatus()}
                                            type="primary"
                                            className="font-weight-bold">{this.props.match.params.method === "edit" ? t('updateWorkOrder_btn') : t('create_work_order')}</Button>
                                </div>
                            </div>
                        </React.Fragment>
                        : <div className={'text-center mt-5'}>
                            <Spin size="large"/>
                        </div>}

                </div>
                {this.props.match.params.method === methods.edit ?
                    confirmPopup ? <ConfirmPopup
                        onOk={() => this.onOkWorkOrderButton()}
                        width="47%"
                        remove_left_btn={true}
                        image={Images.check_icon}
                        onCancel={() => this.handleConfirmPopup(false)}
                        okText={t('see_order_confirm')}
                        cancelText={"Ok"}
                        title={t('order_confirm_popup_title')}
                        description={t('subtitle_workorder_confirm')}
                        small_description={t('workorder_popup_confirm_text')}
                    /> : ""
                    :
                    confirmPopup ? <ConfirmPopup
                        onOk={() => this.onOkWorkOrderButton()}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.props.history.go(-1)}
                        okText={t('see_order_confirm')}
                        cancelText={"Ok"}
                        title={t('workorder_create_confirm')}
                        description={t('distributor_order_popup_title')}
                        small_description={t('workorder_confirm_title_text')}
                    /> : ""
                }
                <AdditionalDiscount visible={this.state.discountVisible} data={data}
                                    close={() => this.handleDiscountPopup(false)}/>
                {data ?
                    <DeliveryFees visible={this.state.deliveryFeesVisible} deliveryFees={data.delivery_fees}
                                  workorder_id={data.id}
                                  onClose={() => this.handleDeliveryFeesPopup(false)}/>
                    : ""}

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        workorder: state.current_workorder.data
    }
};

export default connect(mapStateToProps, {getOneWorkorder})(withRouter(withTranslation('common')(StepInfo)));
