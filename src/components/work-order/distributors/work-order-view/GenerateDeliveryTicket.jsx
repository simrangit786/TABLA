import React, {Component} from 'react';
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import PriceInfo from './workOrderComponents/PriceInfo';
import AddedOrderItem from './workOrderComponents/AddedOrderItem';
import LocationCard from '../../../common-component/LocationCard';
import OrderTrackingTimline from '../../../common-component/OrderTrackingTimline';
import {Button, message} from "antd";
import {generateDeliveryTicketPost} from "../../../../controller/API/salesOperationAPI";
import ConfirmPopup from "../../../modal/ConfirmPopup";
import {showErrors} from "../../../../controller/utils";

class GenerateDeliveryTicket extends Component {
    state = {
        checkedItems: [],
        loading: false,
        confirmVisible: false
    };

    handleConfirmPopup = (confirmVisible) => {
        const {checkedItems} = this.state;
        const {t} = this.props;
        if (checkedItems.length === 0) {
            message.info(t('delivery_ticket_validation_minimun'))
        } else {
            this.setState({confirmVisible})
        }
    };

    submitInvoice = (open_pdf) => {
        const {checkedItems} = this.state;
        const {t} = this.props;
        this.setState({loading: true});
        if (checkedItems.length > 0) {
            generateDeliveryTicketPost({groups: checkedItems})
                .then(response => {
                    message.success("Delivery Ticket generated successfully");
                    if (open_pdf) {
                        response.data.delivery_ticket_urls.map(url => window.open(url, '_blank'))
                    }
                    this.setState({loading: false, checkedItems: [], confirmVisible: false});
                    this.props.fetch();

                }).catch(
                err => {
                    this.setState({loading: false, confirmVisible: false});
                    showErrors(err.response.data)
                }
            )
        } else {
            this.setState({loading: false, confirmVisible: false});
            message.info(t('delivery_ticket_validation_minimun'))
        }


    };

    getCheckedList = (values, group_id) => {
        let objArray = [...this.state.checkedItems];
        const checkGroup = objArray.findIndex(item => item === group_id);
        if (checkGroup === -1) {
            objArray.push(group_id);
        } else {
            objArray.splice(checkGroup, 1);
        }
        this.setState({checkedItems: objArray});
    };

    render() {
        const {t, data} = this.props;
        const {loading, confirmVisible} = this.state;
        return (
            <React.Fragment>
                <div className="information-summary-work-order">
                    <div className="step-info-div">
                        <PriceInfo {...this.props} />
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
                                        <AddedOrderItem key={`item_${index}`} groupCheckbox={true}
                                                        getCheckedList={(values, group_id) => this.getCheckedList(values, group_id)}
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
                                className="text-uppercase">{t('generate_dilevery_ticket_submit')}</Button>
                    </div>
                </div>
                {confirmVisible && <ConfirmPopup
                    onOk={() => this.submitInvoice(true)}
                    width="47%"
                    image={Images.check_icon}
                    onCancel={() => this.submitInvoice(false)}
                    okText={"VOIR BON DE LIVRAISON"}
                    cancelText={"Ok"}
                    title={"CONFIRMATION DU DEMANDE DE LIVRAISON"}
                    description={"Livraison demandée !"}
                    small_description={" Livraison demandée. Pour voir, sélectionner ‘Voir bon de livraison’. Pour retourner à bon de commande, sélectionner ‘OK’."}
                />
                }
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(GenerateDeliveryTicket));
