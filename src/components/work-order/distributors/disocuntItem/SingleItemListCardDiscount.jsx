import React, {Component} from 'react';
import {Button, message} from "antd";
import {withTranslation} from "react-i18next";
import {distributorValidateItemDiscount} from "../../../../controller/API/salesOperationAPI";
import ConfirmationPopup from "./ConfirmationPopop";

class SingleItemListCardDiscount extends Component {
    state = {
        confirmationVisible: false,
        discount: {}
    }
    validateCoupon = () => {
        const {data} = this.props;
        distributorValidateItemDiscount({item: data.id})
            .then(response => {
                const discount = response.data.discount
                this.setState({discount})
                this.handleVisibleConfirmation(true)
            })
            .catch(error => {
                message.info(error.response.data.message)
            })
    }
    handleVisibleConfirmation = (confirmationVisible) => {
        this.setState({confirmationVisible})
    }
    updateDiscountData = () => {
        this.props.fetch()
    }

    removeCoupon = () => {

    }

    render() {
        const {data} = this.props;
        const {confirmationVisible, discount} = this.state
        return (
            <div className="row added-cart-item mx-0 coupon-row">
                <div className="col-sm-3 col-12 added-cart-img">
                    <img className="img-fluid"
                         src={data.item.variant_images.length > 0 ? data.item.variant_images[0].image : ""}
                         alt="item"/>
                </div>
                <div className="col-sm-5 col-12 added-cart-price">
                    <h5>{data.item.product.name} <span>{data.item.sku}</span></h5>
                    <p className="added-color">
                        <small>{data.item.product.category.name}</small>
                        <i style={{backgroundColor: `${data.item.colour_code}`}}
                           className="fa fa-circle"/>{data.item.colour}</p>
                    {/*{data.is_client_price_coupon_discount && data.coupon_price ?*/}
                    {/*    <p>€{parseFloat(data.single_item_price).toFixed(2)}</p>*/}
                    {/*    :*/}
                    {/*    data.coupon_price ?*/}
                    {/*        <p>*/}
                    {/*            <del>€{parseFloat(data.item.price).toFixed(2)}</del>*/}
                    {/*            €{parseFloat(data.single_item_price).toFixed(2)}*/}
                    {/*            <small>[€{parseFloat(data.single_item_price).toFixed(2)}*/}
                    {/*                pour {data.coupon_quantity} articles ou plus]</small>*/}
                    {/*        </p>*/}
                    {/*        :*/}
                    {/*}*/}
                    <p>€{parseFloat(data.single_item_price).toFixed(2)}</p>
                    <div className="added-pricing">
                        <small className="text-dark">
                            {data.quantity / data.item.units_per_set} sets
                        </small>
                        <h6>€{parseFloat(data.price).toFixed(2)}
                            {/*{data.coupon_price ? <>{parseFloat(data.coupon_price).toFixed(2)}</> : */}
                        </h6>
                    </div>
                </div>
                <div className="col-sm-4 col-12 added-cart-type">
                    {data.client_discount?.id ?
                        data.client_discount.discount_type === "REDUCTION_AMOUNT" ?
                            <h6> {`${data.client_discount.amount} montant ${data.client_discount.quantity} articles`}</h6>
                            :
                            <h6> {`–${data.client_discount.percentage}% pour ${data.client_discount.quantity} articles`}</h6>
                        : ""
                    }
                    {data.client_discount?.id ?
                        <Button disabled
                                className={"add-coupon-btn ml-2 discount-applied"}
                                onClick={this.removeCoupon}>SUPPRIMER LE COUPON</Button>
                        :

                        <Button className={"add-coupon-btn ml-2 "}
                                onClick={this.validateCoupon}>APPLIQUER COUPON</Button>

                    }

                </div>
                <ConfirmationPopup closePopup={() => this.handleVisibleConfirmation(false)} discount={discount}
                                   data={data} visible={confirmationVisible}
                                   updateDiscountData={this.updateDiscountData}/>
            </div>
        );
    }
}

export default withTranslation('common')(SingleItemListCardDiscount);
