import React, {Component} from 'react';
import {Form, Select} from "antd";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {getPhoneFields, phone} from "./PhoneNumberField";
import SinglePhoneField from "./SinglePhoneField";

const {Option} = Select;

// const phoneFields = ['phone_number1', 'phone_number2', 'phone_number3', 'phone_number4', 'phone_number5'];

class PhoneNumberForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNumberShow: false,
            editPhone: null,
            selected_country: "+33",
            phone_number_status: true,
            phoneFields: getPhoneFields("+33") || []
        };
        this.singlePhoneFieldRef = React.createRef();
    }


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
        const {phoneFields, phone_number_status} = this.state;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12 col-12 col-md-3 col-lg-3">
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
                    <div className="col-sm-12 col-12 col-md-9 col-lg-9">
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
            </React.Fragment>
        );
    }
}

export const PhoneNumber = Form.create({name: "phone_data"})(withTranslation('common')(withRouter(PhoneNumberForm)));
