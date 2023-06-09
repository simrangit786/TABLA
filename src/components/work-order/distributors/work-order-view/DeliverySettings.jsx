import React, {Component} from 'react';
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import PriceInfo from './workOrderComponents/PriceInfo';
import LocationCard from '../../../common-component/LocationCard';
import AddedItemWithCommade from '../../../common-component/AddedItemWithCommade'
import {Button} from "antd";

class DeliverySettings extends Component {

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
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-8 col-md-11 col-sm-6 pr-0 padding-responsive-right">
                                    <AddedItemWithCommade location={loc}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="footer-btn-all-fixed">
                    <div className="row mx-0 h-100 justify-content-end">
                        {/*<Button className="text-uppercase">Annuler</Button>*/}
                        <Button onClick={() => this.props.fetch()} type="primary"
                                className="text-uppercase">{t('back_to_workorder')}</Button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(DeliverySettings));
