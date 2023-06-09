import React, {Component} from 'react';
import {Button, Form, Input} from 'antd';
import {Image as Images} from "../../Images";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {showErrors} from "../../../controller/utils";
import {methods} from "../../../controller/Global";
import ConfirmPopup from "../../modal/ConfirmPopup";
import {history} from "../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../controller/routes";
import {createWorkOrderEntity, updateWorkOrderEntity} from "../../../controller/API/salesOperationAPI";


class EntityProfileFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmEntity: false,
            newEntity: null
        };
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {entity} = this.props;
                if (entity) {
                    updateWorkOrderEntity(entity.id, values)
                        .then(response => {
                            this.confirmEntityVisible(true)
                        }).catch(err => showErrors(err.response.data, this.props.form))
                } else {
                    createWorkOrderEntity(values)
                        .then(response => {
                            this.setState({newEntity: response.data})
                            this.confirmEntityVisible(true)
                        }).catch(err => showErrors(err.response.data, this.props.form))
                }
            }
        })
    };

    confirmEntityVisible = (visible) => {
        this.setState({confirmEntity: visible})
    };

    render() {
        const {t, entity} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {params} = this.props.match;
        const {confirmEntity} = this.state;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h6 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('information_entity')}</h6>
                    </div>
                    <div className="col-12">
                        <Form className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('name')}>
                                                {getFieldDecorator('name', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} ${t('name')}!`
                                                    }],
                                                })(
                                                    <Input
                                                        placeholder={t('enter') + " :"}
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item label={t('legal_form')}>
                                                {getFieldDecorator('legal_form', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} ${t('legal_form')}!`
                                                    }],
                                                })(
                                                    <Input
                                                        placeholder={t('enter') + " :"}
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item label={'RCS'}>
                                                {getFieldDecorator('rcs', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} RCS!`
                                                    }],
                                                })(
                                                    <Input
                                                        autoFocus
                                                        placeholder={t('enter') + " :"}
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item label={'Siret'}>
                                                {getFieldDecorator('siret', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} Siret!`
                                                    }],
                                                })(
                                                    <Input
                                                        placeholder={t('enter') + " :"}
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item label={'N/Id Cee'}>
                                                {getFieldDecorator('nidcee', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} N/Id Cee!`
                                                    }],
                                                })(
                                                    <Input
                                                        placeholder={t('enter') + " :"}
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <div
                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    <div>
                        <Button type="primary" onClick={this.handleSubmit}
                                className="font-weight-bold text-center text-white text-uppercase">
                            {this.props.match.params.method === methods.edit ? t('update_profile_btn') : t('create_entity')}
                        </Button>
                    </div>
                </div>
                {params.method === methods.edit ?
                    confirmEntity ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.entity.method, {
                            method: methods.view,
                            id: entity.id
                        }))}
                        remove_left_btn={true}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.confirmEntityVisible(false)}
                        okText={t('view_profile')}
                        cancelText={false}
                        title={'CONFIRMATION DE MISE À JOUR DE PROFIL'}
                        description={'Profil entité a été mis à jour !'}
                        small_description={'Profil entité a été mis à jour. Pour voir les détails, mettre à jour ou modifier, sélectionner ‘Voir profil’.'}
                    /> : ""
                    :
                    confirmEntity ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.entity.method, {
                            method: methods.view,
                            id: this.state.newEntity.id
                        }))}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.props.history.go(-1)}
                        okText={t('view_profile')}
                        cancelText={"Ok"}
                        title={'CONFIRMATION DU CRÉATION DE PROFIL'}
                        description={'Profil entité TablaCasa a été créé !'}
                        small_description={'Profil entité a été créé. Pour voir les détails, mettre à jour ou modifier, sélectionner ‘Voir profil’.'}
                    /> : ""
                }
            </React.Fragment>
        );
    }
}


export const EntityProfileForm = Form.create({
    name: "entity_profile",
    mapPropsToFields(props) {
        if (props.entity) {
            return {
                name: Form.createFormField({
                    value: props.entity.name
                }),
                legal_form: Form.createFormField({
                    value: props.entity.legal_form
                }),
                rcs: Form.createFormField({
                    value: props.entity.rcs
                }),
                siret: Form.createFormField({
                    value: props.entity.siret
                }),
                nidcee: Form.createFormField({
                    value: props.entity.nidcee
                })
            }
        }

    }
})(withTranslation('common')(withRouter(EntityProfileFormComponent)));
