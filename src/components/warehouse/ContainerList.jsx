import React, { Component } from 'react';
import { Button, Empty, Input, Pagination, Popover, Table, } from 'antd';
import { history } from "../../controller/history";
import { reverse } from "named-urls";
import { routes } from "../../controller/routes";
import { methods } from "../../controller/Global";
import { withTranslation } from "react-i18next";
import { containerGet } from "../../controller/API/itemApi";
import { Image as Images } from "../Images";
import ContainerFilter from "./modal/ContainerFilter";
import AppliedFilterBar from "../common-component/AppliedFilterBar";

const { Search } = Input;
const pagination = Pagination;
pagination.pageSize = 25;

class ContainerList extends Component {
    state = {
        workOrderType: false,
        loading: false,
        data: [],
        pagination: pagination,
        params: {}
    };
    handleChange = (pagination, filters, sorter) => {
        let { params } = this.state;
        let symbol = sorter.order === 'descend' ? '-' : '';
        params = { ...params, page: pagination.current, ordering: `${symbol}${sorter.columnKey}` };
        this.setState({ params });
        this.fetch(params)
    };
    fetch = (params = {}) => {
        this.setState({ loading: true, params });
        containerGet(params)
            .then(response => {
                let { pagination } = this.state;
                pagination.total = response.count;
                this.setState({ data: response.data, pagination, loading: false })
            })
    };
    columns = () => {
        const { t } = this.props;
        return [
            {
                title: t('name'),
                dataIndex: 'name',
                key: 'name',
                sorter: true,
            },
            {
                title: t('delivery_date'),
                dataIndex: 'date',
                key: 'date',
                sorter: true,
            },
        ]
    };
    workOrderVisible = (visible) => {
        this.setState({
            workOrderType: visible,
        })
    };

    componentDidMount() {
        this.fetch();
    }

    getFilterData() {
        const { t } = this.props;
        let { params } = this.state
        if (Object.keys(params).length) {
            params = { 'delivery_date': `${params['start_date']} -  ${params['end_date']}` }
            return {
                params,
                'names': {
                    'delivery_date': t('delivery_date'),
                }
            }
        } else
            return { params }
    }

    render() {

        const { t } = this.props;
        const { data, pagination, loading } = this.state;
        return (
            <React.Fragment>
                <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                    <AppliedFilterBar {...this.getFilterData()} />
                    <div className="container-fluid">
                        <div className="row w-100 m-0 common-heading-details mb-3">
                            <div className="col-sm-6 col-md-7 col-12 p-0">
                                <div className="row mx-0 flex-align-center">
                                    <h4 className="mb-0 font-weight-bold text-uppercase mr-4">{t('pending_containers')}</h4>
                                    <Button
                                        onClick={() => history.push(reverse(routes.dashboard.warehouse.container.method, {
                                            method: methods.create
                                        }))}
                                        type="primary"
                                        className="plus-btn text-uppercase main-btn-tag flex-align-center text-white font-weight-bold pl-2 pr-3">
                                        <img src={Images.plus_icon_white} />{t('create_container_caps')} </Button>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-5 col-12 p-0">
                                <div className="row mx-0 filter-row">
                                    <div className="filter-main-div">
                                        <Popover overlayClassName="filter-main-common container-filter"
                                            content={<ContainerFilter onFilter={this.fetch} />}
                                            title="" trigger="click">
                                            <Button className="ant-dropdown-link border-0"
                                                onClick={e => e.preventDefault()}>
                                                <img alt="filter icon" className="img-fluid"
                                                    src={Images.filter_primary} />
                                                <span>Recherche avancée</span>
                                            </Button>
                                        </Popover>
                                    </div>
                                    <div className="top-f-row-search">
                                        <Search
                                            placeholder={t('search')}
                                            onSearch={value => this.fetch({ search: value })}
                                            className="ml-1 flex-align-center"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100 m-0">
                            <div className="col-12 p-0">
                                <div className="listing-table when-pagination-true table-responsive container-table">
                                    <Table
                                        className="responsive-table table table-hover table-custom"
                                        columns={this.columns()}
                                        dataSource={data}
                                        loading={loading}
                                        pagination={pagination}
                                        size="middle"
                                        rowKey={row => row.id}
                                        locale={{
                                            emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                description={t('no_data')} />)
                                        }}
                                        onChange={this.handleChange}
                                        onRow={(record) => {
                                            return {
                                                onClick: () => {
                                                    history.push(
                                                        reverse(routes.dashboard.warehouse.container.method, {
                                                            method: methods.view,
                                                            id: record.id,
                                                        })
                                                    )
                                                },
                                            };
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(ContainerList));
