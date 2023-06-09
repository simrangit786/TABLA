import React, {Component} from 'react';
import {Button, Drawer, Form, Input, message} from 'antd';
import {Image as Images} from "../Images";
import {withTranslation} from "react-i18next";
import BankListFilter from "../../filters/BankListFilter";
import {bankAdd, bankRemove, bankUpdate} from "../../controller/API/profileApi";
import CountryFilter from "../../filters/CountryFilter";

const _ = require('lodash');

class AddBankForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banks: [],
        };
    }

    handleRemoveCard = (id, index) => {
        bankRemove(id)
            .then(() => {
                let {banks} = this.state;
                banks.splice(index, 1);
                this.setState({banks});
                this.props.changeState('bank_info', banks)
            })
    };

    validatelength = (rule, value, callback) => {
        if (value && value.length > rule.length) {
            callback(`max length is ${rule.length}`);
        } else {
            callback();
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const {bank} = this.props;
            if (!err) {
                let client_id = _.get(this.props, 'id', null);
                if (client_id) {
                    if (bank) {
                        values['bank'] = values['bank'].key;
                        bankUpdate(bank.id, values)
                            .then(response => {
                                this.props.update();
                                this.props.onClose()
                            }).catch(() => {
                            message.error("some error occurred.")
                        })
                    } else {
                        Object.keys(values).forEach(key => values[key] === undefined ? delete values[key] : {});
                        values['client'] = client_id;
                        bankAdd(values)
                            .then(response => {
                                this.props.update();
                                this.props.onClose()
                            }).catch(() => {
                            message.error("some error occurred.")
                        })
                    }
                }
            }
        })
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Drawer
                title={t('add_bank')}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                getContainer={false}
                style={{position: 'fixed'}}
                width="50%"
                destroyOnClose={true}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid mr-2"/>
                        <div>{t('exit_btn_profile')}</div>
                    </Button>
                    <div className="col-12">
                        <h6 className="text-uppercase font-weight-bold mb-3 mt-4">{t('banking_info')}</h6>
                    </div>
                    <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                        <div className="row">
                            <div className="col-12">
                                <Form.Item label={t('bank') + ":"}>
                                    {getFieldDecorator('bank', {
                                        rules: [{
                                            required: true,
                                            message: t('select_bank'),
                                        }],
                                    })(<BankListFilter/>,)}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item label={t('address')}>
                                    {getFieldDecorator('address', {
                                        rules: [{
                                            required: true,
                                            message: t('input_address')
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
                            <div className="col-12 col-sm-12 col-lg-6 col-md-6 pr-1">
                                <div className="row mx-0">
                                    <Form.Item label={t('zip_code')}>
                                        {getFieldDecorator('zip_code', {
                                            rules: [{
                                                required: true,
                                                message: t('input_your') + t('zip_code') + "!"
                                            }],
                                        })(
                                            <Input placeholder="Entrer"/>,
                                        )}
                                    </Form.Item>

                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-lg-6 col-md-6 pl-1">
                                <div className="row mx-0">

                                    <Form.Item label={t('city')}>
                                        {getFieldDecorator('city', {
                                            rules: [{
                                                required: true,
                                                message: t('input_city')
                                            }],
                                        })(
                                            <Input placeholder="Entrer :"/>,
                                        )}
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <Form.Item label={t('country') + ":"}>
                                            {getFieldDecorator('country', {
                                                rules: [{
                                                    required: true,
                                                    message: t('select_country'),
                                                }],
                                            })(<CountryFilter/>,)}`
                                        </Form.Item>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <h6 className="text-uppercase font-weight-bold mb-3 mt-4">RIB</h6>
                    </div>
                    <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-lg-6 col-md-6 pr-1">
                                        <div className="row mx-0">
                                            <Form.Item label={t('bank_code')}>
                                                {getFieldDecorator('bank_code', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + t('bank_code') + "!"
                                                    }, {
                                                        validator: this.validatelength,
                                                        length: 5
                                                    }],
                                                })(
                                                    <Input placeholder="Entrer"/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-lg-6 col-md-6 pl-1">
                                        <div className="row mx-0">
                                            <Form.Item label={t('country_code')}>
                                                {getFieldDecorator('agency_code', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + t('country_code') + "!"
                                                    }, {
                                                        validator: this.validatelength,
                                                        length: 5
                                                    }],
                                                })(
                                                    <Input placeholder="Entrer"/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <Form.Item label={t('acc_number')}>
                                    {getFieldDecorator('account_number', {
                                        rules: [{
                                            required: true,
                                            message: t('input_your') + t('acc_number') + "!"
                                        }, {
                                            validator: this.validatelength,
                                            length: 11
                                        }],
                                    })(
                                        <Input placeholder="Entrer"/>,
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item label="IBAN">
                                    {getFieldDecorator('iban', {
                                        rules: [{
                                            required: true,
                                            message: t('input_your') + ' IBAN!'
                                        }, {
                                            validator: this.validatelength,
                                            length: 35
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
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-lg-6 col-md-6 pr-1">
                                        <div className="row mx-0">
                                            <Form.Item label={t('rib_key')}>
                                                {getFieldDecorator('rib_key', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + t('rib_key') + "!"
                                                    }, {
                                                        validator: this.validatelength,
                                                        length: 2
                                                    }],
                                                })(
                                                    <Input placeholder="Entrer"/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-lg-6 col-md-6 pl-1">
                                        <div className="row mx-0">
                                            <Form.Item label="BIC">
                                                {getFieldDecorator('bic_swift_address', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + 'BIC!'
                                                    }, {
                                                        validator: this.validatelength,
                                                        length: 12
                                                    }],
                                                })(
                                                    <Input placeholder="Entrer"/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <Form.Item label={t('agency')}>
                                    {getFieldDecorator('bank_branch', {
                                        rules: [{
                                            required: true,
                                            message: t('input_your') + t('agency') + "!"
                                        }],
                                    })(
                                        <Input placeholder="Entrer :"/>,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button className="mr-3" onClick={this.props.onClose}>
                            {t('return')}
                        </Button>
                        <Button onClick={(e) => this.handleSubmit(e)} type="primary">
                            {t('add_this_bank')}
                        </Button>
                    </div>
                </div>

            </Drawer>
        );
    }
}

const AddBank = Form.create({
    mapPropsToFields(props) {
        if (props.bank) {
            return {
                bank: Form.createFormField({
                    value: {
                        key: props.bank.bank.id,
                        label: props.bank.bank.name
                    }
                }),
                address: Form.createFormField({
                    value: props.bank.address
                }),
                zip_code: Form.createFormField({
                    value: props.bank.zip_code
                }),
                city: Form.createFormField({
                    value: props.bank.city
                }),
                country: Form.createFormField({
                    value: props.bank.country
                }),
                bank_code: Form.createFormField({
                    value: props.bank.bank_code
                }),
                agency_code: Form.createFormField({
                    value: props.bank.agency_code
                }),
                account_number: Form.createFormField({
                    value: props.bank.account_number
                }),
                iban: Form.createFormField({
                    value: props.bank.iban
                }),
                rib_key: Form.createFormField({
                    value: props.bank.rib_key
                }),
                bic_swift_address: Form.createFormField({
                    value: props.bank.bic_swift_address
                }),
                bank_branch: Form.createFormField({
                    value: props.bank.bank_branch
                }),

            }
        }
    }
})(withTranslation('common')(AddBankForm));

export default AddBank
