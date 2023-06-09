import React, {Component} from 'react';
import {isAccessible} from "../../../../utils";

class InventoryInformation extends Component {
    render() {
        const {variant, t} = this.props;
        return (
            <div className="col-12 px-0">
                <div className="row card-details-general-row py-2">
                    <div className="col-lg-6 col-sm-12 col-12 col-md-6">
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item width-100-tab w-50 m-0">{t('in_stock')} :</li>
                            <li className="list-inline-item width-100-tab w-50 m-0">
                                {isAccessible(['admin'], true) ?
                                    <i style={{color: `${variant.in_stock > 0 ? 'green' : 'red'}`}}
                                       className="fa fa-circle"/>
                                    : <span className="text-success">{variant.in_stock} articles </span>}

                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-12 col-md-6">
                        <ul className="list-inline mb-0 w-100">
                            <li className="list-inline-item width-100-tab w-50 m-0">{t('transit')} :</li>
                            <li className="list-inline-item width-100-tab w-50 m-0">
                                {isAccessible(['admin'], true) ?
                                    <i style={{color: `${variant.in_transit > 0 ? 'green' : 'red'}`}}
                                       className="fa fa-circle"/>
                                    : <span>{variant.in_transit} articles</span>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default InventoryInformation;