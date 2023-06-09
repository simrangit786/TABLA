import React, {Component} from 'react';
import {Button, Form, Input, Select} from "antd";
import {
    addressPost,
    addressRemove,
    addressUpdate,
    setBillingAddressPost,
    setConfirmationAddressPost,
    setInvoiceAddressPost
} from "../../../controller/API/profileApi";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {supplierAddressAdd, supplierAddressUpdate} from "../../../controller/API/itemApi";
import AddressTypeFilter from "../../../filters/AddressTypeFilter";
import CountryFilter from '../../../filters/CountryFilter';
import {getPhoneFields, phone} from "./PhoneNumberField";
import SinglePhoneField from "./SinglePhoneField";

const INVOICE_ADDRESS = 'invoice_address'
const BILLING_ADDRESS = "default"
const CONFIRMATION_ADDRESS = "default_confirmation"
const {Option} = Select;

class AddressForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addresses: this.props.value || [],
            editAddress: null,
            defaultBillingAddress: null,
            defaultInvoiceAddress: null,
            defaultConfirmationAddress: null,
            phoneFields: getPhoneFields("+33") || [],
            selected_country: "+33",
            phone_number_status: true,
        };
        this.singlePhoneFieldRef = React.createRef();

    }

    makeDefaultBillingAddress = e => {
        const name = e.target.name;
        const value = parseInt(e.target.value)
        if (this.props.match.params.id) {
            if (name === INVOICE_ADDRESS) {
                setInvoiceAddressPost({client: this.props.match.params.id, address: value})
                    .then(response => {
                        this.setState({defaultInvoiceAddress: value})
                    })
            } else if (name === BILLING_ADDRESS) {
                setBillingAddressPost({client: this.props.match.params.id, address: value})
                    .then(response => {
                        this.setState({defaultBillingAddress: value})
                    })
            } else {
                setConfirmationAddressPost({client: this.props.match.params.id, address: value})
                    .then(response => {
                        this.setState({defaultConfirmationAddress: value})
                    })
            }
        } else {
            const {addresses} = this.state
            const address_exist = addresses.find(item => item[name])
            if (address_exist) {
                addressUpdate(address_exist.id, {[name]: false})
            }
            addressUpdate(value, {[name]: true})
                .then(response => {
                    const replace_address_index = addresses.findIndex(i => i.id === value);
                    addresses[replace_address_index] = response.data
                    if (name === INVOICE_ADDRESS)
                        this.setState({defaultInvoiceAddress: value, addresses})
                    else if (name === BILLING_ADDRESS)
                        this.setState({defaultBillingAddress: value, addresses})
                    else
                        this.setState({defaultConfirmationAddress: value, addresses})
                })
        }
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
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.supplier)
                    this.handleSupplierAddress(values);
                else
                    this.handleProfileAddress(values)
            }
        })
    };
    handleProfileAddress = (values) => {
        let {addresses, editAddress} = this.state;
        if (editAddress) {
            addressUpdate(editAddress, values)
                .then(response => {
                    let newArr = addresses.map(item => {
                        if (item.id === response.data.id) {
                            return response.data
                        } else {
                            return item
                        }
                    });
                    this.props.form.resetFields();
                    this.setState({addresses: newArr, editAddress: null, phoneFields: getPhoneFields("+33")});
                })
        } else {
            addressPost(values).then(response => {
                addresses.push(response.data);
                this.props.form.resetFields();
                this.setState({addresses, editAddress: null, phoneFields: getPhoneFields("+33")});
                this.props.onChange(addresses.map(d => d.id))
            })
        }
    };
    handleSupplierAddress = (values) => {
        let {addresses, editAddress} = this.state;
        if (editAddress) {
            supplierAddressUpdate(editAddress, values).then(response => {
                let newArr = addresses.map(item => {
                    if (item.id === response.data.id) {
                        return response.data
                    } else {
                        return item
                    }
                });
                this.setState({addresses: newArr, editAddress: null});
                this.props.form.resetFields();
            })
        } else {
            supplierAddressAdd(values).then(response => {
                addresses.push(response.data);
                this.setState({addresses});
                this.props.form.resetFields();
                this.setState({editAddress: null});
                this.props.onChange(addresses.map(d => d.id))
            })
        }
    };
    handleRemoveCard = (id, index) => {
        let {addresses} = this.state;
        addressRemove(id).then(() => {
            addresses.splice(index, 1);
            this.setState({addresses});
            this.props.onChange(addresses.map(d => d.id));
        })
    };

    componentDidMount() {
        if (this.props.value) {
            this.props.onChange(this.props.value.map(d => d.id))
        }
        if (this.props.value && this.props.value.length > 0) {
            const defaultBillingAddress = this.props.value.filter(i => i.default)
            const defaultInvoiceAddress = this.props.value.filter(i => i.invoice_address)
            const defaultConfirmationAddress = this.props.value.filter(i => i.default_confirmation)
            if (defaultBillingAddress.length > 0) {
                this.setState({defaultBillingAddress: defaultBillingAddress[0].id})
            }
            if (defaultInvoiceAddress.length > 0) {
                this.setState({defaultInvoiceAddress: defaultInvoiceAddress[0].id})
            }
            if (defaultConfirmationAddress.length > 0) {
                this.setState({defaultConfirmationAddress: defaultConfirmationAddress[0].id})
            }
        }
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {
            addresses,
            editAddress,
            defaultBillingAddress,
            defaultInvoiceAddress,
            defaultConfirmationAddress,
            phoneFields
        } = this.state;
        const {t} = this.props;
        return (
            <React.Fragment>
                <div className="row">

                    <div className="col-lg-6 padding-0-ipad px-0">
                        <div className="col-12">
                            <Form.Item label={'Type de service:'}>
                                {getFieldDecorator('type', {
                                    rules: [{required: true, message: t('input_your') + t('address_type') + '!'}],
                                })(
                                    <AddressTypeFilter/>,
                                )}
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
                            <Form.Item label={t('phn_number')}>
                                <div className="row">
                                    <div className="col-sm-12 col-12 col-md-3 col-lg-3">
                                        <Form.Item style={{marginBottom: "0px"}}>
                                            {getFieldDecorator('country_code', {
                                                initialValue: this.state.selected_country,
                                                rules: [{
                                                    required: true,
                                                    message: 'please input distributer range'
                                                }],
                                            })(
                                                <Select className="position-relative address-dropdown"
                                                        showAction={["focus", "click"]}
                                                        onChange={this.changeCountry}>
                                                    {phone.map((obj, index) =>
                                                        <Option key={`country_${index}`} value={obj.country_code}>
                                                            <img src={obj.flag}
                                                                 className="img-fluid mr-2 flag-img-drp" alt="flag"/>
                                                            <span>{obj.country_code}</span>
                                                        </Option>)}
                                                </Select>
                                                ,)}
                                        </Form.Item>
                                    </div>
                                    <div className="col-sm-12 col-12 col-md-9 col-lg-9">
                                        {getFieldDecorator('phone_number', {
                                            rules: [{
                                                required: true,
                                                message: 'please input'
                                            }],
                                        })(
                                            <SinglePhoneField ref={this.singlePhoneFieldRef} phoneFields={phoneFields}/>
                                            ,)}
                                    </div>
                                </div>
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item label={t('Email')}>
                                {getFieldDecorator('email',)(<Input placeholder={"Email"}/>)}
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-lg-6 padding-0-ipad px-0">
                        <div className="col-12">
                            <Form.Item label={t('address')}>
                                {getFieldDecorator('address', {
                                    rules: [{required: true, message: t('input_your') + t('address') + '!'}],
                                })(
                                    <Input placeholder={t('address')}/>,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-12 p-0">
                            <div className="row mx-0 position-relative">
                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                    <Form.Item label={t('zip_code')}>
                                        {getFieldDecorator('zip_code', {
                                            rules: [{required: true, message: t('input_your') + t('zip_code') + '!'}],
                                        })(<Input placeholder={t('zip_code')}/>,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                    <Form.Item label={t('city')}>
                                        {getFieldDecorator('city', {
                                            rules: [{required: true, message: t('input_your') + t('city') + '!'}],
                                        })(
                                            <Input
                                                placeholder={t('city')}
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <Form.Item label={t('country')}>
                                {getFieldDecorator('country', {
                                    rules: [{required: true, message: t('input_your') + t('country') + '!'}],
                                })(
                                    <CountryFilter/>,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Button onClick={this.handleSubmit}
                                    className="another-address-add-btn font-weight-bold text-uppercase text-center">
                                {editAddress ? t("edit_address") : t('add_address')}
                            </Button>
                        </div>
                    </div>
                </div>
                {addresses.map((data, index) =>
                    <div key={`address_card_${index}`} className="col-12">
                        <div className="row mx-0 address-add-row">
                            <div className="col-lg-2 col-sm-12 col-12">
                                <h5 className="mb-0">{data.type}</h5>
                            </div>
                            <div className="col-lg-3 col-sm-12 col-12">
                                <p className="mb-0">{data.title}</p>
                                <p className="mb-0">{data.opening_days}</p>
                                <p className="mb-0">{data.country_code} {data.phone_number}</p>
                                <p className="mb-0">{data.email}</p>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-12">
                                <p className="mb-0">{data.address}</p>
                                <p className="mb-0">{data.zip_code} {data.city}</p>
                                <p className="mb-0">{data.country}</p>
                            </div>
                            <div className="col-12 col-sm-12 col-lg-2 px-0 position-relative">
                                <div className="position-absolute edit-delete-div">
                                    <Button
                                        onClick={() => {
                                            this.props.form.setFieldsValue({
                                                address: data.address,
                                                city: data.city,
                                                state_province: data.state_province,
                                                zip_code: data.zip_code,
                                                country: data.country,
                                                type: data.type,
                                                opening_days: data.opening_days,
                                                country_code: data.country_code,
                                                phone_number: data.phone_number || [],
                                                email: data.email,
                                                title: data.title
                                            });
                                            this.setState({editAddress: data.id})
                                        }}
                                        className="mt-n5 bg-transparent rounded-0 border-0 shadow-none p-0 h-auto"
                                    >{t("edit")}</Button>
                                    <Button
                                        onClick={() => this.handleRemoveCard(data.id, index)}
                                        className="bg-transparent rounded-0 border-0 shadow-none p-0 h-auto">
                                        {t("delete")}
                                    </Button>
                                </div>
                            </div>
                            <div className="col-12 address-label-div px-0">
                                <label
                                    className={"address-label " + (defaultInvoiceAddress === data.id ? "active-address" : "")}>
                                    <input onChange={this.makeDefaultBillingAddress} type="radio" value={data.id}
                                           name={INVOICE_ADDRESS}/>
                                    <div className="address-label-details">
                                        <h6>Adresse de facturation</h6>
                                        <p className="mb-0">
                                            Si vous choisissez cette adresse, elle deviendra l’adresse de
                                            facturation de ce distributeur.
                                        </p>
                                    </div>
                                </label>
                                <label
                                    className={"billing-label " + (defaultBillingAddress === data.id ? 'active-billing' : "")}>
                                    <input onChange={this.makeDefaultBillingAddress} type="radio" value={data.id}
                                           name={BILLING_ADDRESS}/>
                                    <div className="address-label-details">
                                        <h6>Adresse de livraison</h6>
                                        <p className="mb-0">
                                            Si vous choisissez cette adresse, elle deviendra l’adresse de
                                            bon de commande de ce distributeur.
                                        </p>
                                    </div>
                                </label>
                                <label
                                    className={"billing-label " + (defaultConfirmationAddress === data.id ? 'active-confirmation' : "")}>
                                    <input onChange={this.makeDefaultBillingAddress} type="radio" value={data.id}
                                           name={CONFIRMATION_ADDRESS}/>
                                    <div className="address-label-details">
                                        <h6>Adresse de confirmation de commande</h6>
                                        <p className="mb-0">
                                            Si vous choisissez cette adresse, elle deviendra l’adresse de
                                            bon de commande de ce distributeur.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>)
                }
            </React.Fragment>
        );
    }
}

export const Address = Form.create({name: "address"})(withTranslation('common')(withRouter(AddressForm)));
