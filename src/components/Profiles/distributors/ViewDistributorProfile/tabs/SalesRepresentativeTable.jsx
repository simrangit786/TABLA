import React, {Component} from 'react';
import {Empty, Pagination, Table} from "antd";
import {withTranslation} from "react-i18next";
import {distributor_sales_representative} from "../../../../../controller/API/salesOperationAPI";
import {history} from "../../../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../../../controller/routes";
import {methods} from "../../../../../controller/Global";

const pagination = Pagination;
pagination.pageSize = 25;

class SalesRepresentativeTable extends Component {

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
                title: t('type_distributor'),
                dataIndex: 'client_type.title',
            },
            {
                title: t('name'),
                dataIndex: 'client_name',
            }, {
                title: t('rank'),
                dataIndex: 'client_rank',
            }, {
                title: t('country'),
                dataIndex: 'sales_representative',
                render: sales_representative => <span>{sales_representative.country || 'N/A'}</span>,
            },
        ];
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
        distributor_sales_representative(this.props.profile.id, params)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.count;
                this.setState({work_orders: response.data, pagination, loading: false})
            })
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
                        <h6 className="text-uppercase font-weight-bold mb-4">{t('distributor_representant')} </h6>
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
                                            history.push(reverse(routes.dashboard.profiles.distributor.method, {
                                                method: methods.view,
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

export default (withTranslation('common')(SalesRepresentativeTable));
