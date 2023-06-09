import React, {Component} from 'react';
import {Image as Images} from "./../Images";
import {Button, Form, Input, message} from "antd";
import {withTranslation} from "react-i18next";
import {showErrors} from "../../controller/utils";
import {reset_password} from "../../controller/API/profileApi";
import {history} from "../../controller/history";
import {routes} from "../../controller/routes";

const FormItem = Form.Item;

class ResetPassword extends Component {

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values['device'] = this.props.device
                reset_password(values)
                    .then(response => {
                        message.success("Password reset successfully")
                        history.push(routes.login);
                    })
                    .catch(err => {
                            if (err.response)
                                showErrors(err.response.data, this.props.form)
                            else
                                message.error("Something is not good, contact the admin.")
                        }
                    )
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="container-fluid login-section h-100 flex-align-center-center">
                <div className="login-div forgot-pwd-div d-inline-block floating-form">
                    <div className="row m-0">
                        <div className="col-sm-4 col-12 login-logo-div flex-align-center-center">
                            <img className="img-fluid logo m-0" src={Images.login_logo_login} alt={"logo"}/>
                        </div>
                        <div className="col-sm-8 col-12 login-form">
                            <h4 className="text-center text-capitalize font-weight-normal">Reset Password</h4>
                            <div className="row">
                                <div className="col-sm-12 col-12">
                                    <FormItem label="Password">
                                        {getFieldDecorator('password', {
                                            rules: [{required: true}],
                                        })(<Input type={"password"}/>,)}
                                    </FormItem>
                                </div>
                                <div className="col-12">
                                    <Button onClick={this.handleSubmit}
                                            className="btn submit-btn w-100 text-white text-uppercase font-weight-bold"
                                            type="submit">
                                        Reset Password
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(withTranslation('common')(ResetPassword));