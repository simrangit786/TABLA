import React, {Component} from 'react';
import {Button, Icon, message, Steps} from "antd";
import {Image as Images} from "../../Images";
import {methods} from "../../../controller/Global";
import {UpdateStock} from "../../modal/ware-house/UpdateStock";
import {UpdateTransit} from "../../modal/ware-house/UpdateTransit";
import {withTranslation} from "react-i18next";
import ArticleMain from "../../drawers/ArticleMain";
import {history} from "../../../controller/history";
import {routes} from "../../../controller/routes";
import {PDFGetOne} from "../../../controller/API/itemApi";
import {Role} from "../../../utils";
import Imprimer from "../../modal/inventory/Imprimer";

const {Step} = Steps;

class ItemSidebar extends Component {
    state = {
        updateStock: false,
        updateTransit: false,
        articleVisible: false,
        visibleImp: false,
        barcode_variant: null,
    };

    showUpdateStock = (visible, update) => {
        this.setState({
            updateStock: visible,
        });
        if (!visible && update)
            this.props.fetch();
    };

    showUpdateTransit = (visible, update) => {
        this.setState({
            updateTransit: visible,
        });
        if (!visible && update)
            this.props.fetch();
    };
    showArticleVisible = (visible) => {
        this.setState({
            articleVisible: visible,
        });
        if (!visible)
            this.props.fetch();
    };

    showImpModal = (visible) => {
        this.setState({
            visibleImp: visible
        });
    };

    showPDF = () => {
        PDFGetOne(this.props.match.params.id).then(response => {
            window.open((response.url))
        }).catch(e => {
            message.error('Error in downloading! Please try later.')
        })
    };

    handleUpdate = () => {
        this.props.update();
    };

    render() {
        const {articleVisible, updateStock, updateTransit} = this.state;
        const {current, steps, match, t, loading, item} = this.props;
        return (
            <React.Fragment>
                <div className="steps-sidebar float-left h-100 position-fixed">
                    <Button onClick={() => history.push(routes.dashboard.warehouse.inventory)}
                            className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                        <Icon type="arrow-left"/>
                        <span
                            className="text-back-btn pr-3">{t('goback_sidebar')}</span>
                    </Button>
                    {match.params.method === methods.create ?
                        <React.Fragment>
                            <h6 className="heading-name position-absolute text-uppercase text-white pr-3">{t('create_article')}
                            </h6>
                            <Steps current={current} direction="vertical" className="h-100">
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title}/>
                                ))}
                            </Steps>
                        </React.Fragment>
                        : <div className="view-actions position-absolute" style={{width: '100%'}}>
                            <Role allow={["admin"]}>
                                <Button onClick={() => this.showArticleVisible(true)}
                                        className="text-uppercase border-0 text-white position-relative p-0">
                                        <span
                                            className="action-img-icon flex-align-center-center rounded-circle float-left">
                                            <img src={Images.edit_icon} alt="edit-icon" className="img-fluid"/>
                                        </span>
                                    <span
                                        className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                                        {t('update_item_new')}
                                    </span>
                                </Button>
                            </Role>
                            <Role allow={["admin"]}>
                                <Button onClick={() => this.showUpdateStock(true)}
                                        className="text-uppercase border-0 text-white position-relative p-0">
                                <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                                    <img src={Images.stock_white_icon} alt="edit-icon" className="img-fluid"/>
                                </span>
                                    <span
                                        className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                                    {t('stock_warehouse')}
                                </span>
                                </Button>
                            </Role>
                            <Role allow={["admin"]}>
                                <Button onClick={() => this.showUpdateTransit(true)}
                                        className="text-uppercase border-0 text-white position-relative p-0">
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.delivery_white_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                                    <span
                                        className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                  {t('route_update')}
                        </span>
                                </Button>
                            </Role>
                            <Role allow={["admin", "distributor"]}>
                                <Button onClick={() => this.showImpModal(true)}
                                        className="text-uppercase border-0 text-white position-relative p-0 mb-0">
                            <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                                <img src={Images.profile_imprimer} alt="edit-icon" className="img-fluid"/>
                            </span>
                                    <span
                                        className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                                        {t('print')}
                                </span>
                                </Button>
                            </Role>
                        </div>
                    }

                </div>
                {articleVisible && <ArticleMain method={methods.edit} item_id={match.params.id} visible={articleVisible}
                                                onClose={() => this.showArticleVisible(false)}/>}
                {updateStock && !loading && <UpdateStock visible={updateStock} item={item}
                                                         onClose={(update) => this.showUpdateStock(false, update)}/>}
                {updateTransit && !loading &&
                <UpdateTransit visible={updateTransit} item={item}
                               onClose={(update) => this.showUpdateTransit(false, update)}/>}
                <Imprimer data={this.props.item} visible={this.state.visibleImp}
                          onClose={() => this.showImpModal(false)}/>
            </React.Fragment>

        );
    }
}

export default (withTranslation('common')(ItemSidebar));
