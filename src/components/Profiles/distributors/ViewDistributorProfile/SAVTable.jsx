import React, {Component} from 'react';
import {Pagination, Table} from "antd";
import {getDateTime} from "../../../../utils";
import {sendDocumentEmailPost, WorkOrderDocumentsGet} from "../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";
import {EmailModal} from "./modals/EmailModal";
import {distributorsEmailPost} from '../../../../controller/API/profileApi';


const pagination = Pagination;
pagination.pageSize = 25;
const SAV = 'SAV'

class SAVTable extends Component {
    state = {
        invoices: [],
        loading: true,
        pagination: pagination,
        selectedRowKeys: [],
        emailModalVisible: false,
        defaultEmail: [],
        documents: []
    };

    handleEmail = (visible) => {
        if (visible) {
            distributorsEmailPost(this.props.profile.id)
                .then(response => {
                    this.setState({defaultEmail: response.data})
                })
        }
        this.setState({emailModalVisible: visible})
    }

    getColumns = () => {
        const {t} = this.props;
        const columns = [
            {
                title: t('Envoyer par email'),
                render: data => <span onClick={() => this.handleEmail(true)}
                                      className="envoyer-btn">Envoyer</span>,
            }, {
                title: t('Numéro de bon de commande'),
                render: data => data.workorder.id
            }, {
                title: t('Numéro du S.A.V.'),
                render: data => data.id
            }, {
                title: t('Référence facture'),
                render: data => data.reference_invoices.map(item => `F${item.id}`).join(", ")
            },
            {
                title: t('Date et l’heure'),
                dataIndex: 'created',
                render: created => <span>{getDateTime(created)}</span>
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
        params = {'client': this.props.profile.id, 'type': SAV, ...params, ordering: '-id'};
        WorkOrderDocumentsGet(params)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.count;
                this.setState({invoices: response.data, pagination, loading: false})
            })
    };

    componentDidMount() {
        this.fetch()
    }

    render() {
        const {selectedRowKeys} = this.state;
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
                                window.open(data.pdf, '_blank')
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
                <EmailModal defaultEmail={defaultEmail} visible={emailModalVisible} sendAPI={sendDocumentEmailPost}
                            documents={documents} onClose={() => this.handleEmail(false)}/>
            </React.Fragment>
        );
    }
}

export default withTranslation('common')(SAVTable);
