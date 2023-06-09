import React, {Component} from 'react';
import CustomerPurchase from "./CustomerPurchase";
import {Button, Form, InputNumber} from "antd";
import {withTranslation} from "react-i18next";
import {GroupPopoverContent} from "./added-item-group/GroupPopoverContent";

class SingleItemListCard extends Component {

    onInputNumberChange = (value) => {
        if (value) {
            const {data} = this.props
            this.props.update(data.id, {'quantity': value})
        }
    }

    render() {
        const {t, data, delivery_setting} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="row added-cart-item mx-0">
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
                            <Form.Item className="design-update-item">
                                {getFieldDecorator('quantity', {
                                    initialValue: data.quantity
                                })(<InputNumber onChange={this.onInputNumberChange} contentEditable={false}
                                                step={data.item.units_per_set} min={data.item.units_per_set}/>)}
                            </Form.Item>
                            {data.quantity / data.item.units_per_set} sets
                        </small>
                        <h6>
                            {/*€{data.coupon_price ?*/}
                            {/*<>{parseFloat(data.coupon_price).toFixed(2)}</>*/}
                            {/*:*/}
                            {parseFloat(data.price).toFixed(2)}
                        </h6>
                    </div>
                </div>
                <CustomerPurchase data={data} fetch={() => this.props.fetch()}/>
                <div className="group-action-div">
                    {delivery_setting && <GroupPopoverContent
                        workorder={this.props.workorder}
                        title={data.item.product.name}
                        data={data}
                        fetch={() => this.props.fetch()}
                    />
                    }
                    <Button className="added-btn" onClick={() => this.props.remove(data.id)}>{t('delete_icon')}</Button>
                </div>
            </div>
        );
    }
}

export default Form.create()(withTranslation('common')(SingleItemListCard));
