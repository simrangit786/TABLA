import React, {Component} from 'react';
import {Button, Form, InputNumber, Modal} from "antd";
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import {distributorWorkOrderCreditDiscountAmount} from "../../../../controller/API/salesOperationAPI";
import {withRouter} from "react-router-dom";


class CreditDiscountPopup extends Component {

    state = {
        loading: false,
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                values['workorder'] = this.props.match.params.id
                distributorWorkOrderCreditDiscountAmount(values)
                    .then(() => {
                        this.setState({loading: false});
                        this.props.close();
                    }).catch(err => {
                    this.setState({loading: false})
                })
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
                        <h4>{"Choisir un montant d'avoir"}</h4>
                        <Button style={{top: 18}} onClick={this.props.close}
                                className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                            <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                            <div>{t("close")}</div>
                        </Button>
                    </div>
                }
                className="hide-close-btn"
                footer={[<Button key="submit" loading={loading} type="primary" onClick={this.handleSubmit}>
                    {"Créer avoir"}
                </Button>]
                }>
                {this.props.visible &&
                <>
                    <div className="px-4 pb-2 row mx-0">
                        <Form.Item label={"Avoir"}>
                            {getFieldDecorator('amount', {
                                rules: [{
                                    required: true,
                                    message: t('enter')
                                }],
                            })(
                                <InputNumber/>,
                            )}
                        </Form.Item>
                    </div>
                </>
                }
            </Modal>
        );
    }
}

export const CreditDiscount = Form.create()(withTranslation('common')(withRouter(CreditDiscountPopup)));
