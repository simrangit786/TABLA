import React, {Component} from 'react';
import {Spin} from "antd";
import {
    locationGroupItemGet,
    locationItemRemove,
    locationItemUpdate
} from "../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";
import SingleItemListCardDiscount from "./SingleItemListCardDiscount";


class GroupItemList extends Component {
    state = {
        itemListShow: false,
        items: [],
        params: {location_id: this.props.location.id},
        loading: true,
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
        const {params} = this.state;
        return items.map((data, index) =>
            <SingleItemListCardDiscount key={`item_card_${index}`} data={data}
                                        fetch={() => this.fetch(params)}
                                        location={this.props.location}
                                        workorder={this.props.workorder}/>
        )
    }

    render() {
        const {items, loading} = this.state;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                <div className="group-date">
                    <h4>Coupons</h4>
                </div>
                {items.map((data, index) =>
                    <React.Fragment key={`group_item_${index}`}>
                        {this.getItemsList(data.items)}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(GroupItemList));
