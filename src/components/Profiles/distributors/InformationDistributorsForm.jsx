import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, message, Select} from 'antd';
import ClientTypeFilter from "../../../filters/ClientTypeFilter";
import ClientRankFilter from "../../../filters/clientRankFilter";
import SalesRepresentativeFilter from "../../../filters/salesRepresentativeFilter";
import PaymentModeFilter from "../../../filters/paymentModeFilter";
import {withRouter} from 'react-router-dom'
import {Address} from "./Address";
import {distributorProfilePost, distributorProfileUpdate} from "../../../controller/API/profileApi";
import {withTranslation} from "react-i18next";
import {showErrors} from "../../../controller/utils";
import ProfileGroupFilter from "../../../filters/ProfileGroupFilter";
import PriceListFilter from "../../../filters/PriceListFilter";
import {Centrale} from "./ViewDistributorProfile/modals/Centrale";
import DistributorProfileEntityDropdown from "../../../filters/TableFilters/distributorProfileEntityDropdown";
import {Image as Images} from "../../Images";
import {CreateEntity} from "../../work-order/distributors/CreateEntityDrawer";
import moment from "moment";
import frFR from "antd/es/date-picker/locale/fr_FR";

const {Option} = Select;

class InformationDistributorsForm extends Component {

    state = {
        addNumberShow: false,
        buttonLoading: false,
        centralEnable: false,
        centralData: null,
        visibleCentral: false,
        mount: false,
        visibleEntityDrawer: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({buttonLoading: true});
                if (values['centrale'])
                    values['centrale'] = values['centrale'].key;
                if (this.props.profile) {
                    distributorProfileUpdate(this.props.profile.id, values).then(response => {
                        this.props.next(response.id);
                        this.setState({buttonLoading: false})
                    }).catch(err => {
                            showErrors(err.response.data, this.props.form);
                            this.setState({buttonLoading: false})
                        }
                    )
                } else {
                    distributorProfilePost(values)
                        .then(response => {
                            this.props.next(response.id);
                            this.setState({buttonLoading: false})
                        }).catch(err => {
                        if (err.response) {
                            showErrors(err.response.data, this.props.form);
                        } else {
                            message.error("Something went wrong")
                        }
                        this.setState({buttonLoading: false})
                    });
                }
            }
        });
    };

    handleClientTypeChange = (value) => {
        if (value === 2) {
            this.setState({centralEnable: true})
        } else {
            this.setState({centralEnable: false})
        }
    };
    handleVisibleCentral = (visibleCentral) => {
        this.setState({visibleCentral})
    };
    onCentralValueChange = (value) => {
        this.setState({centralData: value, visibleCentral: false});
        this.props.form.setFieldsValue({centrale: value})
    };

    componentDidMount() {
        this.setState({mount: true});
        const central = this.props.form.getFieldValue("centrale");
        if (central) {
            this.onCentralValueChange(central)
        }
    }

    onPaymentModeChange = (value) => {
        const previous_value = this.props.form.getFieldValue('payment_mode');
        if (value && previous_value && typeof (previous_value) != "object" && value !== previous_value) {
            this.props.form.resetFields(['percentage', 'days'])
        }
    };
    visibleEntityCreateDrawer = (visible) => {
        this.setState({
            visibleEntityDrawer: visible
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        const {centralEnable, centralData, visibleCentral, visibleEntityDrawer} = this.state;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h5 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('distributor_info')} </h5>
                    </div>
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12 position-relative">
                                            <Form.Item label={t('date_created')}
                                                       className={'position-relative select-arrow-none'}>
                                                {getFieldDecorator('created_at', {
                                                    initialValue: moment(),
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + t('date_created') + '!'
                                                    }],
                                                })(
                                                    <DatePicker placeholder={t('select_date')} locale={frFR}
                                                                format={"DD/MM/YYYY"} style={{width: '100%'}}/>
                                                )}
                                            </Form.Item>

                                        </div>
                                        <div className="col-12 position-relative">
                                            <Form.Item label={t('entity')}
                                                       className={'position-relative select-arrow-none'}>
                                                {getFieldDecorator('entity', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + t('entity') + '!'
                                                    }]
                                                })(<DistributorProfileEntityDropdown/>)}
                                                <Button
                                                    onClick={() => this.visibleEntityCreateDrawer(true)}
                                                    className="create-btn-select position-absolute font-weight-bold m-auto px-2 flex-align-center">
                                                    <span>{t('dash.create')}</span>
                                                    <img src={Images.plus_icon_primary} alt="plus icon"
                                                         className="img-fluid"/>
                                                </Button>
                                            </Form.Item>

                                        </div>
                                        <div className="col-12 position-relative">
                                            <Form.Item label={t('distributor_name')}>
                                                {getFieldDecorator('client_name', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} ${t('distributor_name')} `
                                                    }],
                                                })(<Input placeholder={t('distributor_name')}/>)}
                                            </Form.Item>

                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('type_distributor')}>
                                                {getFieldDecorator('client_type', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} ${t('type_distributor')} `
                                                    }],
                                                })(<ClientTypeFilter onChange={this.handleClientTypeChange}/>)}
                                            </Form.Item>
                                            {centralEnable ?
                                                <React.Fragment>
                                                    {centralData ?
                                                        <span
                                                            className="input-label-under position-absolute d-inline-block w-100">
                                                            {centralData.label} <label
                                                            onClick={() => this.handleVisibleCentral(true)}> {t('edit')}</label></span>
                                                        :
                                                        <span
                                                            className="input-label-under position-absolute d-inline-block w-100">
                                                            <label
                                                                onClick={() => this.handleVisibleCentral(true)}> {t("add_centrale")}</label></span>}
                                                    {getFieldDecorator('centrale', {})(<Input type="hidden"/>)}
                                                </React.Fragment>
                                                : ""}
                                        </div>

                                        <div className="col-12 position-relative">
                                            <Form.Item label={t('profile_email')}>
                                                {getFieldDecorator('main_email', {
                                                    rules: [{type: "email", required: true, message: t('input_email')}],
                                                })(<Input placeholder={"Email"}/>)}
                                            </Form.Item>
                                            <small
                                                className="input-text-under position-absolute d-inline-block w-100">{t('email_text')} </small>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('Group')}>
                                                {getFieldDecorator('group', {})(<ProfileGroupFilter/>)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('distributor_rank')}>
                                                {getFieldDecorator('client_rank', {})(<ClientRankFilter/>)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('status')}>
                                                {getFieldDecorator('status', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} ${t('status')} `
                                                    }],
                                                })(
                                                    <Select placeholder={'Sélectionner'}>
                                                        <Option key="A" value={true}>Actif</Option>
                                                        <Option key="B" value={false}>Inactif</Option>
                                                    </Select>)}
                                            </Form.Item>
                                        </div>


                                        {/*<div className="col-12">*/}
                                        {/*    <Form.Item label={t('phn_number')}>*/}
                                        {/*        {getFieldDecorator('phone', {*/}
                                        {/*            rules: [{*/}
                                        {/*                required: true,*/}
                                        {/*                message: `${t('please_input')} ${t('phn_number')} `*/}
                                        {/*            }],*/}
                                        {/*        })(<PhoneNumberWithType/>,)}*/}
                                        {/*    </Form.Item>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('closing_days')}>
                                                {getFieldDecorator('closing_days', {})(<Input
                                                    placeholder={t('enter')}/>)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('payment_mthd')}>
                                                {getFieldDecorator('payment_mode', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_pay_method_name'),
                                                    }],
                                                })(<PaymentModeFilter onChange={this.onPaymentModeChange}/>,)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12 p-0">
                                            <div className="row mx-0">
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                                    <Form.Item label="%">
                                                        {getFieldDecorator('percentage', {})(
                                                            <Input placeholder="%"/>,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                                    <Form.Item label={t('days')}>
                                                        {getFieldDecorator('days', {})(
                                                            <Input placeholder={t('days')}/>,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('Price_list')}>
                                                {getFieldDecorator('price_list', {})(<PriceListFilter/>)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12 ">
                                            <Form.Item
                                                label={t('representative')}>
                                                {getFieldDecorator('sales_representative', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(<SalesRepresentativeFilter/>,)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item
                                                label={t('Etat/Departement du distributeur')}>
                                                {getFieldDecorator('department', {})(<Input/>)}
                                            </Form.Item>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="line-devide w-100 d-inline-block"/>
                                </div>
                                <div className="col-12">
                                    <h6 className="small-heading">{t('Adresse et coordonnées du distributeur')}</h6>
                                </div>
                                <div className="col-12">
                                    <Form.Item>
                                        {getFieldDecorator('address', {
                                            rules: [{required: true, message: t('input_address')}],
                                        })(<Address/>,)}
                                    </Form.Item>
                                </div>
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
                        <Button disabled={this.state.buttonLoading} loading={this.state.buttonLoading} type="primary"
                                onClick={this.handleSubmit}
                                className="font-weight-bold text-center text-white text-uppercase">
                            {t('save_next')}
                        </Button>
                    </div>
                </div>
                <Centrale visible={visibleCentral} close={() => this.handleVisibleCentral(false)}
                          onChange={this.onCentralValueChange}/>
                {visibleEntityDrawer &&
                <CreateEntity visible={visibleEntityDrawer} onClose={() => this.visibleEntityCreateDrawer(false)}/>}

            </React.Fragment>
        );
    }
}

export const InformationDistributors = Form.create({
    name: "distributer_info",
    mapPropsToFields(props) {
        if (props.profile) {
            const profile = props.profile;
            return {
                entity: profile.entity ? Form.createFormField({
                    value: {
                        key: profile.entity.id,
                        label: profile.entity.name
                    },
                }) : "",
                centrale: profile.centrale ? Form.createFormField({
                    value: {
                        key: profile.centrale.id,
                        label: profile.centrale.title
                    }
                }) : "",
                client_type: Form.createFormField({
                    value: {
                        key: profile.client_type.id,
                        label: profile.client_type.title
                    },
                }),
                sales_representative: profile.sales_representative ? Form.createFormField({
                    value: {
                        key: profile.sales_representative.id,
                        label: `${profile.sales_representative.first_name} ${profile.sales_representative.last_name}`
                    },
                }) : "",
                payment_mode: profile.payment_mode ? Form.createFormField({
                    value: {
                        key: profile.payment_mode.id,
                        label: profile.payment_mode.title
                    },
                }) : "",
                group: profile.group ? Form.createFormField({
                    value: {
                        key: profile.group.id,
                        label: profile.group.title
                    },
                }) : "",
                price_list: profile.price_list ? Form.createFormField({
                    value: {
                        key: profile.price_list.id,
                        label: profile.price_list.title
                    },
                }) : "",
                coefficient: profile.coefficient ? Form.createFormField({
                    value: profile.coefficient
                }) : 1,
                phone: Form.createFormField({
                    value: profile.phone
                }),
                department: Form.createFormField({
                    value: profile.department
                }),
                address: Form.createFormField({
                    value: profile.address
                }),
                client_rank: Form.createFormField({
                    value: profile.client_rank
                }),
                client_name: Form.createFormField({
                    value: profile.client_name
                }),
                client_email: Form.createFormField({
                    value: profile.client_email
                }),
                main_email: Form.createFormField({
                    value: profile.main_email ? profile.main_email : profile.client_email
                }),
                percentage: Form.createFormField({
                    value: profile.percentage
                }),
                days: Form.createFormField({
                    value: profile.days
                }),
                created_at: Form.createFormField({
                    value: moment(profile.created_at)
                }),
                closing_days: Form.createFormField({
                    value: profile.closing_days
                }),
                status: Form.createFormField({
                    value: profile.status
                }),
            }
        } else {
            return {
                percentage: Form.createFormField({
                    value: 2
                }),
                days: Form.createFormField({
                    value: 10
                })
            }
        }
    }
})(withTranslation('common')(withRouter(InformationDistributorsForm)));
