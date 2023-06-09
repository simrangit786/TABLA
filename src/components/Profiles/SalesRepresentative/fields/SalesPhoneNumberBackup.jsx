import React, {Component} from 'react';
import {Form, Input} from "antd";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";


const phoneFields = ['phone_number1', 'phone_number2', 'phone_number3', 'phone_number4', 'phone_number5'];

class SalesPhoneNumberForm extends Component {

    constructor(props) {
        super(props);
        phoneFields.map(item => {
            this[item] = React.createRef()
        })
    }

    onPhoneChange = (e) => {
        const value = e.target.value;
        const current = parseInt(e.currentTarget.getAttribute('current'));
        if (value.length >= 2 && current < 4) {
            this[phoneFields[current + 1]].current.focus();
        }

    };
    setPhoneValue = () => {
        const data = this.props.form.getFieldsValue()
        this.props.onChange(phoneFields.map(key => data[key]).join(""))
    }

    onEditFillData = (data) => {
        const numbers = data.match(/.{1,2}/g);
        this.props.form.setFieldsValue({
            phone_number1: numbers[0],
            phone_number2: numbers[1],
            phone_number3: numbers[2],
            phone_number4: numbers[3],
            phone_number5: numbers[4]
        });
    };

    componentDidMount() {
        if (this.props.value) {
            this.onEditFillData(this.props.value)
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Form.Item>
                <div className="col-sm-12 col-12 col-md-9 col-lg-9 p-0">
                    <div className="row mx-0">
                        {phoneFields.map((item, index) => {
                            return <div key={index} className="phone-break-fields pr-1">
                                {getFieldDecorator(item, {
                                    rules: [{
                                        required: true,
                                        message: t('please_input') + " Phone" + t('number') + "!"
                                    }],
                                })(<Input ref={this[item]} type="text" name={item} maxLength="2" current={index}
                                          placeholder="xx"
                                          onChange={this.onPhoneChange} onBlur={this.setPhoneValue}/>,)}
                            </div>
                        })}
                    </div>
                </div>
            </Form.Item>
        );
    }
}

export const SalesPhoneNumber = Form.create({name: "sales_phone_data"})(withTranslation('common')(withRouter(SalesPhoneNumberForm)));
