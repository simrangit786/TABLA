import React, {Component} from 'react';
import {Button, Drawer, Form, message, Select} from "antd";
import {distributorProfileGetOne, distributorProfileUpdate, phoneNumberPost} from "../../../controller/API/profileApi";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {getPhoneFields, phone} from "../../Profiles/distributors/PhoneNumberField";
import SinglePhoneField from "../../Profiles/distributors/SinglePhoneField";
import {Image as Images} from "../../Images";

const {Option} = Select;

class AddPhoneForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            phone_numbers: [],
            selected_country: "+33",
            phone_number_status: true,
            phoneFields: getPhoneFields("+33") || []
        };
        this.singlePhoneFieldRef = React.createRef();
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true})
                let {selected_country, phone_numbers} = this.state;
                let {client} = this.props.workorder;
                phoneNumberPost(values)
                    .then((response) => {
                        phone_numbers = phone_numbers.map(i => i.id)
                        phone_numbers.push(response.data.id)
                        distributorProfileUpdate(client.id, {"phone": phone_numbers})
                            .then(() => {
                                message.success('Numéro added successfully')
                                this.setState({loading: false})
                                this.props.form.resetFields();
                                this.props.onClose();
                            })
                    })
                this.setState({phone_number_status: false}, () => {
                    this.setPhoneFields(selected_country);
                    setTimeout(() => this.setState({phone_number_status: true}), 100);
                    this.singlePhoneFieldRef.current.reset();
                });
            }
        })
    };
    setPhoneFields = (country_code) => {
        const phoneFields = getPhoneFields(country_code);
        this.setState({phoneFields}, () => phoneFields.forEach(item => {
            this[item.field] = React.createRef()
        }))
    };

    componentDidMount() {
        const {client} = this.props.workorder
        distributorProfileGetOne(client.id)
            .then(response => {
                this.setState({phone_numbers: response.phone})
            })
    }

    changeCountry = (selected_country) => {
        this.setPhoneFields(selected_country);
        this.setState({selected_country, phone_number_status: false}, () => {
            setTimeout(() => this.setState({phone_number_status: true}), 100);
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {phoneFields, phone_number_status, loading} = this.state;
        const {t} = this.props;
        return (
            <Drawer
                title={t('workorder_add_phone')}
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                width="40%"
                destroyOnClose={true}
            >
                <Button onClick={this.props.onClose}
                        className="close-header-icon w-auto px-3 flex-align-center-center position-absolute p-0 border-0">
                    <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                    <div>{t('close_window_new')}</div>
                </Button>
                <Form.Item>
                    <div className="row">
                        <div className="col-sm-12 col-12 col-md-3 col-lg-3 pr-2">
                            <Form.Item>
                                {getFieldDecorator('country_code', {
                                    initialValue: this.state.selected_country,
                                    rules: [{
                                        required: true,
                                        message: 'please input distributer range'
                                    }],
                                })(
                                    <Select className="position-relative address-dropdown"
                                            showAction={["focus", "click"]}
                                            onChange={(value) => this.changeCountry(value)}
                                    >
                                        {phone.map((obj, index) => <Option key={`country_${index}`}
                                                                           value={obj.country_code}>
                                            <img src={obj.flag}
                                                 className="img-fluid mr-2 flag-img-drp" alt="flag"/>
                                            <span>{obj.country_code}</span>
                                        </Option>)}
                                    </Select>
                                    ,)}
                            </Form.Item>
                        </div>
                        <div className="col-sm-12 col-12 col-md-9 col-lg-9 p-0">
                            {phone_number_status && <Form.Item>
                                {getFieldDecorator('phone_number', {
                                    rules: [{
                                        required: true,
                                        message: 'please input'
                                    }],
                                })(
                                    <SinglePhoneField ref={this.singlePhoneFieldRef} phoneFields={phoneFields}/>
                                    ,)}
                            </Form.Item>}

                        </div>
                    </div>
                </Form.Item>
                <div className="col-12 p-0">
                    <Form.Item label={t('telephone_type')}>
                        {getFieldDecorator('phone_type', {
                            initialValue: "Bureau",
                            rules: [{
                                required: true,
                                message: 'please input'
                            }],
                        })(
                            <Select placeholder={'Sélectionner'} showAction={["focus", "click"]}>
                                <Option key="Siège social" value="Siège social">Siège social</Option>
                                <Option key="Bureau" value="Bureau">Bureau</Option>
                                <Option key="Magasin" value="Magasin">Magasin</Option>
                                <Option key="Depot" value="Depot">Depot</Option>
                                <Option key="Comptabilité" value="Comptabilité">Comptabilité</Option>
                            </Select>
                            ,)}
                    </Form.Item>
                </div>
                <div className="drawer-footer-phone">
                    <Button loading={loading} onClick={this.handleSubmit} type="primary">
                        {t('create_number')}
                    </Button>
                </div>
            </Drawer>
        );
    }
}

export const AddPhoneDrawer = Form.create({name: "phone_data"})(withTranslation('common')(withRouter(AddPhoneForm)));
