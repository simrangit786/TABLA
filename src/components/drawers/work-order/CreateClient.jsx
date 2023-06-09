import React, {Component} from 'react';
import {Button, Checkbox, Drawer, Form, Input, InputNumber, Select} from 'antd';
import {Image as Images} from "../../Images";
import {AddNumber} from "../../modal/work-order/AddNumber";
import {AddAddress} from "./AddAddress";
import {withTranslation} from "react-i18next";

const {Option} = Select;

class CreateClientForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
        });
    };
    state = {
        addNumberShow: false,
        addAddressShow: false,
    };
    addNumberVisible = (visible) => {
        this.setState({addNumberShow: visible})
    };
    addAddressVisible = (visible) => {
        this.setState({addAddressShow: visible})
    };

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Drawer
                title={t('create_client')}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                getContainer={false}
                width="60%"
                destroyOnClose={true}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <div className="row">
                        <div className="col-12">
                            <h5 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('info_from_account')} </h5>
                        </div>
                        <div className="col-12">
                            <Form onSubmit={this.handleSubmit} className="main-form">
                                <div className="row">
                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <Form.Item label={t('customer_type')}>
                                                    {getFieldDecorator('client type', {
                                                        rules: [{
                                                            required: true,
                                                            message: ` ${t('input_your')} ${t('customer_type')}!`
                                                        }],
                                                    })(
                                                        <Select placeholder={t('select_client')}
                                                                showAction={["focus", "click"]}>
                                                            <Option value="a">{t('select_client')}</Option>
                                                            <Option value="b">{t('select_client')}</Option>
                                                            <Option value="c">{t('select_client')}</Option>
                                                        </Select>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('central')}>
                                                    {getFieldDecorator('Centrale', {
                                                        rules: [{
                                                            required: true,
                                                            message: ` ${t('input_your')} ${t('central')}!`
                                                        }],
                                                    })(
                                                        <Select showAction={["focus", "click"]}
                                                                placeholder="Sélectionner un type de Centrale">
                                                            <Option value="a">Sélectionner un type de Centrale</Option>
                                                            <Option value="b">Sélectionner un type de Centrale</Option>
                                                            <Option value="c">Sélectionner un type de Centrale</Option>
                                                        </Select>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('client_rank')}>
                                                    {getFieldDecorator('client_rank', {
                                                        rules: [{
                                                            required: true,
                                                            message: ` ${t('input_your')} ${t('client_rank')}!`
                                                        }],
                                                    })(
                                                        <Select showAction={["focus", "click"]}
                                                                placeholder="Select Client Rank">
                                                            <Option value="a">Select Client Rank</Option>
                                                            <Option value="b">Select Client Rank</Option>
                                                            <Option value="c">Select Client Rank</Option>
                                                        </Select>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('client_name')}>
                                                    {getFieldDecorator('nom_du_client', {
                                                        rules: [{
                                                            required: true,
                                                            message: ` ${t('input_your')} ${t('client_name')}!`
                                                        }],
                                                    })(
                                                        <Input
                                                            type="text"
                                                            placeholder={t('client_name')}
                                                        />,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label="DBA">
                                                    {getFieldDecorator('dba', {
                                                        rules: [{required: true, message: ` ${t('input_your')} DBA!`}],
                                                    })(
                                                        <Select showAction={["focus", "click"]}
                                                                placeholder="Select DBA">
                                                            <Option value="a">Select DBA</Option>
                                                            <Option value="b">Select DBA</Option>
                                                            <Option value="c">Select DBA</Option>
                                                        </Select>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('sales_representative')}>
                                                    {getFieldDecorator('represent', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('sales_representative')}!`
                                                        }],
                                                    })(
                                                        <Select showAction={["focus", "click"]}
                                                                placeholder="Nom du représentant des ventes">
                                                            <Option value="a">Nom du représentant des ventes</Option>
                                                            <Option value="b">Nom du représentant des ventes</Option>
                                                            <Option value="c">Nom du représentant des ventes</Option>
                                                        </Select>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('pay_method')}>
                                                    {getFieldDecorator('represent', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('pay_method')}!`,
                                                        }],
                                                    })(
                                                        <Select showAction={["focus", "click"]}
                                                                placeholder={t('pay_method')}>
                                                            <Option value="a">Mode de paiement</Option>
                                                            <Option value="b">Mode de paiement</Option>
                                                            <Option value="c">Mode de paiement</Option>
                                                        </Select>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12 p-0">
                                                <div className="row mx-0">
                                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                                        <Form.Item label="%">
                                                            {getFieldDecorator('mark', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: ` ${t('please_input')}%!`
                                                                }],
                                                            })(
                                                                <Input
                                                                    type="text"
                                                                    placeholder="%"
                                                                />,
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                                        <Form.Item label={t('hrs')}>
                                                            {getFieldDecorator('Jours', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: t('please_input') + t('hrs') + '%!'
                                                                }],
                                                            })(
                                                                <Input
                                                                    type="text"
                                                                    placeholder={t('hrs')}
                                                                />,
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('company_number')}>
                                                    <div className="row">
                                                        <div className="col-sm-12 col-12 col-md-4 col-lg-4 pr-2">
                                                            {getFieldDecorator('number', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: ` ${t('please_input')} ${t('company_number')}!`
                                                                }],
                                                            })(
                                                                <Select showAction={["focus", "click"]}
                                                                        placeholder="+33">
                                                                    <Option value="a">Mode de paiement</Option>
                                                                    <Option value="b">Mode de paiement</Option>
                                                                    <Option value="c">Mode de paiement</Option>
                                                                </Select>,
                                                            )}
                                                        </div>
                                                        <div className="col-sm-12 col-12 col-md-4 col-lg-4 p-0">
                                                            {getFieldDecorator('xxx', {
                                                                rules: [{required: true, message: 'Please input xxx!'}],
                                                            })(
                                                                <InputNumber
                                                                    type="text"
                                                                    placeholder="xxx"
                                                                />,
                                                            )}
                                                        </div>
                                                        <div className="col-sm-12 col-12 col-md-4 col-lg-4 pl-2">
                                                            {getFieldDecorator('xxx_xxx', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input xxx-xxx!'
                                                                }],
                                                            })(
                                                                <InputNumber
                                                                    type="text"
                                                                    placeholder="xxx-xxx"
                                                                />,
                                                            )}
                                                        </div>
                                                    </div>
                                                </Form.Item>
                                            </div>
                                            <div className="col-12 text-center">
                                                <Button onClick={() => this.addNumberVisible(true)}
                                                        className="another-address-add-btn font-weight-bold mt-4 text-uppercase text-center">{t('add_number')}</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <Form.Item label={t('email')}>
                                                    {getFieldDecorator('email', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('email')}!`
                                                        }],
                                                    })(
                                                        <Input
                                                            type="email"
                                                            placeholder={t('email')}
                                                        />,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <div className="row mx-0">
                                                    <Form.Item className="position-relative" label={t('address_name')}>
                                                        {getFieldDecorator('Adresse nom', {
                                                            rules: [{
                                                                required: true,
                                                                message: `${t('input_your')} ${t('address_name')}!`
                                                            }],
                                                        })(
                                                            <Input
                                                                type="email"
                                                                placeholder={t('address_name')}
                                                            />,
                                                        )}
                                                        <Checkbox>Définir comme adresse de facturation</Checkbox>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('address_type')}>
                                                    {getFieldDecorator('address_type', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('address_type')}!`
                                                        }],
                                                    })(
                                                        <Select showAction={["focus", "click"]}
                                                                placeholder="Sélectionner un type d’adresse">
                                                            <Option value="a">Sélectionner un type d’adresse</Option>
                                                            <Option value="b">Sélectionner un type d’adresse</Option>
                                                            <Option value="c">Sélectionner un type d’adresse</Option>
                                                        </Select>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12">
                                                <Form.Item label={t('address')}>
                                                    {getFieldDecorator('Adresse', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('address')}!`
                                                        }],
                                                    })(
                                                        <Input
                                                            type="text"
                                                            placeholder={t('address')}
                                                        />,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12 p-0">
                                                <div className="row mx-0">
                                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                                        <Form.Item label={t('city')}>
                                                            {getFieldDecorator('Ville', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: `${t('please_input')} ${t('city')}!`
                                                                }],
                                                            })(
                                                                <Input
                                                                    type="text"
                                                                    placeholder={t('city')}
                                                                />,
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                                        <Form.Item label={t('state_dep')}>
                                                            {getFieldDecorator('Département', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: `${t('please_input')} ${t('state_dep')}!`
                                                                }],
                                                            })(
                                                                <Input
                                                                    type="text"
                                                                    placeholder={t('state_dep')}
                                                                />,
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 p-0">
                                                <div className="row mx-0">
                                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                                        <Form.Item label={t('zip_code')}>
                                                            {getFieldDecorator('Code_Postal', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: `${t('please_input')} ${t('zip_code')}!`
                                                                }],
                                                            })(
                                                                <Input
                                                                    type="text"
                                                                    placeholder={t('zip_code')}
                                                                />,
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                                        <Form.Item label={t('country')}>
                                                            {getFieldDecorator('Pays', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: `${t('please_input')} ${t('country')}!`
                                                                }],
                                                            })(
                                                                <Input type="text" placeholder={t('country')}/>,
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center">
                                                <Button onClick={() => this.addAddressVisible(true)}
                                                        className="another-address-add-btn font-weight-bold mt-4 text-uppercase text-center">{t('add_address')}</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.props.onClose} type="primary">{t('create_category')}
                        </Button>
                    </div>
                </div>
                <AddNumber visible={this.state.addNumberShow} onClose={() => this.addNumberVisible(false)}/>
                <AddAddress visible={this.state.addAddressShow} onClose={() => this.addAddressVisible(false)}/>
            </Drawer>
        );
    }
}

export const CreateClient = Form.create()(withTranslation('common')(CreateClientForm));