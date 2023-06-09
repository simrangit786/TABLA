import React, {Component} from 'react';
import {Button, Pagination, Popover, Table} from "antd";
import {getDateTime} from "../../../utils";
import {WorkOrderDocumentsGet} from "../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";
import WorkOrderDocumentFilter from "../../Profiles/distributors/ViewDistributorProfile/tabs/WorkOrderDocumentFilter";
import {Image as Images} from "../../Images";

const pagination = Pagination;
pagination.pageSize = 25;
const DELIVERY_TICKET_PDF = 'Bon de livraison'

class DistributorsDeliveryTicketsTable extends Component {
    state = {
        delivery_tickets: [],
        loading: true,
        pagination: pagination,
        selectedRowKeys: [],
        params: {}
    };
    getColumns = () => {
        const {t} = this.props;
        const columns = [
            {
                title: t('distributor_name'),
                dataIndex: 'workorder',
                render: workorder => workorder.client.client_name
            }, {
                title: t('number'),
                dataIndex: 'workorder.id',
                key: 'workorder_id',
                sorter: true,
            }, {
                title: t('Numéro du bon de livraison'),
                render: data => `B${data.workorder.id}-${data.counter}`,
                key: 'workorder_id',
                sorter: true
            },
            {
                title: t('delivery_date'),
                render: data => "Date de livraison"
            }, {
                title: t('Date et l’heure'),
                dataIndex: 'created',
                render: created => <span>{getDateTime(created)}</span>
            }, {
                title: t('status'),
                dataIndex: 'workorder.status',
                render: status => <a className="text-success" href="#">{t(`${status}`)}</a>,
            },
        ];
        return columns
    }

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
        this.setState({loading: true, params});
        params = {'type': DELIVERY_TICKET_PDF, ...params};
        WorkOrderDocumentsGet(params)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.count;
                this.setState({delivery_tickets: response.data, pagination, loading: false})
            })
    };

    componentDidMount() {
        this.fetch()
    }

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };

    render() {
        const {delivery_tickets, loading, selectedRowKeys} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                {
                    key: 'document',
                    text: 'Voir un document',
                    onSelect: changableRowKeys => {
                        selectedRowKeys.forEach(item => {
                            const data = delivery_tickets.find(a => a.id === item)
                            if (data)
                                window.open(data.pdf, '_blank')
                        })
                    }
                },
            ]
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row w-100 m-0 common-heading-details mb-3">
                        <div className="col-sm-6 col-md-7 col-12 p-0">
                            <div className="row mx-0 flex-align-center">
                                <h6 className="mb-0 font-weight-bold text-uppercase mr-4 distributors-small-heading">BONS
                                    DE LIVRAISON</h6>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-5 col-12 p-0">
                            <div className="row mx-0 filter-row">
                                <div className="filter-main-div">
                                    <Popover overlayClassName="filter-main-common work-order-filter"
                                             content={<WorkOrderDocumentFilter onFilter={this.fetch}/>}
                                             title="" trigger="click">
                                        <Button className="ant-dropdown-link border-0"
                                                onClick={e => e.preventDefault()}>
                                            <img alt="filter icon" className="img-fluid"
                                                 src={Images.filter_primary}/>
                                            <span>Recherche avancée</span>
                                        </Button>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row w-100 m-0">
                        <div className="col-12 p-0">
                            <div className="listing-table table-responsive when-pagination-true">
                                <Table
                                    className="responsive-table table table-hover table-custom"
                                    dataSource={delivery_tickets}
                                    loading={loading}
                                    size="middle"
                                    rowSelection={rowSelection}
                                    pagination={pagination}
                                    rowKey={record => record.id}
                                    onChange={this.handleChange}
                                    columns={this.getColumns()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withTranslation('common')(DistributorsDeliveryTicketsTable);