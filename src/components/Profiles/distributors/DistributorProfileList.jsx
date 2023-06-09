import React, {Component} from 'react';
import {Button, Empty, Input, message, Pagination, Popover, Table} from 'antd';
import {Link} from "react-router-dom";
import {routes} from "../../../controller/routes";
import {reverse} from "named-urls";
import {methods} from "../../../controller/Global";
import {withTranslation} from "react-i18next";
import {distributorProfileGet, DistributorProfilePdfGetOne} from "../../../controller/API/profileApi";
import {history} from "../../../controller/history";
import {Image as Images} from "../../Images";
import ProfileFilter from "./../distributors/modal/ProfileFilter";
import AppliedFilterBar from "../../common-component/AppliedFilterBar";
import {getStatus, Role} from "../../../utils";
import {getUserRole} from "../../../controller/localStorageHandler";
import moment from "moment";

const {Search} = Input;
const pagination = Pagination;
pagination.pageSize = 25;


class DistributorProfileList extends Component {

    state = {
        data: null,
        pagination: pagination,
        loading: false,
        params: {},
        popup: {
            visible: false,
            x: 0, y: 0
        },
    };


    printProfilePDF = (id) => {
        this.setState({loading: true});
        DistributorProfilePdfGetOne(id)
            .then(response => {
                this.setState({loading: false});
                window.open((response.url));
            }).catch(e => {
            this.setState({loading: false});
            message.error('Error in downloading! Please try later.');
        })
    };


    columns = () => {
        const {t} = this.props;
        return [
            {
                title: t('print'),
                key: "print",
                render: (record) => {
                    return <React.Fragment>
                        <Button onClick={(e) => {
                            e.stopPropagation();
                            this.printProfilePDF(record.id)
                        }
                        }
                                className="bg-transparent border-0 shadow-none p-0 text-primary font-weight-normal text-capitalize">{t('print')}
                        </Button>
                    </React.Fragment>
                }
            }, {
                title: "id",
                dataIndex: 'id',
                sorter: true
            }, {
                title: t('date_created'),
                dataIndex: 'created_at',
                key: "created_at",
                render: (created_at) => moment(created_at).format('DD/MM/YYYY'),
                sorter: true
            }, {
                title: "Groupe",
                dataIndex: 'group.title',
                key: "group",
                render: (data) => data ? data : "-",
                sorter: true
            }, {
                title: "Centrale",
                dataIndex: 'centrale',
                key: "centrale",
                sorter: true,
                render: (data) => data ? data.title : "-"
            }, {
                title: t('type_distributor'),
                sorter: true,
                key: 'client_type',
                render: (item) => `${item.client_type.title} ${item.client_type.title === "Centrale" ? `(${item.centrale ? item.centrale.title : ""})` : ""}`
            },
            {
                title: t('name'),
                dataIndex: 'client_name',
                render: (data) => data ? data : "-",
                sorter: true,
            }, {
                title: t('representative'),
                key: 'sales_representative',
                render: (record) => record.sales_representative ? `${record.sales_representative.first_name} ${record.sales_representative.last_name}` : '-',
                sorter: true,
            }, {
                title: `Etat/Departement du distributeur`,
                sorter: true,
                key: "department",
                render: (record) => record.department ? record.department : "-"
            }, {
                title: t('rank'),
                dataIndex: 'client_rank',
                render: (data) => data ? data : "-",
                sorter: true,
            }, {
                title: t('status'),
                dataIndex: '',
                sorter: true,
                render: data => (<div>
                    {`${getStatus[data.status]} (${moment(data.status_changed_date).format('DD/MM/YYYY')})`}

                </div>)
            }, {
                title: t('country'),
                dataIndex: 'address[0].country',
                sorter: true,
                key: 'country'
            }, {
                title: "Siége social",
                dataIndex: 'address',
                sorter: true,
                key: 'sierge_address',
                render: addresses => addresses.find(a => a.type === "Siège social")?.title
            }
        ];
    };
    componentDidUpdate = () => {
        let wrapper1 = document.getElementsByClassName("ant-table-footer")[0];
        let wrapper2 = document.getElementsByClassName("ant-table-body")[0];
        if (wrapper1 && wrapper2) {
            wrapper1.scrollLeft += 475;
            wrapper2.scrollLeft += 400;
            wrapper1.onscroll = function () {
                wrapper2.scrollLeft = wrapper1.scrollLeft;
            };
            wrapper2.onscroll = function () {
                wrapper1.scrollLeft = wrapper2.scrollLeft;
            };
        }
    }
    handleChange = (pagination, filters, sorter) => {
        let {params} = this.state;
        let symbol = sorter.order === 'descend' ? '-' : '';
        params = {...params, page: pagination.current, ordering: `${symbol}${sorter.columnKey}`};
        this.setState({params});
        this.fetch(params)
    };

