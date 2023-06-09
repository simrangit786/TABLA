import React, {Component} from 'react';
import {Table} from "antd";

class ListView extends Component {
    columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Total Coupon Reduction',
            dataIndex: 'coupon',
        }, {
            title: 'Total Promotion Reduction',
            dataIndex: 'promotion',
        }, {
            title: 'Total Before Reductions',
            dataIndex: 'before',
        },
        {
            title: 'Total Amount Paid',
            dataIndex: 'paid',
        },
    ];
    data = [
        {
            key: '1',
            date: '01/2020',
            paid: '$1500.00',
            coupon: '$250.00',
            promotion: '$250.00',
            before: '$2000.00',
        },
        {
            key: '2',
            date: '01/2020',
            paid: '$1500.00',
            coupon: '$250.00',
            promotion: '$250.00',
            before: '$2000.00',
        },
        {
            key: '3',
            date: '01/2020',
            paid: '$1500.00',
            coupon: '$250.00',
            promotion: '$250.00',
            before: '$2000.00',
        }, {
            key: '4',
            date: '01/2020',
            paid: '$1500.00',
            coupon: '$250.00',
            promotion: '$250.00',
            before: '$2000.00',
        }, {
            key: '5',
            date: '01/2020',
            paid: '$1500.00',
            coupon: '$250.00',
            promotion: '$250.00',
            before: '$2000.00',
        },
    ];

    render() {
        return (
            <React.Fragment>
                <div className="col-12">
                    <div className="row mx-0 flex-align-center-between w-100 mb-4 mt-2">
                        <div className="billing-details-card">
                            <p>Total Reduction</p>
                            <h6 className="mb-0 text-dark font-weight-bold">$3100.00</h6>
                        </div>
                        <div className="billing-details-card">
                            <p>Total Coupon Reduction</p>
                            <h6 className="mb-0 text-dark font-weight-bold">$1700.00</h6>
                        </div>
                        <div className="billing-details-card">
                            <p>Total Promotion Reduction</p>
                            <h6 className="mb-0 text-dark font-weight-bold">$1450.00</h6>
                        </div>
                        <div className="billing-details-card">
                            <p>Total Before Reductions</p>
                            <h6 className="mb-0 text-dark font-weight-bold">$9150.00</h6>
                        </div>
                        <div className="billing-details-card">
                            <p>Total Amount Paid</p>
                            <h6 className="mb-0 text-dark font-weight-bold">$6000.00</h6>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row mx-0 heading-summary p-3 mt-2">
                        <h6 className="mb-0 font-weight-bold">LAST 6 MONTHS</h6>
                    </div>
                </div>
                <div className="col-12">
                    <div className="listing-table table-responsive billing-table-div mt-2 mb-5">
                        <Table
                            className="responsive-table table table-hover table-custom"
                            columns={this.columns}
                            dataSource={this.data}
                            pagination={false}
                            size="middle"
                        />

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ListView;