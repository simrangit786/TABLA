import React, {Component} from 'react';
import {Button, Form, Input, InputNumber, Modal, Select} from "antd";
import {withTranslation} from "react-i18next";
import {Image as Images} from "../Images";

const {Option} = Select;

class AddNumberForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Modal
                style={{top: '26%'}}
                title={t('add_number')}
                visible={this.props.visible}
                onOk={this.props.onClose}
                onCancel={this.props.onClose}
                width="32%"
                okText={t('add')}
                cancelText={t('cancel')}
                className="confirm-modal-main"
            >
                <div className="row mx-0 py-4 px-3">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon close-header-second w-auto flex-align-center-center px-2 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <Form onSubmit={this.handleSubmit} className="main-form w-100">
                        <div className="col-12">
                            <Form.Item label={t('extra_number')}>
                                {getFieldDecorator('Numero_type', {
                                    rules: [{required: true, message: t('number_type') + '!'}],
                                })(
                                    <Input
                                        type="text"
                                        placeholder={t('number_type_input')}
                                    />,
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item label={t('company_number')}>
                                <div className="row">
                                    <div className="col-sm-12 col-12 col-md-4 col-lg-4 pr-2">
                                        {getFieldDecorator('number', {
                                            rules: [{required: true, message: t('please_input') + t('number')}],
                                        })(
                                            <Select showAction={["focus", "click"]} placeholder="+33">
                                                <Option value="a">{t('payment_mthd')}</Option>
                                                <Option value="a">{t('payment_mthd')}</Option>
                                                <Option value="a">{t('payment_mthd')}</Option>
                                            </Select>,
                                        )}
                                    </div>
                                    <div className="col-sm-12 col-12 col-md-4 col-lg-4 p-0">
                                        {getFieldDecorator('xxx', {
                                            rules: [{required: true, message: t('please_input') + 'xxx!'}],
                                        })(
                                            <InputNumber
                                                type="text"
                                                placeholder="xxx"
                                            />,
                                        )}
                                    </div>
                                    <div className="col-sm-12 col-12 col-md-4 col-lg-4 pl-2">
                                        {getFieldDecorator('xxx_xxx', {
                                            rules: [{required: true, message: t('please_input') + 'xxx-xxx!'}],
                                        })(
                                            <InputNumber
                                                type="text"
                                                placeholder="xxx-xxx"
                                            />,
                                        )}
                                    </div>
                                </div>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
        );
    }
}

export const AddNumber = Form.create()(withTranslation('common')(AddNumberForm));