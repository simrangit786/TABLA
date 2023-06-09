import React, { Component } from 'react';
import { Button, Empty, Input, message, Pagination, Popover, Table } from 'antd';
import { UpdateStock } from "../modal/ware-house/UpdateStock";
import { UpdateTransit } from "../modal/ware-house/UpdateTransit";
import ArticleMain from "../drawers/ArticleMain";
import { withTranslation } from "react-i18next";
import { PDFGetOne, variantGet, variantRemove } from "../../controller/API/itemApi";
import { history } from "../../controller/history";
import { reverse } from "named-urls";
import { routes } from "../../controller/routes";
import { methods } from "../../controller/Global";
import { Image as Images } from "../Images";
import InventoryFilter from "./modal/InventoryFilter";
import { isAccessible, Role } from "../../utils";
import AppliedFilterBar from "../common-component/AppliedFilterBar";
import Imprimer from "../modal/inventory/Imprimer";

const { Search } = Input;
const pagination = Pagination;
pagination.pageSize = 25;


class InventoryManagement extends Component {
    state = {
        updateStock: false,
        updateTransit: false,
        articleVisible: false,
        data: [],
        pagination: pagination,
        loading: false,
        params: {},
        item: null,
        RadioValue: 1,
        popup: {
            visible: false,
            x: 0, y: 0
        },
        visibleImp: false,
        barcode_variant: null,
    };
    showImpModal = (visible, data = null) => {
        this.setState({
            visibleImp: visible,
            barcode_variant: data
        });
    };
    onChange = e => {
        this.setState({
            RadioValue: e.target.value,
        });
    };

    fetch = (params = {}) => {
        this.setState({ loading: true, params: { ...params } });
        Object.keys(params).forEach(key => {
            if (params[key])
                params[key] = params[key].key ? params[key].key : params[key]
        });
        variantGet(params)
            .then(response => {
                let { pagination } = this.state;
                pagination.total = response.count;
                this.setState({ data: response.items, pagination, loading: false })
            })
    };

    onSearch = (value) => {
        this.fetch({ search: value, page: 1 })
    };

    handleChange = (pagination, filters, sorter) => {
        let { params } = this.state;
        let symbol = '';
        if (sorter.order === 'descend')
            symbol = '-';
        params = { ...params, page: pagination.current, ordering: `${symbol}${sorter.columnKey}` };
        this.setState({ params });
        this.fetch(params)
    };

    showPDF = (id) => {
        PDFGetOne(id).then(response => {
            window.open((response.url))
        }).catch(e => {
            message.error('Error in downloading! Please try later.')
        })
    };

    showUpdateStock = (visible, item = null, update = false) => {
        if (!visible && update)
            this.fetch(this.state.params);
        this.setState({
            updateStock: visible,
            item
        });
    };

    showUpdateTransit = (visible, item = null, update = false) => {
        if (!visible && update)
            this.fetch(this.state.params);
        this.setState({
            updateTransit: visible,
            item
        })
    };

    handleDelete = (id) => {
        variantRemove(id)
            .then(() => this.fetch(this.state.params))
    };

