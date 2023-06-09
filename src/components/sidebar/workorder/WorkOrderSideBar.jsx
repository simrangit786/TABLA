import React, {Component} from 'react';
import {Button, Icon, Steps} from "antd";
import {Image as Images} from "../../Images";
import {methods, profiles, workorder_view_state} from "../../../controller/Global";
import {withTranslation} from "react-i18next";
import {history} from "../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../controller/routes";
import ConfirmPopup from "../../modal/ConfirmPopup";

const {Step} = Steps;

class WorkOrderSideBar extends Component {

    state = {
        backPopup: false,
        deliveryPopup: false,
        invoicePopup: false,
        creditPopup: false,
        savPopup: false,
    };

    canEditWorkorder = () => {
        if (this.props.data) {
            const {status} = this.props.data;
            return !(status === 'draft' || status === 'processing' || status === 'in_progress');
        }
        return false
    };

    getComponent = () => {
        const {method} = this.props.match.params;
        const {current, steps, match, t} = this.props;
        const edit = match.params.method === methods.edit;
        const status = this.canEditWorkorder();
        if (method === methods.create) {
            return <React.Fragment>
                <Button className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center"
                        onClick={() => this.onBackButton(true)}>
                    <Icon type="arrow-left"/>
                    <span className="text-back-btn pr-3">{t('return_workorder')}
              </span>
                </Button>
                <h6 className="heading-name position-absolute text-uppercase text-white pr-3">
                    {t('Create_distributor_order_form')}
                </h6>
                <Steps current={current} direction="vertical" className="h-100">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
            </React.Fragment>
        } else if (method === methods.view) {
            return <React.Fragment>
                <Button onClick={() => history.push(routes.dashboard.sales.work_order.method)}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                    <Icon type="arrow-left"/>
                    <span className="text-back-btn pr-3">{t('return_workorder')}</span>
                </Button>
                <div className="view-actions position-absolute">
                    <Button onClick={() => {
                        history.push(reverse(routes.dashboard.sales.work_order.method, {
                            type: match.params.type,
                            method: methods.edit,
                            id: match.params.id,
                        }))
                    }} disabled={edit} className="text-uppercase border-0 text-white position-relative p-0">
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.edit_icon_sidebar} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                            {t('update_workorder')}
                        </span>
                    </Button>
                    <Button disabled={edit}
                            onClick={() => this.props.changeScreen(workorder_view_state.delivery_setting)}
                            className="text-uppercase border-0 text-white position-relative p-0"><span
                        className="action-img-icon flex-align-center-center rounded-circle float-left"><img
                        src={Images.delivery_icon_sidebar} alt="edit-icon" className="img-fluid"/></span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                            {t('delivery_settings')}
                        </span>
                    </Button>
                    <Button disabled={edit}
                            onClick={() => !status ? this.handleDeliveryPopup(true) : this.props.changeScreen(workorder_view_state.delivery_ticket)}
                            className="text-uppercase border-0 text-white position-relative p-0"><span
                        className="action-img-icon flex-align-center-center rounded-circle float-left"><img
                        src={Images.document_icon_sidebar} alt="edit-icon" className="img-fluid"/></span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('generate_delivery_ticket')}</span>
                    </Button>
                    {/* Invoice Button sidebar*/}
                    <Button onClick={() => this.handleInvoicePopup(true)}
                            className="text-uppercase border-0 text-white position-relative p-0">
            <span className="action-img-icon flex-align-center-center rounded-circle float-left"><img
                src={Images.invoice_icon_sidebar} alt="edit-icon" className="img-fluid"/></span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('generate_bill')}</span>
                    </Button>

                    <Button onClick={() => this.handleCredit(true)}
                            className="text-uppercase border-0 text-white position-relative p-0">
                    <span className="action-img-icon flex-align-center-center rounded-circle float-left"><img
                        src={Images.credit_icon_sidebar} alt="edit-icon" className="img-fluid"/></span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('generate_credit')}</span>
                    </Button>
                    <Button onClick={() => this.handleSAV(true)}
                            className="text-uppercase border-0 text-white position-relative p-0">
                <span className="action-img-icon flex-align-center-center rounded-circle float-left"><img
                    src={Images.sav_icon_sidebar} alt="edit-icon" className="img-fluid"/></span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('create_sav')}</span>
                    </Button>
                </div>
            </React.Fragment>
        } else if (method === methods.edit) {
            return <React.Fragment>
                <Button onClick={() => this.onBackButton(true)}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                    <Icon type="arrow-left"/>
                    <span className="text-back-btn pr-3">{t('back_btn_work_order')}
              </span>
                </Button>
                <h6
                    className="heading-name position-absolute text-uppercase text-white pr-3">{t('update_workorder')}</h6>
                <Steps current={current} direction="vertical" className="h-100">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="view-actions position-absolute">
                    <Button disabled={status}
                            className={`text-uppercase border-0 text-white ${edit && 'active'} position-relative p-0`}>
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.edit_icon_sidebar} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                            {t('update_workorder')}
                        </span>
                    </Button>

                </div>
            </React.Fragment>
        }
        if (this.props.invoice) {
            return <React.Fragment>
                <Button onClick={() => this.onBackButton(true)}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                    <Icon type="arrow-left"/>
                    <span className="text-back-btn pr-3">{t('back_btn_work_order')}
              </span>
                </Button>
            </React.Fragment>
        }
    };

    onBackButton = (backPopup) => {
        this.setState({backPopup})
    };


    handleDeliveryPopup = (visible, onOk = false) => {
        this.setState({deliveryPopup: visible});
        if (onOk) {
            this.props.changeScreen(workorder_view_state.delivery_ticket)
        }
    };

    handleCredit = (visible, onOk = false) => {
        this.setState({creditPopup: visible});
        if (onOk) {
            this.props.changeScreen(workorder_view_state.generate_credit)
        }

    }
    handleSAV = (visible, onOk = false) => {
        this.setState({savPopup: visible});
        if (onOk) {
            this.props.changeScreen(workorder_view_state.create_sav)
        }
    }

    handleInvoicePopup = (visible, onOk = false) => {
        this.setState({invoicePopup: visible});
        if (onOk) {
            this.props.changeScreen(workorder_view_state.generate_invoice)
        }

    };

    render() {
        const {params} = this.props.match;
        const {t} = this.props;
        const {backPopup, deliveryPopup, invoicePopup, creditPopup, savPopup} = this.state;
        return (
            <React.Fragment>
                <div className="steps-sidebar float-left h-100 position-fixed">
                    {this.getComponent()}
                </div>
                {params.method === methods.edit ?
                    backPopup ? <ConfirmPopup
                        onOk={() => this.onBackButton(false)}
                        width="50%"
                        onCancel={() => history.push(reverse(routes.dashboard.sales.work_order.method,
                            {method: methods.view, type: profiles.distributor, id: params.id,}))}
                        okText={t('cancel')}
                        cancelText={"OUI"}
                        title={"QUITTER LA MODIFICATION DE BON DE COMMANDE"}
                        description={"Êtes vous sûr de vouloir quitter la modification de votre bon de commande distributeur ?"}
                        small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible. Pour retourner à la modification du profil, cliquez sur ‘Annuler’."}
                    /> : ""
                    :
                    backPopup ? <ConfirmPopup
                        onOk={() => this.onBackButton(false)}
                        width="50%"
                        onCancel={() => this.props.invoice ?
                            history.push(reverse(routes.dashboard.sales.work_order.method,
                                {method: methods.view, type: profiles.distributor, id: params.workorderId,}))
                            : history.push(routes.dashboard.sales.work_order.method)}
                        okText={t('cancel')}
                        cancelText={"OUI"}
                        title={"QUITTER LA CRÉATION DE BON DE COMMANDE DISTRIBUTEUR"}
                        description={"Êtes-vous sûr de vouloir quitter la création de bon de commande distributeur ?"}
                        small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible.\n" +
                        "Pour retourner à la création de bon de commande, cliquez sur ‘Annuler’."}
                    /> : ""
                }
                {deliveryPopup && <ConfirmPopup
                    onOk={() => this.handleDeliveryPopup(false)}
                    width="50%"
                    onCancel={() => this.handleDeliveryPopup(false, true)}
                    okText={"ANNULER"}
                    cancelText={t('GÉNÉRER')}
                    title={"GÉNÉRER UN BON DE LIVRAISON"}
                    description={"Êtes-vous sûr de vouloir générer un bon de livraison?"}
                    small_description={"Générer un bon de livraison ne vous permettra plus de modifier votre bon de travail. Pour générer ce bon de livraison, sélectionnez ‘Générer’. Pour annuler, sélectionnez ‘Annuler’."}
                />}
                {invoicePopup && <ConfirmPopup
                    onOk={() => this.handleInvoicePopup(false, true)}
                    width="50%"
                    onCancel={() => this.handleInvoicePopup(false)}
                    okText={t('SÉLECTIONNER')}
                    cancelText={"ANNULER"}
                    title={"GÉNÉRER UNE FACTURE"}
                    description={"Veuillez maintenant sélectionner les articles et/ou bons de livraisons que vous souhaitez facturer."}
                    // small_description={"Générer un bon de livraison ne vous permettra plus de modifier votre bon de travail. Pour générer ce bon de livraison, sélectionnez ‘Générer’. Pour annuler, sélectionnez ‘Annuler’."}
                />}
                {creditPopup && <ConfirmPopup
                    onOk={() => this.handleCredit(false, true)}
                    width="50%"
                    onCancel={() => this.handleCredit(false)}
                    okText={t('SÉLECTIONNER')}
                    cancelText={"ANNULER"}
                    title={"GÉNÉRER UN AVOIR"}
                    description={"Veuillez maintenant sélectionner les articles pour lesquels vous souhaitez générer un avoir."}
                    // small_description={"Générer un bon de livraison ne vous permettra plus de modifier votre bon de travail. Pour générer ce bon de livraison, sélectionnez ‘Générer’. Pour annuler, sélectionnez ‘Annuler’."}
                />}
                {savPopup && <ConfirmPopup
                    onOk={() => this.handleSAV(false, true)}
                    width="50%"
                    onCancel={() => this.handleSAV(false)}
                    okText={t('SÉLECTIONNER')}
                    cancelText={"ANNULER"}
                    title={"CRÉER UN S.A.V."}
                    description={"Veuillez maintenant sélectionner les articles pour lesquels vous souhaitez générer un S.A.V."}
                    // small_description={"Générer un bon de livraison ne vous permettra plus de modifier votre bon de travail. Pour générer ce bon de livraison, sélectionnez ‘Générer’. Pour annuler, sélectionnez ‘Annuler’."}
                />}
            </React.Fragment>

        );
    }
}

export default (withTranslation('common')(WorkOrderSideBar));
