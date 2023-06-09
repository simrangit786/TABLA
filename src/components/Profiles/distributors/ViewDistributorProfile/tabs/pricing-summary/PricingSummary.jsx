import React, {Component} from 'react';
import {Button, Icon, Switch, Table} from "antd";
import {Image as Images} from "../../../../../Images"
import ListView from "./ListView";
import {history} from "../../../../../../controller/history";
import {withTranslation} from "react-i18next";

class PricingSummary extends Component {
    data = [
        {
            key: '1',
            name: 'Name',
            type: 'Work Order',
            discount: '$100.00',
            spend: '$50 min/$75 max',
            items: 'N/A',
            total_usage: '25',
            expiration_date: 'mm/dd/yyyy',
            coupon_reduction: '$2500.00',
            on_off: <div>
                <Switch
                    checkedChildren={<Icon type="check"/>}
                    unCheckedChildren={<Icon type="close"/>}
                    defaultChecked
                />
            </div>,
        },
        {
            key: '2',
            name: 'Name',
            type: 'Item',
            discount: '$100.00',
            spend: 'No Limits',
            items: 'hgh.nbjvhv...',
            total_usage: '25/45',
            expiration_date: 'mm/dd/yyyy',
            coupon_reduction: '$2500.00',
            on_off: <div>
                <Switch
                    checkedChildren={<Icon type="check"/>}
                    unCheckedChildren={<Icon type="close"/>}
                    defaultChecked
                />
            </div>,
        },
        {
            key: '3',
            name: 'Name',
            type: 'Work Order',
            discount: '$100.00',
            spend: '$50 min/$75 max',
            items: 'N/A',
            total_usage: '25',
            expiration_date: 'mm/dd/yyyy',
            coupon_reduction: '$2500.00',
            on_off: <div>
                <Switch
                    checkedChildren={<Icon type="check"/>}
                    unCheckedChildren={<Icon type="close"/>}
                />
            </div>,
        }, {
            key: '4',
            name: 'Name',
            type: 'Item',
            discount: '50%',
            spend: '$50 min/$75 max',
            items: 'hgh.nbjvhv...',
            total_usage: '25/25',
            expiration_date: 'mm/dd/yyyy',
            coupon_reduction: '$2500.00',
            on_off: 'N/A'
        }, {
            key: '5',
            name: 'Name',
            type: 'Item',
            discount: '50%',
            spend: '$50 min/$75 max',
            items: 'hgh.nbjvhv...',
            total_usage: '25/25',
            expiration_date: 'NA',
            coupon_reduction: '$2500.00',
            on_off: 'N/A'
        }, {
            key: '6',
            name: 'Name',
            type: 'Item',
            discount: '50%',
            spend: '$50 min/$75 max',
            items: 'hgh.nbjvhv...',
            total_usage: '25/25',
            expiration_date: 'NA',
            coupon_reduction: '$2500.00',
            on_off: 'N/A'
        }, {
            key: '7',
            name: 'Name',
            type: 'Item',
            discount: '50%',
            spend: '$50 min/$75 max',
            items: 'hgh.nbjvhv...',
            total_usage: '25/25',
            expiration_date: 'NA',
            coupon_reduction: '$2500.00',
            on_off: 'N/A'
        }, {
            key: '8',
            name: 'Name',
            type: 'Item',
            discount: '50%',
            spend: '$50 min/$75 max',
            items: 'hgh.nbjvhv...',
            total_usage: '25/25',
            expiration_date: 'NA',
            coupon_reduction: '$2500.00',
            on_off: 'N/A'
        }, {
            key: '9',
            name: 'Name',
            type: 'Item',
            discount: '50%',
            spend: '$50 min/$75 max',
            items: 'hgh.nbjvhv...',
            total_usage: '25/25',
            expiration_date: 'NA',
            coupon_reduction: '$2500.00',
            on_off: 'N/A'
        }, {
            key: '10',
            name: 'Name',
            type: 'Item',
            discount: '50%',
            spend: '$50 min/$75 max',
            items: 'hgh.nbjvhv...',
            total_usage: '25/25',
            expiration_date: 'NA',
            coupon_reduction: '$2500.00',
            on_off: 'N/A'
        },
    ];
    dataBilling = [
        {
            key: '1',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        },
        {
            key: '2',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        },
        {
            key: '3',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        }, {
            key: '4',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        }, {
            key: '5',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        }, {
            key: '6',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        }, {
            key: '7',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        }, {
            key: '8',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        }, {
            key: '9',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        }, {
            key: '10',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        }, {
            key: '11',
            date: '01/24/2020',
            work_order_number: '123-456-789',
            coupon: '50OFF, hg...',
            coupon_reduction: '$75,00',
            promotion: '20haba...',
            promotion_reduction: '$250.00',
            amount_billed: '$375.00',
            payment_status: 'N/A',
        },
    ];

