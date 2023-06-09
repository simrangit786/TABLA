import { Button, Popover, Input, Table, Empty, Pagination } from 'antd';
import { reverse } from 'named-urls';
import { history } from '../../../controller/history';
import { Image as Images } from "../../Images";
import { withTranslation } from "react-i18next";

import React, { Component } from 'react';
import { routes } from '../../../controller/routes';
import { methods } from '../../../controller/Global';
import { ComponentGet, variantGet } from '../../../controller/API/itemApi';
import ComponentMain from './drawers/ComponentMain';
import ComponentFilter from './modal/ComponentFilter';


const { Search } = Input;
const pagination = Pagination;
pagination.pageSize = 25;

class ComponentList extends Component {
    state = {
        loading: false,
        data: [
            {
                'name': "Nom du composant",
                'type_of_room': "Legs",
                "product_ref": "BC.FUR-MUR",
                "en_stock": "1677 Mettre à jour",
                "price": "€200"
            }
        ],
        pagination: pagination,
        params: {},
        articleVisible: false,
    };
    handleChange = (pagination, filters, sorter) => {
        let { params } = this.state;
        let symbol = sorter.order === 'descend' ? '-' : '';
        params = { ...params, page: pagination.current, ordering: `${symbol}${sorter.columnKey}` };
        this.setState({ params });
        
        this.fetch(params)
    };
    // fetch = (params = {}) => {
    //     this.setState({ loading: true, params });
    //     containerGet(params)
    //         .then(response => {
    //             let { pagination } = this.state;
    //             pagination.total = response.count;
    //             
    //             console.log(response.data,"response.data");
    //             this.setState({ data: response.data, pagination, loading: false })
    //         })
    // };
    columns = () => {
        const { t } = this.props;
        return [
            {
                title: t('name'),
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: t('type_of_room'),
                dataIndex: 'piece_type',
                key: 'piece_type',
                sorter: false,
            },
            {
                title: t('product_ref'),
                dataIndex: 'sku',
                key: 'sku',
                sorter: true,
            },
            {
                title: t('en_stock'),
                dataIndex: 'in_stock',
                key: 'in_stock',
                sorter: true,
            },
            {
                title: t('price'),
                dataIndex: 'price',
                key: 'price',
                sorter: true,
            },
        ]
    };

    componentDidMount() {
        this.fetch();
        console.log("data > > ", this.state.data)
    }


    fetch = (params = {}) => {
        this.setState({ loading: true, params: { ...params } });
        Object.keys(params).forEach(key => {
            if (params[key])
                params[key] = params[key].key ? params[key].key : params[key]
        });
        ComponentGet(params)
            .then(response => {
                let { pagination } = this.state;
                pagination.total = response.count;
                this.setState({ data: response.items, pagination, loading: false })
            })
    };

    getFilterData() {
        const { t } = this.props;
        let { params } = this.state
        if (Object.keys(params).length) {
            params = { 'delivery_date': `${params['start_date']} -  ${params['end_date']}` }
            return {
                params,
                'names': {
                    'delivery_date': t('delivery_date'),
                }
            }
        } else
            return { params }
    }

    showArticleVisible = (visible) => {
        this.setState({
            articleVisible: visible,
        });
    };

    render() {
        const { t } = this.props;
        const { data, pagination, loading,articleVisible } = this.state;

        return (
            <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">

                <div className="row w-100 m-0 common-heading-details mb-3">
                    <div className="col-sm-6 col-md-7 col-12 p-0">
                        <div className="row mx-0 flex-align-center">
                            <h4 className="mb-0 font-weight-bold text-uppercase mr-4">{t('pending_containers')}</h4>
                            <Button
                                type="primary"
                                onClick={() => this.showArticleVisible(true)}
                                className="plus-btn text-uppercase main-btn-tag flex-align-center text-white font-weight-bold pl-2 pr-3">
                                <img src={Images.plus_icon_white} />{t('create_container_caps')}
                            </Button>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-5 col-12 p-0">
                        <div className="row mx-0 filter-row">
                            <div className="filter-main-div">
                                <Popover overlayClassName="filter-main-common inventory-filter"
                                    content={<ComponentFilter onFilter={this.fetch} type={"component"} />}
                                    title="" trigger="click">
                                    <Button className="ant-dropdown-link border-0"
                                        onClick={e => e.preventDefault()}>
                                        <img alt="filter icon" className="img-fluid"
                                            src={Images.filter_primary} />
                                        <span>Recherche avancée</span>
                                    </Button>
                                </Popover>
                            </div>
                            <div className="top-f-row-search">
                                <Search
                                    placeholder={t('search')}
                                    onSearch={(value) => this.fetch({search: value})}
                                    className="ml-1 flex-align-center"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row w-100 m-0">
                    <div className="col-12 p-0">
                        <div className="listing-table when-pagination-true table-responsive container-table">
                            <Table
                                className="responsive-table table table-hover table-custom"
                                columns={this.columns()}
                                dataSource={data}
                                loading={loading}
                                pagination={pagination}
                                size="middle"
                                rowKey={row => row.id}
                                locale={{
                                    emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        description={t('no_data')} />)
                                }}
                                onChange={this.handleChange}
                                onRow={(record) => {
                                    return {
                                        onClick: () => {
                                            history.push(
                                                reverse(routes.dashboard.warehouse.componentItem, {
                                                    method: methods.view,
                                                    id: record.id,
                                                })
                                            )
                                        },
                                    };
                                }}
                            />
                        </div>
                    </div>
                </div>
                {articleVisible && <ComponentMain method={methods.create} visible={articleVisible}
                    onClose={() => this.showArticleVisible(false)} />}
            </div>
        );
    }
}

export default (withTranslation('common')(ComponentList));
