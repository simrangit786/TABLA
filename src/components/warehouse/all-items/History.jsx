import React, {Component} from 'react';
import {Button, Table} from "antd";
import {Image as Images} from "../../Images";

class History extends Component {
    columns = [
        {
            title: 'Imprimer',
            dataIndex: 'imprimer',
            render: (data) => {
                return <span>{data}</span>
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (data) => {
                return <span>{data}</span>
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (data) => {
                return <span className="text-uppercase">{data}</span>
            }
        },
    ];
    data = [
        {
            key: '1',
            imprimer: '',
            description: 'UPDATE STOCK :150',
            date: '2019-09-12',
        }, {
            key: '2',
            imprimer: '',
            description: <div>
                10 item was added to work orde 123-456-7890
            </div>,
            date: '2019-09-12',
        }, {
            key: '3',
            imprimer: "",
            description: <div>
                Edited Item
            </div>,
            date: '2019-09-12',
        }, {
            key: '4',
            imprimer: <Button className="bg-transparent h-auto border-0 rounded-0 shadow-none p-0">
                <img src={Images.print_icon} alt="print icon" className="img-fluid"/>
            </Button>,
            description: <div>
                Barcode was added
            </div>,
            date: '2019-09-12',
        }, {
            key: '5',
            imprimer: '',
            description: <div>
                Item was created
            </div>,
            date: '2019-09-12',
        },
    ];

    render() {
        return (
            <div className="row summary-info-row mx-0">
                <div className="col-12 py-5 px-4">
                    <div className="listing-table-second table-responsive">
                        <Table
                            className="responsive-table table table-hover table-custom"
                            columns={this.columns}
                            dataSource={this.data}
                            pagination={true}
                            size="middle"
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default History;