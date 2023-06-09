import React, {Component} from 'react';
import {Button, Form, message, Modal} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {locationItemUpdate} from "../../../../controller/API/salesOperationAPI";
import {order_type} from "../../../../controller/Global";
import {withTranslation} from "react-i18next";
import {Image as Images} from "../../../Images";

class CustomerPurchaseModal extends Component {

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {t} = this.props;
                const id = this.props.selected_item.id;
                values['order_type'] = order_type.customer_purchase;
                locationItemUpdate(id, values)
                    .then(response => {
                        message.success(t('added_customer'));
                        this.props.fetch();
                        this.props.close()
                    })
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const data = this.props.selected_item;
        const {t} = this.props;
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.close}
                width="45%"
                title={
                    <div className="custom-header-modal">
                        <h4>{t('customer_purchase_title_show')}</h4>
                        <Button onClick={this.props.close}
                                className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                            <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                            <div>{t("close_window_new")}</div>
                        </Button>
                    </div>
                }
                className="hide-close-btn"
                footer={[<Button key="submit" type="primary" onClick={this.handleSubmit}>
                    {t('valid')}
                </Button>]
                }>
                {this.props.visible && <div className="p-4 row mx-0">
                    <Form.Item label={t('customer_purchase_input_fiel_label')}>
                        {getFieldDecorator('customer_note', {
                            initialValue: data.customer_note,
                            rules: [{
                                required: true,
                                message: t('enter')
                            }],
                        })(
                            <TextArea rows={6}/>,
                        )}
                    </Form.Item>
                </div>}
            </Modal>
        );
    }
}

export const CustomerPurchaseModel = Form.create()(withTranslation('common')(CustomerPurchaseModal));
