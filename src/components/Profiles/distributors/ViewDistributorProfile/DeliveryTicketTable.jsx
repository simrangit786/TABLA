import React, {Component} from 'react';
import {Button, message, Pagination, Popover, Table} from "antd";
import {
    generateAllInvoice,
    sendDocumentEmailPost,
    WorkOrderDocumentsGet
} from "../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";
import {getDateTime} from "../../../../utils";
import WorkOrderDocumentFilter from "./tabs/WorkOrderDocumentFilter";
import {Image as Images} from "../../../Images";
import {EmailModal} from "./modals/EmailModal";
import ConfirmPopup from "../../../modal/ConfirmPopup";
import {distributorsEmailPost} from "../../../../controller/API/profileApi";

const pagination = Pagination;
pagination.pageSize = 25;
const DELIVERY_TICKET_PDF = 'Bon de livraison'
const moment = require('moment');

class DeliveryTicketTable extends Component {
    state = {
        delivery_tickets: [],
        loading: true,
        pagination: pagination,
        selectedRowKeys: [],
        defaultEmail: [],
        emailModalVisible: false,
        confirmPopup: {visible: false},
        documents: []
    };


    handleEmail = (visible, data = null) => {
        if (visible) {
            distributorsEmailPost(this.props.profile.id)
                .then(response => {
                    this.setState({defaultEmail: response.data})
                })
            this.setState({documents: [data.id]})
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
                                      className="envoyer-btn">Envoyer</span>
            }, {
                title: t('number'),
                dataIndex: 'workorder.id',
                key: "workorder_id",
                sorter: true
            }, {
                title: t('Numéro du bon de livraison'),
                key: "id",
                sorter: true,
                render: data => `B${data.workorder.id}-${data.counter}`
            },
            {
                title: t('delivery_date'),
                dataIndex: "created",
                sorter: true,
                key: "created",
                render: created => <span>{getDateTime(created)}</span>
            }, {
                title: t('Date et l’heure'),
                dataIndex: 'created',
                sorter: true,
                key: "workorder_creation_date",
                render: created => <span>{getDateTime(created)}</span>
            }, {
                title: t('status'),
                dataIndex: 'workorder.status',
                key: "status",
                sorter: true,
                render: status => <span className="text-success">{t(`${status}`)}</span>,
            },
            {
                title: 'Email envoyé le',
                dataIndex: 'last_sent_email',
                key: "last_sent_email",
                render: last_sent_email => last_sent_email ? getDateTime(last_sent_email) : "",
            }, {
                title: 'Email',
                dataIndex: 'sent_email',
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
        params = {'client': this.props.profile.id, 'type': DELIVERY_TICKET_PDF, ...params, ordering: '-id'};
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

    handleConfirmPopup = ({title, description, onOk, onCancel}) => {
        this.setState({
            confirmPopup: {
                title, description, onOk, onCancel, visible: true
            }
        })
    };
    visibleConfirmPopup = (visible) => {
        var confirmPopup = {...this.state.confirmPopup};
        confirmPopup.visible = visible;
        this.setState({confirmPopup})
    };

    generateInvoiceTicket = () => {
        const {
            delivery_tickets,
            selectedRowKeys,
        } = this.state;
        let uniqueOrders = [...new Set(selectedRowKeys)];
        uniqueOrders.forEach(item => {
            const data = delivery_tickets.find(a => a.id === item);
            if (data) {
                generateAllInvoice({id: data.workorder.id})
                    .then(response => {
                        message.success(response.data.message);
                        this.visibleConfirmPopup(false)
                    })
            }
        })
    };

    render() {
        const {
            selectedRowKeys,
            confirmPopup,
            delivery_tickets,
            loading,
            documents,
            defaultEmail,
            emailModalVisible
        } = this.state

        const {t} = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                {
                    key: 'delivery_ticket',
                    text: 'Voir un bon de livraison',
                    onSelect: changableRowKeys => {
                        let {delivery_tickets} = this.state
                        selectedRowKeys.forEach(item => {
                            const data = delivery_tickets.find(a => a.id === item)
                            if (data)
                                window.open(data.pdf, '_blank')
                        })
                    }
                },
                {
                    key: 'generate_invoice',
                    text: 'Générer une facture',
                    onSelect: changableRowKeys => {
                        if (selectedRowKeys.length) {
                            this.handleConfirmPopup({
                                title: "Générer une facture",
                                description: "Êtes-vous sûr de vouloir générer cette(ces) facture(s)?",
                                onCancel: this.generateInvoiceTicket,
                                onOk: () => this.visibleConfirmPopup(false)
                            })
                        }
                    }
                },
            ],
        };

        return (
            <React.Fragment>
                <div className="row summary-info-row mx-0">
                    <div className="col-12 p-0">
                        <div className="row mb-3 align-items-center justify-content-between">
                            <h6 className="text-uppercase font-weight-bold mb-4">BONS DE LIVRAISON </h6>
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
                                   dataSource={delivery_tickets}
                                   loading={loading}
                                   pagination={pagination}
                                   rowKey={record => record.id}
                                   onChange={this.handleChange}
                                   columns={this.getColumns()}/>
                        </div>
                    </div>
                </div>
                <EmailModal defaultEmail={defaultEmail} visible={emailModalVisible} sendAPI={sendDocumentEmailPost}
                            documents={documents}
                            onClose={() => this.handleEmail(false)}
                />
                {confirmPopup.visible &&
                <ConfirmPopup
                    onOk={confirmPopup.onOk}
                    width="50%"
                    onCancel={confirmPopup.onCancel}
                    okText={t('cancel')}
                    cancelText={"OUI"}
                    title={confirmPopup.title}
                    description={confirmPopup.description}
                    small_description={""}
                />}̵
            </React.Fragment>
        );
    }
}

export default withTranslation('common')(DeliveryTicketTable);
