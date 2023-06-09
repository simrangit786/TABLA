import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {Image as Images} from "../Images";
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";

class TarificationType extends Component {
    render() {
        const {t} = this.props;
        return (
            <Modal
                style={{top: '8%'}}
                title={t('pricing_type')}
                visible={this.props.visible}
                onOk={this.props.onClose}
                onCancel={this.props.onClose}
                width="25.5%"
                className="tabs-modal-exit confirm-modal-main"
                footer={false}
            >
                <div className="row mx-0 work-order-type-row">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon close-header-second w-auto flex-align-center-center px-2 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <Link to={''} className="ant-btn ant-btn-primary">
                        <img className="img-fluid" alt="supplier-icon" src={Images.copun_white_icon}/>
                        <span> Coupon</span>
                    </Link>
                    <Link to={''} className="ant-btn ant-btn-primary">
                        <img className="img-fluid" alt="supplier-icon" src={Images.promotion_white_icon}/>
                        <span> Promotion</span>
                    </Link>
                </div>
            </Modal>
        );
    }
}

export default (withTranslation('common')(TarificationType));