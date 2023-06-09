import React, {Component} from "react";
import {Button, Form, Select, Spin, Tabs} from "antd";
import {InvoiceAnalyticsGet,} from "../../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";
import {Image as Images} from "../../../../Images";
import {
    distributorProfileGet,
    salesProfileOrderGet,
    salesRepresentativeGet,
} from "../../../../../controller/API/profileApi";
import BarChartTableData from "../../analytique/year/BarChartTableData";
import BarChartMain from "../../analytique/year/BarChartMain";
import LineChartMain from "../../analytique/year/LineChartMain";
import {showErrors} from "../../../../../controller/utils";


const {Option} = Select;
const {TabPane} = Tabs;

class FacturesAnalyticsTabs extends Component {
    state = {
        loading: false,
        data: {},
        tableData: "",
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
                enabled: true,
            },
        },
        salesValue: [],
        all_sales: [],
        clientValue: [],
        all_clients: [],
        Year: [],
    };

    fetchSales = (params = {}) => {
        salesRepresentativeGet(params).then((all_sales) => {
            this.setState({all_sales, loading: false});
        });
    };

    fetchSalesProfileOrderData = (params) => {
        this.setState({loading: true});
        salesProfileOrderGet(params)
            .then((response) => {
                this.setState((prevState) => ({
                    graphTab: {
                        ...prevState.graphTab,
                        data: response.data,
                        loading: false,
                    },
                }));
            })
            .catch((error) => {
                showErrors(error.response.data);
                this.setState({loading: false});
            });
    };

    handleSales = (salesValue) => {
        this.setState({salesValue});
    };

    handleYear = (value) => {
        this.setState({Year: value});
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

    handleFilterForm = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!values.year) {
                    values.year = "2021-2022";
                }
                InvoiceAnalyticsGet(values).then((res) => {
                    this.setState({tableData: res.data});
                    this.setState({loading: false});
                });
            }
        });
    };

    setAnalyticsData = (results = null) => {
        let {options} = this.state;

        if (results > 0) {
            options["data"][0]["dataPoints"] = [
                {name: "number of BONS DE COMMANDES", y: results},
            ];
            options["subtitles"][0]["text"] = `${results}`;
            options["toolTip"]["enabled"] = true;
            options["data"][0]["yValueFormatString"] = "#";
            options["data"][0]["color"] = "#4F81BC";
            this.setState({options, loading: false});
        } else {
            options["data"][0]["dataPoints"] = [
                {name: `${this.props.t("no_data")}`, y: 0.1},
            ];
            options["subtitles"][0]["text"] = "Pas de données";
            options["data"][0]["yValueFormatString"] = "#,###";
            options["data"][0]["color"] = "#a9a9a9";
            options["toolTip"]["enabled"] = false;
            this.setState({options, loading: false});
        }
    };
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
        const {getFieldDecorator} = this.props.form;
        const {all_sales, all_clients} = this.state;
        const {salesValue, clientValue} = this.state;
        const {loading} = this.state;

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
                                        Années :
                                    </label>
                                    {getFieldDecorator(
                                        "year",
                                        {}
                                    )(
                                        <Select
                                            showAction={["focus", "click"]}
                                            // value={salesValue}
                                            // onSearch={(value) => this.fetchSales({ search: value })}
                                            showSearch
                                            optionFilterProp="children"
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleYear(val)}
                                            placeholder={"2021-2022"}
                                        >
                                            <Option key={0} value="2017-2018">
                                                2017-2018
                                            </Option>
                                            <Option key={1} value="2018-2019">
                                                2018-2019
                                            </Option>
                                            <Option key={2} value="2019-2020">
                                                2019-2020
                                            </Option>
                                            <Option key={3} value="2020-2021">
                                                2020-2021
                                            </Option>
                                            <Option key={4} value="2021-2022">
                                                2021-2022
                                            </Option>
                                            <Option key={5} value="2022-2023">
                                                2022-2023
                                            </Option>
                                        </Select>
                                    )}
                                </Form.Item>
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
                                            onSearch={(value) => this.fetchSales({search: value})}
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
                                            onSearch={(value) => this.fetchClient({search: value})}
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
                                <Form.Item>
                                    <label
                                        className="mb-0"
                                        style={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            color: "#000000",
                                        }}
                                    >
                                        Type de commande :
                                    </label>
                                    {getFieldDecorator(
                                        "order_type",
                                        {}
                                    )(
                                        <Select style={{width: "100%"}} placeholder="Tout">
                                            <Option key={"1"} value="">
                                                Tout
                                            </Option>
                                            <Option key={"2"} value={"store_display"}>
                                                Implantation
                                            </Option>
                                            <Option key={"3"} value={"stock"}>
                                                Stock
                                            </Option>
                                            <Option key={"3"} value={"expo"}>
                                                Expo
                                            </Option>
                                            <Option key={"3"} value={"customer_purchase"}>
                                                Contremarque
                                            </Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            {/* <div className="col-12">
                            <label className='mb-0' style={{ fontWeight: '500', fontSize: '14px', color: '#000000' }}>Date de creation :</label>
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <Form.Item>

                                        {getFieldDecorator('start_date', {})(<DatePicker placeholder={'dd/mm/yyyy'} />)}

                                    </Form.Item>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <Form.Item>
                                        {getFieldDecorator('end_date', {})(<DatePicker placeholder={'dd/mm/yyyy'} />)}
                                    </Form.Item>
                                </div>
                            </div>
                        </div> */}
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
                    {/* <div className="row ana-li-que-row-graph border-0 pb-0 h-100 align-items-center justify-content-center">
                    {loading ? <Spin /> : <CanvasJSChart options={options} />}
                </div> */}
                    <Tabs
                        className="tab-graph-sales-main tab-graph-custom-2"
                        defaultActiveKey="1"
                    >
                        <TabPane
                            tab={
                                <img
                                    src={Images.icon_calculator_primary}
                                    alt=""
                                    className="img-fluid"
                                />
                            }
                            key="1"
                        >
                            {this.state.tableData ? (
                                <BarChartTableData priceSymbol data={this.state.tableData}/>
                            ) : (
                                " "
                            )}
                        </TabPane>
                        <TabPane
                            tab={
                                <img
                                    src={Images.bar_chart_icon_primary}
                                    alt=""
                                    className="img-fluid"
                                />
                            }
                            key="2"
                        >
                            {this.state.tableData ? (
                                <BarChartMain data={this.state.tableData}/>
                            ) : (
                                ""
                            )}
                        </TabPane>
                        <TabPane
                            tab={
                                <img
                                    src={Images.line_chart_icon_primary}
                                    alt=""
                                    className="img-fluid"
                                />
                            }
                            key="3"
                        >
                            {this.state.tableData ? (
                                <LineChartMain data={this.state.tableData}/>
                            ) : (
                                ""
                            )}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default withTranslation("common")(
    Form.create({name: "revenueAnalytics"})(FacturesAnalyticsTabs)
);
