import React, {Component} from 'react';
import {Button, Drawer, Form, Input} from 'antd';
import {Image as Images} from "../Images";
import {itemCategoryPost} from "../../controller/API/itemApi";
import {withTranslation} from "react-i18next";

class CreateCategotyForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                itemCategoryPost(values)
                    .then(() => {
                        this.props.onClose()
                    })
                    .catch(err => {
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Drawer
                title={t('create_category')}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                // getContainer={false}
                width="36%"
                destroyOnClose={true}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <div className="col-12 px-0 ">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row mx-0">
                                <div className="col-12 px-0">
                                    <Form.Item label={t('category_name')}>
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true,
                                                message: `${t('input_your')} ${t('category_name')}!`
                                            }],
                                        })(
                                            <Input
                                                autoFocus
                                                placeholder={t('enter') + " :"}
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.handleSubmit} type="primary">
                            {t('create_category_submit')}
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export const CreateCategoty = Form.create()(withTranslation('common')(CreateCategotyForm));
