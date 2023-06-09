import React, {Component} from 'react';
import {Button, Drawer, Form, Input} from 'antd';
import {Image as Images} from "../Images";
import {supplierAdd} from "../../controller/API/itemApi";
import {withTranslation} from "react-i18next";
import {showErrors} from "../../controller/utils";

class CreateSupplierForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                supplierAdd(values)
                    .then(() => {
                        this.props.onClose();
                    })
                    .catch(err => showErrors(err.response.data, this.props.form))
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Drawer
                title={t('create_supplier_caps')}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                width="36%"
                destroyOnClose={true}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <div className="col-12 px-0">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row mx-0">
                                <div className="col-12 px-0">
                                    <Form.Item label={t('name')}>
                                        {getFieldDecorator('company_name', {
                                            rules: [{
                                                required: true,
                                                message: t('input_your') + t('name') + '!'
                                            }],
                                        })(
                                            <Input autoFocus placeholder={t('company_name')}
                                            />,
                                        )}
                                    </Form.Item>
                                </div>

                            </div>
                        </Form>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.handleSubmit} type="primary">
                            {t('create_supplier_submit')}
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export const CreateSupplier = Form.create({'name': "create_supplier"})(withTranslation('common')(CreateSupplierForm));
