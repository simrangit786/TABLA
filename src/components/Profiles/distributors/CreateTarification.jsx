import React, {Component} from 'react';
import {Button, Form, InputNumber} from "antd";
import {withTranslation} from "react-i18next";
import {distributorProfileUpdate} from "../../../controller/API/profileApi";
import {DiscountComponent} from "./DiscountFom";


class CreateDiscountForm extends Component {
    state = {
        buttonLoading: false,
    };

    handleSubmit = e => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({buttonLoading: true});
                if (this.props.profile) {
                    distributorProfileUpdate(this.props.profile.id, values)
                        .then(response => {
                            this.setState({buttonLoading: false})
                            this.props.next(this.props.profile.id);
                        })
                }
            }
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {t, buttonLoading} = this.props;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h5 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">TARIFICATION </h5>
                    </div>
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item
                                                label={t('Coefficient de vente suggéré aux distributeurs pour son consommateur B2C')}>
                                                {getFieldDecorator('coefficient', {
                                                    initialValue: 2.5,
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} ${t('coefficient')} `
                                                    }],
                                                })(<InputNumber/>)}
                                            </Form.Item>

                                        </div>
                                    </div>
                                </div>
                                <DiscountComponent profile={this.props.profile}
                                                   refreshProfile={this.props.refreshProfile}/>
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
                        <Button style={{marginLeft: 8}} onClick={this.props.prev}
                                className="font-weight-bold text-center text-uppercase mr-3">
                            {t('return')}
                        </Button>
                        <Button
                            loading={buttonLoading}
                            type="primary"
                            onClick={this.handleSubmit}
                            className="font-weight-bold text-center text-white text-uppercase">
                            {t('save_next')}
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export const CreateDiscount = Form.create({
    name: "discount_step",
    mapPropsToFields(props) {
        if (props.discount) {
            const discount = props.discount;
            if (discount) {
                return {
                    // intracommunity_number: Form.createFormField({
                    //     value: discount.intracommunity_number
                    // }),
                    //
                }
            }
        }
        if (props.profile) {
            const profile = props.profile;
            if (profile) {
                return {
                    coefficient: profile.coefficient ? Form.createFormField({
                        value: profile.coefficient
                    }) : 1,
                }
            }
        }
    }
})(withTranslation('common')(CreateDiscountForm));
