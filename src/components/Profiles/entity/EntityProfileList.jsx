import React, {Component} from 'react';
import {Empty, Input, Pagination, Table} from 'antd';
import {Link} from "react-router-dom";
import {routes} from "../../../controller/routes";
import {reverse} from "named-urls";
import {methods} from "../../../controller/Global";
import {withTranslation} from "react-i18next";
import {history} from "../../../controller/history";
import {Image as Images} from "../../Images";
import {getWorkOrderEntity} from "../../../controller/API/salesOperationAPI";

const {Search} = Input;
const pagination = Pagination;
pagination.pageSize = 25;


class EntityProfileList extends Component {

    state = {
        data: null,
        pagination: pagination,
        loading: false,
        params: {}
    };
    columns = () => {
        const {t} = this.props;
        return [
            {
                title: t('name'),
                dataIndex: 'name',
                sorter: true
            },
            {
                title: t('legal_form'),
                dataIndex: 'legal_form'
            },
            {
                title: 'RCS',
                dataIndex: 'rcs'
            },
            {
                title: 'Siret',
                dataIndex: 'siret'
            },
            {
                title: 'N/Id Cee',
                dataIndex: 'nidcee'
            }
        ];
    };
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
        this.fetchGroup(params)
    }

    fetchGroup = (params) => {
        this.setState({loading: true, params});
        getWorkOrderEntity(params)
            .then(response => {
                let {pagination} = this.state;
                pagination.total = response.count;
                this.setState({data: response.data.results, pagination, loading: false})
            })
    };


    render() {
        const {t} = this.props;
        const {data, pagination, loading} = this.state;
        return (
            <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                <div className="container-fluid">
                    <div className="row w-100 m-0 common-heading-details mb-3">
                        <div className="col-sm-6 col-md-7 col-12 p-0">
                            <div className="row mx-0 flex-align-center">
                                <h4 className="mb-0 font-weight-bold text-uppercase mr-4"> {t('profiles_entities')}</h4>
                                <Link to={reverse(routes.dashboard.profiles.entity.method, {
                                    method: methods.create
                                })}
                                      type="primary"
                                      className="plus-btn text-uppercase main-btn-tag flex-align-center text-white font-weight-bold pl-2 pr-3">
                                    <img src={Images.plus_icon_white}/> {t('create_profile_entity')}</Link>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-5 col-12 p-0">
                            <div className="row mx-0 filter-row">
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
                            <div className="listing-table table-responsive when-pagination-true">
                                <Table
                                    className="responsive-table table table-hover table-custom"
                                    columns={this.columns()}
                                    dataSource={data}
                                    loading={loading}
                                    pagination={pagination}
                                    onChange={this.handleChange}
                                    rowKey={data => `profile_${data.id}`}
                                    size="middle"
                                    locale={{
                                        emptyText: (
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('no_data')}/>)
                                    }}
                                    onRow={(record) => {
                                        return {
                                            onClick: () => {
                                                history.push(reverse(routes.dashboard.profiles.entity.method, {
                                                    method: methods.view,
                                                    id: record.id,
                                                }))
                                            },
                                        };
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(EntityProfileList));
