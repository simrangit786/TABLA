import React, {Component} from 'react';
import {Image as Images} from "./../Images";
import {Button, Form, Input, message} from "antd";
import {withTranslation} from "react-i18next";
import {showErrors} from "../../controller/utils";
import {reset_password_code} from "../../controller/API/profileApi";
import CodeVerification from "./CodeVerification";

const FormItem = Form.Item;

class ForgotPassword extends Component {
    state = {
        processed: false,
        email: null
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                reset_password_code(values)
                    .then(() => {
                        this.setState({processed: true, email: values['email']})
                        message.success("We have sent you an email with OTP, Please enter that OTP for reset your password")
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
        const {processed, email} = this.state;
        if (processed) {
            return <CodeVerification email={email}/>
        } else {
            return (
                <div className="container-fluid login-section h-100 flex-align-center-center">
                    <div className="login-div forgot-pwd-div d-inline-block floating-form">
                        <div className="row m-0">
                            <div className="col-sm-4 col-12 login-logo-div flex-align-center-center">
                                <img className="img-fluid logo m-0" src={Images.login_logo_login} alt={"logo"}/>
                            </div>
                            <div className="col-sm-8 col-12 login-form">
                                <h4 className="text-center text-capitalize font-weight-normal">Forgot Password</h4>
                                <div className="row">
                                    <div className="col-sm-12 col-12">
                                        <FormItem label="Email">
                                            {getFieldDecorator('email', {
                                                rules: [{type: 'email',}, {required: true}],
                                            })(<Input/>,)}
                                        </FormItem>
                                    </div>
                                    <div className="col-12">
                                        <Button onClick={this.handleSubmit}
                                                className="btn submit-btn w-100 text-white text-uppercase font-weight-bold"
                                                type="submit">
                                            Submit
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
}

export default Form.create()(withTranslation('common')(ForgotPassword));