    componentDidMount() {
        this.fetch();
    }

    fetch(params = {}) {
        this.fetchDistributor(params)
    }

    fetchDistributor = (params) => {
        params = {...this.state.params, ...params}
        const values = this.properParams(params)
        this.setState({loading: true, params: params});
        distributorProfileGet(values)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.count;
                this.setState({data: response.data, pagination, loading: false})
            })
    };

    resetFilter = () => {
        this.setState({params: {}}, () => this.fetchDistributor({}))
    }

    properParams = ({...params}) => {
        let keys = Object.keys(params)
        keys.forEach(key => {
            if (typeof params[key] === "undefined")
                delete params[key]
            else if (params[key].key)
                params[key] = params[key].key
        })
        return params
    }

    getFilterData() {
        const {t} = this.props;
        let {params} = this.state;
        if (Object.keys(params).length) {
            return {
                params,
                'names': {
                    'rank': t('rank'),
                    'pays': t('country'),
                    'client_type': t('type_distributor'),
                    'sales_representative': t('representative'),
                    'email': t('Email'),
                    'city': t('Ville'),
                    'status': t('status'),
                    'zip_code': t('Code postal'),
                    'group': t('Groupe'),
                    'name': t('Nom du distributeur'),
                    'department': t('Etat/Departement du distributeur'),
                    'sierge_address': "Siège social"
                }
            }
        } else
            return {params}
    }

    render() {
        const {t} = this.props;
        const user_role = getUserRole();
        const {data, pagination, loading, popup} = this.state;
        return (
            <React.Fragment>
                <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                    <AppliedFilterBar {...this.getFilterData()} />
                    <div className="container-fluid">
                        <div className="row w-100 m-0 common-heading-details mb-3">
                            <div className="col-sm-6 col-md-7 col-12 p-0">

                                <div className="row mx-0 flex-align-center">
                                    <h4 className="mb-0 font-weight-bold text-uppercase mr-4"> {t('profile_distributor')}</h4>
                                    <Role allow={['admin']}>
                                        <Link to={reverse(routes.dashboard.profiles.distributor.method, {
                                            method: methods.create
                                        })}
                                              type="primary"
                                              className="plus-btn text-uppercase main-btn-tag flex-align-center text-white font-weight-bold pl-2 pr-3">
                                            <img alt={""} src={Images.plus_icon_white}/> {t('create_distributor')}
                                        </Link>
                                    </Role>
                                </div>

                            </div>
                            <div className="col-sm-6 col-md-5 col-12 p-0">
                                <div className="row mx-0 filter-row">
                                    <div className="filter-main-div">
                                        <Popover overlayClassName="profile-filter filter-main-common"
                                                 content={<ProfileFilter resetFilter={this.resetFilter}
                                                                         onFilter={this.fetchDistributor}/>}
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
                        <div className="row w-100 m-0 position-relative">
                            <div className="col-12 p-0">
                                <div className="listing-table when-pagination-true">
                                    <Table
                                        className="responsive-table table-responsive main-table dashboard-table table table-hover table-custom dashboard-table"
                                        columns={this.columns()}
                                        dataSource={data}
                                        loading={loading}
                                        pagination={pagination}
                                        onChange={this.handleChange}
                                        rowKey={data => `profile_${data.id}`}
                                        size="middle"
                                        rowClassName={record => !record.status ? "inactive-profile" : ""}
                                        locale={{
                                            emptyText: (
                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                       description={t('no_data')}/>)
                                        }}
                                        onRow={(record) => {
                                            return {
                                                onClick: () => {
                                                    user_role === 'sales_person' ? history.push(reverse(routes.dashboard.distributor.view, {
                                                            id: record.id,

                                                        }), {profile: record})
                                                        :
                                                        history.push(reverse(routes.dashboard.profiles.distributor.method, {
                                                            method: methods.view,
                                                            id: record.id,

                                                        }), {profile: record})
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
                                                            x: e.pageX,
                                                            y: e.pageY
                                                        }
                                                    })
                                                }
                                            };
                                        }}
                                        footer={() => (
                                            // <div className="ant-table-body">
                                            <div id="div1"/>
                                            // </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {popup.visible && <ul className={'popup'} style={{left: `${popup.x}px`, top: `${popup.y}px`}}>
                    <li onClick={() => window.open(reverse(routes.dashboard.profiles.distributor.method, {
                        method: methods.view,
                        id: popup.record.id
                    }), '_blank')}>Ouvrir dans un nouvel onglet
                    </li>
                </ul>}
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(DistributorProfileList));
