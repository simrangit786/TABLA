import React, {Component} from 'react';
import {Empty, Pagination, Table} from "antd";
import {withTranslation} from "react-i18next";
import {distributorWorkorderGet, sales_workorder} from "../../../../../controller/API/salesOperationAPI";
import {history} from "../../../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../../../controller/routes";
import {methods, profiles} from "../../../../../controller/Global";

const pagination = Pagination;
pagination.pageSize = 25;
const moment = require('moment');

class WorkOrderTable extends Component {

    state = {
        work_orders: [],
        loading: true,
        pagination: pagination
    };

    getColumns = () => {
        const {t} = this.props;
        const columns = [
            {
                title: t('number'),
                dataIndex: 'id',
            },
            {
                title: t('date_created'),
                dataIndex: 'workorder_creation_date',
                render: workorder_creation_date => <span>{moment(workorder_creation_date).format('DD/MM/YYYY')}</span>
            },
            {
                title: t('total_items'),
                dataIndex: 'total_items',
            }, {
                title: t('status'),
                dataIndex: 'status',
                render: status => <a className="text-success" href="#">{t(`${status}`)}</a>,
            },
        ];
        if (this.props.sales_representative)
            columns.unshift({
                title: t('distributor_name'),
                dataIndex: 'client.client_name',
            },);
        return columns
    };

    handleChange = (pagination, filters, sorter) => {
        let {params} = this.state;
        let symbol = sorter.order === 'descend' ? '-' : '';
        params = {...params, page: pagination.current};
        if (sorter.order) {
            params = {...params, ordering: `${symbol}${sorter.columnKey}`}
        }
        this.setState({params});
        this.fetch(params)
    };


    fetch = (params) => {
        this.setState({loading: true});
        if (this.props.sales_representative) {
            sales_workorder(this.props.profile.id, params)
                .then(response => {
                    let {pagination} = this.state;
                    pagination.total = response.count;
                    this.setState({work_orders: response.data, pagination, loading: false})
                })
        } else {
            const params = {'client': this.props.profile.id};
            distributorWorkorderGet(params)
                .then(response => {
                    let {pagination} = this.state;
                    pagination.total = response.count;
                    this.setState({work_orders: response.data, pagination, loading: false})
                })
        }

    };

    componentDidMount() {
        this.fetch()
    }

    render() {
        const {loading, work_orders, pagination} = this.state;
        const {t} = this.props;
        return (
            <React.Fragment>
                <div className="row summary-info-row mx-0">
                    <div className="col-12 p-0">
                        <h6 className="text-uppercase font-weight-bold mb-4">{t('purchase_order_caps')} </h6>
                    </div>
                    <div className="col-12 p-0">
                        <div className="listing-table table-responsive">
                            <Table
                                className="responsive-table table table-hover table-custom"
                                columns={this.getColumns()}
                                loading={loading}
                                dataSource={work_orders}
                                pagination={pagination}
                                onChange={this.handleChange}
                                size="middle"
                                locale={{
                                    emptyText: (
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('no_data')}/>)
                                }}
                                onRow={(record => {
                                    return {
                                        onClick: () => {
                                            history.push(reverse(routes.dashboard.sales.work_order.method, {
                                                method: methods.view,
                                                type: profiles.distributor,
                                                id: record.id,
                                            }))
                                        }
                                    }
                                })}
                            />

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(WorkOrderTable));
