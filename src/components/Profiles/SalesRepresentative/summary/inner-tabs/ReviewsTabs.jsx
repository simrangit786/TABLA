import React, {Component} from "react";
import {Button, DatePicker, Empty, Form, Select, Spin, Table} from "antd";
import {withTranslation} from "react-i18next";
import {distributorWorkorderGet, RevenueAnalyticsGet,} from "../../../../../controller/API/salesOperationAPI";
import {distributorProfileGet, salesRepresentativeGet,} from "../../../../../controller/API/profileApi";
import {colourListGet, itemCategoryGet, variantGet,} from "../../../../../controller/API/itemApi";
import {productGet} from "../../../../../controller/API/itemApi";

import moment from "moment";
import CanvasJSReact from "../../../../canvas/canvasjs.react";
import {debounce} from "lodash";


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const {Option} = Select;

class ReviewsTabs extends Component {
    state = {
        all_workorder: [],
        loading: false,
        selectedCat: {key: null},
        data_loading: false,
        salesValue: [],
        all_sales: [],
        clientValue: [],
        all_clients: [],
        colourValue: [],
        all_colours: [],
        categoryValue: [],
        all_category: [],
        all_sku: [],
        tableShow: false,
        varientdata: [],
        revenueData: [],
        productdata: null,
        all_product:[],
        options: {
            backgroundColor: "#FBFBFC",
            fontFamily: "Avenir",
            animationEnabled: true,
            subtitles: [
                {
                    text: "Pas de données",
                    verticalAlign: "center",
                    fontSize: 24,
                    dockInsidePlotArea: true,
                    fontFamily: "Avenir",
                }],
            data: [
                {
                    type: "doughnut",
                    showInLegend: false,
                    color: "#a9a9a9",
                    yValueFormatString: "#,###",
                    dataPoints: [{name: "Pas de données", y: 0.1}],
                },
            ],
            toolTip: {
                enabled: true,
            },
        },
    };

    fetchSales = (params = {}) => {
        salesRepresentativeGet(params).then((all_sales) => {
            this.setState({all_sales, loading: false});
        });
    };

    fetchProduct = (params = {}) => {
        productGet(params)
            .then(response => {
                this.setState({all_product: response.data.results, loading: false})
            })
    };

    handleSales = (salesValue) => {
        this.setState({salesValue});
    };

    fetchClient = (params = {}) => {
        params["ordering"] = "client_name";
        distributorProfileGet(params).then((response) => {
            this.setState({all_clients: response.data, loading: false});
        });
    };

    handleClient = (clientValue) => {
        this.setState({clientValue});
    };

    fetchWorkorder = (params = {}) => {
        distributorWorkorderGet(params).then((response) => {
            this.setState({all_workorder: response.data, loading: false});
        });
    };

    handleChange = (value) => {
        this.setState({value});
    };

    fetchColour = (params = {}) => {
        colourListGet(params).then((all_colours) => {
            this.setState({all_colours, loading: false});
        });
    };

    handleColour = (colourValue) => {
        this.setState({colourValue});
    };

    fetchCategory = (params = {}) => {
        itemCategoryGet(params).then((all_category) => {
            this.setState({all_category, loading: false});
        });
    };

    handleCategory = (categoryValue) => {
        this.setState({categoryValue});
    };

    fetchVarient = (params = {}) => {
        variantGet(params).then((res) => {
            this.setState({all_sku: res.items});
        });
    };

    variantChange = (varientdata) => {
        this.setState({varientdata});
    };

    numberWithSpaces = (data) => {
        var amount = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return amount
    };

