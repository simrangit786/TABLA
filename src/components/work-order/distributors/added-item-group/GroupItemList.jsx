import React, {Component} from 'react';
import {Button, Spin} from "antd";
import {
    locationGroupItemGet,
    locationItemRemove,
    locationItemUpdate
} from "../../../../controller/API/salesOperationAPI";
import {AddGroupCommentPopup} from "../modals/AddGroupCommentPopup";
import {withTranslation} from "react-i18next";
import SingleItemListCard from "../SingleItemListCard";

const moment = require('moment');


class GroupItemList extends Component {
    state = {
        itemListShow: false,
        items: [],
        params: {location_id: this.props.location.id},
        loading: true,
        commentPopup: false,
        commentData: null
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
            <SingleItemListCard key={`item_card_${index}`} data={data} update={(id, data) => this.updateItem(id, data)}
                                fetch={() => this.fetch(params)}
                                delivery_setting={true}
                                workorder={this.props.workorder}
                                remove={(id) => this.deleteItem(id)}/>
        )
    }

    render() {
        const {items, loading, commentData, commentPopup, params} = this.state;
        const {t} = this.props;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                {items.map((data, index) =>
                    <React.Fragment key={`group_item_${index}`}>
                        <div className="group-date">
                            <h5><span
                                className="text-uppercase">{data.name}</span> : <span>{moment(data.delivery_date).format('DD/MM/YYYY')} </span><span> {data.comment}</span>
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

export default (withTranslation('common')(GroupItemList));
