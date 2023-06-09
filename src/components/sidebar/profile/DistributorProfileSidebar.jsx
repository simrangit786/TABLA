import React, {Component} from 'react';
import {Button, Icon, message, Steps} from "antd";
import {Image as Images} from "../../Images";
import AddBank from "../../drawers/AddBank";
import AddContact from "../../drawers/AddContact";
import {AddCodificationDistributer} from "../../drawers/AddCodification"
import {methods} from "../../../controller/Global";
import {withTranslation} from "react-i18next";
import {history} from "../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../controller/routes";
import ConfirmPopup from "../../modal/ConfirmPopup";
import {DistributorProfilePdfGetOne} from "../../../controller/API/profileApi";
import {Role} from "../../../utils";

const {Step} = Steps;

class DistributorProfileSidebar extends Component {
    state = {
        addBankShow: false,
        addContactShow: false,
        addCouponsShow: false,
        addCodification: false,
        backPopup: false
    };
    addBankVisible = (visible) => {
        this.setState({addBankShow: visible})
    };
    addContactVisible = (visible) => {
        this.setState({
            addContactShow: visible
        })
    };

    addCodificationVisible = (visible) => {
        this.setState({
            addCodification: visible
        })
    };

    printProfilePDF = () => {
        DistributorProfilePdfGetOne(this.props.match.params.id)
            .then(response => {
                window.open((response.url));
            }).catch(e => {
            message.error('Error in downloading! Please try later.');
        })
    };


