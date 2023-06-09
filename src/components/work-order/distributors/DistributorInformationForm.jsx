import React, {Component} from 'react';
import {Button, DatePicker, Form, Input} from 'antd';
import {CreateClient} from "../../drawers/work-order/CreateClient";
import {withTranslation} from "react-i18next";
import DistributorProfileFilter from "../../../filters/distributorProfileFilter";
import PaymentModeFilter from "../../../filters/paymentModeFilter";
import {distributorWorkorderPost, distributorWorkorderUpdate} from "../../../controller/API/salesOperationAPI";
import {Image as Images} from "../../Images";
import {withRouter} from "react-router-dom";
import frFR from "antd/es/date-picker/locale/fr_FR"

import ConfirmationClientCreateWorkorder from "./modals/ConfirmationClientCreateWorkorder";
import {showErrors} from "../../../controller/utils";

import 'moment/locale/fr';
import {CreateEntity} from "./CreateEntityDrawer";
import DistributorEntityFilter from "../../../filters/distributorEntityFilter";
// import SalesRepresentativeNameFilter from "../../../filters/salesRepresentativeNameFilter";
import SalesRepresentativeFilter from "../../../filters/salesRepresentativeFilter";

const {TextArea} = Input;
const moment = require('moment');
const {MonthPicker} = DatePicker;

class DistributorInformationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createClient: false,
            visibleCreateClientConfirmPopup: false
        };
    }

    createClientVisible = (visible) => {
        this.setState({
            createClient: visible
        })
    };

    visibleCreateClientConfirm = (visible) => {
        this.setState({
            visibleCreateClientConfirmPopup: visible
        })
    };

    visibleEntityCreateDrawer = (visible) => {
        this.setState({
            visibleEntityDrawer: visible
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                delete values['entity']
                values['client'] = values.client.id;
                if (typeof values['sales_representative'] === "object") {
                    values['sales_representative'] = values['sales_representative'].key
                }
                values['workorder_creation_date'] = values['workorder_creation_date'].format('YYYY-MM-DD');
                if (values['coupon_start_month'])
                    values['coupon_start_month'] = values['coupon_start_month'].format('YYYY-MM-01');
                else {
                    delete values['coupon_start_month']
                }
                if (this.props.work_order) {
                    distributorWorkorderUpdate(this.props.work_order.id, values)
                        .then(
                            response => {
                                this.props.onNext(response.data);
                            }
                        ).catch(err => showErrors(err.response.data, this.props.form))
                } else {
                    distributorWorkorderPost(values)
                        .then(response => {
                            this.props.onNext(response.data);
                        }).catch(err => showErrors(err.response.data, this.props.form))
                }
            }
        });
    };

    onDistributorProfileChange = (value) => {
        if (this.props.form.isFieldTouched('client') || this.props.method !== "edit") {
            this.props.form.setFieldsValue({
                sales_representative: value.sales_representative ? {
                    "key": value.sales_representative.id,
                    "label": `${value.sales_representative.first_name} ${value.sales_representative.last_name}`
                } : "",
                days: value.days,
                percentage: value.percentage,
                entity: value.entity ? {"key": value.entity.id, "label": value.entity.name} : ""
            })
        }
    }

    disabledDate(current) {
        // Can not select days before today and today
        return current > moment().endOf('day');
    }

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {createClient, visibleCreateClientConfirmPopup, visibleEntityDrawer} = this.state;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h5
                            className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2"> {this.props.match.params.method === "edit" ? t('update_workorder') : t('Create_distributor_order_form')}</h5>
                    </div>
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('nav.distributor')}
                                                       className="position-relative select-arrow-none">
                                                {getFieldDecorator('client', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + t('nav.distributor') + '!'
                                                    }],
                                                })(
                                                    <DistributorProfileFilter
                                                        onChange={(value) => this.onDistributorProfileChange(value)}
                                                        method={this.props.method}/>,
                                                )}
                                                <Button
                                                    onClick={() => this.visibleCreateClientConfirm(true)}
                                                    className="create-btn-select position-absolute font-weight-bold m-auto px-2 flex-align-center">
                                                    <span>{t('dash.create')}</span>
                                                    <img src={Images.plus_icon_primary} alt="plus icon"
                                                         className="img-fluid"/>
                                                </Button>
                                            </Form.Item>
                                        </div>
                                        <div className={'col-12'}>
                                            <Form.Item label={t('entity')}
                                                       className={'position-relative select-arrow-none'}>
                                                {getFieldDecorator('entity',)(<DistributorEntityFilter disabled/>)}
                                                <Button
                                                    onClick={() => this.visibleEntityCreateDrawer(true)}
                                                    className="create-btn-select position-absolute font-weight-bold m-auto px-2 flex-align-center">
                                                    <span>{t('dash.create')}</span>
                                                    <img src={Images.plus_icon_primary} alt="plus icon"
                                                         className="img-fluid"/>
                                                </Button>
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('sales_representative')}>
                                                {getFieldDecorator('sales_representative', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('select') + t('sales_representative') + '!'
                                                    }],
                                                })(<SalesRepresentativeFilter/>)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('pay_method')}>
                                                {getFieldDecorator('payment_mode', {
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + t('pay_method') + '!'
                                                    }],
                                                })(<PaymentModeFilter/>)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12 p-0">
                                            <div className="row mx-0">
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                                    <Form.Item label="%">
                                                        {getFieldDecorator('percentage', {
                                                            rules: [{
                                                                required: false,
                                                                message: t('please_input') + '%'
                                                            }],
                                                        })(<Input disabled placeholder="%"/>)}
                                                    </Form.Item>
                                                </div>
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                                    <Form.Item label={t('days')}>
                                                        {getFieldDecorator('days', {
                                                            rules: [{
                                                                required: false,
                                                                message: t('please_input') + t('days')
                                                            }],
                                                        })(<Input disabled placeholder={t('days')}/>)}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('work_order_date_created')}>
                                                {getFieldDecorator('workorder_creation_date', {
                                                    initialValue: moment(),
                                                    rules: [{
                                                        required: true,
                                                        message: t('input_your') + t('work_order_date_created') + '!'
                                                    }],
                                                })(
                                                    <DatePicker placeholder={t('select_date')} locale={frFR}
                                                                format={"DD/MM/YYYY"} style={{width: '100%'}}/>
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t("Mois d'application du coupon")}>
                                                {getFieldDecorator('coupon_start_month', {
                                                    initialValue: moment(),
                                                })(
                                                    <MonthPicker disabledDate={this.disabledDate} format={"MM/YYYY"}
                                                                 style={{width: '100%'}} locale={frFR}
                                                                 placeholder="Select Month"/>
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('workorder_info')}>
                                                {getFieldDecorator('infos', {
                                                    rules: [{
                                                        required: false,
                                                        message: t('please_input') + 'infos'
                                                    }],
                                                })(<Input placeholder={t('workorder_info')}/>)}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('comments')}>
                                                {getFieldDecorator('comments', {
                                                    initialValue: "CM.: \n\nRéférences: "
                                                })(
                                                    <TextArea rows={7} style={{height: "auto", paddingTop: 15}}
                                                              placeholder={t('comments')}/>
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('internal_note')}>
                                                {getFieldDecorator('internal_note', {})(
                                                    <TextArea rows={7} style={{height: "auto", paddingTop: 15}}/>
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <div
                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-between px-5">
                    <div>
                        <Button onClick={() => {
                            this.props.form.resetFields();
                        }}
                                className="font-weight-bold text-center text-blue border-0 bg-transparent text-capitalize p-0">{t('reset')}</Button>
                    </div>
                    <div>
                        <Button type="primary" onClick={this.handleSubmit}
                                className="font-weight-bold text-center text-white text-uppercase">{t('save_continue')}</Button>
                    </div>
                </div>
                <CreateClient visible={createClient} onClose={() => this.createClientVisible(false)}/>
                <ConfirmationClientCreateWorkorder visible={visibleCreateClientConfirmPopup}
                                                   onClose={() => this.visibleCreateClientConfirm(false)}/>
                {visibleEntityDrawer &&
                <CreateEntity visible={visibleEntityDrawer} onClose={() => this.visibleEntityCreateDrawer(false)}/>}
            </React.Fragment>
        );
    }
}

export const InformationDistributors = Form.create({
    mapPropsToFields(props) {
        if (props.work_order) {
            let {work_order} = props;
            return {
                client: Form.createFormField({
                    value: {
                        key: JSON.stringify(work_order.client),
                        label: work_order.client.client_name
                    }
                }),
                sales_representative: work_order.sales_representative ? Form.createFormField({
                    value: {
                        key: work_order.sales_representative.id,
                        label: `${work_order.sales_representative.first_name} ${work_order.sales_representative.last_name}`
                    },
                }) : "",
                payment_mode: Form.createFormField({
                    value: {
                        key: work_order.payment_mode.id,
                        label: work_order.payment_mode.title
                    },
                }),
                entity: work_order.entity ? Form.createFormField({
                    value: {
                        key: work_order.entity.id,
                        label: work_order.entity.name
                    },
                }) : "",
                mark_percent: Form.createFormField({
                    value: work_order.client.percentage
                }),
                Jours: Form.createFormField({
                    value: work_order.client.hours
                }),
                workorder_creation_date: Form.createFormField({
                    value: moment(work_order.workorder_creation_date)
                }),
                coupon_start_month: Form.createFormField({
                    value: work_order.coupon_start_month ? moment(work_order.coupon_start_month) : ""
                }),
                infos: Form.createFormField({
                    value: work_order.infos
                }),
                comments: Form.createFormField({
                    value: work_order.comments
                }),
                internal_note: Form.createFormField({
                    value: work_order.internal_note
                })
            }
        }
    }
})(withRouter((withTranslation('common')(DistributorInformationForm))));
