import React, {Component} from 'react';
import {Form} from "antd";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import SinglePhoneField from "../../distributors/SinglePhoneField";


class SalesPhoneNumberForm extends Component {

    constructor(props) {
        super(props);
        this.singlePhoneFieldRef = React.createRef();
    }

    onEditFillData = async (data) => {
        await this.singlePhoneFieldRef.current.reset();
        this.props.form.setFieldsValue({
            phone_number: data,
        });
    };

    componentDidMount() {
        if (this.props.value) {
            this.onEditFillData(this.props.value)
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {phoneFields} = this.props;
        const {t} = this.props;
        return (
            <Form.Item>
                <div className="col-sm-12 col-12 p-0">
                    <div className="pr-1">
                        {getFieldDecorator('phone_number', {
                            rules: [{
                                required: true,
                                message: t('please_input') + " Phone" + t('number') + "!"
                            }],
                        })(<SinglePhoneField ref={this.singlePhoneFieldRef} phoneFields={phoneFields}
                                             onChange={(value) => this.props.onChange(value)}/>,)}
                    </div>
                </div>
            </Form.Item>
        );
    }
}

export const SalesPhoneNumber = Form.create({name: "sales_phone_data"})(withTranslation('common')(withRouter(SalesPhoneNumberForm)));
