import React, {Component} from 'react';
import {Button, Icon, Steps} from "antd";
import {Image as Images} from "../../Images";
import {methods} from "../../../controller/Global";
import {withTranslation} from "react-i18next";
import {history} from "../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../controller/routes";
import ConfirmPopup from "../../modal/ConfirmPopup";

const {Step} = Steps;

class RepresentativeProfileSidebar extends Component {
    state = {
        backPopup: false
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
                    <span className="text-back-btn pr-3">{t('group_click_exit')}</span>
                </Button>
                <h6
                    className="heading-name position-absolute  text-white pr-3">{t('create_groups_sidebar_heading')}</h6>
                <Steps current={current} direction="vertical" className="h-100">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
            </React.Fragment>
        } else if (method === methods.view) {
            return <React.Fragment>
                <Button onClick={() => history.push(reverse(routes.dashboard.profiles.representative.self))}
                        className="back-btn position-absolute bg-transparent border-0 p-0 flex-align-center">
                    <Icon type="arrow-left"/>
                    <span className="text-back-btn pr-3">{t('representative_click_exit')}</span>
                </Button>
                <div className="view-actions position-absolute">
                    <Button onClick={() => {
                        history.push(reverse(routes.dashboard.profiles.representative.method, {
                            method: methods.edit,
                            id: match.params.id,
                        }))
                    }} className={`text-uppercase border-0 text-white ${edit && 'active'} position-relative p-0`}>
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.edit_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                        {t('edit_profile_info')}
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
                        history.push(reverse(routes.dashboard.profiles.representative.method, {
                            method: methods.edit,
                            id: match.params.id,
                        }))
                    }} className={`text-uppercase border-0 text-white ${edit && 'active'} position-relative p-0`}>
                        <span className="action-img-icon flex-align-center-center rounded-circle float-left">
                            <img src={Images.edit_icon} alt="edit-icon" className="img-fluid"/>
                        </span>
                        <span
                            className="action-text float-left px-2 h-100 flex-align-center text-left font-weight-bold">
                            {t('edit_profile_info')}
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
                    {this.getComponent()}
                </div>
                {params.method === methods.edit ?
                    backPopup ? <ConfirmPopup
                        onOk={() => this.onBackButton(false)}
                        width="50%"
                        onCancel={() => history.push(reverse(routes.dashboard.profiles.representative.method,
                            {method: methods.view, id: params.id,}))}
                        okText={t('cancel')}
                        cancelText={"OUI"}
                        title={"Quitter la MODIFICATION du profil REPRESÉNTANT"}
                        description={"Êtes vous sûr de vouloir quitter la modification de votre profil ?"}
                        small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible.\n" +
                        "Pour retourner à la modification du profil, cliquez sur ‘Annuler’."}
                    /> : ""
                    :
                    backPopup ? <ConfirmPopup
                        onOk={() => this.onBackButton(false)}
                        width="50%"
                        onCancel={() => history.push(reverse(routes.dashboard.profiles.representative.self))}
                        okText={t('cancel')}
                        cancelText={"OUI"}
                        title={"Quitter la création du profil REPRESÉNTANT"}
                        description={"Êtes-vous sûr de vouloir quitter la création de ce profil ?"}
                        small_description={"Vos progrès ne seront pas sauvegardés, et aucun retour arrière ne sera possible.\n" +
                        "Pour retourner à la création du profil, cliquez sur ‘Annuler’."}
                    /> : ""
                }
            </React.Fragment>

        );
    }
}


export default (withTranslation('common')(RepresentativeProfileSidebar));
