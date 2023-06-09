import React, {Component} from 'react';

class CouponInformation extends Component {
    render() {
        const {variant, t} = this.props;
        return (
            <React.Fragment>
                <div className="col-12 mt-3 py-2">
                    <h5 className="font-weight-bold mb-3">{t('Coupon')}</h5>
                </div>
                <div className="col-12 px-0">
                    <div className="row card-details-general-row py-2">
                        <div className="col-lg-4 col-sm-12 col-12 col-md-4">
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item width-100-tab w-50 m-0">{t('quantity')} :</li>
                                <li className="list-inline-item width-100-tab w-50 m-0">
                                    <span className="text-success">{variant.coupon_quantity || 'N/A'} </span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-12 col-md-4">
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item width-100-tab w-50 m-0">{t('price')} €:</li>
                                <li className="list-inline-item width-100-tab w-50 m-0">
                                    <span>{variant.coupon_price || 'N/A'}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-12 col-md-4">
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item width-100-tab w-50 m-0">{t('item_discount_percent')}:</li>
                                <li className="list-inline-item width-100-tab w-50 m-0">
                                    <span>{variant.coupon_price ? `${((variant.coupon_price / variant.price) * 100).toFixed(2)} %` : 'N/A'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CouponInformation;
