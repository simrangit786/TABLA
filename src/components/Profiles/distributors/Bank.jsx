import React, {Component} from 'react';
import {Button, Form, Input} from "antd";
import BankListFilter from "../../../filters/BankListFilter";
import {bankAdd, bankRemove, bankUpdate} from "../../../controller/API/profileApi";
import {withTranslation} from "react-i18next";
import {showErrors} from "../../../controller/utils";
import CountryFilter from "../../../filters/CountryFilter";

class BankForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banks: [],
            editBank: null,
        };
    }

    validatelength = (rule, value, callback) => {
        if (value && value.length > rule.length) {
            callback(`max length is ${rule.length}`);
        } else {
            callback();
        }
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {client} = this.props;
                values['client'] = client.id;
                let {banks, editBank} = this.state;
                if (editBank) {
                    values['bank'] = values.bank.key;
                    bankUpdate(editBank, values).then(response => {
                        let newArr = banks.map(item => {
                            if (item.id === response.data.id) {
                                return response.data
                            } else {
                                return item
                            }
                        });
                        this.setState({banks: newArr, editBank: null});
                    }).catch(err => showErrors(err.response.data, this.props.form))
                } else {
                    bankAdd(values)
                        .then(response => {
                            banks.push(response.data);
                            this.setState({banks, editBank: null});
                        }).catch(err => showErrors(err.response.data, this.props.form))
                }
                this.props.form.resetFields();
            }
        })
    };

    handleRemoveCard = (id, index) => {
        bankRemove(id)
            .then(() => {
                let {banks} = this.state;
                banks.splice(index, 1);
                this.setState({banks});
            })
    };

    componentDidMount() {
        if (this.props.bank_info) {
            this.setState({banks: this.props.bank_info})
        }
    }

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {banks, editBank} = this.state;
        return (
            <React.Fragment>
                <div className="col-12">
                    <h6 className="text-uppercase font-weight-bold mb-3 mt-4">{t('banking_info')}</h6>
                </div>
                <div className="col-sm-12 col-12 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-12">
                            <Form.Item label={t('bank') + ":"}>
                                {getFieldDecorator('bank', {
                                    rules: [{
                                        required: false,
                                        message: t('select_bank'),
                                    }],
                                })(<BankListFilter/>,)}
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item label={t('address')}>
                                {getFieldDecorator('address', {
                                    rules: [{
                                        required: false,
                                        message: t('input_address')
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
                        <div className="col-12 col-sm-12 col-lg-6 col-md-6 pr-1">
                            <div className="row mx-0">
                                <Form.Item label={t('zip_code')}>
                                    {getFieldDecorator('zip_code', {
                                        rules: [{
                                            required: false,
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
                                            required: false,
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
                                    <Form.Item label={t('country')}>
                                        {getFieldDecorator('country', {
                                            rules: [{
                                                required: false,
                                                message: t('input_your') + t('country') + "!"
                                            }],
                                        })(<CountryFilter/>,
                                        )}
                                    </Form.Item>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h6 className="text-uppercase font-weight-bold mb-3 mt-4">RIB</h6>
                </div>
                <div className="col-sm-12 col-12 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-lg-6 col-md-6 pr-1">
                                    <div className="row mx-0">
                                        <Form.Item label={t('bank_code')}>
                                            {getFieldDecorator('bank_code', {
                                                rules: [{
                                                    required: false,
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
                                                    required: false,
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
                                        required: false,
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
                                        required: false,
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
                        <div className="col-12">
                            <Button onClick={this.handleSubmit}
                                    className="another-address-add-btn w-auto font-weight-bold mt-4 text-uppercase text-center">
                                {editBank ? t('edit_bank') : t('add_this_bank')}
                            </Button>
                        </div>
                        {banks.map((data, index) =>
                            <div key={`address_card_${index}`} className="col-12">
                                <div className="row mx-0 address-add-row position-relative">
                                    <div className="col-lg-4 col-sm-12 col-12">
                                        <h5 className="mb-0 text-uppercase">{data.bank && data.bank.name}</h5>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 col-12 position-relative">
                                        <p className="mb-0">{`${data.address ? data.address : '-'}, ${data.zip_code ? data.zip_code : '-'}, ${data.city ? data.city : '-'}, ${data.country ? data.country : '-'}
                `}</p>
                                    </div>
                                    <div className="position-absolute edit-delete-div">
                                        <Button onClick={() => {
                                            this.props.form.setFieldsValue({
                                                bank: {
                                                    key: data.bank.id,
                                                    label: data.bank.name
                                                },
                                                bank_branch: data.bank_branch,
                                                bic_swift_address: data.bic_swift_address,
                                                rib_key: data.rib_key,
                                                iban: data.iban,
                                                account_number: data.account_number,
                                                agency_code: data.agency_code,
                                                bank_code: data.bank_code,
                                                zip_code: data.zip_code,
                                                country: data.country,
                                                address: data.address,
                                                city: data.city
                                            });
                                            this.setState({editBank: data.id})

                                        }} className="mt-n5 bg-transparent rounded-0 border-0 shadow-none p-0 h-auto"
                                        >{t("edit")}</Button>
                                        <Button
                                            onClick={() => this.handleRemoveCard(data.id, index)}
                                            className="bg-transparent rounded-0 border-0 shadow-none p-0 h-auto">
                                            {t("delete")}
                                        </Button>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </div>
                <div className="col-sm-12 col-12 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-lg-6 col-md-6 pr-1">
                                    <div className="row mx-0">
                                        <Form.Item label={t('rib_key')}>
                                            {getFieldDecorator('rib_key', {
                                                rules: [{
                                                    required: false,
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
                                                    required: false,
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
                                        required: false,
                                        message: t('input_your') + t('agency') + "!"
                                    }],
                                })(
                                    <Input placeholder="Entrer :"/>,
                                )}
                            </Form.Item>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export const Bank = Form.create()(withTranslation('common')(BankForm));
