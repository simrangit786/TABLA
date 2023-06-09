import React, {Component} from 'react';
import {Image as Images} from "./../Images";
import {Button, Form, Input, message} from "antd";
import {withTranslation} from "react-i18next";
import {showErrors} from "../../controller/utils";
import {reset_code_verification} from "../../controller/API/profileApi";
import ResetPassword from "./ResetPassword";

const FormItem = Form.Item;

class CodeVerification extends Component {
    state = {
        processed: false,
        device: null
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values['email'] = this.props.email
                reset_code_verification(values)
                    .then(response => {
                        this.setState({processed: true, device: response.data.device})
                        message.success("OTP verified successfully")
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
        const {processed, device} = this.state
        if (processed) {
            return <ResetPassword device={device}/>
        } else {
            return (
                <div className="container-fluid login-section h-100 flex-align-center-center">
                    <div className="login-div forgot-pwd-div d-inline-block floating-form">
                        <div className="row m-0">
                            <div className="col-sm-4 col-12 login-logo-div flex-align-center-center">
                                <img className="img-fluid logo m-0" src={Images.login_logo_login} alt={"logo"}/>
                            </div>
                            <div className="col-sm-8 col-12 login-form">
                                <h4 className="text-center text-capitalize font-weight-normal">Verify OTP</h4>
                                <div className="row">
                                    <div className="col-sm-12 col-12">
                                        <FormItem label="OTP">
                                            {getFieldDecorator('code', {
                                                rules: [{required: true}],
                                            })(<Input/>,)}
                                        </FormItem>
                                    </div>
                                    <div className="col-12">
                                        <Button onClick={this.handleSubmit}
                                                className="btn submit-btn w-100 text-white text-uppercase font-weight-bold"
                                                type="submit">
                                            Verify Password
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

export default Form.create()(withTranslation('common')(CodeVerification));