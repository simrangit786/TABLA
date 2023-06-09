import React, {Component} from 'react';
import {Button, Form, Select} from "antd";
import {AddNumber} from "../../modal/AddNumber";
import {phoneNumberPost, phoneNumberRemove, phoneNumberUpdate} from "../../../controller/API/profileApi";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {getPhoneFields, getPhoneFormatting, phone} from "./PhoneNumberField";
import SinglePhoneField from "./SinglePhoneField";

const {Option} = Select;

// const phoneFields = ['phone_number1', 'phone_number2', 'phone_number3', 'phone_number4', 'phone_number5'];

class PhoneNumberForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_numbers: this.props.value || [],
            addNumberShow: false,
            editPhone: null,
            selected_country: "+33",
            phone_number_status: true,
            phoneFields: getPhoneFields("+33") || []
        };
        this.singlePhoneFieldRef = React.createRef();
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {editPhone, phone_numbers, selected_country} = this.state;
                if (editPhone) {
                    phoneNumberUpdate(editPhone, values).then(response => {
                        let newArr = phone_numbers.map(item => {
                            if (item.id === response.data.id) {
                                return response.data
                            } else {
                                return item
                            }
                        });
                        this.setState({phone_numbers: newArr, editPhone: null});
                        this.props.onChange(newArr.map(d => d.id));
                        this.props.form.resetFields();
                    })
                } else {
                    phoneNumberPost(values)
                        .then(response => {
                            phone_numbers.push(response.data);
                            this.setState({phone_numbers});
                            this.props.form.resetFields();
                            this.setState({editPhone: null});
                            this.props.onChange(phone_numbers.map(d => d.id))
                        })
                }
                this.setState({phone_number_status: false}, () => {
                    this.setPhoneFields(selected_country);
                    setTimeout(() => this.setState({phone_number_status: true}), 100);
                    this.singlePhoneFieldRef.current.reset();
                });
            }
        })
    };

    handleRemoveCard = (id, index) => {
        let {phone_numbers} = this.state;
        phoneNumberRemove(id).then(() => {
            phone_numbers.splice(index, 1);
            this.setState({phone_numbers});
            this.props.onChange(phone_numbers.map(d => d.id));
        })
    };


    setPhoneFields = (country_code) => {
        const phoneFields = getPhoneFields(country_code);
        this.setState({phoneFields}, () => phoneFields.map(item => {
            this[item.field] = React.createRef()
        }))
    };

    addNumberVisible = (visible) => {
        this.setState({addNumberShow: visible})
    };

    onEditFillData = async (data) => {
        await this.setPhoneFields(data.country_code);
        await this.singlePhoneFieldRef.current.reset();
        this.props.form.setFieldsValue({
            country_code: data.country_code,
            phone_number: data.phone_number,
            phone_type: data.phone_type
        });
        this.setState({editPhone: data.id})
    };

    componentDidMount() {
        if (this.props.value) {
            this.props.onChange(this.props.value.map(d => d.id))
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (typeof (this.props.value) === "object" && this.props.value !== prevState.phone_number) {
            this.setState({phone_number: this.props.value})
        }
    }

    changeCountry = (selected_country) => {
        this.setPhoneFields(selected_country);
        this.setState({selected_country, phone_number_status: false}, () => {
            setTimeout(() => this.setState({phone_number_status: true}), 100);
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {phone_numbers, addNumberShow, editPhone, phoneFields, phone_number_status} = this.state;
        const {t} = this.props;
        return (
            <React.Fragment>

                <Form.Item>
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
                                                 className="img-fluid mr-2 flag-img-drp" alt="flag"/>
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
                                    <SinglePhoneField ref={this.singlePhoneFieldRef} phoneFields={phoneFields}/>
                                    ,)}
                            </Form.Item>}

                        </div>
                    </div>
                </Form.Item>
                <div className="col-12 p-0">
                    <div className="row mx-0">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 pr-2 pl-0 padding-responsive-right  ">
                            <Form.Item label={t('telephone_type')}>
                                {getFieldDecorator('phone_type', {
                                    initialValue: "Bureau",
                                    rules: [{
                                        required: true,
                                        message: 'please input'
                                    }],
                                })(
                                    <Select placeholder={'Sélectionner'} showAction={["focus", "click"]}>
                                        <Option key="Siège social" value="Siège social">Siège social</Option>
                                        <Option key="Bureau" value="Bureau">Bureau</Option>
                                        <Option key="Magasin" value="Magasin">Magasin</Option>
                                        <Option key="Depot" value="Depot">Depot</Option>
                                        <Option key="Comptabilité" value="Comptabilité">Comptabilité</Option>
                                    </Select>
                                    ,)}
                            </Form.Item>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 pl-2 pr-0 padding-responsive-left">
                            <Button onClick={this.handleSubmit}
                                    className="another-address-add-btn font-weight-bold text-uppercase text-center">
                                {editPhone ? t('edit_number') : t('add_number')}
                            </Button>
                        </div>
                    </div>
                </div>
                {phone_numbers.map((data, index) =>
                    <div key={`phone_number_card_${index}`} className="col-12 p-0">
                        <div className="row mx-0 address-add-row position-relative">
                            <div className="col-lg-4 col-sm-12 col-12">
                                <h5 className="mb-0">{data.phone_type}</h5>
                            </div>
                            <div className="col-lg-6 col-sm-12 col-12 position-relative">
                                <p
                                    className="mb-0">{data.country_code} - {data.phone_number ? getPhoneFormatting(data.country_code, data.phone_number) : ""}</p>
                            </div>
                            <div className="position-absolute edit-delete-div">
                                <Button
                                    onClick={() => this.onEditFillData(data)}
                                    className="mt-n5 bg-transparent rounded-0 border-0 shadow-none p-0 h-auto"
                                >{t("edit")}</Button>

                                <Button
                                    onClick={() => this.handleRemoveCard(data.id, index)}
                                    className="bg-transparent rounded-0 border-0 shadow-none p-0 h-auto">
                                    {t("delete")}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {addNumberShow && <AddNumber visible={addNumberShow} onClose={() => this.addNumberVisible(false)}/>}
            </React.Fragment>
        );
    }
}

export const PhoneNumberWithType = Form.create({name: "phone_data"})(withTranslation('common')(withRouter(PhoneNumberForm)));
