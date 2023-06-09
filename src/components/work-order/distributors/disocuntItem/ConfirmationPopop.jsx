import React, {Component} from 'react';
import {Button, Icon, message, Modal} from "antd";
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import {distributorApplyItemDiscount} from "../../../../controller/API/salesOperationAPI";

class ConfirmationPopup extends Component {
    state = {
        loading: false
    }
    handleSubmit = () => {
        this.setState({loading: true})
        const {data} = this.props;
        distributorApplyItemDiscount({item: data.id})
            .then(response => {
                message.info(response.data.message)
                this.props.updateDiscountData()
            })
            .catch(error => {
                message.info(error.response.data.message)
            })
            .finally(() => {
                this.setState({loading: false})
                this.props.closePopup()
            })
    }

    render() {
        const {t} = this.props;
        const {loading} = this.state
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.closePopup}
                width="45%"
                title={
                    <div className="custom-header-modal">
                        <h4>{"appliquer le coupon"}</h4>
                        <Button style={{top: 18}} onClick={this.props.closePopup}
                                className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                            <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                            <div>{t("close")}</div>
                        </Button>
                    </div>
                }
                className="hide-close-btn apply-coupon-mdl"
                footer={[<Button key="submit" loading={loading} type="primary" onClick={this.handleSubmit}>
                    {"Ok"}
                </Button>]
                }>
                <div className="row mx-0">
                    <div className="col-12 apply-coupon-content ">
                        <div className="row mx-0">
                            <div className="col-12">
                                <p><Icon type="check"/> Vérification des éléments dans les bons de commande</p>
                                <p>{loading ? <Icon type="loading"/> : ""} Génération de nouvelles confirmations d'ordre
                                    de commande</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default withTranslation('common')(ConfirmationPopup);