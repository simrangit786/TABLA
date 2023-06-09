import React, {Component} from 'react';
import {Button, Modal} from "antd";
import {Image as Images} from "../Images";
import {history} from "../../controller/history";
import {withTranslation} from "react-i18next";

class ProfileType extends Component {

    groupImageRef = React.createRef();
    entityImageRef = React.createRef()
    handleClick = (key) => {
        history.push(`/dashboard/profiles/${key}/create/`);
        this.props.onClose();
    };

    render() {
        const {t} = this.props;
        return (
            <Modal
                style={{top: '8%'}}
                title={t('profile_type')}
                visible={this.props.visible}
                onOk={this.props.onClose}
                onCancel={this.props.onClose}
                maskClosable={false}
                width="26%"
                className="tabs-modal-exit confirm-modal-main"
                footer={false}
            >
                <div className="row mx-0 work-order-type-row">

                    <Button onClick={this.props.onClose}
                            className="close-header-icon close-header-second w-auto flex-align-center-center px-2 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>{t('close')}</div>
                    </Button>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0">
                        <Button
                            onMouseOver={() => console.log(this.groupImageRef.current.src = Images.profile_group_hover)}
                            onMouseOut={() => console.log(this.groupImageRef.current.src = Images.profile_group_default)}
                            onClick={() => this.handleClick("groups")} type="primary"
                            className="active active-header">
                            <img ref={this.groupImageRef} className="img-fluid" alt="supplier-icon"
                                 src={Images.profile_group_default}/>
                            <span> {t('Group')}</span>
                        </Button>
                        <Button onClick={() => this.handleClick("distributor")} type="primary"
                                className="active active-header">
                            <img className="img-fluid" alt="supplier-icon" src={Images.distributors_white_icon}/>
                            <span> {t('nav.distributor')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.supplier_white_icon}/>
                            <span>{t('supplier')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.qc_white_icon}/>
                            <span> QC</span>
                        </Button>
                        <Button onClick={() => this.handleClick("representative")} type="primary"
                                className="active active-header">
                            <img className="img-fluid" alt="supplier-icon" src={Images.agent_white_icon}/>
                            <span className="header-text-main">{t('represent')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.director_white_icon}/>
                            <span>{t('nav.director')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.vendor_white_icon}/>
                            <span> {t('nav.vendor')}</span>
                        </Button>
                        <Button>
                            <img className="img-fluid" alt="supplier-icon" src={Images.e_commerce_white_icon}/>
                            <span> E-commerce</span>
                        </Button>
                        <Button
                            onMouseOver={() => console.log(this.entityImageRef.current.src = Images.reprsentative_hover)}
                            onMouseOut={() => console.log(this.entityImageRef.current.src = Images.represntative_white_icon)}
                            onClick={() => this.handleClick("entity")} type="primary"
                            className="active active-header">
                            <img ref={this.entityImageRef} className="img-fluid" alt="supplier-icon"
                                 src={Images.represntative_white_icon}/>
                            <span> {t('entity')}</span>
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default (withTranslation('common')(ProfileType));
