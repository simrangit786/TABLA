import React, {Component} from "react";
import {Button, Checkbox, Icon, Popover} from "antd";
import {withTranslation} from "react-i18next";
import {order_type} from "../../../../../../controller/Global";
import OrderItemDetailsModal from "../../../modals/OrderItemDetailsModal";
import AddComment from "./AddComment";

const card_color = {
    "default": {backgroundColor: "#FFFFFF", borderColor: "#CADEF9", borderRightColor: "#448DE5"},
    "delivery_ticket_generated": {borderRightColor: "#FFFAC9", backgroundColor: "#FFFDEF", borderColor: "#FED49D"},
    "invoice_generated": {borderRightColor: "#39AA66", backgroundColor: "#E6FDEF", borderColor: "#39AA66"}
};

const moment = require('moment');

class CartItemSingleSAV extends Component {

    state = {
        itemDetailsShow: false,
        visibleComment: false,
        commentSAV: ""
    };
    itemDetailsVisible = (visible) => {
        this.setState({
            itemDetailsShow: visible,
        })
    };
    showComment = (visibleComment) => {
        this.setState({visibleComment})
    }

    updateSAVComment = (commentSAV) => {
        this.setState({commentSAV})
        this.props.updateSAVCommentWithItem(this.props.item.id, commentSAV)
    }

    getStyle = () => {
        const {item} = this.props;
        if (item.delivery_ticket_generated && !item.invoice_generated) {
            return card_color['delivery_ticket_generated']
        } else if (item.invoice_generated) {
            return card_color['invoice_generated']
        } else {
            return card_color['default']
        }
    };

    render() {
        const {item, index, t, delivery_ticket} = this.props;
        const {itemDetailsShow, visibleComment} = this.state;
        return (
            <div className="cart-added-check">
                {item.invoice_generated ? <Checkbox value={item.id}/> : ""}
                <div
                    key={`summary_${index}`}
                    style={this.getStyle()}
                    className="card-shopping card-details-main mb-3">
                    <div className="row mx-0 flex-align-center-between">
                        <div className="icon-img">
                            <Button onClick={() => this.itemDetailsVisible(true)}
                                    className="bg-transparent shadow-none p-0 border-0 h-auto">
                                <img
                                    src={item.item.variant_images.length > 0 ? item.item.variant_images[0].image : '#'}
                                    alt={item.item.product.name}
                                    className="img-fluid mb-0"
                                />
                            </Button>
                        </div>
                        <div className="product-details position-relative">
                            <h5 className="text-left">
                                {item.item.product.name}
                                <small className="font-weight-normal">{item.item.sku}</small>
                                <Button onClick={() => this.showComment(true)}
                                        className="text-uppercase float-right d-flex align-items-center sav-cm-btn">Sav
                                    Cm</Button>
                            </h5>
                            <div className="item-color position-relative d-inline-block w-100 mb-1 font-weight-normal">
                                <p className="added-color">
                                    <small className={"workorder-item-size"}>{item.item.product.category.name}</small>
                                    &nbsp;
                                    <i style={{backgroundColor: `${item.item.colour_code}`}}> </i>{item.item.colour}</p>
                            </div>
                            {/*{item.coupon_price ?*/}
                            {/*  <div className="item-price font-weight-normal d-inline-block w-100 mb-1">*/}
                            {/*    <del>€{(item.price / item.quantity).toFixed(2)}</del>*/}
                            {/*    <span className="ml-2">€{(item.coupon_price / item.quantity).toFixed(2)}</span>*/}
                            {/*  </div>*/}
                            {/*  :*/}
                            {/*  */}
                            {/*}*/}
                            <div className="item-price font-weight-normal d-inline-block w-100 mb-1">
                                €{(item.price / item.quantity).toFixed(2)}
                            </div>
                            <div className="item-qunty font-weight-normal d-inline-block w-100 workorder-item-size">
                                {item.quantity} article ({item.quantity / item.item.units_per_set} sets)
                            </div>
                            <div className="item-price-div position-absolute">
                                <h6 className="mb-0 font-weight-bold w-100 text-right">
                                    €{parseFloat(item.price).toFixed(2)}
                                    {/*{item.coupon_price ? parseFloat(item.coupon_price).toFixed(2) :*/}
                                </h6>
                            </div>
                        </div>
                        <div className="customer-purchase-details px-3 pl-4">
                            <h6 className="mb-0 w-100 font-weight-bold text-center">
                                {t(order_type[item.order_type])}
                            </h6>
                            {item.order_type === order_type.customer_purchase &&
                            <small className="text-center font-weight-normal">
                                {item.customer_note}
                            </small>}
                            {(delivery_ticket || item.invoice_generated) && <hr style={this.getStyle()}/>}
                            {delivery_ticket && <small>✓ Bon de livraison crée
                                le {moment(delivery_ticket.created).format("DD/MM/YYYY")}</small>}
                            {item.invoice_generated && <small>✓ Facture demandée
                                le {moment(item.item_invoice.created_at).format("DD/MM/YYYY")}</small>}
                            {item.sav.map((item, index) => {
                                return <>
                                    <small key={index}>✓ S.A.V. demandée le {moment(item.created).format("DD/MM/YYYY")}
                                        <span style={{marginLeft: "5px"}}>
                  {item.comment && item.sav_type ?
                      <Popover content={`CM : ${item.comment}`}
                               title={`Type de SAV : ${item.sav_type.map(i => i.sav_title).join(", ")}`}>
                          <Icon type="info-circle" style={{fontSize: '12px'}}
                                theme="twoTone"
                                twoToneColor="#52c41a"/>
                      </Popover> : ""}
                    </span>
                                    </small>

                                </>
                            })}
                            {item.credit.map((item, index) => {
                                return <small key={index}>✓ Avoir demandée
                                    le {moment(item.created).format("DD/MM/YYYY")}</small>
                            })}
                        </div>
                    </div>
                </div>
                {itemDetailsShow &&
                <OrderItemDetailsModal item={item} visible={itemDetailsShow}
                                       onClose={() => this.itemDetailsVisible(false)}/>}
                <AddComment updateSAVComment={this.updateSAVComment} visible={visibleComment}
                            onClose={() => this.showComment(false)}/>
            </div>
        );
    }
}

export default withTranslation("common")(CartItemSingleSAV);
