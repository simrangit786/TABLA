import React, {Component} from 'react';
import {Button, Form, Input} from 'antd';
import DepartmentFilter from "../../../filters/departmentFilter";
import {contactAdd, contactRemove, contactUpdate} from "../../../controller/API/profileApi";
import {Image as Images} from "../../Images";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {showErrors} from "../../../controller/utils";
import CountryFilter from "../../../filters/CountryFilter";
import {methods} from "../../../controller/Global";
import ConfirmPopup from "../../modal/ConfirmPopup";
import {history} from "../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../controller/routes";
import {ContactInfoPhoneNumber} from "./ContactInfoPhoneNumber";


class ContactInformationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmProfile: false,
            contacts: [],
            editContact: null
        };
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {profile} = this.props;
                if (profile) {
                    values['client'] = profile.id;

                    values['phone'] = values.phone.map(o => o.id);
                    let {contacts, editContact} = this.state;
                    if (editContact) {
                        values['department'] = values.department.key;
                        contactUpdate(editContact, values).then(response => {
                            let newArr = contacts.map(item => {
                                if (item.id === response.data.id) {
                                    return response.data
                                } else {
                                    return item
                                }
                            });
                            this.setState({contacts: newArr, editContact: null});
                        }).catch(err => showErrors(err.response.data, this.props.form))
                    } else {
                        contactAdd(values)
                            .then(response => {
                                contacts.push(response.data);
                                this.setState({contacts, editContact: null});
                            }).catch(err => showErrors(err.response.data, this.props.form))
                    }
                    this.props.form.resetFields();
                    this.props.form.setFieldsValue({'phone': []})
                }
            }
        })
    };

    handleRemoveCard = (id, index) => {
        contactRemove(id)
            .then(() => {
                let {contacts} = this.state;
                contacts.splice(index, 1);
                this.setState({contacts});
            })
    };

    confirmProfileVisible = (visible) => {
        this.setState({confirmProfile: visible})
    };

    componentDidMount() {
        if (this.props.contact_info) {
            this.setState({contacts: this.props.contact_info})
        }
    }

    render() {
        const {t, profile} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {contacts, confirmProfile, editContact} = this.state;
        const {params} = this.props.match;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h6 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('Contact_info')}</h6>
                    </div>
                    <div className="col-12">
                        <Form className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('name')}>
                                                {getFieldDecorator('name', {})(
                                                    <Input autoFocus placeholder={t('name')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('department')}>
                                                {getFieldDecorator('department', {})(
                                                    <DepartmentFilter/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('role')}>
                                                {getFieldDecorator('position', {})(
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
                                                {getFieldDecorator('address', {})(
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
                                                        {getFieldDecorator('zip_code', {})(
                                                            <Input
                                                                placeholder={t('zip_code')}
                                                            />,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">

                                                    <Form.Item label={t('city')}>
                                                        {getFieldDecorator('city', {})(
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
                                                        {getFieldDecorator('state_province', {})(<Input
                                                                placeholder={t('state_dep')}
                                                            />,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                                <div className="col-sm-12 col-12 col-md-6 col-lg-6 pl-1">
                                                    <Form.Item label={t('country')}>
                                                        {getFieldDecorator('country', {})(
                                                            <CountryFilter/>,
                                                        )}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                        </div>
                                        <div className="col-12">
                                            <h6 className="small-heading">{t('number')}(s)</h6>
                                        </div>
                                        <div className="col-12">
                                            <Form.Item label={t('phn_number')}>
                                                {getFieldDecorator('phone', {})(<ContactInfoPhoneNumber/>,)}
                                            </Form.Item>
                                        </div>
                                        <div className="contact-btn col-12 text-center">
                                            <Button onClick={this.handleSubmit}
                                                    className="another-address-add-btn-add w-auto font-weight-bold mt-4 text-uppercase text-center">
                                                {editContact ? t('edit_contact') : t('add_a_contact')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="w-100">

                        {contacts.map((data, index) => (
                            <div key={`address_card_${index}`} className="col-12">
                                <div className="row mx-0 address-add-row position-relative">
                                    <div className="col-lg-2 col-sm-12 col-12">
                                        <h5 className="mb-0">{data.name}</h5>
                                    </div>
                                    <div className="col-lg-6 col-sm-12 col-12 position-relative">
                                        <div className="row">
                                            <div className="col-6">
                                                <p>{data.department ? data.department.title : "-"}</p>
                                                <p>{data.position}</p>
                                                <p>{data.email}</p>
                                                <p>{
                                                    data.phone.map((i) => {
                                                        return (
                                                            <p>{i.phone_type}:{i.phone_number
                                                                ? `(${
                                                                    i.country_code
                                                                }) - ${i.phone_number
                                                                    .match(/.{1,2}/g)
                                                                    .join(" - ")}`
                                                                : "-"}</p>
                                                        )
                                                    })
                                                }</p>
                                            </div>
                                            <div className="col-6">
                                                <p>{data.address}</p>
                                                <p>{data.zip_code}</p>
                                                <p>{data.state_province}</p>
                                                <p>{data.city}</p>
                                                <p>{data.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="position-absolute edit-delete-div">
                                        <Button onClick={() => {
                                            this.props.form.setFieldsValue({
                                                ...data,
                                                department: data.department ? {
                                                    key: data.department.id,
                                                    label: data.department.title
                                                } : null
                                            });
                                            this.setState({editContact: data.id})
                                        }} icon={'edit'}
                                                className="bg-transparent rounded-0 border-0 shadow-none p-0 h-auto"/>
                                        <Button
                                            onClick={() => this.handleRemoveCard(data.id, index)}
                                            className="bg-transparent rounded-0 border-0 shadow-none p-0 h-auto">
                                            <img src={Images.trash_gray} alt="trash icon"
                                                 className="img-fluid"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>))
                        }
                    </div>
                </div>
                <div
                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-between px-5">
                    <div>
                        <Button onClick={() => {
                            this.props.form.resetFields();
                        }} type="button"
                                className="font-weight-bold text-center text-blue border-0 bg-transparent text-capitalize p-0">
                            <span>{t('reset')}</span></Button>
                    </div>
                    <div>
                        <Button style={{marginLeft: 8}} onClick={this.props.prev}
                                className="font-weight-bold text-center text-uppercase mr-3">
                            {t('return')}
                        </Button>
                        <Button type="primary" onClick={() => this.confirmProfileVisible(true)}
                                className="font-weight-bold text-center text-white text-uppercase">
                            {this.props.method === methods.edit ? t('update_profile_btn') : t('crete_profill')}
                        </Button>
                    </div>
                </div>
                {params.method === methods.edit ?
                    confirmProfile ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.distributor.method, {
                            method: methods.view,
                            id: profile.id
                        }))}
                        remove_left_btn={true}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.confirmProfileVisible(false)}
                        okText={t('view_profile')}
                        cancelText={false}
                        title={t('confirm_profile_update')}
                        description={t('distributor_updated')}
                        small_description={t('distributor_updated_main')}
                    /> : ""
                    :
                    confirmProfile ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.distributor.method, {
                            method: methods.view,
                            id: profile.id
                        }))}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.props.history.go(-2)}
                        okText={t('view_profile')}
                        cancelText={"Ok"}
                        title={t('profile_create_confirm')}
                        description={t('created_profile_new')}
                        small_description={t('created_dist_profile_main')}
                    /> : ""
                }
            </React.Fragment>
        );
    }
}


export const ContactInformation = Form.create({name: "contact_info",})(withTranslation('common')(withRouter(ContactInformationForm)));