    columns = () => {
        const { t } = this.props;
        const columns = [
            {
                title: t('print'),
                sorter: true,
                render: (record) => {
                    return <React.Fragment>
                        <Button onClick={(e) => {
                            e.stopPropagation();
                            this.showImpModal(true, record)
                        }}
                            className="bg-transparent border-0 shadow-none p-0 text-primary font-weight-normal text-capitalize">{t('print')}
                        </Button>
                    </React.Fragment>
                }
            },
            {
                title: t('family'),
                dataIndex: 'product',
                sorter: true,
                render: (product) => {
                    return <span>{product.name}</span>
                }
            },
            {
                title: t('color'),
                dataIndex: 'colour',
                sorter: true,
                render: (colour) => {
                    return <span>{colour}</span>
                }
            },
            {
                title: t('code_sku'),
                sorter: true,
                render: (variant) => {
                    return <span>{variant.sku}-{parseInt(variant.price)}{variant.coupon_price ? `-${parseInt(variant.coupon_price)}` : ""}</span>
                }
            }, {
                title: t('category'),
                dataIndex: 'product',
                sorter: true,
                key: 'category',
                render: (product) => {
                    return <span>{product.category.name}</span>
                }
            }];
        if (isAccessible(['admin'])) {
            columns.push({
                title: t('supplier'),
                dataIndex: 'supplier',
                key: 'supplier',
                sorter: true,
                render: (supplier) => {
                    return <span>{supplier && supplier.company_name}</span>
                }
            })
        }
        columns.push(...[{
            title: t('Prix de vente B2C'),
            sorter: true,
            render: (variant) => <span>{Math.round(variant.sales_price)}</span>
        }, {
            title: t('in_stock'),
            dataIndex: 'in_stock',
            sorter: true,
            render: (in_stock, record) => {
                return isAccessible(['admin'], true) ? <div className="flex-align-center">
                    <span className="mr-2"><i style={{ color: `${in_stock > 0 ? 'green' : 'red'}` }} className="fa fa-circle" />
                    </span>
                </div> : <div className="flex-align-center">
                    <span className="mr-2">{in_stock}</span>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        this.showUpdateStock(true, record)
                    }}
                        className="text-primary bg-transparent text-capitalize font-weight-normal shadow-none rounded-0 border-0 p-0">{t('update')}</Button>
                </div>
            }
        }, {
            title: t('in_production'),
            dataIndex: 'in_transit',
            sorter: true,
            render: (in_transit, record) => {
                return isAccessible(['admin'], true) ? <div className="flex-align-center">
                    <span className="mr-2"><i style={{ color: `${in_transit > 0 ? 'green' : 'red'}` }} className="fa fa-circle" />
                    </span>
                </div> : <div className="flex-align-center">
                    <span className="mr-2">{in_transit}</span>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        this.showUpdateTransit(true, record)
                    }}
                        className="text-primary bg-transparent  shadow-none text-capitalize font-weight-normal rounded-0 border-0 p-0">
                        {t('update')}</Button>
                </div>
            }
        }
        ]);
        // if (isAccessible(['admin'])) {
        //     columns.push({
        //         title: t('barcode'),
        //         dataIndex: 'sku_id',
        //         render: (sku_id, record) => {
        //             return <Button onClick={(e) => {
        //                 e.stopPropagation();
        //                 this.showPDF(record.id)
        //             }}
        //                            className="text-primary bg-transparent  shadow-none text-capitalize font-weight-normal rounded-0 border-0 p-0">
        //                 {t('download')}</Button>
        //         }
        //     },)
        // }
        return columns
    };

    showArticleVisible = (visible) => {
        this.setState({
            articleVisible: visible,
        });
        if (!visible)
            this.fetch(this.state.params)
    };

    componentDidMount() {
        this.fetch()
    }

    getFilterData() {
        const { t } = this.props;
        let { params } = this.state;
        if (Object.keys(params).length) {
            if (params['min_price']) {
                params['selling_price'] = `${params['min_price']} - ${params['max_price']}`;
                delete params['min_price'];
                delete params['max_price']
            }
            return {
                params,
                'names': {
                    'stock': t('Informations inventaire'),
                    'category': t('category'),
                    'selling_price': t('selling_price'),
                    'product': t('family'),
                    'colour': t('color'),
                    'supplier': t('supplier'),
                },
                'values': {
                    'in_stock': t('En stock'),
                    'in_transit': t('En cours d’acheminement'),
                }
            }
        } else
            return { params }
    }

    render() {
        const { t } = this.props;
        const { updateStock, updateTransit, articleVisible, pagination, data, item, loading, popup } = this.state;
        return (
            <React.Fragment>
                <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
                    <AppliedFilterBar {...this.getFilterData()} />
                    <div className="container-fluid">
                        <div className="row w-100 m-0 common-heading-details mb-3">
                            <div className="col-sm-6 col-md-7 col-12 p-0">
                                <div className="row mx-0 flex-align-center">
                                    <h4 className="mb-0 font-weight-bold text-uppercase mr-4">{t('inventory')}</h4>
                                    <Role allow={["admin"]}>
                                        <Button type="primary" onClick={() => this.showArticleVisible(true)}
                                            className="plus-btn text-uppercase main-btn-tag flex-align-center text-white font-weight-bold pl-2 pr-3">
                                            <img src={Images.plus_icon_white} /> {t('create_article')}</Button>
                                    </Role>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-5 col-12 p-0">
                                <div className="row mx-0 filter-row">
                                    <div className="filter-main-div">
                                        <Popover overlayClassName="filter-main-common inventory-filter"
                                            content={<InventoryFilter onFilter={this.fetch} type={"inventory"} />}
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
                                            onSearch={value => this.fetch({ search: value })}
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
                                        pagination={pagination}
                                        loading={loading}
                                        size="middle"
                                        locale={{
                                            emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                description={t('no_data')} />)
                                        }}
                                        onChange={this.handleChange}
                                        rowKey={data => `item_${data.id}`}
                                        onRow={(record) => {
                                            return {
                                                onClick: () => {
                                                    history.push(reverse(routes.dashboard.warehouse.item, {
                                                        method: methods.view,
                                                        id: record.id
                                                    }))
                                                },
                                                onContextMenu: e => {
                                                    e.preventDefault();
                                                    if (!this.state.popup.visible) {
                                                        const that = this;
                                                        document.addEventListener(`click`, function onClickOutside() {
                                                            that.setState({ popup: { visible: false } });
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
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {popup.visible && <ul className={'popup'} style={{ left: `${popup.x}px`, top: `${popup.y}px` }}>
                    <li onClick={() => window.open(reverse(routes.dashboard.warehouse.item, {
                        method: methods.view,
                        id: popup.record.id
                    }), '_blank')}>Ouvrir dans un nouvel onglet

                    </li>
                </ul>}
                {updateStock &&
                    <UpdateStock item={item} visible={updateStock}
                        onClose={(update) => this.showUpdateStock(false, null, update)} />}
                {updateTransit &&
                    <UpdateTransit item={item} visible={updateTransit}
                        onClose={(update) => this.showUpdateTransit(false, null, update)} />}

                {articleVisible && <ArticleMain method={methods.create} visible={articleVisible}
                    onClose={() => this.showArticleVisible(false)} />}

                <Imprimer data={this.state.barcode_variant} visible={this.state.visibleImp}
                    onClose={() => this.showImpModal(false)} />
            </React.Fragment>
        );
    }
}


export default (withTranslation('common')(InventoryManagement));
