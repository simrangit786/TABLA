import React, {Component} from 'react';
import {Button, Dropdown, InputNumber, Menu, Table} from "antd";
import {Image as Images} from "../../../Images";
import ItemDetailsModal from "../../../modal/work-order/ItemDetailsModal";

function onChange(value) {
}

class AddItemListView extends Component {
    state = {
        itemDetailsShow: false,
    };
    menu = (
        <Menu>
            <Menu.Item key="0">
                <span style={{backgroundColor: '#F7B257'}} className="color-card d-inline-block active"/>
            </Menu.Item>
            <Menu.Item key="1">
                <span style={{backgroundColor: '#C4BCB1'}} className="color-card d-inline-block"/>
            </Menu.Item>
            <Menu.Item key="2">
                <span style={{backgroundColor: '#B6BABD'}} className="color-card d-inline-block"/>
            </Menu.Item>
            <Menu.Item key="3">
                <span style={{backgroundColor: '#A2CAE9'}} className="color-card d-inline-block"/>
            </Menu.Item>
            <Menu.Item key="4">
                <span style={{backgroundColor: '#E9C4A2'}} className="color-card d-inline-block"/>
            </Menu.Item>
        </Menu>
    );
    data = [
        {
            key: '1',
            family: 'Furtif',
            product_reference: 'BC.FUR-MR',
            price: '$125.95',
            category: "Chaise",
            in_stock: "42",
            delivered: "10/26/2019",
            color: "#aaaaaa",
            amount: '3',
            add: 'Ajouter',
        },
        {
            key: '2',
            family: 'Furtif',
            product_reference: 'BC.FUR-MR',
            price: '$125.95',
            category: "Chaise",
            in_stock: "42",
            delivered: "10/26/2019",
            color: "#aaaaaa",
            amount: '3',
            add: 'Ajouter',
        },
        {
            key: '3',
            family: 'Furtif',
            product_reference: 'BC.FUR-MR',
            price: '$125.95',
            category: "Chaise",
            in_stock: "42",
            delivered: "10/26/2019",
            color: "#aaaaaa",
            amount: '3',
            add: 'Ajouter',
        }, {
            key: '4',
            family: 'Furtif',
            product_reference: 'BC.FUR-MR',
            price: '$125.95',
            category: "Chaise",
            in_stock: "42",
            delivered: "10/26/2019",
            color: "#aaaaaa",
            amount: '3',
            add: 'Ajouter',
        }, {
            key: '5',
            family: 'Furtif',
            product_reference: 'BC.FUR-MR',
            price: '$125.95',
            category: "Chaise",
            in_stock: "42",
            delivered: "10/26/2019",
            color: "#aaaaaa",
            amount: '3',
            add: 'Ajouter',
        }, {
            key: '6',
            family: 'Furtif',
            product_reference: 'BC.FUR-MR',
            price: '$125.95',
            category: "Chaise",
            in_stock: "42",
            delivered: "10/26/2019",
            color: "#aaaaaa",
            amount: '3',
            add: 'Ajouter',
        }, {
            key: '7',
            family: 'Furtif',
            product_reference: 'BC.FUR-MR',
            price: '$125.95',
            category: "Chaise",
            in_stock: "42",
            delivered: "10/26/2019",
            color: "#aaaaaa",
            amount: '3',
            add: 'Ajouter',
        },
    ];
    columns = [
        {
            title: 'Famille',
            dataIndex: 'family',
            render: () => {
                return <span>Furtif</span>
            }

        }, {
            title: 'Référence produit',
            dataIndex: 'product_reference',
            render: () => {
                return <span className="text-secondary">BC.FUR-MR</span>
            }
        }, {
            title: 'Prix',
            dataIndex: 'price',
            render: () => {
                return <div>
                    <small className="d-inline-block w-100" style={{color: '#646464'}}>$125.95</small>
                    <span className="text-primary font-weight-bold">$125.95</span>
                </div>
            }
        }, {
            title: 'Catégorie',
            dataIndex: 'category',
            render: () => {
                return <span className="text-secondary">Chaise</span>
            }
        }, {
            title: 'En stock',
            dataIndex: 'in_stock',
            render: () => {
                return <span className="text-secondary">42</span>
            }
        }, {
            title: 'Livré au plus tôt',
            dataIndex: 'delivered',
            render: () => {
                return <span className="text-secondary">10/26/2019</span>
            }
        }, {
            title: 'Couleur',
            dataIndex: 'color',
            render: () => {
                return <Dropdown overlayClassName="list-color-options" placement='bottomCenter' overlay={this.menu}
                                 trigger={['click']}>
                    <Button className="ant-dropdown-link p-0 border-0 shadow-none bg-transparent"
                            style={{height: "auto"}}>
                        <img className="img-fluid" alt="color_option" src={Images.color_options}/>
                    </Button>
                </Dropdown>
            },
            onCell: () => {
                return {
                    onClick: event => {
                        event.stopPropagation()
                    },
                };
            }
        }, {
            title: 'Quantité',
            dataIndex: 'amount',
            render: () => {
                return <InputNumber min={1} max={10} defaultValue={1} onChange={onChange}/>
            },
            onCell: () => {
                return {
                    onClick: event => {
                        event.stopPropagation()
                    },
                };
            }
        }, {
            title: 'Ajouter',
            dataIndex: 'add',
            render: () => {
                return <span className="text-primary">Ajouter</span>
            }
        },
    ];

    itemDetailsVisible = (visible) => {
        this.setState({
            itemDetailsShow: visible,
        })
    };

    render() {
        return (
            <React.Fragment>
                <div className="row mx-0 list-item-card-row">
                    <div className="col-12 p-0">
                        <div className="listing-table table-responsive add-item-list">
                            <Table
                                onRow={() => {
                                    return {
                                        onClick: event => {
                                            this.itemDetailsVisible(true, event)
                                        },
                                    };
                                }}
                                className="responsive-table table table-hover table-custom"
                                columns={this.columns}
                                dataSource={this.data}
                                pagination={false}
                                size="middle"
                            />

                        </div>
                    </div>
                </div>
                <ItemDetailsModal visible={this.state.itemDetailsShow} onClose={() => this.itemDetailsVisible(false)}/>
            </React.Fragment>
        );
    }
}

export default AddItemListView;