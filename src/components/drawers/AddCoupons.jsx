import React, {Component} from 'react';
import {Button, Drawer, Input, Switch, Table} from 'antd';
import {Image as Images} from "../Images";

const {Search} = Input;

function onChange(checked) {
}

class AddCoupons extends Component {
    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                sorter: true,
            },
            {
                title: 'Discount',
                dataIndex: 'discount',
                sorter: true,
            }, {
                title: 'Spend',
                dataIndex: 'spend',
                sorter: true,
            }, {
                title: 'Item(s)',
                dataIndex: 'items',
                sorter: true,
            }, {
                title: 'Total Usage',
                dataIndex: 'total_usage',
                sorter: true,
            }, {
                title: 'Expiration Date',
                dataIndex: 'expiration_date',
                sorter: true,
            }, {
                title: 'Total Promotion Reduction',
                dataIndex: 'promotion_reduction',
                sorter: true,
            }, {
                title: 'Add',
                dataIndex: 'add',
                sorter: true,
            },
        ];
        const data = [
            {
                key: '1',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            },
            {
                key: '2',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            },
            {
                key: '3',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            }, {
                key: '4',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            }, {
                key: '5',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            }, {
                key: '6',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            }, {
                key: '7',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            }, {
                key: '8',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            }, {
                key: '9',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            }, {
                key: '10',
                name: 'TablaTwenty',
                type: 'Work Order',
                discount: '50%',
                spend: 'N/A',
                items: 'N/A',
                total_usage: 0,
                expiration_date: 'N/A',
                promotion_reduction: '$0',
                add: <div>
                    <Switch onChange={onChange}/>
                </div>
            },
        ];
        return (
            <Drawer
                title="ADD COUPONS"
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                getContainer={false}
                style={{position: 'fixed'}}
                width="81.3%"
                destroyOnClose={true}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid mr-2"/>
                        <div>FERMER</div>
                    </Button>
                    <div className="col-12 mb-4">
                        <Search
                            className="search-input-div"
                            placeholder="Rechercher des articles"
                            style={{width: "100%"}}
                        />
                    </div>
                    <div className="col-12">
                        <div className="listing-table table-responsive coupon-table-list">
                            <Table
                                className="responsive-table table table-hover table-custom"
                                columns={columns}
                                dataSource={data}
                                pagination={true}
                                size="middle"
                            />

                        </div>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.props.onClose} type="primary">
                            VALIDER
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default AddCoupons;
