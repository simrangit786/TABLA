import React, {Component} from 'react';
import {Button, Drawer, Input, message, Select, Spin} from 'antd';
import {Image as Images} from "../../../Images";
import {itemCategoryGet, productGet} from "../../../../controller/API/itemApi";
import {SingleItemCard} from "./singleItemCard";
import {withTranslation} from "react-i18next";
import {distributorWorkorderItemAdd} from "../../../../controller/API/salesOperationAPI";

const {Search} = Input;

const {Option} = Select;

class AddItemsListDrawer extends Component {

    state = {
        items: [],
        category: [],
        params: {category_id: null},
        fetched: false,
        loading: true,
        totalItems: this.props.totalItems,
        page: 1,
        is_load_more: true,
        updateItems: false
    };

    componentDidMount() {
        this.fetchCategory();
        this.fetch();
    }


    handleSubmit = (product, values, selected) => {
        values['workorder_address'] = this.props.current_location.id;
        values['item'] = product.variant[selected].id;
        distributorWorkorderItemAdd(values)
            .then(() => {
                message.success("Produit(s) ajouté(s) à votre panier.");
                this.setState({totalItems: this.state.totalItems + 1})
            }).catch(e => {
            message.error("some error occurred");
        });
    };

    fetchCategory = (params = {}) => {
        itemCategoryGet(params)
            .then(category => {
                this.setState({category})
            })
    };

    handleFilter = (value) => {
        let {params} = this.state;
        params["category_id"] = value;
        this.setState({params});
        this.fetch(params);
    };

    loadMoreItem = () => {
        this.setState({loadMoreLoading: true, updateItems: true})
        const page = this.state.page + 1
        let new_params = {...this.state.params, page};
        productGet(new_params)
            .then(response => {
                const items = this.state.items
                this.setState({
                    items: [...items, ...response.data.results],
                    fetched: true,
                    loading: false,
                    loadMoreLoading: false,
                    updateItems: false,
                    page: new_params.page || 1,
                    is_load_more: Boolean(response.data.next)
                })
            })
    }

    fetch = (params = {}) => {
        this.setState({updateItems: true})
        let new_params = {...this.state.params, ...params};
        productGet(new_params)
            .then(response => {
                this.setState({
                    items: response.data.results,
                    updateItems: false,
                    fetched: true,
                    loading: false,
                    is_load_more: Boolean(response.data.next)
                })
            })
    };

    render() {
        const {current_location, t} = this.props;
        const {category, buttonLoading, totalItems, loadMoreLoading, is_load_more, updateItems} = this.state;
        const items = this.state.items.filter(o => o.variant.length > 0);
        if (this.state.loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <Drawer
                title={t('add_article')}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                width="81.3%"
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>{t('close_btntext')}</div>
                    </Button>
                    <div className="col-12 clearfix list-main-drawer">
                        <div className="row mx-0 add-item-list-row-header">
                            <div className="col-12 p-0">
                                <div className="row mx-0 list-item-second-header pt-0 align-items-center w-100">
                                    <div className="col-sm-12 col-lg-4 col-md-12 col-12">
                                        <h6 className="m-0 font-weight-bold">
                                            <div className="img-cart-add-tag position-relative float-left mr-1">
                                                <img src={Images.warehouse_black_icon} alt="ware-house-icon"
                                                     className="img-fluid mr-1"/>
                                                {/*to show cart is not empty*/}
                                                <span className="position-absolute tag-cart-notification"> </span>
                                            </div>
                                            {current_location.address_json.type} :
                                            <small> {totalItems} Article(s) ajouté(s)</small>
                                        </h6>
                                    </div>
                                    <div className="col-12 col-sm-12 col-lg-8 col-md-12 pr-0">
                                        <div className="row mx-0">
                                            <Search
                                                placeholder="Rechercher des articles"
                                                onSearch={value => this.fetch({"search": value})}
                                                style={{width: '71%'}}
                                            />
                                            <Select placeholder="FILTRE
                                                    PRODUITS" className="select-div-item" onChange={this.handleFilter}>
                                                <Option key={`category_00`} value={null}>{t('all')}</Option>
                                                {category.map((d, index) =>
                                                    <Option key={`category_${index}`} value={d.id}>{d.name}</Option>
                                                )}
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mx-0 list-item-card-row">
                            {items.length > 0 && !updateItems && items.map((d, index) =>
                                <SingleItemCard key={`product_card_${index}`} location={current_location} product={d}
                                                buttonLoading={buttonLoading}
                                                submit={(values, selected) => this.handleSubmit(d, values, selected)}/>
                            )}
                        </div>
                        {is_load_more ?
                            <div className="text-center">
                                <Button loading={loadMoreLoading} className="load_more_btn" type="primary"
                                        onClick={this.loadMoreItem}>{t('load_more')}</Button>
                            </div> : ""}
                        {/*<AddItemListView/>*/}
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.props.onClose} type="primary">
                            VALIDER
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default (withTranslation('common')(AddItemsListDrawer));
