import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {Image as Images} from "../../Images";

class ConfirmationUpdateAddress extends Component {
    render() {
        return (
            <Modal
                style={{top: '26%'}}
                title="CONFIRMATION Du Bon De Commande"
                visible={this.props.visible}
                footer={[
                    <Button onClick={this.props.onClose}>Okay</Button>
                ]}
                width="40%"
                className="tabs-modal-exit profile-modal confirm-modal-main"
            >
                <div className="row mx-0">
                    <div className="check-icon float-left">
                        <img src={Images.check_icon} alt="check-icon" className="img-fluid"/>
                    </div>
                    <div className="check-text-details float-left">
                        <div className="row mx-0">
                            <div className="col-12">
                                <h6 className="font-weight-bold mb-2">New Address had been added to (Client Name)</h6>
                                <p>Votre commande est enregistrée. Pour voir les détails, mettre à jour ou modifier,
                                    sélectionner Voir le bon de commande. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ConfirmationUpdateAddress;