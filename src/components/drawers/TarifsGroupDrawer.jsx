import React, {Component} from 'react';
import {Button, Drawer, Form, Input,Select} from "antd";
import {Image as Images} from '../../components/Images'
import {withTranslation} from "react-i18next";
import {createWorkOrderEntity} from "../../controller/API/salesOperationAPI";

class TarifsGroupDrawer extends Component {

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
        const {Option}=Select;
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
                                <Form.Item label={t('Components')}>
                                    {getFieldDecorator('Components', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} ${t('Components')}!`
                                        }],
                                    })(
                                        <Select>
                                                <Option value="selectionner">Sélectionner</Option>
                                            </Select>,
                                    )}
                                </Form.Item>
                                <Form.Item label={t('unique_price')}>
                                    {getFieldDecorator('unique_price', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} ${t('unique_price')}!`
                                        }],
                                    })(
                                        <Input
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label={t('group_rate')}>
                                    {getFieldDecorator('group_rate', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} ${t('group_rate')}!`
                                        }],
                                    })(
                                        <Input
                                            autoFocus
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label={t('quantity_to_receive_the_group_price')}>
                                    {getFieldDecorator('quantity_to_receive_the_group_price', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} ${t('quantity_to_receive_the_group_price')}!`
                                        }],
                                    })(
                                        <Input
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label={t('single_additional_price')}>
                                    {getFieldDecorator('single_additional_price', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} ${t('single_additional_price')}!`
                                        }],
                                    })(
                                        <Input
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item label={t('additional_group_price')}>
                                    {getFieldDecorator('additional_group_price', {
                                        rules: [{
                                            required: true,
                                            message: `${t('please_input')} ${t('additional_group_price')}!`
                                        }],
                                    })(
                                        <Input
                                        />,
                                    )}
                                </Form.Item>    
                            </div>
                        </Form>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.handleSubmit} type="primary">
                            {t('add_a_component')}
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export const CreateTarifs = Form.create()(withTranslation('common')(TarifsGroupDrawer));