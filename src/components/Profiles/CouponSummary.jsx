import React, {Component} from 'react';
import ProfileSidebar from "../sidebar/profile/DistributorProfileSidebar";
import {Icon, Switch, Table} from "antd";
import {Image as Images} from "../Images";

class CouponSummary extends Component {
    columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Work Order Number',
            dataIndex: 'work_order_number',
        },
        {
            title: 'Total Before Coupon Reduction',
            dataIndex: 'total_before_coupon_reduction',
        }, {
            title: 'Total Coupon Reduction',
            dataIndex: 'coupon_reduction',
        }, {
            title: 'Total Amount Billed',
            dataIndex: 'amount_billed',
        }, {
            title: 'Payment Status',
            dataIndex: 'payment_status',
        },
    ];
    data = [
        {
            key: '1',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            total_before_coupon_reduction: '$300,00',
            coupon_reduction: '$25.00',
            amount_billed: '$75.00',
            payment_status: 'N/A',
        },
        {
            key: '2',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            total_before_coupon_reduction: '$300,00',
            coupon_reduction: '$25.00',
            amount_billed: '$75.00',
            payment_status: 'N/A',
        },
        {
            key: '3',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            total_before_coupon_reduction: '$300,00',
            coupon_reduction: '$25.00',
            amount_billed: '$75.00',
            payment_status: 'N/A',
        }, {
            key: '4',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            total_before_coupon_reduction: '$300,00',
            coupon_reduction: '$25.00',
            amount_billed: '$75.00',
            payment_status: 'N/A',
        }, {
            key: '5',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            total_before_coupon_reduction: '$300,00',
            coupon_reduction: '$25.00',
            amount_billed: '$75.00',
            payment_status: 'N/A',
        }, {
            key: '6',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            total_before_coupon_reduction: '$300,00',
            coupon_reduction: '$25.00',
            amount_billed: '$75.00',
            payment_status: 'N/A',
        },
    ];

    render() {
        return (
            <React.Fragment>
                <div id="main-content" className="main-content-div float-right position-relative mt-5">
                    <div className="container-fluid h-100">
                        <div className="row clearfix all-common-steps-row h-100">
                            <div className="steps-right-side-div dashboard-inner-second bg-white float-right">
                                <ProfileSidebar {...this.props}/>
                                <div className="profile-summary-details-row">
                                    <div className="col-12">
                                        <div className="row summary-info-row mx-0">
                                            <div className="col-12 mb-4">
                                                <h5 className="text-uppercase font-weight-bold">COUPON SUMMARY</h5>
                                            </div>
                                            <div className="col-12">
                                                <div className="card shadow-none card-coupon-summary bg-white">
                                                    <div className="card-body p-0">
                                                        <div className="row mx-0 coupon-info-row">
                                                            <div className="coupon-info-details float-left">
                                                                <h6 className="text-uppercase font-weight-bold mb-4">COUPON
                                                                    INFORMATION</h6>
                                                                <ul className="list-inline mb-0 w-100">
                                                                    <li className="list-inline-item m-0 w-50 float-left">Name
                                                                        :
                                                                    </li>
                                                                    <li className="list-inline-item m-0 w-50 float-left">
                                                                        <span>Coupon Name</span></li>
                                                                </ul>
                                                                <ul className="list-inline mb-0 w-100">
                                                                    <li className="list-inline-item  m-0 w-50 float-left">Coupon
                                                                        Type :
                                                                    </li>
                                                                    <li className="list-inline-item  m-0 w-50 float-left">
                                                                        <span>Work Order</span></li>
                                                                </ul>
                                                                <ul className="list-inline mb-0 w-100">
                                                                    <li className="list-inline-item  m-0 w-50 float-left">Discount
                                                                        :
                                                                    </li>
                                                                    <li className="list-inline-item  m-0 w-50 float-left">
                                                                        <span>$100.00</span></li>
                                                                </ul>
                                                                <ul className="list-inline mb-0 w-100">
                                                                    <li className="list-inline-item m-0 w-50 float-left">Expiration
                                                                        Date
                                                                    </li>
                                                                    <li className="list-inline-item m-0 w-50 float-left">
                                                                        <span>mm/dd/yyyy</span></li>
                                                                </ul>
                                                                <ul className="list-inline mb-0 w-100">
                                                                    <li className="list-inline-item m-0 w-50 float-left">Spend
                                                                        :
                                                                    </li>
                                                                    <li className="list-inline-item m-0 w-50 float-left"><span>$75 min/ $50
                                                                        max</span>
                                                                    </li>
                                                                </ul>
                                                                <ul className="list-inline mb-0 w-100">
                                                                    <li className="list-inline-item m-0 w-50 float-left">Coupon
                                                                        Quantity:
                                                                    </li>
                                                                    <li className="list-inline-item m-0 w-50 float-left">
                                                                        <span>N/A</span></li>
                                                                </ul>
                                                                <ul className="list-inline mb-0 w-100">
                                                                    <li className="list-inline-item m-0 w-50 float-left">Usage
                                                                        Limit per
                                                                        Profile:
                                                                    </li>
                                                                    <li className="list-inline-item m-0 w-50 float-left">
                                                                        <span>N/A</span></li>
                                                                </ul>
                                                                <ul className="list-inline mb-0 w-100">
                                                                    <li className="list-inline-item m-0 w-50 float-left">Coupon
                                                                        Merge
                                                                        Limit
                                                                    </li>
                                                                    <li className="list-inline-item m-0 w-50 float-left"><span>Individual Use
                                                                        Only</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="coupon-recipient-tag float-left">
                                                                <div className="col-12">
                                                                    <p className="mb-1">Coupon Recipient</p>
                                                                    <h6 className="mb-0">Profile Name</h6>
                                                                    <div className="on-off-recipient-div mt-4">
                                                                        <p className="mb-1">On/Off for Recipient</p>
                                                                        <div className="w-100">
                                                                            <Switch
                                                                                checkedChildren={<Icon type="check"/>}
                                                                                unCheckedChildren={<Icon type="close"/>}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="my-4 w-100">
                                                                        <p className="mb-1">Usage</p>
                                                                        <h6 className="mb-0">25</h6>
                                                                    </div>
                                                                    <div className="w-100">
                                                                        <p className="mb-1">Total Coupon Reduction</p>
                                                                        <h6 className="mb-0">$2500.00</h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="row mx-0 item-heading mt-4 pt-3 mb-3">
                                                    <div className="col-12">
                                                        <h5 className="text-uppercase flex-align-center font-weight-bold">
                                                            <img src={Images.item_icon_small} className="img-fluid"
                                                                 alt="item icon"/>
                                                            <span className="ml-2">ITEMS</span>
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="row mx-0 item-card-div mb-2">
                                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                                        <div className="item-card-inner w-100 d-inline-block">
                                                            <div
                                                                className="item-card-img float-left flex-align-center-center h-100">
                                                                <img src={Images.parka_img} alt="img chair"
                                                                     className="img-fluid"/>
                                                            </div>
                                                            <div className="item-card-content float-left">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <h5 className="text-capitalize">Parka</h5>
                                                                        <p className="font-weight-normal">BC.FUR-MR</p>
                                                                    </div>
                                                                    <div
                                                                        className="col-md-6 col-lg-6 col-12 col-sm-12 d-flex align-items-end">
                                                                        <p className="font-weight-normal mb-0"><span
                                                                            className="color-tag rounded-circle d-inline-block"/>Navy
                                                                            Blue</p>
                                                                    </div>
                                                                    <div className="col-md-6 col-lg-6 col-12 col-sm-12">
                                                                        <div className="price-card">
                                                                            <span
                                                                                className="d-inline-block w-100 text-right">$125.95</span>
                                                                            <h6 className="mb-0 font-weight-bold text-right">$62.98</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                                        <div className="item-card-inner w-100 d-inline-block">
                                                            <div
                                                                className="item-card-img float-left flex-align-center-center h-100">
                                                                <img src={Images.jenna_img} alt="img chair"
                                                                     className="img-fluid"/>
                                                            </div>
                                                            <div className="item-card-content float-left">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <h5 className="text-capitalize">jeena</h5>
                                                                        <p className="font-weight-normal">BC.FUR-MR</p>
                                                                    </div>
                                                                    <div
                                                                        className="col-md-6 col-lg-6 col-12 col-sm-12 d-flex align-items-end">
                                                                        <p className="font-weight-normal mb-0"><span
                                                                            className="color-tag rounded-circle d-inline-block"/>Navy
                                                                            Blue</p>
                                                                    </div>
                                                                    <div className="col-md-6 col-lg-6 col-12 col-sm-12">
                                                                        <div className="price-card">
                                                                            <span
                                                                                className="d-inline-block w-100 text-right">$125.95</span>
                                                                            <h6 className="mb-0 font-weight-bold text-right">$62.98</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <div className="row mx-0 heading-summary p-3 mt-2">
                                                    <h6 className="mb-0 font-weight-bold text-uppercase">USAGE</h6>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div
                                                    className="listing-table table-responsive billing-table-div mt-2 mb-0">
                                                    <Table
                                                        className="responsive-table table table-hover table-custom"
                                                        columns={this.columns}
                                                        dataSource={this.data}
                                                        pagination={true}
                                                        size="middle"
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CouponSummary;