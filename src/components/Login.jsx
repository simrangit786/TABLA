import React, {Component} from 'react';
import {Button, Form, Input, message} from "antd";
import {Image as Images} from "./Images";
import {login, setLanguage} from "../controller/AuthService";
import {withTranslation} from 'react-i18next';
import i18n from "../i18n";
import {showErrors} from "../controller/utils";
import {Link} from "react-router-dom";
import {routes} from "../controller/routes";

const FormItem = Form.Item;

class LoginForm extends Component {
    changeLang = () => {
        if (i18n.languages[0] === 'fr') {
            i18n.changeLanguage('en');
            setLanguage('en');
        } else {
            i18n.changeLanguage('fr');
            setLanguage('fr');
        }
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(values)
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

    constructor(props) {
        super(props)
        this.state = {
            lang: ''
        };
    }

    componentDidMount() {
        i18n.changeLanguage('fr');
    }

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="container-fluid login-section h-100 flex-align-center-center">
                <div className="login-div d-inline-block floating-form">
                    <div className="row m-0">
                        <div className="col-sm-4 col-12 login-logo-div flex-align-center-center">
                            <img className="img-fluid logo m-0" src={Images.login_logo_login} alt={"logo"}/>
                        </div>
                        <div className="col-sm-8 col-12 login-form">
                            <h4 className="text-center text-capitalize font-weight-normal">{t('login.title')}</h4>
                            <p className="m-0 text-center">{t('login.subheading')}</p>
                            <div className="row">
                                <div className="col-sm-12 col-12">
                                    <FormItem label="Email">
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email',
                                                message: t('login.email_error'),
                                            }, {required: true, message: t('login.email_error')}],
                                        })(<Input/>,)}
                                    </FormItem>
                                </div>
                                <div className="col-sm-12 col-12">
                                    <FormItem label={t('login.pass')}>
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true,
                                                message: t('login.password_error')
                                            }],
                                        })(<Input.Password/>,)}
                                    </FormItem>
                                </div>
                                <div className="col-12 forgot-div text-right">
                                    <Link to={routes.forget_password}>{t('login.forgotpass')}</Link>
                                </div>
                                <div className="col-12">
                                    <Button onClick={this.handleSubmit}
                                            className="btn submit-btn w-100 text-white text-uppercase font-weight-bold"
                                            type="submit">
                                        {t('login.text')}
                                    </Button>
                                </div>
                                <div className="col-12 login-footer text-center">
                                    {/*<a className="d-inline-block" href="#">{t('login.policy')}</a>*/}
                                    {/*<a className="d-inline-block" href="#">{t('login.help')}</a>*/}
                                    <a className="d-inline-block"
                                       onClick={() => this.changeLang()}>{t('change_lang')}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(withTranslation('common')(LoginForm));
