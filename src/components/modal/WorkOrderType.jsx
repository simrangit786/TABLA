import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {Image as Images} from "../Images";
import {history} from "../../controller/history";
import {withTranslation} from "react-i18next";
import {reverse} from "named-urls";
import {routes} from "../../controller/routes";
import {methods, profiles} from "../../controller/Global";

class WorkOrderType extends Component {
    handleClick = (key) => {
        history.push(reverse(routes.dashboard.sales.work_order.method, {
            type: key,
            method: methods.create
        }));
        this.props.onClose();
    };

    render() {
        const {t} = this.props;
        return (
            <Modal
                style={{top: '8%'}}
                title={t('ordr_type')}
                visible={this.props.visible}
                onOk={this.props.onClose}
                onCancel={this.props.onClose}
                width="26%"
                className="tabs-modal-exit confirm-modal-main"
                footer={false}
            >
                <div className="row mx-0 work-order-type-row">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon close-header-second w-auto flex-align-center-center px-2 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0">
                        <Button type="primary" className="active"
                                onClick={() => this.handleClick(profiles.distributor)}>
                            <img className="img-fluid" alt="supplier-icon" src={Images.distributors_white_icon}/>
                            <span> {t('nav.distributor')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.supplier_white_icon}/>
                            <span> {t('supplier')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.qc_white_icon}/>
                            <span> QC</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.agent_white_icon}/>
                            <span>{t('nav.sales_agent')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.director_white_icon}/>
                            <span> {t('nav.director')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.vendor_white_icon}/>
                            <span> {t('nav.vendor')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.e_commerce_white_icon}/>
                            <span> E-commerce</span>
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default (withTranslation('common')(WorkOrderType));
