import React, {Component} from 'react';
import {Button, Pagination, Popover, Table} from "antd";
import {getDateTime} from "../../../../utils";
import {sendDocumentEmailPost, WorkOrderInvoiceGet} from "../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";
import {EmailModal} from "./modals/EmailModal";
import WorkOrderDocumentFilter from "./tabs/WorkOrderDocumentFilter";
import {Image as Images} from "../../../Images";
import {distributorsEmailPost} from '../../../../controller/API/profileApi';

const pagination = Pagination;
pagination.pageSize = 25;
const INVOICE = 'Facture'

class InvoiceTable extends Component {
    state = {
        invoices: [],
        loading: true,
        pagination: pagination,
        selectedRowKeys: [],
        emailModalVisible: false,
        defaultEmail: [],
        documents: [],
        initialEmail: ['compta@tablacasa.fr']
    };

    handleEmail = (visible, data = null) => {
        if (visible) {
            distributorsEmailPost(this.props.profile.id)
                .then(response => {
                    this.setState({defaultEmail: response.data})
                })
            this.setState({documents: [data.document.id]})
        } else {
            this.fetch()
        }
        this.setState({emailModalVisible: visible})
    }
    getColumns = () => {
        const {t} = this.props;
        const columns = [
            {
                title: t('Envoyer par email'),
                render: data => <span onClick={() => this.handleEmail(true, data)}
                                      className="envoyer-btn">Envoyer</span>,
            }, {
                title: t('number'),
                dataIndex: 'workorder.id',
                key: "workorder_id",
                sorter: true
            }, {
                title: t('Numéro du facture'),
                sorter: true,
                key: "id",
                render: data => `F${data.id}`
            }, {
                title: t('Date et l’heure'),
                dataIndex: 'created_at',
                sorter: true,
                key: "created_at",
                render: created => <span>{getDateTime(created)}</span>
            }, {
                title: t('status'),
                dataIndex: 'workorder.status',
                key: "status",
                sorter: true,
                render: status => <span className="text-success">{t(`${status}`)}</span>,
            }, {
                title: 'Email envoyé le',
                dataIndex: 'document.last_sent_email',
                key: "last_sent_email",
                render: last_sent_email => last_sent_email ? getDateTime(last_sent_email) : "",
            }, {
                title: 'Email',
                dataIndex: 'document.sent_email',
                render: email => email ? email : "",
            },
        ];
        return columns
    }

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
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
        params = {'client': this.props.profile.id, ...params};
        WorkOrderInvoiceGet(params)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.data.count;
                this.setState({invoices: response.data.results, pagination, loading: false})
            })
    };

    componentDidMount() {
        this.fetch()
    }

    render() {
        const {selectedRowKeys, initialEmail} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                {
                    key: 'liverson',
                    text: 'Voir une facture',
                    onSelect: changableRowKeys => {
                        let {invoices} = this.state
                        selectedRowKeys.forEach(item => {
                            const data = invoices.find(a => a.id === item)
                            if (data)
                                window.open(data.invoice_document, '_blank')
                        })
                    }
                },
            ],
        };

        const {invoices, loading, emailModalVisible, defaultEmail, documents} = this.state
        return (
            <React.Fragment>
                <div className="row summary-info-row mx-0">
                    <div className="col-12 p-0">
                        <div className="row mb-3 align-items-center justify-content-between">
                            <h6 className="text-uppercase font-weight-bold mb-4">{INVOICE} </h6>
                            <div className="filter-main-div work-order-filter-main-div">
                                <Popover overlayClassName="profile-filter profile-filter-update filter-main-common"
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
                    <div className="col-12 p-0">
                        <div className="listing-table table-responsive">
                            <Table className="responsive-table table table-hover table-custom"
                                   rowSelection={rowSelection}
                                   dataSource={invoices}
                                   loading={loading}
                                   pagination={pagination}
                                   rowKey={record => record.id}
                                   onChange={this.handleChange}
                                   columns={this.getColumns()}/>
                        </div>
                    </div>
                </div>
                <EmailModal initialEmail={initialEmail} defaultEmail={defaultEmail} visible={emailModalVisible}
                            sendAPI={sendDocumentEmailPost}
                            documents={documents} onClose={() => this.handleEmail(false)}/>
            </React.Fragment>
        );
    }
}

export default withTranslation('common')(InvoiceTable);
