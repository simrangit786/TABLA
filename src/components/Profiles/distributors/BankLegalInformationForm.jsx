import React, {Component} from 'react';
import {Button, Form, Input, InputNumber} from 'antd';
import {Bank} from "./Bank";
import LegalformFilter from "../../../filters/LegalformFilter";
import {codificationAdd, codificationUpdate} from "../../../controller/API/profileApi";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {showErrors} from "../../../controller/utils";

class BankLegalInformationForm extends Component {

    state = {
        buttonLoading: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.setState({buttonLoading: true});
        this.props.form.validateFields((err, values) => {
            const {profile} = this.props;
            values['client'] = profile.id;
            if (this.props.codification) {
                codificationUpdate(this.props.codification.id, values)
                    .then(() => {
                        this.props.next(profile.id);
                        this.setState({buttonLoading: false})
                    }).catch(err => {
                    showErrors(err.response.data, this.props.form);
                    this.setState({buttonLoading: false});
                })
            } else {
                codificationAdd(values)
                    .then((response) => {
                        this.props.next(profile.id);
                        this.setState({buttonLoading: false})
                    }).catch(err => {
                    showErrors(err.response.data, this.props.form);
                    this.setState({buttonLoading: false});
                })
            }
        });
    };

    render() {
        const {t, method} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h5 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('bank_legal')}</h5>
                    </div>
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="text-uppercase font-weight-bold mb-3">{t('legal_information')}</h6>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('legal_status')}>
                                                {getFieldDecorator('legal_form', {
                                                    rules: [{
                                                        required: false,
                                                        message: t('input_capital'),
                                                    }],
                                                })(<LegalformFilter method={method}/>,)}
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
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('share_capital')}>
                                                {getFieldDecorator('share_capital', {
                                                    rules: [{
                                                        required: false,
                                                        message: t('input_your') + t('share_capital')
                                                    }],
                                                })(
                                                    <InputNumber placeholder="Entrer :"/>,
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
                                <Bank client={this.props.profile} bank_info={this.props.bank_info}/>
                            </div>
                        </Form>
                    </div>
                </div>
                <div
                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-between px-5">
                    <div>
                        <Button onClick={() => {
                            this.props.form.resetFields();
                        }} type="button"
                                className="font-weight-bold text-center text-blue border-0 bg-transparent text-capitalize p-0">
                            <span>{t('reset')}</span></Button>
                    </div>
                    <div>
                        <Button style={{marginLeft: 8}} onClick={this.props.prev}
                                className="font-weight-bold text-center text-uppercase mr-3">
                            {t('return')}
                        </Button>
                        <Button disabled={this.state.buttonLoading} loading={this.state.buttonLoading} type="primary"
                                onClick={this.handleSubmit}
                                className="font-weight-bold text-center text-white text-uppercase">
                            {t('save_next')}
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export const BankLegalInformation = Form.create({
    name: "bank_legel",
    mapPropsToFields(props) {
        if (props.codification) {
            const codification = props.codification;
            if (codification) {
                return {
                    intracommunity_number: Form.createFormField({
                        value: codification.intracommunity_number
                    }),
                    share_capital: Form.createFormField({
                        value: codification.share_capital
                    }),
                    siret_number: Form.createFormField({
                        value: codification.siret_number
                    }),
                    legal_form: Form.createFormField({
                        value: codification.legal_form
                    }),
                }
            }
        }
    }
})(withTranslation('common')(withRouter(BankLegalInformationForm)));
