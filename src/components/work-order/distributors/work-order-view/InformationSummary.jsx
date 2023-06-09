import React, {Component} from 'react';
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import PriceInfo from './workOrderComponents/PriceInfo';
import AddedOrderItem from './workOrderComponents/AddedOrderItem';
import LocationCard from '../../../common-component/LocationCard';
import OrderTrackingTimline from '../../../common-component/OrderTrackingTimline';

class InformationSummary extends Component {

    render() {
        const {t, data} = this.props;
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
                                            {!this.props.invoice &&
                                            <OrderTrackingTimline delivery_status={loc.all_tickets_generated}/>}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="col-12 col-lg-8 offset-lg-1 col-md-12 col-sm-6 pr-0 padding-responsive-right">
                                    {loc.group && loc.group.map((d, index) =>
                                        <AddedOrderItem key={index} groupCheckbox={false} itemCheckbox={false}
                                                        invoice={this.props.invoice}
                                                        index={index} data={d}/>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(InformationSummary));