    tableClick = () => {
        history.push('/dashboard/profiles/suppliers/view/coupon-summary/')
    };

    columns = () => {
        const {t} = this.props
        return [
            {
                title: t('name'),
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                sorter: true,
            },
            {
                title: t('discount'),
                dataIndex: 'discount',
                sorter: true,
            }, {
                title: t('spend'),
                dataIndex: 'spend',
                sorter: true,
            }, {
                title: t('item') + '(s)',
                dataIndex: 'items',
                sorter: true,
            }, {
                title: t('total_usage'),
                dataIndex: 'total_usage',
                sorter: true,
            }, {
                title: t('expiry_date'),
                dataIndex: 'expiration_date',
                sorter: true,
            }, {
                title: t('total_coupon_reduction'),
                dataIndex: 'coupon_reduction',
                sorter: true,
            }, {
                title: t('on_off'),
                dataIndex: 'on_off',
                sorter: false,
            },
        ];
    }

    columnsBilling = () => {

        const {t} = this.props
        return [{
            title: t('date'),
            dataIndex: 'date',
        },
            {
                title: t('work_order_num'),
                dataIndex: 'work_order_number',
            },
            {
                title: 'Coupon(s)',
                dataIndex: 'coupon',
            }, {
                title: t('total_coupon_reduction'),
                dataIndex: 'coupon_reduction',
            }, {
                title: 'Promotion(s)',
                dataIndex: 'promotion',
            }, {
                title: t('total_promo_reduction'),
                dataIndex: 'promotion_reduction',
            }, {
                title: t('total_amt'),
                dataIndex: 'amount_billed',
            }, {
                title: t('status_pay'),
                dataIndex: 'payment_status',
            },
        ];
    };

    render() {
        const {t} = this.props
        return (
            <React.Fragment>
                <div className="row summary-info-row mx-0">
                    <div className="col-12 p-0">
                        <div className="row mx-0 w-100 mb-4 flex-align-center-between">
                            <h6 className="text-uppercase font-weight-bold mb-0">{t('pricing_summary')}</h6>
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
                                    <span className="text-span">{t('list_display')} </span>
                                </Button>
                                <Button className="bg-transparent border-0 p-0 text-uppercase flex-align-center">
                                    <span className="img-span position-relative float-left">
                                        <img src={Images.graph_view_primary}
                                             className="img-fluid primary-img position-absolute m-auto"
                                             alt="list-view-icon"/>
                                        <img src={Images.graph_view_gray} className="img-fluid secondary-img"
                                             alt="list-view-icon"/>
                                    </span>
                                    <span className="text-span float-left d-inline-block">{t('chart_view')}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/*<ChartView/>*/}
                    <ListView/>
                    <div className="col-12 p-0">
                        <div className="row mx-0 heading-summary p-3 mt-2">
                            <h6 className="mb-0 font-weight-bold">COUPONS</h6>
                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <div className="listing-table table-responsive billing-table-div coupons-table mt-2 mb-4">
                            <Table
                                className="responsive-table table table-hover table-custom"
                                columns={this.columns()}
                                dataSource={this.data}
                                pagination={true}
                                size="middle"
                                onRow={() => {
                                    return {
                                        onClick: event => {
                                            this.tableClick()
                                        },
                                    };
                                }}
                            />

                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <div className="row mx-0 heading-summary p-3 mt-2">
                            <h6 className="mb-0 font-weight-bold">{t('billing')}</h6>
                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <div className="listing-table table-responsive billing-table-div mt-2 mb-0">
                            <Table
                                className="responsive-table table table-hover table-custom"
                                columns={this.columnsBilling()}
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

export default (withTranslation('common')(PricingSummary));