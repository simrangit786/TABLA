import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, Radio} from "antd";
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import {
    distributorWorkorderDiscountUpdate,
    WorkorderInvoiceDiscountUpdate
} from "../../../../controller/API/salesOperationAPI";
import {withRouter} from "react-router-dom";

const placeholder = {
    "percentage": "0%",
    "price": "€0"
};

class AdditionalDiscountPopup extends Component {

    state = {
        loading: false,
        discount_type: "price",
    };

    handleDiscountType = (e) => {
        this.setState({discount_type: e.target.value})
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                values[`discount_${this.state.discount_type}`] = values['discount_'];
                if (!this.props.invoice) {
                    distributorWorkorderDiscountUpdate(this.props.data.id, values)
                        .then(() => {
                            this.setState({loading: false});
                            this.props.close();
                        }).catch(err => {
                        message.error("sometng went wrong.");
                        this.setState({loading: false})
                    })
                } else {
                    WorkorderInvoiceDiscountUpdate(this.props.match.params.id, values)
                        .then(() => {
                            this.setState({loading: false});
                            this.props.close();
                        }).catch(err => {
                        message.error("sometng went wrong.");
                        this.setState({loading: false})
                    })
                }
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        const {loading} = this.state;
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.close}
                width="45%"
                title={
                    <div className="custom-header-modal">
                        <h4>{t('add_additional_discount')}</h4>
                        <Button style={{top: 18}} onClick={this.props.close}
                                className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                            <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                            <div>{t("close")}</div>
                        </Button>
                    </div>
                }
                className="hide-close-btn"
                footer={[<Button key="submit" loading={loading} type="primary" onClick={this.handleSubmit}>
                    {t('add_this_discount_btn')}
                </Button>]
                }>
                {this.props.visible &&
                <>
                    <div className="px-4 pt-3 row mx-0">
                        <Form.Item>
                            {getFieldDecorator('type', {
                                initialValue: this.state.discount_type,
                                rules: [{
                                    required: true,
                                    message: t('enter')
                                }],
                            })(
                                <Radio.Group onChange={this.handleDiscountType}>
                                    <Radio value={"price"}>{t('discount_amount')}</Radio>
                                    <Radio value={"percentage"}>{t('discount_percentage')}</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </div>
                    <div className="px-4 pb-2 row mx-0">
                        <Form.Item label={t('additional_discount')}>
                            {getFieldDecorator('discount_', {
                                rules: [{
                                    required: true,
                                    message: t('enter')
                                }],
                            })(
                                <Input placeholder={placeholder[this.state.discount_type]}/>,
                            )}
                        </Form.Item>
                    </div>
                </>
                }
            </Modal>
        );
    }
}

export const AdditionalDiscount = Form.create()(withTranslation('common')(withRouter(AdditionalDiscountPopup)));