    handleFilterForm = (e) => {
        this.setState({revenueData: []})
        e.preventDefault();
        this.setState({loading: true, data_loading: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values["start_date"])
                    values["start_date"] = moment(values["start_date"]).format(
                        "YYYY-MM-DD"
                    );
                if (values["end_date"])
                    values["end_date"] = moment(values["end_date"]).format("YYYY-MM-DD");
                RevenueAnalyticsGet(values).then((res) => {
                    this.setAnalyticsData(res.data.results);
                    this.setState({
                        loading: false,
                        data_loading: false,
                        revenueData: res.data.results,
                        tableShow: true
                    });
                });
            }
        });
    };

    columns = [
        {
            title: "Référence / code :",
            dataIndex: "sku",
            sorter: (a, b) => a.sku.localeCompare(b.sku)

        },
        {
            title: "Catégorie :",
            dataIndex: "category",
            sorter: (a, b) => a.category.localeCompare(b.category)

        },
        {
            title: "Couleur :",
            dataIndex: "colour",
            sorter: (a, b) => a.colour.localeCompare(b.colour)
        },
        {
            title: "QTE",
            dataIndex: "quantity",
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: "Revenue",
            sorter: (a, b) => a.revenue - b.revenue,
            dataIndex: "revenue",
            render: (data) => `€${this.numberWithSpaces(data)}`
            // render: (item) => `${item.client_type.title} ${item.client_type.title === "Centrale" ? `(${item.centrale ? item.centrale.title : ""})` : ""}`
        },
    ];


    setAnalyticsData = (results = null) => {
        let {options} = this.state;
        let dataPoints = [];
        if (results !== null) {
            const revenue = results.reduce((previousValue, currentValue) => previousValue + currentValue.revenue, 0)
            dataPoints = results.map((i, index) => {
                return {
                    "name": i.sku,
                    "y": i.revenue,
                    // "per": 0,
                    "rowIndex": index,
                    "per": ((parseFloat(i.revenue) * 100) / parseFloat(revenue)).toFixed(2)
                }
            })
            options["data"][0]["dataPoints"] = dataPoints;
            options["subtitles"][0]['text'] = `€${this.numberWithSpaces(revenue)}`
            options["data"][0]["yValueFormatString"] = "#,###";
            options["toolTip"]["enabled"] = true;
            options["data"][0]["showInLegend"] = false;
            options['data'][0]['indexLabel'] = "{name}";
            delete options['data'][0]['color'];
            this.setState({options, loading: false});
        } else {
            options["data"][0]["dataPoints"] = [
                {name: `${this.props.t("no_data")}`, y: 100},
            ];
            options["subtitles"][0]["text"] = `${this.props.t("no_data")}`;
            options["data"][0]["yValueFormatString"] = "#,###";
            options["data"][0]["color"] = "#a9a9a9";
            options["toolTip"]["enabled"] = false;
            options['data'][0]['showInLegend'] = false;
            this.setState({options, loading: false});
        }
    };
    productChange = (productdata) => {
        this.setState({productdata})
    }


    onReset = () => {
        this.props.form.resetFields();

        let options = {
            backgroundColor: "#FBFBFC",
            fontFamily: "Avenir",
            animationEnabled: true,
            subtitles: [
                {
                    text: "Pas de données",
                    verticalAlign: "center",
                    fontSize: 24,
                    dockInsidePlotArea: true,
                    fontFamily: "Avenir",
                },
            ],
            data: [
                {
                    type: "doughnut",
                    showInLegend: false,
                    color: "#a9a9a9",
                    yValueFormatString: "#,###",
                    dataPoints: [{name: "Pas de données", y: 0.1}],
                },
            ],
            toolTip: {
                enabled: false,
            },
        };

        this.setState({options});
    };

    render() {
        const {all_workorder, loading, value, data_loading, options} = this.state;
        const {all_sales, all_clients, all_sku, all_colours, all_category, all_product} = this.state;
        const {salesValue, clientValue, variantdata, colourValue, categoryValue, productdata} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="row mx-0 py-3">
                <div className="col-md-3 col-sm-3 col-12 col-lg-3">
                    <Form>
                        <div className="row ana-li-que-row-graph-new border-0">
                            <div className="col-12">
                                <Form.Item>
                                    <label
                                        className="mb-0"
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: "#000000",
                                        }}
                                    >
                                        Représentants :
                                    </label>
                                    {getFieldDecorator(
                                        "sales_rep",
                                        {}
                                    )(
                                        <Select
                                            showAction={["focus", "click"]}
                                            value={salesValue}
                                            // onSearch={(value) => this.fetchSales({search: value})}
                                            onSearch={debounce((value) => this.fetchSales({search: value}), 700)}
                                            showSearch
                                            optionFilterProp="children"
                                            onFocus={() => this.fetchSales()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleSales(val)}
                                            placeholder={"Tout"}
                                        >
                                            <Option key={0} value="">
                                                Tout
                                            </Option>
                                            {all_sales.map((d, index) => (
                                                <Option
                                                    key={`sales_representative_${index}`}
                                                    value={d.id}
                                                >{`${d.first_name} ${d.last_name}`}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label
                                        className="mb-0"
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: "#000000",
                                        }}
                                    >
                                        Distributeurs :
                                    </label>
                                    {getFieldDecorator(
                                        "client",
                                        {}
                                    )(
                                        <Select
                                            showAction={["focus", "click"]}
                                            value={clientValue}
                                            // onSearch={(value) => this.fetchClient({search: value})}
                                            onSearch={debounce((value) => this.fetchClient({search: value}), 700)}
                                            showSearch
                                            optionFilterProp="children"
                                            onFocus={() => this.fetchClient()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleSales(val)}
                                            placeholder={"Tout"}
                                        >
                                            <Option key={0} value="">
                                                Tout
                                            </Option>
                                            {all_clients.map((d, index) => (
                                                <Option key={`client_${d.id}`} value={d.id}>
                                                    {d.client_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <label
                                    className="mb-0"
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        color: "#000000",
                                    }}
                                >
                                    Date :
                                </label>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <Form.Item>
                                            {getFieldDecorator(
                                                "start_date",
                                                {}
                                            )(<DatePicker placeholder={"dd/mm/yyyy"}/>)}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <Form.Item>
                                            {getFieldDecorator(
                                                "end_date",
                                                {}
                                            )(<DatePicker placeholder={"dd/mm/yyyy"}/>)}
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label
                                        className="mb-0"
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: "#000000",
                                        }}
                                    >
                                        Bons de commandes ID:
                                    </label>
                                    {getFieldDecorator(
                                        "workorder_id",
                                        {}
                                    )(
                                        <Select
                                            style={{width: "100%"}}
                                            showAction={["focus", "click"]}
                                            value={value}
                                            onSearch = {debounce((value) => this.fetchWorkorder({search: value}), 700)}
                                            showSearch
                                            onFocus={() => this.fetchWorkorder()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleChange(val)}
                                            placeholder="Tout"
                                        >
                                            <Option key={0} value="">
                                                Tout
                                            </Option>
                                            {all_workorder.map((d, index) => (
                                                <Option key={index} value={d.id}>
                                                    {d.id}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            {/* <div className="col-12">

                                <label style={{ fontWeight: '500', fontSize: '14px', color: '#000000' }}>Net HT ou Net TTC (Hors éco-part)? :</label>


                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Tout">
                                    <Option key={'1'} value={null}>Tout</Option>
                                    <Option key={'2'} value={'year'}>Tout</Option>
                                    <Option key={'3'} value={'month'}>Tout</Option>
                                </Select>

                            </div> */}
                            {/* <div className="col-12">
                                <label style={{ fontWeight: '500', fontSize: '14px', color: '#000000' }}>Factures :</label>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Tout">
                                    <Option key={'1'} value={null}>Tout</Option>
                                    <Option key={'2'} value={'year'}>Tout</Option>
                                    <Option key={'3'} value={'month'}>Tout</Option>
                                </Select>
                            </div> */}
                            <div className="col-12">
                                <Form.Item>
                                    <label
                                        className="mb-0"
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: "#000000",
                                        }}
                                    >
                                        Couleur :
                                    </label>
                                    {getFieldDecorator(
                                        "colour",
                                        {}
                                    )(
                                        <Select
                                            value={colourValue}
                                            showSearch
                                            optionFilterProp="children"
                                            showAction={["focus", "click"]}
                                            onSearch = {debounce((value) => this.fetchColour({search: value}), 700)}
                                            onFocus={() => this.fetchColour()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleColour(val)}
                                            placeholder={"Tout"}
                                        >
                                            <Option key={0} value="">
                                                Tout
                                            </Option>
                                            {all_colours.map((d, index) => (
                                                <Option key={`colour_${index}`} value={d}>
                                                    {d}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label
                                        className="mb-0"
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: "#000000",
                                        }}
                                    >
                                        Catégorie :
                                    </label>
                                    {getFieldDecorator(
                                        "category",
                                        {}
                                    )(
                                        <Select
                                            showSearch
                                            value={categoryValue}
                                            showAction={["focus", "click"]}
                                            onFocus={() => this.fetchCategory()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleCategory(val)}
                                            onSearch={(value) =>
                                                this.fetchCategory({search: value})
                                            }
                                            optionFilterProp="children"
                                            // autoFocus={method === methods.create}
                                            placeholder={"Tout"}
                                        >
                                            <Option key={0} value="">
                                                Tout
                                            </Option>
                                            {all_category.map((d, index) => (
                                                <Option key={`dba_${index}`} value={d.id}>
                                                    {d.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>FAMILLE :
                                        </label>
                                    {getFieldDecorator('product_type', {})(
                                        <Select
                                            showAction={["focus", "click"]}
                                            value={productdata}
                                            onSearch={(value) => this.fetchProduct({search: value})}
                                            showSearch
                                            optionFilterProp="children"
                                            onFocus={() => this.fetchProduct()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.productChange(val)}
                                            placeholder={'Tout'}>
                                            <Option key={0} value="">Tout</Option>
                                            {all_product.map((d, index) => <Option key={index}
                                                                                   value={d.id}> {d.name}</Option>)}

                                        </Select>)}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label
                                        className="mb-0"
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: "#000000",
                                        }}
                                    >
                                        Référence / code :
                                    </label>
                                    {getFieldDecorator(
                                        "sku",
                                        {}
                                    )(
                                        <Select
                                            showAction={["focus", "click"]}
                                            value={variantdata}
                                            onSearch = {debounce((value) => this.fetchVarient({search: value}), 700)}
                                            showSearch
                                            optionFilterProp="children"
                                            onFocus={() => this.fetchVarient()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.variantChange(val)}
                                            placeholder={"Tout"}
                                        >
                                            <Option key={0} value="">
                                                Tout
                                            </Option>
                                            {all_sku.map((d, index) => (
                                                <Option key={index} value={d.sku}>
                                                    {d.sku}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                        </div>
                        <Button
                            onClick={this.handleFilterForm}
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className="mr-3 mt-3 col-12"
                            style={{background: "#3E65B0"}}
                        >
                            APPLIQUER LE FILTRE
                        </Button>
                        <Button
                            onClick={this.onReset}
                            type="primary"
                            htmlType="submit"
                            className="mr-3 mt-2 col-12"
                            style={{background: "#BDBDBD", borderColor:'#BDBDBD'}}
                        >
                            Réinitialiser
                        </Button>
                    </Form>
                </div>
                <div className="col-md-9 col-sm-9 col-12 col-lg-9">
                    <div
                        className="row ana-li-que-row-graph border-0 pb-0 h-100 align-items-center justify-content-center">
                        {data_loading ? <Spin/> : <CanvasJSChart options={options}/>}
                        <div className="listing-table when-pagination-true">
                            {this.state.tableShow ?
                                <Table
                                    className="responsive-table table-responsive main-table dashboard-table table table-hover table-custom dashboard-table"
                                    columns={this.columns}
                                    dataSource={this.state.revenueData}
                                    size="middle"
                                    pagination={false}
                                    locale={{
                                        emptyText: (
                                            <Empty
                                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                description={"No Data"}
                                            />
                                        ),
                                    }}
                                /> : " "}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation("common")(
    Form.create({name: "revenueAnalytics"})(ReviewsTabs)
);
