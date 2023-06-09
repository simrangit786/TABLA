import React, {Component} from 'react';
import {Button, Form, Input, Select} from "antd";
import {Image as Images} from "../../Images";
import {AddNumber} from "../../modal/AddNumber";
import {phoneNumberPost, phoneNumberRemove, phoneNumberUpdate} from "../../../controller/API/profileApi";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";

const {Option} = Select;

const phoneFields = ['phone_number1', 'phone_number2', 'phone_number3', 'phone_number4', 'phone_number5'];

class PhoneNumberForm extends Component {
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {phone_numbers, editPhone} = this.state;
                values['phone_number'] = phoneFields.map(key => values[key]).join("");
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
    addNumberVisible = (visible) => {
        this.setState({addNumberShow: visible})
    };
    onPhoneChange = (e) => {
        const value = e.target.value;
        const current = parseInt(e.currentTarget.getAttribute('current'));
        if (value.length >= 2 && current < 4) {
            this[phoneFields[current + 1]].current.focus();
        }
    };
    onEditFillData = (data) => {
        const numbers = data.phone_number.match(/.{1,2}/g);
        this.props.form.setFieldsValue({
            country_code: data.country_code,
            phone_number1: numbers[0],
            phone_number2: numbers[1],
            phone_number3: numbers[2],
            phone_number4: numbers[3],
            phone_number5: numbers[4],
            phone_type: data.phone_type
        });
        this.setState({editPhone: data.id})
    };

    constructor(props) {
        super(props);
        this.state = {
            phone_numbers: this.props.value || [],
            addNumberShow: false,
            editPhone: null
        };
        phoneFields.map(item => {
            this[item] = React.createRef()
        })
    }

    componentDidMount() {
        if (this.props.value) {
            this.props.onChange(this.props.value.map(d => d.id))
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {phone_numbers, addNumberShow, editPhone} = this.state;
        const {t} = this.props;
        return (
            <React.Fragment>
                <Form.Item>
                    <div className="row">
                        <div className="col-sm-12 col-12 col-md-3 col-lg-3 pr-2">
                            <Form.Item>
                                {getFieldDecorator('country_code', {
                                    initialValue: "+33",
                                    rules: [{
                                        required: true,
                                        message: 'please input distributer range'
                                    }],
                                })(
                                    <Select className="position-relative address-dropdown"
                                            showAction={["focus", "click"]}
                                            placeholder={<div className="select-country-code">
                                                <img src={Images.flag_france} className="img-fluid" alt="flag"/>
                                                <span>+33</span>
                                                <img className="img-fluid triangle-img position-absolute"
                                                     src={Images.Triangle}
                                                     alt="triangle"/>
                                            </div>}>
                                        <Option key="A" value="+33">
                                            <img src={Images.flag_france}
                                                 className="img-fluid mr-2 flag-img-drp" alt="flag"/>
                                            <span>+33</span>
                                        </Option>
                                    </Select>
                                    ,)}
                            </Form.Item>
                        </div>
                        <div className="col-sm-12 col-12 col-md-9 col-lg-9 p-0">
                            <div className="row mx-0">
                                {phoneFields.map((item, index) => {
                                    return <div key={index} className="col-sm-3 col-3 pl-0 pr-1">
                                        {getFieldDecorator(item, {
                                            rules: [{
                                                required: true,
                                                message: t('please_input') + " Phone" + t('number') + "!"
                                            }],
                                        })(<Input ref={this[item]} type="text" name={item} maxLength="2" current={index}
                                                  placeholder="xx"
                                                  onChange={this.onPhoneChange}/>,)}
                                    </div>
                                })}
                            </div>
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
                                    className="mb-0">{data.country_code} - {data.phone_number ? data.phone_number.match(/.{1,2}/g).join(" - ") : ""}</p>
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

export const PhoneNumber = Form.create({name: "phone_data"})(withTranslation('common')(withRouter(PhoneNumberForm)));
