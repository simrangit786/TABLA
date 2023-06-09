import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {Image as Images} from "../../../Images";
import {history} from "../../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../../controller/routes";
import {methods, profiles} from "../../../../controller/Global";
import {withTranslation} from "react-i18next";

class ConfirmationClientCreateWorkorder extends Component {
    render() {
        const {t} = this.props;
        return (
            <Modal
                style={{top: '26%'}}
                title={t('workorder_create_confirm_title')}
                visible={this.props.visible}
                closable={false}
                footer={[
                    <React.Fragment>
                        <Button className="text-uppercase" onClick={this.props.onClose}>{t('no')}</Button>
                        <Button className="text-uppercase" type="primary"
                                onClick={() => history.push(reverse(routes.dashboard.profiles.distributor.method, {
                                    method: methods.create,
                                    type: profiles.distributor
                                }))}>{t('yes')}</Button>
                    </React.Fragment>
                ]}
                width="40%"
                className="tabs-modal-exit profile-modal"
            >
                <div className="row mx-0">
                    <div className="check-icon float-left">
                        <img src={Images.alert_new} alt="check-icon" className="img-fluid"/>
                    </div>
                    <div className="check-text-details float-left">
                        <div className="row mx-0">
                            <div className="col-12">
                                <h6 className="font-weight-bold mb-2">{t('client_conformation_work')}</h6>
                                <p>{t('work_confirm_text')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default (withTranslation('common')(ConfirmationClientCreateWorkorder));

// onClick={}