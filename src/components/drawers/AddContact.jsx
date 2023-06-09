import React, {Component} from 'react';
import {Button, Drawer, Form, Input} from 'antd';
import {Image as Images} from "../Images";
import {withTranslation} from "react-i18next";
import {contactAdd, contactUpdate} from "../../controller/API/profileApi";
import {showErrors} from "../../controller/utils";
import DepartmentFilter from "../../filters/departmentFilter";
import CountryFilter from "../../filters/CountryFilter";
import {PhoneNumberWithType} from "../Profiles/distributors/PhoneNumberWithType";

const _ = require('lodash');

class AddContactForm extends Component {

    state = {
        confirmProfile: false,
        contacts: [],
    };
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            const {contact} = this.props;
            if (!err) {
                let client_id = _.get(this.props, 'id', null);
                if (client_id) {
                    if (contact) {
                        values['department'] = values['department'].key;
                        contactUpdate(contact.id, values)
                            .then(() => {
                                this.props.update();
                                this.props.form.resetFields();
                                this.props.onClose();
                            }).catch(
                            (err) => showErrors(err.response.data, this.props.form)
                        )
                    } else {
                        Object.keys(values).forEach(key => values[key] === undefined ? delete values[key] : {});
                        values['client'] = client_id;
                        contactAdd(values)
                            .then(() => {
                                this.props.update();
                                this.props.form.resetFields();
                                this.props.onClose();
                            }).catch(
                            (err) => showErrors(err.response.data, this.props.form)
                        )
                    }

                }
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Drawer
                title={t('add_contact')}
                placement="right"
                closable={false}
                destroyOnClose={true}
                onClose={this.props.onClose}
                visible={this.props.visible}
                getContainer={false}
                style={{position: 'fixed'}}
                width="40%"

            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid mr-2"/>
                        <div>{t('exit_btn_profile')}</div>
                    </Button>
                    <div className="col-12">
                        <Form className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-24 col-md-12 col-lg-12">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('name')}>
                                                {getFieldDecorator('name')(
                                                    <Input placeholder={t('name')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('department')}>
                                                {getFieldDecorator('department')(
                                                    <DepartmentFilter/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('role')}>
                                                {getFieldDecorator('position')(
                                                    <Input
                                                        placeholder={t('role')}
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('email')}>
                                                {getFieldDecorator('email', {
                                                    type: "email",

                                                })(
                                                    <Input
                                                        placeholder={t('email')}
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>

                                        <div className="col-12">
                                            <Form.Item label={t('address')}>
                                                {getFieldDecorator('address')(
                                                    <Input
                                                        placeholder={t('address')}
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12 p-0">
                                            <div className="row mx-0">
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                                    <Form.Item label={t('zip_code')}>
                                                        {getFieldDecorator('zip_code')(
                                                            <Input
                                                                placeholder={t('zip_code')}
                                                            />,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                                    <Form.Item label={t('city')}>
                                                        {getFieldDecorator('city')(
                                                            <Input
                                                                placeholder={t('city')}
                                                            />,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0">
                                            <div className="row mx-0">
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pr-1">
                                                    <Form.Item label={t('state_dep')}>
                                                        {getFieldDecorator('state_province', {})(
                                                            <Input
                                                                placeholder={t('state_dep')}
                                                            />,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                                    <Form.Item label={t('country')}>
                                                        {getFieldDecorator('country')(
                                                            <CountryFilter/>,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="line-devide w-100 d-inline-block"/>
                                        </div>
                                        <div className="col-12">
                                            <h6 className="small-heading">{t('number')}(s)</h6>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('phn_number')}>
                                                {getFieldDecorator('phone')(<PhoneNumberWithType/>,)}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Form>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={() => this.handleSubmit()} type="primary">
                            {t('add_this_contact')}
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

const AddContact = Form.create({
        mapPropsToFields(props) {
            if (props.contact) {
                return {
                    name: Form.createFormField({
                        value: props.contact.name
                    }),
                    department: props.contact.department && Form.createFormField({
                        value: {
                            key: props.contact.department.id,
                            label: props.contact.department.title
                        }
                    }),
                    position: Form.createFormField({
                        value: props.contact.position
                    }),
                    email: Form.createFormField({
                        value: props.contact.email
                    }),
                    address: Form.createFormField({
                        value: props.contact.address
                    }),
                    zip_code: Form.createFormField({
                        value: props.contact.zip_code
                    }),
                    city: Form.createFormField({
                        value: props.contact.city
                    }),
                    state_province: Form.createFormField({
                        value: props.contact.state_province
                    }),
                    country: Form.createFormField({
                        value: props.contact.country
                    }),
                    phone: Form.createFormField({
                        value: props.contact.phone
                    }),
                }
            }

        }
    }
)(withTranslation('common')(AddContactForm));
export default AddContact
