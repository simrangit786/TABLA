import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, message} from "antd";
import {withTranslation} from "react-i18next";
import {containerAdd, containerUpdate} from "../../../controller/API/itemApi";
import {showErrors} from "../../../controller/utils";
import {methods} from "../../../controller/Global";
import frFR from "antd/es/date-picker/locale/fr_FR";
import enUS from "antd/es/date-picker/locale/en_US";
import {getLanguage} from "../../../controller/AuthService";
import 'moment/locale/fr';

const moment = require('moment');


class CreateContainerInnerForm extends Component {

    state = {
        btnLoading: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values['date'] = values.date.format('YYYY-MM-DD');
                this.setState({btnLoading: true});
                if (this.props.container) {
                    containerUpdate(this.props.container.id, values)
                        .then(response => {
                            message.success("container updated successfully.");
                            this.props.onNext(response.data.id);
                            this.setState({btnLoading: false});
                        }).catch(err => {
                        this.setState({btnLoading: false});
                        showErrors(err.response.data, this.props.form)
                    })
                } else {
                    containerAdd(values)
                        .then(response => {
                            message.success("container added successfully.");
                            this.props.onNext(response.data.id);
                            this.setState({btnLoading: false});
                        }).catch(err => {
                        this.setState({btnLoading: false});
                        showErrors(err.response.data, this.props.form)
                    })
                }
            }
        });
    };

    render() {
        const {t, match} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h5
                            className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">
                            {match.params.method === methods.edit ? t('edit_container')
                                : t('create_container')}</h5>
                    </div>
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('name_container')}>
                                                {getFieldDecorator('name', {
                                                    rules: [{
                                                        required: true,
                                                        message: `${t('please_input')} ${t('name_container')}!`
                                                    }],
                                                })(<Input autoFocus={match.params.method === methods.create}
                                                          placeholder={t('name_container')}/>)}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('delivery_date')}>
                                                {getFieldDecorator('date', {
                                                    rules: [{
                                                        // initialValue: moment(),
                                                        required: true,
                                                        message: `${t('please_input')} ${t('delivery_date')}!`
                                                    }],
                                                })(<DatePicker format={"DD/MM/YYYY"} placeholder={t('select_date')}
                                                               locale={getLanguage() === 'fr' ? frFR : enUS}
                                                               className="w-100"/>)}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    <div>
                        <Button type="primary" onClick={this.handleSubmit}
                                className="font-weight-bold text-center text-white text-uppercase">{t('save_continue')}</Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export const CreateContainerForm = Form.create({
    mapPropsToFields(props) {
        if (props.container) {
            const {container} = props;
            return {
                name: Form.createFormField({
                    value: container.name
                }),
                date: Form.createFormField({
                    value: moment(container.date)
                }),

            }
        }
    }
})(withTranslation('common')(CreateContainerInnerForm));
