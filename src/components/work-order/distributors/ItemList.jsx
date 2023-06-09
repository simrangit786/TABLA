import React, {Component} from 'react';
import {Image as Images} from "../../Images";
import {Button, Icon, Spin} from "antd";
import AddItemsListDrawer from "../../drawers/work-order/add-items/AddItemsListDrawer";
import {locationItemGet, locationItemRemove, locationItemUpdate} from "../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";
import SingleItemListCard from "./SingleItemListCard";

class ItemList extends Component {
    state = {
        itemListShow: false,
        radioValue: 1,
        items: [],
        params: {location_id: this.props.location.id},
        loading: true,
    };

    itemListVisible = (visible) => {
        const {params} = this.state;
        this.setState({
            itemListShow: visible,
        });
        if (!visible) {
            this.fetch(params);
            this.props.fetch()
        }
    };

    fetch = (params = {}) => {
        locationItemGet(params)
            .then(response => {
                if (response.count > 0) {
                    this.props.buttonFaded();
                }
                this.setState({items: response.data, loading: false})
            })
    };


    deleteItem = (id) => {
        locationItemRemove(id)
            .then(() => this.fetch(this.state.params))
    };

    componentDidMount() {
        const {params} = this.state;
        this.fetch(params);
    }


    updateItem = (id, data) => {
        locationItemUpdate(id, data)
            .then(() => this.fetch(this.state.params))
    };

    getItemsList() {
        const {items, params} = this.state;
        return items.map((data, index) =>
            <SingleItemListCard key={`item_card_${index}`} data={data} update={(id, data) => this.updateItem(id, data)}
                                fetch={() => this.fetch(params)}
                                remove={(id) => this.deleteItem(id)}/>
        )
    }

    render() {
        const {itemListShow, items, loading} = this.state;
        const {location, t} = this.props;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                {items.length > 0 ?
                    <React.Fragment>
                        <div className="add-more-btn">
                            <Button onClick={() => this.itemListVisible(true)}
                                    icon="plus">{t('add_article_caps')}</Button>
                        </div>
                        {this.getItemsList()}
                    </React.Fragment>
                    :
                    <div className="card-add-items-div position-relative card-before h-100 flex-align-center-center">
                        <div className="text-center">
                            <img src={Images.add_article_gray} alt="delivery icon" className="img-fluid mb-3"/>
                            <p>{t('items_add')}</p>
                            <Button type="primary" onClick={() => this.itemListVisible(true)}>
                                <Icon type="plus"/>
                                {t('add_article_caps')}
                            </Button>
                        </div>
                    </div>
                }
                {itemListShow &&
                <AddItemsListDrawer totalItems={items.length} current_location={location} visible={itemListShow}
                                    onClose={() => this.itemListVisible(false)}/>}
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(ItemList));
