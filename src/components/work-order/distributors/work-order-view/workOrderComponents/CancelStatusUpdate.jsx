import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {withTranslation} from "react-i18next";

class CancelStatusUpdate extends Component {
    onYes = () => {
        this.props.changeStatus("cancel")
        this.props.close()
    }

    onNo = () => {
        this.props.close()
    }

    render() {
        const {t} = this.props;
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.close}
                width="45%"
                className="tabs-modal-exit profile-modal confirm-popup confirm-modal-main"
                title={
                    <div className="custom-header-modal">
                        <h4>{"annuler le bon de commande du distributeur"}</h4>
                    </div>
                }
                footer={[
                    <Button key="back" onClick={this.onYes}>{t('yes')}</Button>,
                    <Button key="submit" type="primary" onClick={this.onNo}>{t('cancel')}</Button>]
                }>
                <div className="row mx-0">
                    <div className="check-text-details float-left">
                        <div className="row mx-0">
                            <div className="col-12">
                                <h6
                                    className="font-weight-bold mb-2">Êtes-vous sûr de vouloir annuler ce bon de
                                    commande du distributeur ?</h6>
                                <p>Vous ne pouvez pas annuler cette action. Si vous ne souhaitez pas poursuivre cette
                                    action, cliquez sur "Annuler".</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default withTranslation('common')(CancelStatusUpdate);