    getComponent = () => {
        const {method} = this.props.match.params;
        const {current, steps, match, t} = this.props;
        const edit = match.params.method === methods.edit;
        if (method === methods.create) {
            return <React.Fragment>
                <Button onClick={() => this.onBackButton(true)}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                    <Icon type="arrow-left"/>
                    <span className="text-back-btn pr-3">{t('click_exit')}</span>
                </Button>
                <h6
                    className="heading-name position-absolute  text-white pr-3">{t('create_distributor_caps')}</h6>
                <Steps current={current} direction="vertical" className="h-100">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
            </React.Fragment>
        } else if (method === methods.view) {
            return <React.Fragment>
                <Button onClick={() => history.push(reverse(routes.dashboard.profiles.distributor.self))}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                    <Icon type="arrow-left"/>
                    <span className="text-back-btn pr-3">{t('click_exit')}</span>
                </Button>
                <div className="view-actions position-absolute">
                    <Button disabled={edit} onClick={() => this.printProfilePDF()}
                            className="text-uppercase border-0 text-white position-relative p-0 mb-0">
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.profile_imprimer} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('Imprimer')}</span>
                    </Button>
                    <Button onClick={() => {
                        history.push(reverse(routes.dashboard.profiles.distributor.method, {
                            method: methods.edit,
                            id: match.params.id,

                        }), {profile: this.props.profile})
                    }} className={`text-uppercase border-0 text-white ${edit && 'active'} position-relative p-0`}>
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.edit_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                  {t('edit_profile_info')}
                        </span>
                    </Button>
                    <Button disabled={edit || this.props.profile.codification}
                            onClick={() => this.addCodificationVisible(true)}
                            className="text-uppercase border-0 text-white position-relative p-0 mb-0">
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.document_white_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('add_codifition')}</span>
                    </Button>
                    <Button disabled={edit} className="text-uppercase border-0 text-white position-relative p-0"
                            onClick={() => this.addBankVisible(true)}>
            <span className="action-img-icon flex-align-center-center rounded-circle float-left"><img
                src={Images.vector_icon} alt="edit-icon" className="img-fluid"/></span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('add_bank')}</span>
                    </Button>

                    <Button disabled={edit} onClick={() => this.addContactVisible(true)}
                            className="text-uppercase border-0 text-white position-relative p-0">
            <span className="action-img-icon flex-align-center-center rounded-circle float-left">
              <img src={Images.contact_icon} alt="edit-icon" className="img-fluid"/>
            </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                  {t('add_contact')}
                        </span>
                    </Button>

                </div>
            </React.Fragment>
        } else if (method === methods.edit) {
            return <React.Fragment>
                <Button onClick={() => this.onBackButton(true)}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                    <Icon type="arrow-left"/>
                    <span className="text-back-btn pr-3">{t('back_to_profile')}</span>
                </Button>
                <h6
                    className="heading-name position-absolute text-uppercase text-white pr-3">{t('edit_profile_info')}</h6>
                <Steps current={current} direction="vertical" className="h-100">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="view-actions position-absolute">
                    <Button onClick={() => {
                        history.push(reverse(routes.dashboard.profiles.distributor.method, {
                            method: methods.edit,
                            id: match.params.id,

                        }), {profile: this.props.profile})
                    }} className={`text-uppercase border-0 text-white ${edit && 'active'} position-relative p-0`}>
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.edit_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                  {t('edit_profile_info')}
                        </span>
                    </Button>
                    <Button disabled={edit} onClick={() => this.addCodificationVisible(true)}
                            className="text-uppercase border-0 text-white position-relative p-0">
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.document_white_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                  {t('add_codifition')}
                        </span>
                    </Button>
                    <Button disabled={edit} className="text-uppercase border-0 text-white position-relative p-0"
                            onClick={() => this.addBankVisible(true)}>
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.vector_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                  {t('add_bank')}
                        </span>
                    </Button>

                    <Button disabled={edit} onClick={() => this.addContactVisible(true)}
                            className="text-uppercase border-0 text-white position-relative p-0">

                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.contact_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                  {t('add_contact')}
                        </span>
                    </Button>
                </div>
            </React.Fragment>
        }

    };

    onBackButton = (backPopup) => {
        this.setState({backPopup})
    };

    render() {
        const {t} = this.props;
        const {params} = this.props.match;
        const {backPopup} = this.state;
        return (
            <React.Fragment>
                <div className="steps-sidebar float-left h-100 position-fixed">
                    {this.getComponent() || <Role allow={["sales_person"]}><Button
                        onClick={() => history.push(reverse(routes.dashboard.distributor.self))}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                        <Icon type="arrow-left"/>
                        <span className="text-back-btn pr-3">{t('click_exit')}</span>
                    </Button></Role>}
                </div>
                <AddBank visible={this.state.addBankShow} id={params.id}
                         onClose={() => this.addBankVisible(false)} update={() => this.props.fetch()}/>
                <AddContact visible={this.state.addContactShow} id={params.id}
                            onClose={() => this.addContactVisible(false)} update={() => this.props.fetch()}/>
                <AddCodificationDistributer profile={this.props.profile} visible={this.state.addCodification}
                                            update={() => this.props.fetch()}
                                            id={params.id} codification={this.props.codification}
                                            onClose={() => this.addCodificationVisible(false)}/>

                {params.method === methods.edit ?
                    backPopup ? <ConfirmPopup
                        onOk={() => this.onBackButton(false)}
                        width="50%"
                        onCancel={() => history.push(reverse(routes.dashboard.profiles.distributor.method,
                            {method: methods.view, id: params.id,}))}
                        okText={t('cancel')}
                        cancelText={"OUI"}
                        title={"QUITTER LA MODIFICATION DU PROFIL DISTRIBUTEUR"}
                        description={"Êtes vous sûr de vouloir quitter la modification de votre profil ?"}
                        small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible.\n" +
                        "Pour retourner à la modification du profil, cliquez sur ‘Annuler’."}
                    /> : ""
                    :
                    backPopup ? <ConfirmPopup
                        onOk={() => this.onBackButton(false)}
                        width="50%"
                        onCancel={() => history.push(reverse(routes.dashboard.profiles.distributor.self))}
                        okText={t('cancel')}
                        cancelText={"OUI"}
                        title={"QUITTER LA CRÉATION DU PROFIL DISTRIBUTEUR"}
                        description={"Êtes-vous sûr de vouloir quitter la création de ce profil ?"}
                        small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible.\n" +
                        "Pour retourner à la création du profil, cliquez sur ‘Annuler’."}
                    /> : ""
                }
            </React.Fragment>

        );
    }
}


export default (withTranslation('common')(DistributorProfileSidebar));
