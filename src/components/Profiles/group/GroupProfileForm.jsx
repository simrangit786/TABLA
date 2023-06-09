import React, {Component} from 'react';
import {Button, Form, Input} from 'antd';
import {groupPost, groupUpdate} from "../../../controller/API/profileApi";
import {Image as Images} from "../../Images";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {showErrors} from "../../../controller/utils";
import {methods} from "../../../controller/Global";
import ConfirmPopup from "../../modal/ConfirmPopup";
import {history} from "../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../controller/routes";


class GroupProfileFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmGroup: false,
        };
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {group} = this.props;
                if (group) {
                    groupUpdate(group.id, values)
                        .then(response => {
                            this.confirmGroupVisible(true)
                        }).catch(err => showErrors(err.response.data, this.props.form))
                } else {
                    groupPost(values)
                        .then(response => {
                            this.confirmGroupVisible(true)
                        }).catch(err => showErrors(err.response.data, this.props.form))
                }
            }
        })
    };

    confirmGroupVisible = (visible) => {
        this.setState({confirmGroup: visible})
    };

    render() {
        const {t, group} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {params} = this.props.match;
        const {confirmGroup} = this.state;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h6 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('group_information')}</h6>
                    </div>
                    <div className="col-12">
                        <Form className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <Form.Item label={t('title')}>
                                                {getFieldDecorator('title', {
                                                    rules: [{required: true, message: t('please_input')}],
                                                })(
                                                    <Input autoFocus placeholder={t('title')}/>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <div
                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    <div>
                        <Button type="primary" onClick={this.handleSubmit}
                                className="font-weight-bold text-center text-white text-uppercase">
                            {this.props.match.params.method === methods.edit ? t('update_profile_btn') : t('crete_profill')}
                        </Button>
                    </div>
                </div>
                {params.method === methods.edit ?
                    confirmGroup ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.groups.method, {
                            method: methods.view,
                            id: group.id
                        }))}
                        remove_left_btn={true}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.confirmGroupVisible(false)}
                        okText={t('view_profile')}
                        cancelText={false}
                        title={t('confirm_profile_update')}
                        description={t('group_updated')}
                        small_description={t('group_updated_main')}
                    /> : ""
                    :
                    confirmGroup ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.groups.method, {
                            method: methods.view,
                            id: group.id
                        }))}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.props.history.go(-1)}
                        okText={t('view_profile')}
                        cancelText={"Ok"}
                        title={t('profile_create_confirm')}
                        description={t('created_group_new')}
                        small_description={t('created_group_profile_main')}
                    /> : ""
                }
            </React.Fragment>
        );
    }
}


export const GroupProfileForm = Form.create({
    name: "group_profile",
    mapPropsToFields(props) {
        if (props.group) {
            return {
                title: Form.createFormField({
                    value: props.group.title
                }),
            }
        }

    }
})(withTranslation('common')(withRouter(GroupProfileFormComponent)));
