import React, {Component} from 'react';
import {Button, Icon, Spin} from "antd";
import {Image as Images} from "../../Images";
import {withTranslation} from "react-i18next";
import ContainerItemListDrawer from "../../drawers/container/ContainerItemListDrawer";
import ContainerItemSingle from "./ContainerItemSingle";
import {containerItemRemove} from "../../../controller/API/itemApi";


const moment = require('moment');


class ContainerAddArticles extends Component {
    state = {
        visible: false,
        items: this.props.container.container_item,
        loading: false,
        params: {container__id: this.props.container.id},
    };


    containerItemShow = (visible) => {
        this.setState({
            visible: visible,
        });
        if (!visible) {
            this.props.fetch()
        }
    };

    deleteItem = (id) => {
        containerItemRemove(id)
            .then(() => this.props.fetch())
    };


    // fetch = (params = {}) => {
    //   this.setState({loading: true});
    //   containerItemGet(params)
    //     .then(response => {
    //       this.setState({items: response.items, loading: false, edit_pi: false, edit_quantity: false})
    //     })
    // };


    render() {
        const {container} = this.props;
        const items = container.container_item;
        const {t} = this.props;
        const {visible, loading} = this.state;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                <div className="row add-items-div-row container-items-row p-0 mx-0 w-100">
                    <div className="inner-details-row-item w-100">
                        <div className="col-12 pl-0 h-100">
                            <React.Fragment>
                                <div className="row mx-0 container-items-row-div">
                                    <div className="col-lg-3 col-md-3 col-sm-12 col-12 container-left-div">
                                        <div className="row mx-0 container-card-row-left">
                                            <div className="col-12">
                                                <h6 className="font-weight-bold">{container.name}</h6>
                                            </div>
                                            <div className="col-12 text-center container-img">
                                                <img src={Images.container_small_icon} alt="small icon container"
                                                     className="img-fluid"/>
                                            </div>
                                            <div
                                                className="col-12 col-sm-12 col-md-6 d-flex align-items-end pr-0">
                                                <p className="mb-0 font-weight-normal">Date de livraison :</p>
                                            </div>
                                            <div
                                                className="col-12 col-sm-12 col-md-6 d-flex align-items-end justify-content-end text-right pl-0">
                                            <span className="font-weight-normal">
                                              {moment(container.date).format("DD-MM-YYYY")}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-lg-9 col-md-9 col-sm-12 col-12 container-right-div container-right-padding">
                                        {items.length > 0 ?
                                            <div className="row mx-0 w-100">
                                                <div className="row mx-0 w-100">
                                                    {/*<div className="col-12">*/}
                                                    {/*  <h6 className="d-flex align-items-center container-heading font-weight-bold">*/}
                                                    {/*    <img src={Images.add_item_icon} alt="add items"*/}
                                                    {/*         className="img-fluid mr-2"/>{t('items_added')}*/}
                                                    {/*  </h6>*/}
                                                    {/*</div>*/}
                                                    <div className="col-12 container-add-article-btn">
                                                        <div className="add-more-btn">
                                                            <Button onClick={() => this.containerItemShow(true)}
                                                                    icon="plus">{t('add_article_caps')}</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {items.map((item, index) =>
                                                        <ContainerItemSingle fetch={() => this.props.fetch()}
                                                                             item={item}
                                                                             deleteItem={(id) => this.deleteItem(id)}
                                                                             key={`view_container_${index}`}/>)}
                                                </div>
                                            </div>
                                            : <div className="row mx-0 h-100 align-items-center justify-content-center">
                                                <div
                                                    className="card-add-items-div position-relative card-before mt-0 h-100 flex-align-center-center">
                                                    <div className="text-center">
                                                        <img src={Images.add_article_gray} alt="delivery icon"
                                                             className="img-fluid mb-3"/>
                                                        <p>{t('items_add')}</p>
                                                        <Button type="primary"
                                                                onClick={() => this.containerItemShow(true)}>
                                                            <Icon type="plus"/>
                                                            {t('add_article_caps')}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
                <div className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    <div>
                        <Button style={{marginLeft: 8}} onClick={this.props.onPrev}
                                className="font-weight-bold text-center text-uppercase mr-3">
                            {t('return')}
                        </Button>
                        <Button type="primary" disabled={items.length <= 0}
                                onClick={() => this.props.onNext(container.id)}
                                className="font-weight-bold text-center text-white text-uppercase">{t('save_continue')}
                        </Button>
                    </div>
                </div>
                {visible &&
                <ContainerItemListDrawer totalItems={items.length} container={this.props.container} visible={visible}
                                         onClose={() => this.containerItemShow(false)}/>}
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(ContainerAddArticles));
