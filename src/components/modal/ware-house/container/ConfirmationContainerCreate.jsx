import React, {Component} from 'react';
import {Modal} from "antd";
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";

class ConfirmationContainerCreate extends Component {
    render() {
        const {t} = this.props;
        return (
            <Modal
                style={{top: '26%'}}
                title={t('conformation')}
                visible={this.props.visible}
                onOk={() => this.close()}
                onCancel={this.props.onClose}
                width="40%"
                okText={t('see_container')}
                cancelText="OUI"
                className="tabs-modal-exit profile-modal confirm-modal-main"
            >
                <div className="row mx-0">
                    <div className="check-icon float-left">
                        <img src={Images.check_icon} alt="check-icon" className="img-fluid"/>
                    </div>
                    <div className="check-text-details float-left">
                        <div className="row mx-0">
                            <div className="col-12">
                                <h6 className="font-weight-bold mb-2">{t('create_container')}</h6>
                                <p>{t('view_container_modal')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default (withTranslation('common')(ConfirmationContainerCreate));
