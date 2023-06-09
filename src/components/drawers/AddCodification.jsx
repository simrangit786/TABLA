import React, {Component} from 'react';
import {Button, Drawer, Form, Input} from 'antd';
import {Image as Images} from "../Images";
import {withTranslation} from "react-i18next";
import {codificationAdd, codificationUpdate} from "../../controller/API/profileApi";
import LegalformFilter from "../../filters/LegalformFilter";
import {showErrors} from "../../controller/utils";

const _ = require('lodash');

class AddCodification extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let client_id = _.get(this.props.profile, 'id');
            const {codification} = this.props;
            Object.keys(values).forEach(key => values[key] === undefined ? delete values[key] : {});
            if (codification) {
                values['client'] = client_id;
                codificationUpdate(codification.id, values)
                    .then(() => {
                        this.props.update();
                        this.props.onClose()
                    }).catch(err => showErrors(err.response.data, this.props.form))
            } else {
                values['client'] = client_id;
                codificationAdd(values)
                    .then(() => {
                        this.props.update();
                        this.props.onClose()
                    }).catch(err => showErrors(err.response.data, this.props.form))
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            banks: [],
        };
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Drawer
                title={t('add_codifition')}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                getContainer={false}
                style={{position: 'fixed'}}
                width="40%"
                destroyOnClose={true}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid mr-2"/>
                        <div>{t('exit_btn_profile')}</div>
                    </Button>

                    <div className="row mx-0 steps-main-row p-0">
                        <div className="col-12">
                            <h5 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('bank_legal')}</h5>
                        </div>
                        <div className="col-12">
                            <Form onSubmit={this.handleSubmit} className="main-form">
                                <div className="row">
                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <Form.Item label={t('legal_status')}>
                                                    {getFieldDecorator('legal_form', {
                                                        rules: [{
                                                            required: false,
                                                            message: t('input_capital'),
                                                        }],
                                                    })(<LegalformFilter/>,)}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('number_s')}>
                                                    {getFieldDecorator('siret_number', {
                                                        rules: [{
                                                            required: false,
                                                            message: t('input_your') + t('number_s')
                                                        }],
                                                    })(
                                                        <Input placeholder="Entrer :"/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <Form.Item label={t('share_capital')}>
                                                    {getFieldDecorator('share_capital', {
                                                        rules: [{
                                                            required: false,
                                                            message: t('input_your') + t('share_capital')
                                                        }],
                                                    })(
                                                        <Input placeholder="Entrer :"/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <div className="row mx-0">
                                                    <Form.Item label={t('community_number')}>
                                                        {getFieldDecorator('intracommunity_number', {
                                                            rules: [{
                                                                required: false,
                                                                message: t('input_your') + t('community_number')
                                                            }],
                                                        })(
                                                            <Input placeholder="Entrer"/>,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button className="mr-3" onClick={this.props.onClose}>
                            {t('return')}
                        </Button>
                        <Button onClick={(e) => this.handleSubmit(e)} type="primary">
                            {t('add_codifition')}
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export const AddCodificationDistributer = Form.create({
    mapPropsToFields(props) {
        if (props.codification) {
            return {
                legal_form: Form.createFormField({
                    value: props.codification.legal_form
                }),
                siret_number: Form.createFormField({
                    value: props.codification.siret_number
                }),
                share_capital: Form.createFormField({
                    value: props.codification.share_capital
                }),
                intracommunity_number: Form.createFormField({
                    value: props.codification.intracommunity_number
                }),
            }
        }

    }
})(withTranslation('common')(AddCodification));
