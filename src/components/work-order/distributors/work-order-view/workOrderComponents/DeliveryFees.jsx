import React, {Component} from 'react';
import {Button, Form, InputNumber, Modal} from "antd";
import {Image as Images} from "../../../../Images";
import {withTranslation} from "react-i18next";
import {distributorWorkOrderDeliveryFeesAmount} from "../../../../../controller/API/salesOperationAPI";
import {withRouter} from "react-router-dom";


class DeliveryFees extends Component {
    state = {
        loading: false,
    };

    handleDeliveryFees = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                values['workorder'] = this.props.workorder_id
                distributorWorkOrderDeliveryFeesAmount(values)
                    .then(() => {
                        this.setState({loading: false});
                        this.props.onClose();
                    }).catch(err => {
                    this.setState({loading: false})
                })
            }
        })
    };


    render() {
        const {t, deliveryFees} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <React.Fragment>
                <Modal
                    visible={this.props.visible}
                    onCancel={this.props.onClose}
                    width="45%"
                    destroyOnClose
                    title={
                        <div className="custom-header-modal">
                            <h4>AJOUTER DES FRAIS DE LIVRAISON</h4>
                            <Button onClick={this.props.onClose}
                                    className="close-header-icon add-comment-btn w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                                <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                                <div>{t("close_window_new")}</div>
                            </Button>
                        </div>
                    }
                    className="hide-close-btn"
                    footer={
                        <Button type="primary" loading={this.state.loading} onClick={this.handleDeliveryFees}>
                            AJOUTer CET FRAIS DE LIVRAISON
                        </Button>
                    }>
                    <div className="row mx-0 py-4 px-4">
                        <div className="col-12">
                            <Form.Item className="position-relative select-arrow-none"
                                       label={"Frais de livraison"}>
                                {getFieldDecorator('amount', {
                                    initialValue: deliveryFees,
                                    rules: [{
                                        required: true,
                                        message: `${t('input_your')} !`
                                    }],
                                })(<InputNumber/>)}
                            </Form.Item>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Form.create()(withTranslation('common')(withRouter(DeliveryFees)));