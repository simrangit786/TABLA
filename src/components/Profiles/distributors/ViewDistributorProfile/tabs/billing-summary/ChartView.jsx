import React, {Component} from 'react';
import {Image as Images} from "../../../../../Images"

class ChartView extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-12">
                    <div className="row mx-0 w-100 justify-content-center mb-5">
                        <img src={Images.graph_view_rounded} alt="graph" className="img-fluid"/>
                    </div>
                    <div className="graph-data-row row mx-0 flex-align-center-between mb-5">
                        <div className="billing-details-card">
                            <h6 className="mb-0 text-dark font-weight-bold">None</h6>
                            <p className="mb-0">Total Amount Pending</p>
                        </div>
                        <div className="billing-details-card">
                            <h6 className="mb-0 text-dark font-weight-bold">$6000.00</h6>
                            <p className="mb-0 flex-align-center"><span
                                className="color-card primary-card d-inline-block mr-1"/>Total Amount Paid</p>
                        </div>
                        <div className="billing-details-card">
                            <h6 className="mb-0 text-dark font-weight-bold">$1700.00</h6>
                            <p className="mb-0 flex-align-center"><span
                                className="color-card orange-card d-inline-block mr-1"/>Total Coupon Reduction</p>
                        </div>
                        <div className="billing-details-card">
                            <h6 className="mb-0 text-dark font-weight-bold">$1450.00</h6>
                            <p className="mb-0 flex-align-center"><span
                                className="color-card yellow-card d-inline-block mr-1"/>Total Promotion Reduction</p>
                        </div>
                        <div className="billing-details-card">
                            <h6 className="mb-0 text-dark font-weight-bold">$9150.00</h6>
                            <p className="mb-0">Total Before Reductions</p>
                        </div>
                    </div>
                    <div className="row mx-0 w-100 mb-5">
                        <img src={Images.graph_grid} alt="grid-graph" className="img-fluid"/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ChartView;