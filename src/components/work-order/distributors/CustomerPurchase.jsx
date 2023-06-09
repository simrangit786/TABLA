import React, {Component} from 'react';
import {Radio} from "antd";
import {order_type} from "../../../controller/Global";
import {locationItemUpdate} from "../../../controller/API/salesOperationAPI";
import {CustomerPurchaseModel} from "./modals/CustomerPurchaseModal";
import {withTranslation} from "react-i18next";

class CustomerPurchase extends Component {

    state = {
        customerPurchaseVisible: false,
        order_type: null,
        selected_item: null
    };
    onChangeOrderType = (itemData, e) => {
        const data = {order_type: e.target.value};
        this.setState({order_type: data, selected_item: itemData});
        if (e.target.value === order_type.customer_purchase) {
            this.handleCustomerModal(true)
        } else
            this.updateItem(itemData.id, data)
    };

    handleEditPopup = (visible, data) => {
        this.setState({customerPurchaseVisible: visible, selected_item: data})
    }
    handleCustomerModal = (visible, resetValue = false) => {
        this.setState({customerPurchaseVisible: visible});
        if (resetValue)
            this.setState({order_type: null, selected_item: null});
    };

    updateItem(id, data) {
        locationItemUpdate(id, data)
            .then(() => this.props.fetch())

    }

    render() {
        const {data, t} = this.props;
        const {customerPurchaseVisible, selected_item} = this.state;
        return (
            <div className="col-sm-4 col-12 added-cart-type">
                <h6> {t('item_type')}</h6>
                <Radio.Group onChange={(e) => this.onChangeOrderType(data, e)} value={data.order_type}>
                    <Radio value={order_type.not_applicable}>Non applicable</Radio>
                    <Radio value={order_type.store_display}>{t('store_display')}</Radio>
                    <Radio value={order_type.customer_purchase}>{t('customer_purchase')}</Radio>
                    {data.order_type === order_type.customer_purchase && data.customer_note ?
                        <span className="font-weight-bold ml-2" style={{fontSize: '10px'}}><small
                            onClick={() => this.handleEditPopup(true, data)}>{t('edit')}</small> {data.customer_note}</span> : ""}
                    <Radio value={order_type.expo}>Expo</Radio>
                    <Radio value={order_type.stock}>Stock</Radio>
                </Radio.Group>
                <CustomerPurchaseModel visible={customerPurchaseVisible} selected_item={selected_item}
                                       fetch={this.props.fetch}
                                       close={() => this.handleCustomerModal(false, true)}/>
            </div>
        );
    }
}

export default (withTranslation('common')(CustomerPurchase));
