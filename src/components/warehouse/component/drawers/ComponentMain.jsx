import React, {Component} from 'react';
import {Button, Drawer, Spin, Steps} from 'antd';
import {Image as Images} from "../../../Images";
// import {StockInformation} from "../warehouse/all-items/StockInformation";
// import RelatedImages from "../warehouse/all-items/RelatedImages";
import {withTranslation} from "react-i18next";
// import ConfirmPopup from "../modal/ConfirmPopup";
// import { ComponentForm } from '../warehouse/component/ComponentForm';
// import { variantGetOne } from '../../../../controller/API/itemApi';
import { methods } from '../../../../controller/Global';
import ConfirmPopup from '../../../modal/ConfirmPopup';
import ComponentRelatedImages from '../all-items/ComponentRelatedImages';
import { StockInformation } from '../../all-items/StockInformation';
import { ComponentForm } from '../all-items/ComponentForm';
import { componentGetOne } from '../../../../controller/API/itemApi';
import { ComponentStockInformation } from '../all-items/ComponentStockInformation';

const {Step} = Steps;


class ComponentMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            item: null,
            prevData: false,
            editPrev: false,
            loading: true,
            drawerClose: false
        };
    }

    componentDidMount() {
        const {method, item_id} = this.props;
        if (method === methods.edit && item_id) {
            const item = this.fetch(item_id)
        }
    }

    fetch(id) {
        return componentGetOne(id)
            .then(item => {
                this.setState({item, loading: false})
            })
    }

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    closeDrawer = () => {
        this.setState({current: 0, drawerClose: false});
        this.props.onClose()
    };

    handleDrawer = (drawerClose) => {
        this.setState({drawerClose})
    };

    handleViewUpdate = () => {
        this.props.update();
    };

    setItem(item) {
        this.fetch(item.id)
            .then(() => this.next())
    }

    updateStock = (item) => {
        this.setState({item}, () => this.next());
    };

    render() {
        const {t, method} = this.props;
        const {current, item, loading, drawerClose} = this.state;
        const steps = [
            {
                title: t('item_article'),
                content: <ComponentForm method={method} item={item}
                                      next={(item) => this.setItem(item)}/>,
            },
            {
                title: t('stock_info'),
                content: <ComponentStockInformation method={method}
                                           item={item}
                                           next={(item) => this.updateStock(item)}
                                           prev={() => this.prev()}/>,
            },
            {
                title: t('related_images'),
                content:
                    <ComponentRelatedImages method={method} item={item}
                                   prev={() => this.prev()}
                                   close={() => this.props.onClose()}/>
            },
        ];
        if (method === methods.edit && loading) {
            return <div className={'text-center mt-5 d-flex align-items-center justify-content-center w-100 p-0'}>
                <Spin/></div>
        } else {
            return (
                <Drawer
                    title={method === methods.edit ? t('update_item_new') : t('create_a_component')}
                    placement="right"
                    closable={false}
                    maskClosable={false}
                    onClose={() => this.handleDrawer(true)}
                    visible={this.props.visible}
                    getContainer={false}
                    width="85%"
                    destroyOnClose={true}
                    className="steps-drawer-div create-article-drawer"
                >
                    <div className="row mx-0">
                        <Button onClick={() => this.handleDrawer(true)}
                                className="close-header-icon w-auto px-3 flex-align-center-center position-absolute border-0">
                            <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                            <div>{t('close_window_new')}</div>
                        </Button>
                        <div className="col-12 p-0">
                            <div className="row mx-0">
                                <Steps current={current}>
                                    {steps.map(item => (
                                        <Step key={item.title} title={item.title}/>
                                    ))}
                                </Steps>
                                {method === methods.create ? <div
                                    className="steps-content">{steps[current].content}</div> : method === methods.edit && loading ?
                                    <div
                                        className={'text-center mt-5 p-0 d-flex align-item-center justify-content-center w-100 h-100'}>
                                        <Spin/></div> :
                                    <div className="steps-content">{steps[current].content}</div>}
                            </div>
                        </div>
                    </div>
                    {method === methods.edit ?
                        drawerClose ? <ConfirmPopup
                            onOk={() => this.handleDrawer(false)}
                            width="50%"
                            onCancel={() => this.closeDrawer()}
                            okText={'ANNULER'}
                            cancelText={"OUI"}
                            title={"QUITTER LA MODIFICATION D’ARTICLE"}
                            description={"Êtes vous sûr de vouloir quitter la modification de votre article ?"}
                            small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible.\n" +
                            "Pour retourner à la modification de votre article, cliquez sur ‘Annuler’."}
                        /> : ""
                        :
                        drawerClose ? <ConfirmPopup
                            onOk={() => this.handleDrawer(false)}
                            width="50%"
                            onCancel={() => this.closeDrawer()}
                            okText={'ANNULER'}
                            cancelText={"OUI"}
                            title={"QUITTER LA CRÉATION D’ARTICLE"}
                            description={"Êtes-vous sûr de vouloir quitter la création d’article ?"}
                            small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible.\n" +
                            "Pour retourner à la création d’article, cliquez sur ‘Annuler’."}
                        /> : ""
                    }
                </Drawer>
            );
        }
    }
}

export default (withTranslation('common')(ComponentMain));
