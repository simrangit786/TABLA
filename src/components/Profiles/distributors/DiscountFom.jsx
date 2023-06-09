import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, message, Radio, Select} from "antd";
import {withTranslation} from "react-i18next";
import {Image as Images} from "../../Images";
import {
    distributorDiscountPost,
    distributorDiscountRemove,
    distributorDiscountUpdate
} from "../../../controller/API/profileApi";
import ProductDiscountFilter from "../../../filters/ProductDiscountFilter";
import {showErrors} from "../../../controller/utils";
import CategoryNameDiscountFilter from "../../../filters/CategoryNameDiscountFilter";

const {Option} = Select;
const moment = require('moment')

function numberRange(start, end) {
    return new Array(end - start).fill().map((d, i) => i + start);
}

class DiscountFom extends Component {
    state = {
        buttonLoading: false,
        editItem: null
    };

    getConditionment = () => {
        return numberRange(1, 32).map(item => {
            return {"label": `${item} du mois`, "value": `${item}_OF_MONTH`}
        })
    }
    handleSubmit = e => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({buttonLoading: true});
                if (!(values['category'] || values['product'])) {
                    message.info("Please select any one category or product")
                    return
                }
                values['client'] = this.props.profile.id
                values['expired_date'] = values['expired_date'].format('YYYY-MM-DD')
                if (values['discount_type'] === "REDUCTION_AMOUNT") {
                    values['amount'] = parseFloat(values['value'])
                } else {
                    values['percentage'] = parseFloat(values['value'])
                }
                delete values['value']
                const editItem = this.state.editItem
                if (editItem) {
                    distributorDiscountUpdate(editItem.id, values)
                        .then(() => {
                            this.setState({buttonLoading: false, editItem: null})
                            this.props.refreshProfile(this.props.profile.id)
                            this.props.form.resetFields()
                        }).catch(error => {
                        showErrors(error.response.data, this.props.form);
                    })
                } else {
                    distributorDiscountPost(values)
                        .then(() => {
                            this.setState({buttonLoading: false, editItem: null})
                            this.props.refreshProfile(this.props.profile.id)
                            this.props.form.resetFields()
                        })
                        .catch(error => {
                            showErrors(error.response.data, this.props.form);
                        })
                }
            }
        })
    };


    onDeleteDiscount = (item) => {
        distributorDiscountRemove(item.id)
            .then(() => {
                this.props.refreshProfile(this.props.profile.id)
            })
    }
    onEditDiscount = (item) => {
        const values = {
            discount_type: item.discount_type,
            quantity: item.quantity,
            value: item.discount_type === "REDUCTION_AMOUNT" ? item.amount : item.percentage,
            condition: item.condition,
            expired_date: moment(item.expired_date)
        }
        if (item.category)
            values['category'] = {label: item.category.name, key: item.category.id}
        else
            values['product'] = {label: item.product.name, key: item.product.id}
        this.props.form.setFieldsValue(values)
        this.setState({editItem: item})
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {buttonLoading} = this.props
        const {discounts} = this.props.profile
        return (
            <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                <div className="row">
                    <div className="col-12 radio-custom-div">
                        <div className="row">
                            <div className="col-12">
                                <p>Où cette réduction sera-t-elle appliquée?</p>
                                <Form.Item label={"Catégorie"}
                                           className={'mb-0 position-relative'}>
                                    {getFieldDecorator('category', {})(<CategoryNameDiscountFilter/>)}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 radio-custom-div">
                        <div className="row">
                            <div className="col-12">
                                <Form.Item label={"Produit"}
                                           className={'mb-0 position-relative'}>
                                    {getFieldDecorator('product', {})(<ProductDiscountFilter/>)}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 radio-btn-div">
                        <Form.Item label={'Quel type de réduction appliquez-vous?'}>
                            {getFieldDecorator('discount_type', {
                                rules: [{required: true, message: '',}],
                                initialValue: "REDUCTION_AMOUNT"
                            })(
                                <Radio.Group name="radiogroup">
                                    <Radio value="REDUCTION_AMOUNT">
                                        Nouveau montant
                                    </Radio>
                                    <Radio value={"PERCENTAGE_REDUCTION"}>
                                        Pourcentage de réduction
                                    </Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </div>
                    <div className="col-12 p-0">
                        <div className="row mx-0">
                            <div className="col-sm-12 col-12 col-md-6 col-lg-6 ">
                                <Form.Item label="Quantité">
                                    {getFieldDecorator('quantity', {})(
                                        <Input placeholder="Quantity"/>,
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-sm-12 col-12 col-md-6 col-lg-6  pl-0">
                                <Form.Item label={'Réduction'}>
                                    {getFieldDecorator('value', {
                                        rules: [{
                                            required: true,
                                            message: '',
                                        }],
                                    })(
                                        <Input placeholder={'Réduction'}/>,
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <Form.Item label={'Condition d accumulation'}
                                   className={'position-relative'}>
                            {getFieldDecorator('condition', {
                                rules: [{
                                    required: true,
                                    message: 'Please select your accumulation!'
                                }]
                            })(
                                <Select
                                    suffixIcon={<img src={Images.down_arrow_lite_gray} alt="" className="img-fluid"/>}
                                    placeholder={"Sélectionner"}>
                                    {this.getConditionment().map(item => {
                                        return <Option value={item.value}>{item.label}</Option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                    </div>
                    <div className="col-12">
                        <Form.Item label={'Date d\'expiration'}
                                   className={'position-relative'}>
                            {getFieldDecorator('expired_date', {
                                rules: [{required: true, message: 'Please select your accumulation!'}]
                            })(<DatePicker style={{width: "100%"}}/>)}
                        </Form.Item>
                    </div>
                    <div className="col-12">
                        <Button loading={buttonLoading} onClick={this.handleSubmit}
                                className="common-btn-create text-uppercase">AJOUTER CETTE RÉDUCTION</Button>
                    </div>
                    <div className="col-12">
                        {discounts.map((item, index) => {
                            return <div key={index} className="row tarification-card-row">
                                <div
                                    className="w-100 d-flex align-items-center justify-content-between">
                                    <div className="tarification-heading">
                                        {item.category ? "Catégorie" : "Produit"}
                                    </div>
                                    <div className="aty-required-div">
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                QTY: {item.quantity},
                                                {item.discount_type === "REDUCTION_AMOUNT" ? "Nouveau montant" : "Pourcentage de réduction"}
                                                {item.discount_type === "REDUCTION_AMOUNT" ? item.amount : item.percentage}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tarification-details w-100 mt-2">
                                    {item.category ? `${item.category.name}` : `${item.product?.name}`}
                                </div>
                                <div className="tarification-btn w-100 d-flex justify-content-end">
                                    <ul className="mb-0 list-inline">
                                        <li className="list-inline-item">
                                            <span onClick={() => this.onEditDiscount(item)}
                                                  className="text-uppercase">EDITER</span>
                                        </li>
                                        <li className="list-inline-item">
                                            <span onClick={() => this.onDeleteDiscount(item)}
                                                  className="text-uppercase">ÉFFACER</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export const DiscountComponent = Form.create({
    name: "discount_component",
})(withTranslation('common')(DiscountFom));
