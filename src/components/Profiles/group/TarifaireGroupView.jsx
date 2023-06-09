import React, {Component} from 'react';
import {Button, Empty, Form, Pagination, Select, Table, Tabs} from "antd";
import {withTranslation} from "react-i18next";
import TarifaireGroupSidebar from './TarifaireGroupSidebar';
import {CreateTarifarePDF} from "../../drawers/tarifare/TarifaireGenerateDrawer";

const {TabPane} = Tabs;
const pagination = Pagination;
pagination.pageSize = 25;
const {Option} = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
//     onSelect: (record, selected, selectedRows) => {
//       console.log(record, selected, selectedRows);
//     },
//     onSelectAll: (selected, selectedRows, changeRows) => {
//       console.log(selected, selectedRows, changeRows);
//     },
//   };
class TarifaireGroupView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                'name': "Nom", "family": "FURTIF", 'category': 'CHAISES', 'reference': 'FUR-BL'
            },
            {
                'name': "Nom", "family": "HOLA", 'category': 'TABOURETS DE BAR 4 PIEDS', 'reference': 'HOK-BL'
            },
            {
                'name': "Nom", "family": "ADELINE", 'category': 'TABLES BASSES', 'reference': 'DJO-VR'
            }
        ],
            invoices: [{
                'imprimer': "", "name": "", 'date_time': '', 'email_details': '', 'email': '',
            }],
            group: null,
            Tabkey: "1",
            pagination: pagination,
            loading: false,
            checkStrictly: false,
            sidebarButton: "",
            open: false,
            selectedRowKeys:[],
        }
    }

    handleTarifOpen = (visible) => {
        this.setState({
            open: visible
        })
    }

    // componentDidMount() {
    //     this.fetch(this.props.match.params.id);
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.match.params.id !== this.props.match.params.id)
    //         this.fetch(this.props.match.params.id)
    // }

    // fetch = (id) => {
    //     groupGetOne(id)
    //         .then(response => {
    //             this.setState({group: response, loading: false})
    //         })
    // };

    handleonChange = (key) => {
        this.setState({Tabkey: key})
        this.setState({sidebarButton:""})
    };
    columns = () => {
        const {t} = this.props;
        return [{
            title: t('name'), dataIndex: 'name', sorter: true, key: 'name',
        }, {
            title: t('family'), dataIndex: 'family', sorter: true, key: 'family',
        }, {
            title: t('category'), dataIndex: 'category', sorter: true, key: 'category',
        }, {
            title: t('reference'), dataIndex: 'reference', sorter: true, key: 'reference',
        }];
    };
    handleSidebarbutton = (btnName, key) => {
        this.setState({Tabkey: key})
        this.setState({sidebarButton: btnName})
    }

    render() {
        const columnsDocs = [{
            title: 'Imprimer',
            dataIndex: 'imprimer',
            render: () => <Button className="bg-transparent border-0 p-0 shadow-none" style={{color: '#448DE5'}}>Voir
                PDF</Button>
        }, {
            title: '', dataIndex: 'name', key: 'name', render: () => <div>Bon de livraison</div>
        }, {
            title: '', key: 'date_time', dataIndex: 'date_time', render: () => <div>2019-09-12 | 17:05</div>,
        }, {
            title: 'Email envoyé le', dataIndex: 'email_details', render: () => <span>17 mai 2022 17:28</span>
        }, {
            title: 'Email', dataIndex: 'email', render: () => <>
                <span>info@banner-interieur.fr, pierrelodolo@gmail.com</span>
            </>,
        },];
        const {group,sidebarButton} = this.state;
        const {t} = this.props;
        // if (loading) {
        //     return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        // }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({selectedRowKeys})
            },
        };
        return (<React.Fragment>
                <TarifaireGroupSidebar group={group} {...this.props} handleSidebarbutton={this.handleSidebarbutton}
                                       fetch={() => this.fetch(this.props.match.params.id)}/>
                <div className="profile-summary-details-row">
                    <div className="col-12 p-0">
                        <Tabs type="card" defaultActiveKey={"1"} activeKey={this.state.Tabkey}
                              onChange={this.handleonChange}>
                            <TabPane tab={t('summary')} key="1">
                                <div className="row summary-info-row mx-0">
                                    <div className="col-12 px-0">
                                        <h6 className="text-uppercase font-weight-bold mb-4">{t('groupe_tarifaire_iNFORMATIONS')} </h6>
                                    </div>
                                    <div className="col-12 px-0">
                                        <div className="card border-0 position-relative mb-4">
                                            <div className="card-body">
                                                <div className="row mx-0">
                                                    <div className="col-md-6 col-sm-6 col-12 col-lg-4">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('group_name')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{t('France_tariff')}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab={t('tarifs')} key="2">
                                <div className="row summary-info-row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="listing-table col-12 table-responsive when-pagination-true">
                                                <Table
                                                    className="responsive-table table table-hover table-custom"
                                                    columns={this.columns()}
                                                    rowSelection={sidebarButton && rowSelection}
                                                    dataSource={this.state.data}
                                                    loading={this.state.loading}
                                                    pagination={this.state.pagination}
                                                    onChange={this.handleChange}
                                                    rowKey={record => record.id}
                                                    size="middle"
                                                    locale={{
                                                        emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                                           description={t('no_data')}/>)
                                                    }}
                                                    // onRow={(record) => {
                                                    //     return {
                                                    //         onClick: () => {
                                                    //             history.push(reverse(routes.dashboard.profiles.tarifaire.method, {
                                                    //                 method: methods.view,
                                                    //                 id: "1234",
                                                    //             }))
                                                    //         },
                                                    //     };
                                                    // }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               { sidebarButton==t('genrate_tariff_pdf')||sidebarButton==t('generate_price_pdf') ?
                                <div
                                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                                    <div>
                                       <button type="button"
                                                className="ant-btn font-weight-bold text-center text-white text-uppercase ant-btn-primary">
                                            <span>{t('generate_a_pdf')}</span></button>
                                    </div>
                                </div>
                                :sidebarButton==t('generate_pdf_tariff_including_cofficient')?<div
                                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                                    <div>
                                       <button onClick={() => this.handleTarifOpen(true)} type="button"
                                                className="ant-btn font-weight-bold text-center text-white text-uppercase ant-btn-primary">
                                            <span>CONTINUE</span></button>
                                    </div>
                                </div>:""}
                                <CreateTarifarePDF visible={this.state.open}
                                                   onClose={() => this.handleTarifOpen(false)}/>
                            </TabPane>
                            <TabPane tab={t('documents')} key="3">
                                <div className="row summary-info-row mx-0">
                                    <div className="col-12 mb-3">
                                        <Form onSubmit={this.handleSubmit} className="main-form">
                                            <div className="row">
                                                <div className="col-12 text-right">
                                                    <Select defaultValue="Filter" style={{width: 175}}
                                                            onChange={handleChange}>
                                                        <Option value="Filter">Filter</Option>
                                                    </Select>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                    <div className="listing-table-second table-responsive col-12">
                                        <Table className="responsive-table table table-hover table-custom"
                                               dataSource={this.state.invoices}
                                               columns={columnsDocs}
                                               size="middle"
                                        />
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                        <h5 className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">{t('France_tariff')}</h5>
                    </div>
                </div>
            </React.Fragment>);
    }
}

export default (withTranslation('common')(TarifaireGroupView));
