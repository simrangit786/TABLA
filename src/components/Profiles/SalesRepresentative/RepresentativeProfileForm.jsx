import React, {Component} from 'react';
import {Button, Form, Input, Select} from 'antd';
import {salesRepresentativePost, salesRepresentativeUpdate} from "../../../controller/API/profileApi";
import {Image as Images} from "../../Images";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {showErrors} from "../../../controller/utils";
import {methods} from "../../../controller/Global";
import ConfirmPopup from "../../modal/ConfirmPopup";
import {history} from "../../../controller/history";
// import {reverse} from "named-urls";
import {reverse} from "named-urls/dist/index.es";
import {routes} from "../../../controller/routes";
import {SalesPhoneNumber} from "./fields/SalesPhoneNumber";
import {getPhoneFields, phone} from "../distributors/PhoneNumberField";
import {country} from "../../../assets/country";

const {Option} = Select;

class GroupProfileFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmGroup: false,
            data: null,
            phone_number_status: true,
            selected_country: "+33",
            phoneFields: getPhoneFields(props.form.getFieldValue('country_code') || "+33")
        };
    }

    changeCountry = (selected_country) => {
        this.setPhoneFields(selected_country);
        this.setState({selected_country, phone_number_status: false}, () => {
            setTimeout(() => this.setState({phone_number_status: true}), 100);
        })
    };

    setPhoneFields = (country_code) => {
        const phoneFields = getPhoneFields(country_code);
        this.setState({phoneFields}, () => phoneFields.map(item => {
            this[item.field] = React.createRef()
        }))
    };


    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {representative} = this.props;
                if (representative) {
                    salesRepresentativeUpdate(representative.id, values)
                        .then(response => {
                            this.confirmGroupVisible(true)
                        }).catch(err => showErrors(err.response.data, this.props.form))
                } else {
                    salesRepresentativePost(values)
                        .then(response => {
                            this.confirmGroupVisible(true, response.data)
                        }).catch(err => showErrors(err.response.data, this.props.form))
                }
            }
        })
    };

    confirmGroupVisible = (visible, data = null) => {
        if (data) {
            this.setState({data: data})
        }
        this.setState({confirmGroup: visible})
    };

    render() {
        const {t, representative, i18n} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {params} = this.props.match;
        const {confirmGroup, data, phoneFields, phone_number_status} = this.state;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h6 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('representative_info')}</h6>
                    </div>
                    <div className="col-12">
                        <Form className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('representative_type')}>
                                                {getFieldDecorator('title', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input autoFocus placeholder={t('representative_type')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('email')}>
                                                {getFieldDecorator('email', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('email')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('representative_first_name')}>
                                                {getFieldDecorator('first_name', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('representative_first_name')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('address_type')}>
                                                {getFieldDecorator('type', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('address_type')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('representative_last_name')}>
                                                {getFieldDecorator('last_name', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('representative_last_name')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('address')}>
                                                {getFieldDecorator('address', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('address')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('city')}>
                                                {getFieldDecorator('city', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('city')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('state_dep_view')}>
                                                {getFieldDecorator('state_province', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('state_dep_view')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('zip_code')}>
                                                {getFieldDecorator('zip_code', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('zip_code')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('country')}>
                                                {getFieldDecorator('country', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Select>
                                                        {country.map((item, index) =>
                                                            <Option key={`country_${index}`}
                                                                    value={item[i18n.language]}>{item[i18n.language]}</Option>)}
                                                    </Select>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('number_s')}>
                                                {getFieldDecorator('siret_number', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input placeholder={t('number_s')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <Form.Item label={t('phn_number')} required={true}>
                                        <div className="row mx-0">
                                            <div className="country-code-div">
                                                <Form.Item>
                                                    {getFieldDecorator('country_code', {
                                                        initialValue: this.state.selected_country,
                                                        rules: [{
                                                            required: true,
                                                            message: 'please input distributer range'
                                                        }],
                                                    })(
                                                        <Select className="position-relative address-dropdown"
                                                                showAction={["focus", "click"]}
                                                                onChange={(value) => this.changeCountry(value)}
                                                        >
                                                            {phone.map((obj, index) => <Option key={`country_${index}`}
                                                                                               value={obj.country_code}>
                                                                <img src={obj.flag}
                                                                     className="img-fluid mr-2 flag-img-drp"
                                                                     alt="flag"/>
                                                                <span>{obj.country_code}</span>
                                                            </Option>)}
                                                        </Select>
                                                        ,)}
                                                </Form.Item>
                                            </div>
                                            <div className="phone-fields-div">
                                                {phone_number_status && phoneFields &&
                                                <Form.Item>
                                                    {getFieldDecorator('phone', {
                                                        rules: [
                                                            {required: true, message: t('please_input')}, {
                                                                min: phoneFields.reduce((a, b) => {
                                                                    return parseInt(a) + parseInt(b.max)
                                                                }, 0),
                                                                message: "all field not submitted"
                                                            }],
                                                    })(<SalesPhoneNumber phoneFields={phoneFields}/>)}
                                                </Form.Item>}
                                            </div>
                                        </div>
                                    </Form.Item>
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
                            {this.props.method === methods.edit ? t('update_profile_btn') : t('crete_profill')}
                        </Button>
                    </div>
                </div>
                {params.method === methods.edit ?
                    confirmGroup ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.representative.method, {
                            method: methods.view,
                            id: representative.id
                        }))}
                        remove_left_btn={true}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.confirmGroupVisible(false)}
                        okText={t('view_profile')}
                        cancelText={false}
                        title={t('confirm_profile_update')}
                        description={t('sales_representative_updated')}
                        small_description={t('sales_representative_updated_main')}
                    /> : ""
                    :
                    confirmGroup ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.representative.method, {
                            method: methods.view,
                            id: data.id
                        }))}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.props.history.go(-1)}
                        okText={t('view_profile')}
                        cancelText={"Ok"}
                        title={t('profile_create_confirm')}
                        description={t('created_sales_representative_new')}
                        small_description={t('created_sales_representative_profile_main')}
                    /> : ""
                }
            </React.Fragment>
        );
    }
}


export const RepresentativeProfileForm = Form.create({
    name: "group_profile",
    mapPropsToFields(props) {
        if (props.representative) {
            return {
                title: Form.createFormField({
                    value: props.representative.title
                }), first_name: Form.createFormField({
                    value: props.representative.first_name
                }), last_name: Form.createFormField({
                    value: props.representative.last_name
                }), email: Form.createFormField({
                    value: props.representative.email
                }), country_code: Form.createFormField({
                    value: props.representative.country_code
                }), phone: Form.createFormField({
                    value: props.representative.phone
                }), type: Form.createFormField({
                    value: props.representative.type
                }), address: Form.createFormField({
                    value: props.representative.address
                }), city: Form.createFormField({
                    value: props.representative.city
                }), state_province: Form.createFormField({
                    value: props.representative.state_province
                }), zip_code: Form.createFormField({
                    value: props.representative.zip_code
                }), country: Form.createFormField({
                    value: props.representative.country
                }), siret_number: Form.createFormField({
                    value: props.representative.siret_number
                }),

            }
        }

    }
})(withTranslation('common')(withRouter(GroupProfileFormComponent)));
