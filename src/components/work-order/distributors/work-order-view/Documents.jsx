import React, {Component} from 'react';
import {Empty, Pagination, Table} from "antd";
import {sendDocumentEmailPost, WorkOrderDocumentsGet} from "../../../../controller/API/salesOperationAPI";
import {getDateTime} from "../../../../utils";
import {withTranslation} from "react-i18next";
import {distributorsEmailPost} from "../../../../controller/API/profileApi";
import {EmailModal} from "../../../Profiles/distributors/ViewDistributorProfile/modals/EmailModal";


const pagination = Pagination;
pagination.pageSize = 25;

class Documents extends Component {
    columns = [
        {
            title: 'Imprimer',
            dataIndex: 'pdf',
            render: (pdf) => {
                return <a href={pdf} target="_blank" rel="noreferrer"
                          className="bg-transparent h-auto border-0 rounded-0 shadow-none p-0">
                    Voir PDF
                </a>
            },

        },
        {
            title: 'Type de document',
            dataIndex: 'type',
            sorter: true,
            render: (type) => {
                return <span>{type}</span>
            }
        },
        {
            title: "Date et l'heure",
            dataIndex: 'created',
            sorter: true,
            render: (created) => {
                return <span>{getDateTime(created)}</span>
            }
        }, {
            title: 'Email envoyé le',
            dataIndex: 'last_sent_email',
            key: "last_sent_email",
            render: last_sent_email => last_sent_email ? getDateTime(last_sent_email) : "",
        }, {
            title: 'Email',
            dataIndex: 'sent_email',
            render: email => email ? email : "",
        }
    ];

    state = {
        documents: [],
        loading: true,
        params: {workorder: this.props.data.id, ordering: '-id'},
        pagination: pagination,
        selectedRowKeys: [],
        emailPopup: {visible: false, allEmail: []},
        initialEmail: []


    };
    recent_confirmation = false

    handleChange = (pagination, filters, sorter) => {
        let {params} = this.state;
        let symbol = sorter.order === 'descend' ? '-' : '';
        params = {...params, page: pagination.current, ordering: `${symbol}${sorter.columnKey}`};
        this.setState({params});
        this.fetch(params)
    };

    componentDidMount() {
        this.fetch(this.state.params);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeKey !== this.props.activeKey) {
            this.fetch(this.state.params);
        }
    }

    fetch = (params = {}) => {
        this.setState({loading: true})
        WorkOrderDocumentsGet(params)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.count;
                this.setState({documents: response.data, pagination, loading: false})
            })
    };

    is_recent_confirmation = (record) => {
        const confirmation_type = "Confirmation de commande"
        if (record.type !== confirmation_type) {
            return false
        } else if (!this.recent_confirmation && record.type === confirmation_type) {
            this.recent_confirmation = true
            return false
        }
        return this.recent_confirmation
    }

    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };

    visibleEmailPopup = (visible) => {
        var emailPopup = {...this.state.emailPopup};
        emailPopup.visible = visible;
        this.setState({emailPopup})
        this.fetch(this.state.params)
    };

    handleEmailPopup = ({visible, documents, defaultEmail = [], initialEmail = []}) => {
        if (visible) {
            distributorsEmailPost(this.props.data.client.id)
                .then(response => {
                    this.setState({
                        emailPopup: {
                            documents, defaultEmail: response.data, visible: visible
                        },
                        initialEmail
                    })
                })
        }

    };


    render() {
        const {loading, documents, pagination, selectedRowKeys, emailPopup, initialEmail} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                {
                    key: 'document',
                    text: 'Voir un document',
                    onSelect: changableRowKeys => {
                        let {documents} = this.state
                        selectedRowKeys.forEach(item => {
                            const data = documents.find(a => a.id === item)
                            if (data)
                                window.open(data.pdf, '_blank')
                        })
                    }
                }, {
                    key: 'email',
                    text: 'Envoyer par email',
                    onSelect: changableRowKeys => {
                        let defaultEmail = []
                        if (documents.length) {
                            const document = documents[0]
                            defaultEmail.push(...[document.workorder.client.email, document.workorder.sales_representative_email])
                        }
                        const initialEmail = documents.find(a => selectedRowKeys.includes(a.id) && a.type === "Facture")
                        this.handleEmailPopup({
                            visible: true,
                            documents: selectedRowKeys,
                            defaultEmail: defaultEmail,
                            initialEmail: initialEmail ? ['compta@tablacasa.fr'] : []
                        })
                    }
                },
            ],
        };
        const {t} = this.props;
        return (
            <div className="row summary-info-row mx-0 pt-4">
                <div className="col-12">
                    <div className="listing-table-second table-responsive">
                        <Table
                            loading={loading}
                            rowSelection={rowSelection}
                            className="responsive-table table table-hover table-custom"
                            columns={this.columns}
                            rowClassName={(record, index) => this.is_recent_confirmation(record) ? "opacity-min" : ""}
                            dataSource={documents}
                            onChange={this.handleChange}
                            pagination={pagination}
                            rowKey={record => record.id}
                            size="middle"
                            locale={{
                                emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('no_data')}/>)
                            }}
                        />

                    </div>
                </div>
                {emailPopup.visible ?
                    // <EmailPopupModal visible={emailPopup.visible} onClose={() => this.visibleEmailPopup(false)}
                    //                  documents={emailPopup.documents} defaultEmail={emailPopup.defaultEmail}/> : ""}

                    <EmailModal initialEmail={initialEmail} visible={emailPopup.visible}
                                onClose={() => this.visibleEmailPopup(false)}
                                sendAPI={sendDocumentEmailPost}
                                documents={emailPopup.documents} defaultEmail={emailPopup.defaultEmail}/> : ""}
            </div>
        );
    }

}

export default withTranslation('common')(Documents);