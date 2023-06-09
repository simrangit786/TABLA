import React, {Component} from 'react';
import {Button} from "antd";
import {locationGroupItemGet, locationItemRemove, locationItemUpdate} from "../../controller/API/salesOperationAPI";
import {AddGroupCommentPopup} from "../work-order/distributors/modals/AddGroupCommentPopup";
import {GroupPopoverContent} from "../work-order/distributors/added-item-group/GroupPopoverContent";
import {withTranslation} from "react-i18next";
import CustomerPurchase from "../work-order/distributors/CustomerPurchase";

const moment = require('moment');

class AddedItemWithCommade extends Component {
    state = {
        itemListShow: false,
        params: {location_id: this.props.location.id},
        visiblePopover: false,
        commentPopup: false,
        commentData: null,
        items: []
    };

    handlePopover = visible => {
        this.setState({visiblePopover: visible});
        if (!visible)
            this.fetch(this.state.params)
    };

    itemListVisible = (visible) => {
        this.setState({
            itemListShow: visible,
        });
    };
    fetch = (params = {}) => {
        locationGroupItemGet(params)
            .then(response => {
                this.setState({items: response, loading: false})
            })
    };
    onChangeOrderType = (id, e) => {
        const data = {order_type: e.target.value};
        this.updateItem(id, data)
    };
    deleteItem = (id) => {
        locationItemRemove(id)
            .then(() => this.fetch(this.state.params))
    };

    visibleCommentPopup = (visible, data = null) => {
        this.setState({commentPopup: visible, commentData: data})
    };

    componentDidMount() {
        const {params} = this.state;
        this.fetch(params);
    }

    updateItem(id, data) {
        locationItemUpdate(id, data)
            .then(() =>
                this.fetch({location_id: this.props.location.id}))
    }

    getItemsList(items) {
        const {t} = this.props;
        return items.map((data, index) =>
            <div key={`item_card_${index}`} className="row added-cart-item mx-0">
                <div className="col-sm-3 col-lg-3 col-md-2 col-12 added-cart-img">
                    <img className="img-fluid"
                         src={data.item.variant_images.length > 0 ? data.item.variant_images[0].image : '#'}
                         alt={data.item.product.name}/>
                </div>
                <div className="col-sm-5 col-lg-5 col-md-6 col-12 added-cart-price">
                    <h5>{data.item.product.name}<span>{data.item.sku}</span></h5>
                    <p className="added-color"><small>{data.item.product.category.name}</small>&nbsp;
                        <i style={{backgroundColor: `${data.item.colour_code}`}}
                           className="fa fa-circle"> </i>{data.item.colour}</p>
                    <div className="added-pricing">
                        {data.coupon_price ?
                            <p>
                                <del>€{(data.price / data.quantity).toFixed(2)}</del>
                                €{(data.coupon_price / data.quantity).toFixed(2)}</p>
                            :
                            <p>€{(data.price / data.quantity).toFixed(2)}</p>
                        }
                        <p>{data.quantity} Orders ({data.quantity / data.item.units_per_set} sets)</p>
                        <h6>€{data.coupon_price ? parseFloat(data.coupon_price).toFixed(2) : parseFloat(data.price).toFixed(2)}</h6>
                    </div>
                </div>
                <CustomerPurchase data={data} fetch={() => this.fetch(this.state.params)}/>
                <div className="group-action-div">
                    <GroupPopoverContent
                        workorder={this.props.location.workorder}
                        title={data.item.product.name}
                        data={data}
                        fetch={() => this.fetch(this.state.params)}
                    />
                    <Button>
                        <div>{t('delete_icon')}</div>
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        const {items, commentData, commentPopup, params} = this.state;
        const {t} = this.props;
        return (
            <React.Fragment>
                {items.map((data, index) =>
                    <React.Fragment key={`group_item_${index}`}>
                        <div className="group-date">
                            <h5><span
                                className="text-uppercase">{data.name}</span> : <span>{moment(data.delivery_date).format("DD/MM/YYYY")}</span><span> {data.comment}</span>
                            </h5>
                            <Button className="add-data-btn ml-2" onClick={() => this.visibleCommentPopup(true, data)}>
                                {data.comment ? t('edit') : t('add_comment')}</Button>
                        </div>
                        {this.getItemsList(data.items)}
                    </React.Fragment>
                )}
                {commentPopup &&
                <AddGroupCommentPopup visible={commentPopup} close={() => this.visibleCommentPopup(false)}
                                      data={commentData} fetch={() => this.fetch(params)}/>}
            </React.Fragment>
        );
    }
}

export default withTranslation("common")(AddedItemWithCommade);
