import React, {Component} from 'react';
import {Button, Icon, Steps} from "antd";
import {Image as Images} from "../../Images";
import {methods} from "../../../controller/Global";
import {withTranslation} from "react-i18next";
import {routes} from "../../../controller/routes";
import {reverse} from "named-urls";
import {history} from "../../../controller/history";
import ConfirmPopup from "../../modal/ConfirmPopup";

const {Step} = Steps;

class ContainerSidebar extends Component {

    state = {
        confirmVisible: false,
    };

    handleConfirmPopup = (confirmVisible) => {
        const {params} = this.props.match;
        if (params.method === methods.edit || params.method === methods.create)
            this.setState({confirmVisible});
        else
            history.push(routes.dashboard.warehouse.container.self)
    };


    getComponent = () => {
        const {method} = this.props.match.params;
        const {current, steps, match, t} = this.props;
        const edit = match.params.method === methods.edit;
        if (method === methods.create) {
            return <React.Fragment>
                <h6
                    className="heading-name position-absolute text-uppercase text-white pr-3">{t('create_container')}</h6>
                <Steps current={current} direction="vertical" className="h-100">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
            </React.Fragment>
        } else if (method === methods.view) {
            return <div className="view-actions position-absolute">
                <Button
                    onClick={() => {
                        history.push(reverse(routes.dashboard.warehouse.container.method, {
                            type: match.params.type,
                            method: methods.edit,
                            id: match.params.id,

                        }), {profile: this.props.profile})
                    }}
                    className={`text-uppercase border-0 text-white ${edit && 'active'} position-relative p-0`}>
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.edit_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                    <span
                        className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('modilfy_container')}</span>
                </Button>

                <Button disabled={edit}
                        className="text-uppercase border-0 text-white position-relative p-0 mb-0">
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.document_white_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                    <span
                        className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                        {t('print_container_sidebar')}
                        </span>
                </Button>
            </div>
        } else if (method === methods.edit) {
            return <React.Fragment>
                <h6
                    className="heading-name position-absolute text-uppercase text-white pr-3">{t('modilfy_container')}</h6>
                <Steps current={current} direction="vertical" className="h-100">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="view-actions position-absolute">
                    <Button
                        //     onClick={() => {
                        //     history.push(reverse(routes.dashboard.warehouse.container.method, {
                        //         type: match.params.type,
                        //         method: methods.edit,
                        //         id: match.params.id,
                        //
                        //     }), {profile: this.props.profile})
                        // }}
                        className={`text-uppercase border-0 text-white ${edit && 'active'} position-relative p-0`}>
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.edit_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('modilfy_container')}</span>
                    </Button>
                    <Button disabled={edit}
                            className="text-uppercase border-0 text-white position-relative p-0 mb-0">
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.document_white_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">{t('print_container_sidebar')}</span>
                    </Button>
                </div>
            </React.Fragment>
        }

    };

    render() {
        const {t, match} = this.props;
        const {confirmVisible} = this.state;
        return (
            <React.Fragment>
                <div className="steps-sidebar float-left h-100 position-fixed">
                    <Button
                        onClick={() => this.handleConfirmPopup(true)}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                        <Icon type="arrow-left"/>
                        <span
                            className="text-back-btn pr-3">{match.params.method === methods.edit ? t('return_to_container') :
                            t('goback_container')}</span>
                    </Button>
                    {this.getComponent()}
                </div>
                {confirmVisible && (match.params.method === methods.edit ?
                        <ConfirmPopup
                            width="50%"
                            onOk={() => this.handleConfirmPopup(false)}
                            onCancel={() => {
                                this.handleConfirmPopup(false);
                                history.push(reverse(routes.dashboard.warehouse.container.method, {
                                    method: methods.view,
                                    id: match.params.id
                                }));
                            }}
                            okText={'ANNULER'}
                            cancelText={"OUI"}
                            title={"QUITTER LA MODIFICATION DU CONTENEUR"}
                            description={"Êtes vous sûr de vouloir quitter la modification de votre conteneur ?"}
                            small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible." +
                            "Pour retourner à la modification du profil, cliquez sur ‘Annuler’."}
                        />
                        : <ConfirmPopup
                            onOk={() => this.handleConfirmPopup(false)}
                            width="50%"
                            onCancel={() => {
                                this.handleConfirmPopup(false);
                                history.push(reverse(routes.dashboard.warehouse.container.method, {
                                    method: methods.view,
                                    id: match.params.id
                                }));

                            }}
                            okText={'ANNULER'}
                            cancelText={"OUI"}
                            title={"QUITTER LA CRÉATION DU CONTENEUR"}
                            description={"Êtes-vous sûr de vouloir quitter la création du conteneur?"}
                            small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible." +
                            "Pour retourner à la création du profil, cliquez sur ‘Annuler’."}
                        />

                )}
            </React.Fragment>

        );
    }
}

export default (withTranslation('common')(ContainerSidebar));
