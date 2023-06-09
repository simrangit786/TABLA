import React, {Component} from 'react';
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import PriceInfo from './workOrderComponents/PriceInfo';
import LocationCard from '../../../common-component/LocationCard';
import OrderTrackingTimline from '../../../common-component/OrderTrackingTimline';
import {Button, message} from "antd";
import {generateCreditPDFPost} from "../../../../controller/API/salesOperationAPI";
import ConfirmPopup from "../../../modal/ConfirmPopup";
import {showErrors} from "../../../../controller/utils";
import AddedOrderItemCredit from "./workOrderComponents/WorkOrderCredit/AddedOrderItemCredit";

class GenerateCredit extends Component {
    state = {
        checkedItems: [],
        loading: false,
        confirmVisible: false,
        CreditCM: ""
    };

    handleConfirmPopup = (confirmVisible) => {
        const {checkedItems} = this.state;
        const {t} = this.props;
        if (checkedItems.length === 0) {
            message.info(t('generate_credit_validation_minimum'))
        } else {
            this.setState({confirmVisible})
        }
    };

    submitCredit = (open_pdf) => {
        const {checkedItems, CreditCM} = this.state;
        const {t} = this.props;
        this.setState({loading: true});
        if (checkedItems.length > 0)
            generateCreditPDFPost({groups: checkedItems, message: CreditCM})
                .then(response => {
                    message.success("Credit PDF generated successfully");
                    if (open_pdf) {
                        window.open(response.data.credit_url, '_blank')
                    }
                    this.setState({loading: false, checkedItems: [], confirmVisible: false});
                    this.props.fetch();
                }).catch(
                err => {
                    this.setState({loading: false, confirmVisible: false});
                    showErrors(err.response.data)
                }
            )
        else {
            this.setState({loading: false, confirmVisible: false});
            message.info(t('generate_credit_validation_minimum'))
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

    CreditCMMessage = (e) => {
        this.setState({CreditCM: e.target.value})
    }

    render() {
        const {t, data} = this.props;
        const {loading, confirmVisible} = this.state
        return (
            <React.Fragment>
                <div className="information-summary-work-order">
                    <div className="step-info-div">
                        <PriceInfo CreditCMMessage={this.CreditCMMessage}{...this.props} credit/>
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
                                        <AddedOrderItemCredit key={`item_${index}`} groupCheckbox={true}
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
                                className="text-uppercase">{"GÉNÉRER UN AVOIR"}</Button>
                    </div>
                </div>
                {confirmVisible && <ConfirmPopup
                    onOk={() => this.submitCredit(true)}
                    width="47%"
                    image={Images.check_icon}
                    onCancel={() => this.submitCredit(false)}
                    okText={"VOIR AVOIR"}
                    cancelText={"Ok"}
                    title={"CONFIRMATION De CRÉATION D’AVOIR"}
                    description={"Votre avoir a été créé !"}
                    small_description={"Avoir a été créé. Pour voir les détails, mettre à jour ou modifier, sélectionner ‘Voir avoir’."}
                />
                }
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(GenerateCredit));
