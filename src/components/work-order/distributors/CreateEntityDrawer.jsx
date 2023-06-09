import React, {Component} from 'react';
import {Button, Drawer, Form, Input} from "antd";
import {Image as Images} from "../../Images";
import {withTranslation} from "react-i18next";
import {createWorkOrderEntity} from "../../../controller/API/salesOperationAPI";

class CreateEntityDrawer extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                createWorkOrderEntity(values).then(response => {
                    this.props.onClose()
                }).catch(err => {
                })
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Drawer
                title={t('create_profile_entity')}
                placement="right"
                width="35%"
                destroyOnClose={true}
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>{t('close')}</div>
                    </Button>
                    <div className="col-12 px-0 ">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row mx-0">
                                <Form.Item label={t('name')}>
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} ${t('name')}!`
                                        }],
                                    })(
                                        <Input
                                            placeholder={t('enter') + " :"}
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label={t('legal_form')}>
                                    {getFieldDecorator('legal_form', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} ${t('legal_form')}!`
                                        }],
                                    })(
                                        <Input
                                            placeholder={t('enter') + " :"}
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label={'RCS'}>
                                    {getFieldDecorator('rcs', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} RCS!`
                                        }],
                                    })(
                                        <Input
                                            autoFocus
                                            placeholder={t('enter') + " :"}
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label={'Siret'}>
                                    {getFieldDecorator('siret', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} Siret!`
                                        }],
                                    })(
                                        <Input
                                            placeholder={t('enter') + " :"}
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label={'N/Id Cee'}>
                                    {getFieldDecorator('nidcee', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} N/Id Cee!`
                                        }],
                                    })(
                                        <Input
                                            placeholder={t('enter') + " :"}
                                        />,
                                    )}
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.handleSubmit} type="primary">
                            {t('create_entity')}
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export const CreateEntity = Form.create()(withTranslation('common')(CreateEntityDrawer));
