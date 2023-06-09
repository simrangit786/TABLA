import React, {Component} from 'react';
import AppliedFilterBar from "../../../common-component/AppliedFilterBar";
import {Button, Empty, Icon, Input, Pagination, Popover, Table} from "antd";
import {Image as Images} from "../../../Images";
import WorkOrderFilter from "../modals/WorkOrderFilter";
import {history} from "../../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../../controller/routes";
import {methods, profiles} from "../../../../controller/Global";
import WorkOrderType from "../../../modal/WorkOrderType";
import {distributorWorkorderGet} from "../../../../controller/API/salesOperationAPI";
import {STATUS} from "../../../../controller/enums";

const {Search} = Input;
const pagination = Pagination;
pagination.pageSize = 25;
const moment = require('moment');

class DistributorsWorkOrderTabs extends Component {
    state = {
        workOrderType: false,
        data: null,
        pagination: pagination,
        params: {},
        labelParams: {},
        loading: false,
        radioValue: 1,
        popup: {
            visible: false,
            x: 0, y: 0
        }
    };
    onChange = e => {
        this.setState({
            radioValue: e.target.value,
        });
    };

    workOrderVisible = (visible) => {
        this.setState({
            workOrderType: visible,
        })
    };
    handleChange = (pagination, filters, sorter) => {
        let {params} = this.state;
        let symbol = sorter.order === 'descend' ? '-' : '';
        params = {...params, page: pagination.current, ordering: `${symbol}${sorter.columnKey}`};
        this.setState({params});
        this.fetch(params)
    };
    fetch = (params = {}) => {
        this.setState({loading: true, params});
        const values = this.properParams(params);
        distributorWorkorderGet(values)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.count;
                this.setState({data: response.data, pagination, loading: false})
            })
    };

    properParams = ({...params}) => {
        let keys = Object.keys(params);
        keys.forEach(key => {
            if (!params[key])
                delete params[key];
            else if (params[key].key)
                params[key] = params[key].key
        });

        return params
    };

    columns = () => {
        const {t} = this.props;
        return [
            {
                title: t('number'),
                key: 'id',
                sorter: true,
                dataIndex: 'id',
            },
            {
                title: t('date_created'),
                dataIndex: 'workorder_creation_date',
                sorter: true,
                render: workorder_creation_date => <span>{moment(workorder_creation_date).format('DD/MM/YYYY')}</span>
            },
            {
                title: t('name'),
                key: 'name',
                dataIndex: 'client',
                sorter: true,
                render: client => <span>{client.client_name}</span>
            },
            {
                title: t('Group'),
                dataIndex: 'client.group.title',
                key: 'group_title',
                sorter: true,
            },
            {
                title: t('comments'),
                dataIndex: 'comments',
                render: (comment) => <Popover content={comment} title={t('comments')}><Icon type="info-circle"
                                                                                            theme="twoTone"
                                                                                            twoToneColor="#52c41a"/> {t('comments')}
                </Popover>
            },
            {
                title: t('delivery_date'),
                dataIndex: 'delivery_group',
                render: (groups) => <Popover
                    content={<div>{groups.map((item, index) => <p key={index}>{item.delivery_date}</p>)}</div>}
                    title={t('delivery_date')}><Icon theme="twoTone" twoToneColor="#52c41a"
                                                     type="info-circle"/> {t('delivery_date')}</Popover>
            },
            {
                title: t('total'),
                dataIndex: 'total_amount',
                sorter: true,
                key: 'total_amount',
                render: (price) => price.toFixed(2)
            },
            {
                title: t('representative'),
                sorter: true,
                key: 'sales_representative',
                dataIndex: 'sales_representative',
            },
            {
                title: t('status'),
                dataIndex: 'status',
                sorter: true,
                render: status => <span>{t(`${status}`)}</span>
            },
        ];
    };

    componentDidMount() {
        this.fetch();
    }

    getFilterData() {
        const {t} = this.props;
        let {params, labelParams} = this.state;
        if (Object.keys(params).length) {
            if (params['min_price']) {
                labelParams['total'] = `${params['min_price']} - ${params['max_price']}`;
            }
            if (params['creation_start_date']) {
                labelParams['creation_date'] = `${params['creation_start_date']} - ${params['creation_end_date']}`;
            }
            if (params['delivery_start_date']) {
                labelParams['delivery_date'] = `${params['delivery_start_date']} - ${params['delivery_end_date']}`;
            }
            return {
                'params': labelParams,
                'names': {
                    'group': t('Group'),
                    'sales_rep': t('representative'),
                    'total': t('total'),
                    'status': t('status'),
                    'creation_date': t('date_created'),
                    'delivery_date': t('delivery_date'),
                    'partial_delivered': t('partial_delivered'),
                    'min_id': t('Work Order Min ID'),
                    'max_id': t('Work Order Max ID'),
                    'client': t('distributor_name'),
                },
                'values': {
                    ...STATUS
                }
            }
        } else
            return {params: labelParams}
    }

    render() {
        const {t} = this.props;
        const {data, pagination, loading, workOrderType, popup} = this.state;
        return (
            <React.Fragment>
                <AppliedFilterBar {...this.getFilterData()} />
                <div className="container-fluid">
                    <div className="row w-100 m-0 common-heading-details mb-3">
                        <div className="col-sm-6 col-md-7 col-12 p-0">
                            <div className="row mx-0 flex-align-center">
                                <h6 className="mb-0 text-uppercase distributors-small-heading">BONS DE COMMANDES</h6>
                                <Button type="primary" onClick={() => this.workOrderVisible(true)}
                                        className="plus-btn text-uppercase main-btn-tag flex-align-center text-white font-weight-bold pl-2 pr-3">
                                    <img alt={""} src={Images.plus_icon_white}/> {t('new_order')} </Button>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-5 col-12 p-0">
                            <div className="row mx-0 filter-row">
                                <div className="filter-main-div">
                                    <Popover overlayClassName="filter-main-common work-order-filter"
                                             content={<WorkOrderFilter onFilter={this.fetch}/>}
                                             title="" trigger="click">
                                        <Button className="ant-dropdown-link border-0"
                                                onClick={e => e.preventDefault()}>
                                            <img alt="filter icon" className="img-fluid"
                                                 src={Images.filter_primary}/>
                                            <span>Recherche avancée</span>
                                        </Button>
                                    </Popover>
                                </div>
                                <div className="top-f-row-search">
                                    <Search
                                        placeholder={t('search')}
                                        onSearch={value => this.fetch({search: value})}
                                        className="ml-1 flex-align-center"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row w-100 m-0">
                        <div className="col-12 p-0">
                            <div className="listing-table when-pagination-true table-responsive work-order-table">
                                <Table
                                    className="responsive-table table table-hover table-custom"
                                    columns={this.columns()}
                                    dataSource={data}
                                    loading={loading}
                                    pagination={pagination}
                                    rowKey={data => `work_${data.id}`}
                                    size="middle"
                                    locale={{
                                        emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                           description={t('no_data')}/>)
                                    }}
                                    onChange={this.handleChange}
                                    onRow={(record => {
                                        return {
                                            onClick: () => {
                                                history.push(reverse(routes.dashboard.sales.work_order.method, {
                                                    method: methods.view,
                                                    type: profiles.distributor,
                                                    id: record.id,
                                                }))
                                            },
                                            onContextMenu: e => {
                                                e.preventDefault();
                                                if (!this.state.popup.visible) {
                                                    const that = this;
                                                    document.addEventListener(`click`, function onClickOutside() {
                                                        that.setState({popup: {visible: false}});
                                                        document.removeEventListener(`click`, onClickOutside)
                                                    })
                                                }
                                                this.setState({
                                                    popup: {
                                                        record,
                                                        visible: true,
                                                        x: e.pageX - 165,
                                                        y: e.pageY - 165
                                                    }
                                                })
                                            }
                                        }
                                    })}
                                />
                                {popup.visible &&
                                <ul className={'popup'} style={{left: `${popup.x}px`, top: `${popup.y}px`}}>
                                    <li onClick={() => window.open(reverse(routes.dashboard.sales.work_order.method, {
                                        method: methods.view,
                                        id: popup.record.id,
                                        type: profiles.distributor
                                    }), '_blank')}>Ouvrir dans un nouvel onglet

                                    </li>
                                </ul>}
                            </div>
                        </div>
                    </div>
                </div>
                {workOrderType && <WorkOrderType visible={workOrderType} onClose={() => this.workOrderVisible(false)}/>}
            </React.Fragment>
        );
    }
}

export default DistributorsWorkOrderTabs;
