import React, {Component} from 'react';
import {Button, Form, Input, message} from "antd";
// import {variantUpdate} from "../../../controller/API/itemApi";
import {withTranslation} from "react-i18next";
// import {VariantComponent} from "./VariantComponent";
import { ComponentUpdate } from '../../../../controller/API/itemApi';
import { VariantComponent } from '../../all-items/VariantComponent';

class ComponentStockInformationForm extends Component {

    state = {
        btnLoading: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({btnLoading: true});
                if (this.props.item) {
                    ComponentUpdate(this.props.item.id, values)
                        .then(response => {
                            message.success("Stocks updated successfully");
                            this.props.next(response.data);
                            this.setState({btnLoading: false});
                        }).catch(err => {
                        this.handleError(err);
                        this.setState({btnLoading: false});
                    })
                }
            }
        });
    };
    handleError = (err) => {
        if (err.response) {
            Object.keys(err.response.data).forEach((i) => {
                message.error(`${i}:${err.response.data[i]}`)
            })
        } else {
            message.error("Something went wrong.")
        }
    };


    render() {
        const {t, item} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {btnLoading} = this.state;
        return (
            <Form onSubmit={this.handleSubmit} className="main-form">
                <div className="row mx-0 steps-main-row p-0">
                    <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                        <div className="row">
                            <div className="col-12">
                                <Form.Item label={t('in_stock')}>
                                    {getFieldDecorator('in_stock', {
                                        rules: [{
                                            required: true,
                                            message: `${t('input_your')} ${t('in_stock')}!`
                                        }],
                                    })(
                                        <Input autoFocus placeholder={t('articles_new')}/>,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                        <div className="row">
                            <div className="col-12">
                                <Form.Item label={t('intransit_new')}>
                                    {getFieldDecorator('in_transit', {
                                        rules: [{
                                            required: true,
                                            message: `${t('input_your')} ${t('intransit_new')}!`
                                        }],
                                    })(
                                        <Input placeholder={t('articles_new')}/>,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    {/* {item.component_count > 0 ?
                        <VariantComponent variant={item}/> : ""
                    } */}

                </div>
                <div
                    className="drawer-footer-fixed steps-action steps-action-custom bg-white flex-align-center justify-content-between px-3 py-2">
                    <div>
                        <Button onClick={() => {
                            this.props.form.resetFields();
                        }}
                                className="font-weight-bold text-center text-blue border-0 bg-transparent text-capitalize p-0">{t('reset')}</Button>
                    </div>
                    <div>
                        <Button style={{marginRight: 15}} onClick={this.props.prev}>

                            {t('return')}
                        </Button>
                        <Button loading={btnLoading}
                                type="primary"
                                className="font-weight-bold text-center text-white text-uppercase"
                                onClick={this.handleSubmit}>
                            {t('save_continue')}
                        </Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export const ComponentStockInformation = (Form.create(
    {
        mapPropsToFields(props) {
            if (props.item) {
                const {item} = props;
                return {
                    in_transit: Form.createFormField({
                        value: item.in_transit
                    }),
                    in_stock: Form.createFormField({
                        value: item.in_stock
                    }),

                }
            }
        }
    }
)(withTranslation('common')(ComponentStockInformationForm)));
