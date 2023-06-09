import React, {Component} from 'react';
import {Button, Form, InputNumber, message, Modal} from "antd";
// import {variantUpdate} from "../../../controller/API/itemApi";
import {withTranslation} from "react-i18next";
import {Image as Images} from "../../../Images";

import { ComponentUpdate, variantUpdate } from '../../../../controller/API/itemApi';

class UpdateComponentStockForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {item} = this.props;
                ComponentUpdate(item.id, values)
                    .then(() => {
                        message.success("product updated successfully.");
                        this.props.onClose(true)
                    }).catch(err => {
                    this.handleError(err)
                })
            }
        })
    };

    handleError = (err) => {
        if (err.response) {
            Object.keys(err.response.data).forEach((i) => {
                message.error(`${i}:${err.response.data[i]}`)
            })
        } else
            message.error("Something went wrong.")
    };

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal
                style={{top: '26%'}}
                title={t('stock_warehouse')}
                visible={this.props.visible}
                onOk={this.handleSubmit}
                onCancel={() => this.props.onClose(false)}
                width="32%"
                okText={t('update_caps')}
                cancelText={t('cancel')}
                className="confirm-modal-main"
            >
                <div className="row mx-0 py-4 px-3">
                    {/* <Button onClick={this.props.onClose}
                            className="close-header-icon close-header-second w-auto flex-align-center-center px-2 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button> */}
                    <Form onSubmit={this.handleSubmit} className="main-form w-100">
                        <div className="col-12">
                            <Form.Item label="En Stock">
                                {getFieldDecorator('in_stock', {
                                    rules: [{required: true, message: 'Please input En Stock!'}],
                                })(<InputNumber autoFocus placeholder={t('enter')}/>)}
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
        );
    }
}


export const UpdateComponentStock = (Form.create({
    mapPropsToFields(props) {
        if (props.item) {
            const {in_stock} = props.item;
            return {
                in_stock: Form.createFormField({
                    value: in_stock
                }),
            }
        }
    }
})(withTranslation('common')(UpdateComponentStockForm)));
