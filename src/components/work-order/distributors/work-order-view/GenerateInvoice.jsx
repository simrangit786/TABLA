import React, {Component} from 'react';
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import PriceInfo from './workOrderComponents/PriceInfo';
import AddedOrderItem from './workOrderComponents/AddedOrderItem';
import LocationCard from '../../../common-component/LocationCard';
import OrderTrackingTimline from '../../../common-component/OrderTrackingTimline';
import {workorder_view_state} from '../../../../controller/Global';
import {Button, message} from "antd";
import {generateInvoicePost} from '../../../../controller/API/salesOperationAPI'
import {withRouter} from "react-router-dom";
import {routes} from "../../../../controller/routes";
import {reverse} from "named-urls";

class GenerateInvoice extends Component {
    state = {
        checkedItems: [],
        loading: false,
        InvoiceCM: ""
    };
    submitInvoice = () => {
        const {checkedItems, InvoiceCM} = this.state;
        const {t} = this.props;
        this.setState({loading: true});
        if (checkedItems.length > 0) {
            generateInvoicePost({groups: checkedItems, message: InvoiceCM})
                .then(response => {
                    this.props.history.push(reverse(
                        routes.dashboard.sales.invoice, {
                            type: this.props.match.params.type,
                            workorderId: this.props.match.params.id,
                            id: response.data.data.id
                        }
                    ))
                }).catch(
                err => {
                    if (err.response) {
                        Object.keys(err.response.data).forEach((e) => {
                            message.error(`${err.response.data[e]}`);
                            this.setState({loading: false});
                        })
                    }
                }
            )
        } else {
            this.setState({loading: false});
            message.info(t('invoice_generate_validation_minimun'))
        }
    };

    getCheckedList = (values, group_id) => {
        let objArray = [...this.state.checkedItems];
        const checkGroup = objArray.findIndex(item => item.group_id === group_id);
        if (checkGroup !== -1) {
            objArray[checkGroup].items = values;
        } else {
            let objSingle = {group_id: group_id, items: values};
            objArray.push(objSingle);
        }
        this.setState({checkedItems: objArray});
    };

    InvoiceCMMessage = (e) => {
        this.setState({InvoiceCM: e.target.value})
    }

    render() {
        const {t, data} = this.props;
        const {loading} = this.state;
        return (
            <React.Fragment>
                <div className="information-summary-work-order">
                    <div className="step-info-div">
                        <PriceInfo InvoiceCMMessage={this.InvoiceCMMessage} {...this.props} invoiceCredit/>
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
                                        <AddedOrderItem key={index}
                                                        groupCheckbox={this.props.current_screen === workorder_view_state.generate_invoice && d.items.some(o => !o.invoice_generated)}
                                                        invoice={true}
                                                        getCheckedList={(values, group_id) => this.getCheckedList(values, group_id)}
                                                        itemCheckbox={this.props.current_screen === workorder_view_state.generate_invoice && d.items.some(o => !o.invoice_generated)}
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
                        <Button loading={loading} onClick={this.submitInvoice} htmlType="button"
                                className="text-uppercase">{'GENERER UNE FACTURE POUR CES ARTICLES'}</Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(withRouter(GenerateInvoice)));
