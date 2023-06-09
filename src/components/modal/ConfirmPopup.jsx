import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {Image as Images} from "../Images";
import {withTranslation} from "react-i18next";

class ConfirmPopup extends Component {
    onCancel = () => {
        const {onCancel} = this.props;
        if (typeof onCancel === 'function')
            onCancel()
    };
    onOk = () => {
        const {onOk} = this.props;
        if (typeof onOk === 'function')
            onOk()
    };
    state = {
        visible: true
    };

    render() {
        const {
            t,
            title,
            okText,
            description,
            small_description,
            cancelText,
            width,
            image,
            remove_left_btn
        } = this.props;
        const {visible} = this.state;
        return (
            <Modal
                style={{top: '26%'}}
                title={title}
                visible={visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
                width={width || "40%"}
                closable={false}
                className="tabs-modal-exit profile-modal confirm-popup confirm-modal-main"
                footer={
                    [!remove_left_btn && <Button key="back" onClick={this.onCancel}>
                        {cancelText || t('cancel')}
                    </Button>,
                        <Button key="submit" type="primary" onClick={this.onOk}>
                            {okText}
                        </Button>]
                }
            >
                <div className="row mx-0">
                    <div className="check-icon float-left">
                        <img src={image || Images.alert_popup_icon} alt="check-icon" className="img-fluid"/>
                    </div>
                    <div className="check-text-details float-left">
                        <div className="row mx-0">
                            <div className="col-12">
                                <h6
                                    className="font-weight-bold mb-2">{description}</h6>
                                <p>{small_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default (withTranslation('common')(ConfirmPopup));
