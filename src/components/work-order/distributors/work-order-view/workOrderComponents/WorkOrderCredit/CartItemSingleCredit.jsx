import React, {Component} from "react";
import {Button, Checkbox} from "antd";
import {withTranslation} from "react-i18next";
import {order_type} from "../../../../../../controller/Global";
import OrderItemDetailsModal from "../../../modals/OrderItemDetailsModal";
import UpdateItemQuantity from "./UpdateItemQuantity";
import AddComment from "./AddComment";

const card_color = {
    "default": {backgroundColor: "#FFFFFF", borderColor: "#CADEF9", borderRightColor: "#448DE5"},
    "delivery_ticket_generated": {borderRightColor: "#FFFAC9", backgroundColor: "#FFFDEF", borderColor: "#FED49D"},
    "invoice_generated": {borderRightColor: "#39AA66", backgroundColor: "#E6FDEF", borderColor: "#39AA66"}
};

const moment = require('moment');

class CartItemSingleCredit extends Component {

    state = {
        itemDetailsShow: false,
        quantityCheck: false,
        visibleComment: false,
        commentCredit: ""
    };
    itemDetailsVisible = (visible) => {
        this.setState({
            itemDetailsShow: visible,
        })
    };

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

    updateQuantityCheck = (quantityCheck) => {
        this.setState({quantityCheck})
    }

    showComment = (visibleComment) => {
        this.setState({visibleComment})
    }

    updateCreditComment = (commentCredit) => {
        this.setState({commentCredit})
        this.props.updateCreditCommentWithItem(this.props.item.id, commentCredit)
    }


    render() {
        const {item, index, t, delivery_ticket} = this.props;
        const {itemDetailsShow, quantityCheck, visibleComment} = this.state;
        const used_credit = item?.credit.reduce((a, b) => a + b.quantity, 0)
        const remaining_quantity = item.quantity - used_credit
        return (
            <div className="cart-added-check">
                {item.invoice_generated && quantityCheck ? <Checkbox value={item.id}/> : ""}
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
                                        className="text-uppercase float-right d-flex align-items-center sav-cm-btn">Avoir
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
                            {/* */}
                            {/*}*/}
                            <div className="item-price font-weight-normal d-inline-block w-100 mb-1">
                                €{(item.price / item.quantity).toFixed(2)}
                            </div>
                            <div
                                className="item-qunty item-qty-update font-weight-normal d-inline-block w-100 workorder-item-size">
                                {remaining_quantity} article ({remaining_quantity / item.item.units_per_set} sets)
                            </div>
                            <div className="item-price-div item-price-div-update position-absolute">
                <span className="mb-0 font-weight-bold w-100 text-right">
                  €{parseFloat(item.price).toFixed(2)}
                    {/*item.coupon_price ? parseFloat(item.coupon_price).toFixed(2) :}*/}
                </span>
                            </div>
                            <UpdateItemQuantity data={item} remaining_quantity={remaining_quantity}
                                                updateQuantityCheck={this.updateQuantityCheck}/>
                        </div>
                        {/*TODO: can be revert back to toFixed(2)*/}
                        <div className="customer-purchase-details px-3">
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
                                return <small key={index}>✓ S.A.V. demandée
                                    le {moment(item.created).format("DD/MM/YYYY")}</small>
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
                <AddComment updateCreditComment={this.updateCreditComment} visible={visibleComment}
                            onClose={() => this.showComment(false)}/>

            </div>
        );
    }
}

export default withTranslation("common")(CartItemSingleCredit);
