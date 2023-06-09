import React, {Component} from 'react';
import {Button, Drawer, Form, Input} from 'antd';
import {Image as Images} from "../Images";
import ItemCategoryFilter from "../../filters/itemCategoryFilter";
import {productAdd} from "../../controller/API/itemApi";
import {withTranslation} from "react-i18next";

class CreateFamilyForm extends Component {


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                productAdd(values).then(
                    () => {
                        this.props.onClose();
                    }
                )

            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <React.Fragment>
                <Drawer
                    title={t('create_family_caps')}
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
                                        <Form.Item label={t('name_family')}>
                                            {getFieldDecorator('name', {
                                                rules: [{
                                                    required: true,
                                                    message: `${t('input_your')} ${t('name_family')}!`
                                                }],
                                            })(
                                                <Input autoFocus placeholder={t('enter') + " :"}
                                                />,
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12 px-0">
                                        <Form.Item label={t('name_categry')}>
                                            {getFieldDecorator('category', {
                                                rules: [{
                                                    required: true,
                                                    message: `${t('input_your')} ${t('name_categry')}!`
                                                }],
                                            })(<ItemCategoryFilter/>,
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                            <Button onClick={this.handleSubmit} type="primary">
                                {t('create_family_submit')}
                            </Button>
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>
        );
    }
}

export const CreateFamily = Form.create()(withTranslation('common')(CreateFamilyForm));
