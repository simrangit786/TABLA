import React, {Component} from 'react';
import {Button, Table} from "antd";
import {Image as Images} from "../../../../../Images"
import ChartView from "./ChartView";
import {withTranslation} from "react-i18next";

class BillingSummary extends Component {

    getColumns = () => {
        const {t} = this.props
        return [
            {
                title: t('date'),
                dataIndex: 'date',
            },
            {
                title: t('work_order_num'),
                dataIndex: 'work_order_number',
            },
            {
                title: t('total_amt'),
                dataIndex: 'amount_billed',
            }, {
                title: t('total_coupon_reduction'),
                dataIndex: 'coupon_reduction',
            }, {
                title: t('total_promo_reduction'),
                dataIndex: 'promotion_reduction',
            }, {
                title: t('payment_mthd'),
                dataIndex: 'payment_method',
            }, {
                title: t('status_pay'),
                dataIndex: 'payment_status',
            },
        ];
    }
    dataBilling = [
        {
            key: '1',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        },
        {
            key: '2',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        },
        {
            key: '3',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        }, {
            key: '4',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        }, {
            key: '5',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        }, {
            key: '6',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        }, {
            key: '7',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        }, {
            key: '8',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        }, {
            key: '9',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        }, {
            key: '10',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            amount_billed: '$300,00',
            coupon_reduction: '$75,00',
            promotion_reduction: '$75,00',
            payment_method: 'LCR',
            payment_status: 'N/A',
        },
    ];

    render() {
        const {t} = this.props
        return (
            <React.Fragment>
                <div className="row summary-info-row mx-0">
                    <div className="col-12 p-0">
                        <div className="row mx-0 w-100 mb-4 flex-align-center-between">
                            <h6 className="text-uppercase font-weight-bold mb-0">{t('billing_summary')}</h6>
                            <div className="grid-list-view-div flex-align-center">
                                <Button
                                    className="bg-transparent border-0 active p-0 text-uppercase flex-align-center mr-3">
                                    <span className="img-span position-relative">
                                        <img src={Images.list_view_icon_primary}
                                             className="img-fluid primary-img position-absolute m-auto"
                                             alt="list-view-icon"/>
                                        <img src={Images.list_view_icon_gray} className="img-fluid secondary-img"
                                             alt="list-view-icon"/>
                                    </span>
                                    <span className="text-span">{t('list_display')}</span>
                                </Button>
                                <Button className="bg-transparent border-0 p-0 text-uppercase flex-align-center">
                                    <span className="img-span position-relative float-left">
                                        <img src={Images.graph_view_primary}
                                             className="img-fluid primary-img position-absolute m-auto"
                                             alt="list-view-icon"/>
                                        <img src={Images.graph_view_gray} className="img-fluid secondary-img"
                                             alt="list-view-icon"/>
                                    </span>
                                    <span className="text-span float-left d-inline-block">{t('chart_view')} </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <ChartView/>
                    <div className="col-12 p-0">
                        <div className="row mx-0 heading-summary p-3 mt-2">
                            <h6 className="mb-0 font-weight-bold">{t('billing')}</h6>
                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <div className="listing-table table-responsive billing-table-div mt-2 mb-0">
                            <Table
                                className="responsive-table table table-hover table-custom"
                                columns={this.getColumns()}
                                dataSource={this.dataBilling}
                                pagination={true}
                                size="middle"
                            />

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(BillingSummary));