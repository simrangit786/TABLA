import React, {Component} from 'react';
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import PriceInfo from './workOrderComponents/PriceInfo';
import LocationCard from '../../../common-component/LocationCard';
import OrderTrackingTimline from '../../../common-component/OrderTrackingTimline';
import {Button, message} from "antd";
import {generateSAVPDFPost} from "../../../../controller/API/salesOperationAPI";
import ConfirmPopup from "../../../modal/ConfirmPopup";
import AddedOrderItemSAV from "./workOrderComponents/WorkOrderSAV/AddedOrderItemSAV";

class CreateSAV extends Component {
    state = {
        checkedItems: [],
        loading: false,
        confirmVisible: false,
        SAVcm: ""
    };

    handleConfirmPopup = (confirmVisible) => {
        const {checkedItems} = this.state;
        const {t} = this.props;
        if (checkedItems.length === 0) {
            message.info(t('create_sav_validation_minimum'))
        } else {
            this.setState({confirmVisible})
        }
    };

    submitSAV = (openpdf) => {
        const {checkedItems, SAVcm} = this.state;
        const {t} = this.props;
        this.setState({loading: true});
        if (checkedItems.length > 0) {
            generateSAVPDFPost({groups: checkedItems, message: SAVcm})
                .then(response => {
                    message.success("SAV generated successfully");
                    if (openpdf) {
                        window.open(response.data.sav_url, '_blank')
                    }
                    this.setState({loading: false, checkedItems: [], confirmVisible: false});
                    this.props.fetch();
                }).catch(
                err => {
                    if (err.response) {
                        Object.keys(err.response.data).forEach((e) => {
                            message.error(`${err.response.data[e]}`);
                        })
                    }
                    this.setState({loading: false});
                }
            )
        } else {
            this.setState({loading: false});
            message.info(t('create_sav_validation_minimum'))
        }
    };

    getCheckedList = (values, valuesWithComment, group_id) => {
        let objArray = [...this.state.checkedItems];
        const checkGroup = objArray.findIndex(item => item.group_id === group_id);
        let updatedValues = []
        values.forEach(item => {
            const obj = valuesWithComment.find(i => i.id === item)
            updatedValues.push({
                id: item,
                comment: obj?.comment || ""
            })
        })
        if (checkGroup !== -1) {
            objArray[checkGroup].items = updatedValues;
        } else {
            let objSingle = {group_id: group_id, items: updatedValues};
            objArray.push(objSingle);
        }
        this.setState({checkedItems: objArray});
    };
    SAVcmMessage = (e) => {
        this.setState({SAVcm: e.target.value})
    }

    render() {
        const {t, data} = this.props;
        const {loading, confirmVisible} = this.state;
        return (
            <React.Fragment>
                <div className="information-summary-work-order">
                    <div className="step-info-div">
                        <PriceInfo SAVcmMessage={this.SAVcmMessage} {...this.props} sav/>
                        {data.locations.map((loc, index) =>
                            <div key={`location_group_${index}`} className="row mx-0 shopping-address-details-row">
                                <div className="col-12 col-lg-3 col-md-12 col-sm-6 pl-0 padding-responsive-left">
                                    <div className="address-heading row mx-0">
                                        <h6 className="text-uppercase mb-0 flex-align-center">
                                            <img src={Images.delivery_gray_icon} alt="delivery icon"
                                                 className="img-fluid mr-3"/>
                                            <span>{t('shipping_address')}</span>
                                        </h6>
                                    </div>
                                    <div className="row shopping-address-cart">
                                        <div className="col-12 pr-0">
                                            <LocationCard data={loc}/>
                                            <OrderTrackingTimline/>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-12 col-lg-8 offset-lg-1 col-md-12 col-sm-6 pr-0 padding-responsive-right">
                                    {loc.group && loc.group.map((d, index) =>
                                        <AddedOrderItemSAV key={`item_${index}`} groupCheckbox={true}
                                                           getCheckedList={this.getCheckedList}
                                                           itemCheckbox={false}
                                                           index={index} data={d}/>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="footer-btn-all-fixed">
                    <div className="row mx-0 h-100 justify-content-end">
                        <Button className="text-uppercase" onClick={() => this.props.fetch()}>{t('cancel')}</Button>
                        <Button loading={loading} onClick={() => this.handleConfirmPopup(true)} type="primary"
                                className="text-uppercase">{"GÉNÉRER UN S.A.V."}</Button>
                    </div>
                </div>
                {confirmVisible && <ConfirmPopup
                    onOk={() => this.submitSAV(true)}
                    width="47%"
                    image={Images.check_icon}
                    onCancel={() => this.submitSAV(false)}
                    okText={"VOIR S.A.V."}
                    cancelText={"Ok"}
                    title={"CONFIRMATION De CRÉATION S.A.V."}
                    description={"Votre S.A.V. a été créé !"}
                    small_description={"S.A.V. a été créé. Pour voir les détails, mettre à jour ou modifier, sélectionner ‘Voir S.A.V.’"}
                />
                }
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(CreateSAV));
