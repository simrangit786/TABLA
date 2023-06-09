import React, {Component} from 'react';
import {Button, Empty, message, Pagination, Popover, Table} from "antd";
import {withTranslation} from "react-i18next";
import {
    generateAllDeliveryTicket,
    generateAllInvoice,
    sendDocumentEmailPost,
    WorkOrderDocumentsGet
} from "../../../../../controller/API/salesOperationAPI";
import {getDateTime} from "../../../../../utils";
import {reverse} from "named-urls";
import {routes} from "../../../../../controller/routes";
import {methods, profiles} from "../../../../../controller/Global";
import {EmailModal} from "../modals/EmailModal";
import ConfirmPopup from "../../../../modal/ConfirmPopup";
import {Image as Images} from "../../../../Images";
import WorkOrderDocumentFilter from "./WorkOrderDocumentFilter";
import {distributorsEmailPost} from "../../../../../controller/API/profileApi";

const pagination = Pagination;
pagination.pageSize = 25;
const WORKORDER_PDF = 'Confirmation de commande';

class WorkOderProfile extends Component {

    state = {
        work_orders: [],
        loading: true,
        pagination: pagination,
        selectedRowKeys: [],
        emailModalVisible: false,
        documents: [],
        confirmPopup: {visible: false},
        defaultEmail: []
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
                                      className="envoyer-btn">Envoyer</span>,
            },
            {
                title: t('number'),
                sorter: true,
                dataIndex: 'workorder.id',
                key: "workorder_id"
            },
            {
                title: t('date_created'),
                dataIndex: 'workorder.workorder_creation_date',
                key: "workorder_creation_date",
                sorter: true,
                render: created => <span>{getDateTime(created)}</span>
            },
            {
                title: t('delivery_date'),
                dataIndex: "created",
                sorter: true,
                key: "created",
                render: created => <span>{getDateTime(created)}</span>
            },
            {
                title: t('coupon applique ?'),
                dataIndex: "coupon_applied",
                key: "coupon_applied",
                render: coupon_applied => coupon_applied ? "Oui" : "Non"
            }, {
                title: t('total'),
                sorter: true,
                key: "total_amount",
                dataIndex: 'workorder.total_amount',
            }, {
                title: t('representative'),
                sorter: true,
                dataIndex: 'workorder.sales_representative',
            }, {
                title: t('status'),
                dataIndex: 'workorder.status',
                sorter: true,
                key: "status",
                render: status => <span className="text-success">{t(`${status}`)}</span>,
            }, {
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
    };

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
        params = {'client': this.props.profile.id, 'type': WORKORDER_PDF, ...params, ordering: '-id'};
        WorkOrderDocumentsGet(params)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.count;
                this.setState({work_orders: response.data, pagination, loading: false})
            })

    };

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
    generateDeliveryTicket = () => {
        const {
            work_orders,
            selectedRowKeys,
        } = this.state;
        selectedRowKeys.forEach(item => {
            const data = work_orders.find(a => a.id === item);
            if (data) {
                generateAllDeliveryTicket({id: data.workorder.id})
                    .then(response => {
                        message.success(response.data.message);
                        this.visibleConfirmPopup(false)
                    })
            }
        })
    };
    generateInvoiceTicket = () => {
        const {
            work_orders,
            selectedRowKeys,
        } = this.state;
        selectedRowKeys.forEach(item => {
            const data = work_orders.find(a => a.id === item);
            if (data) {
                generateAllInvoice({id: data.workorder.id})
                    .then(response => {
                        message.success(response.data.message);
                        this.visibleConfirmPopup(false)
                    })
            }
        })
    };

    componentDidMount() {
        this.fetch()
    }

    render() {
        const {
            loading,
            work_orders,
            pagination,
            selectedRowKeys,
            emailModalVisible,
            documents,
            confirmPopup,
            defaultEmail
        } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                {
                    key: '1',
                    text: 'Voir la confirmation de commande digital',
                    onSelect: changableRowKeys => {
                        selectedRowKeys.forEach(item => {
                            const data = work_orders.find(a => a.id === item);
                            if (data) {
                                window.open(reverse(routes.dashboard.sales.work_order.method, {
                                    method: methods.view,
                                    type: profiles.distributor,
                                    id: data.workorder.id,
                                }), "_blank")
                            }
                        })
                    }
                }, {
                    key: '2',
                    text: 'Voir la confirmation de commande pdf',
                    onSelect: changableRowKeys => {
                        selectedRowKeys.forEach(item => {
                            const data = work_orders.find(a => a.id === item);
                            if (data) {
                                window.open(data.pdf, '_blank')
                            }
                        })
                    }
                }, {
                    key: '3',
                    text: 'Générer un bon de livraison',
                    onSelect: changableRowKeys => {
                        if (selectedRowKeys.length) {
                            this.handleConfirmPopup({
                                title: "Générer un bon de livraison",
                                description: "Êtes-vous sûr de vouloir générer ce(s) bon(s) de livraison(s)?",
                                onCancel: this.generateDeliveryTicket,
                                onOk: () => this.visibleConfirmPopup(false)
                            })
                        }

                    }
                }, {
                    key: '4',
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
            ]
        };
        const {t} = this.props;
        return (
            <React.Fragment>
                <div className="row summary-info-row mx-0">
                    <div className="col-12">
                        <div className="row mb-3 align-items-center justify-content-between">
                            <h6 className="text-uppercase font-weight-bold mb-0">{t('purchase_order_caps')} </h6>
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
                            <Table
                                className="responsive-table table table-hover table-custom"
                                columns={this.getColumns()}
                                loading={loading}
                                dataSource={work_orders}
                                pagination={pagination}
                                rowSelection={rowSelection}
                                onChange={this.handleChange}
                                size="middle"
                                rowKey={record => record.id}
                                locale={{
                                    emptyText: (
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('no_data')}/>)
                                }}
                            />

                        </div>
                    </div>
                </div>
                <EmailModal defaultEmail={defaultEmail} visible={emailModalVisible} sendAPI={sendDocumentEmailPost}
                            documents={documents} onClose={() => this.handleEmail(false)}/>
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

export default (withTranslation('common')(WorkOderProfile));
