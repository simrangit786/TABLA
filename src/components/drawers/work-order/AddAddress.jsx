import React, {Component} from 'react';
import {Button, Drawer, Form, Input, Select} from 'antd';
import {Image as Images} from "../../Images";
import {withTranslation} from "react-i18next";
import {addressClientPost} from "../../../controller/API/profileApi";
import AddressTypeFilter from "../../../filters/AddressTypeFilter";
import CountryFilter from "../../../filters/CountryFilter";
import {getPhoneFields, phone} from "../../Profiles/distributors/PhoneNumberField";
import SinglePhoneField from "../../Profiles/distributors/SinglePhoneField";

const {Option} = Select;

class AddAddressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_country: "+33",
            phone_number_status: true,
            phoneFields: getPhoneFields("+33") || []
        };
        this.singlePhoneFieldRef = React.createRef();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values['client_id'] = this.props.workorder.client.id;
                addressClientPost(values)
                    .then(() => {
                        this.props.fetch({client_id: this.props.workorder.client.id});
                        this.props.onClose()
                    })
            }
        });
    };

    changeCountry = (selected_country) => {
        this.setPhoneFields(selected_country);
        this.setState({selected_country, phone_number_status: false}, () => {
            setTimeout(() => this.setState({phone_number_status: true}), 100);
        })
    };

    setPhoneFields = (country_code) => {
        const phoneFields = getPhoneFields(country_code);
        this.setState({phoneFields}, () => phoneFields.forEach(item => {
            this[item.field] = React.createRef()
        }))
    };

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {phoneFields, phone_number_status} = this.state;

        return (
            <Drawer
                title={t('workorder_add_address')}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                width="40%"
                destroyOnClose={true}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto px-3 flex-align-center-center position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>{t('close_window_new')}</div>
                    </Button>
                    <div className="col-12">
                        <Form className="main-form">
                            <div className="row">
                                <div className="col-12">
                                    <Form.Item label={'Type de service:'}>
                                        {getFieldDecorator('type', {
                                            rules: [{
                                                required: true,
                                                message: `${t('input_your')} ${t('address_type')}!`
                                            }],
                                        })(<AddressTypeFilter/>)}
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <Form.Item label={'Nom de l\'adresse :'}>
                                        {getFieldDecorator('title', {})(<Input
                                            placeholder={'Nom de l\'adresse'}/>)}
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <Form.Item label={'Jours et horaires d’ouverture :'}>
                                        {getFieldDecorator('opening_days', {})(<Input
                                            placeholder={'Jours et horaires d’ouverture'}/>)}
                                    </Form.Item>
                                </div>


                                <div className="col-12">
                                    <Form.Item label={'Numéro de téléphone :'} required={true}>
                                        <div className="row">
                                            <div className="col-sm-12 col-12 col-md-3 col-lg-3 pr-2">
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
                                            <div className="col-sm-12 col-12 col-md-9 col-lg-9 p-0">
                                                {phone_number_status && <Form.Item>
                                                    {getFieldDecorator('phone_number', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'please input'
                                                        }],
                                                    })(
                                                        <SinglePhoneField ref={this.singlePhoneFieldRef}
                                                                          phoneFields={phoneFields}/>
                                                        ,)}
                                                </Form.Item>}

                                            </div>
                                        </div>
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <Form.Item label={t('Email')}>
                                        {getFieldDecorator('email',)(<Input placeholder={"Email"}/>)}
                                    </Form.Item>
                                </div>

                                <div className="col-12">
                                    <Form.Item label={t('address')}>
                                        {getFieldDecorator('address', {
                                            rules: [{required: true, message: `${t('input_your')} ${t('address')}!`}],
                                        })(
                                            <Input type="text" placeholder={t('address')}/>,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-12 p-0">
                                    <div className="row mx-0">
                                        <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                            <Form.Item label={t('city')}>
                                                {getFieldDecorator('city', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('input_your')} ${t('city')}!`
                                                    }],
                                                })(
                                                    <Input
                                                        type="text"
                                                        placeholder={t('city')}
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                            <Form.Item label={t('zip_code')}>
                                                {getFieldDecorator('zip_code', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('input_your')} ${t('zip_code')}!`
                                                    }],
                                                })(
                                                    <Input
                                                        type="text"
                                                        placeholder={t('zip_code')}
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 p-0">
                                    <div className="row mx-0">
                                        <div className="col-sm-12 col-12 col-md-12 col-lg-12 ">
                                            <Form.Item label={t('country')}>
                                                {getFieldDecorator('country', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} ${t('country')}!`
                                                    }],
                                                })(
                                                    <CountryFilter/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.handleSubmit} type="primary">
                            {t('workorder_add_address_button')}
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export const AddAddress = Form.create()(withTranslation('common')(AddAddressForm));
