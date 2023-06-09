import React, {Component} from 'react';
import {Button, DatePicker, Form, Select, Spin} from "antd";
import {withTranslation} from "react-i18next";
import {getSAVCategories, SavAnalyticsGet} from "../../../../../controller/API/salesOperationAPI";
import {productGet} from "../../../../../controller/API/itemApi";
import {distributorProfileGet, salesRepresentativeGet} from "../../../../../controller/API/profileApi";

import moment from 'moment';
import CanvasJSReact from '../../../../canvas/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const {Option} = Select;

class SalesServiceTabs extends Component {
    state = {
        loading: false,
        all_category: [],
        all_product: [],
        productdata: null,
        categorydata: null,
        all_sales: [],
        clientValue: [],
        all_clients: [],
        data: [],
        options: {
            backgroundColor: '#FBFBFC',
            fontFamily: 'Avenir',
            animationEnabled: true,
            subtitles: [{
                text: 'Pas de données',
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: true,
                fontFamily: 'Avenir',
            }],
            data: [{
                type: "doughnut",
                showInLegend: false,
                color: '#a9a9a9',
                yValueFormatString: "#,###",
                dataPoints: [{"name": "No Data", "y": 0.1},],
            }],
            toolTip: {
                enabled: false
            },
        },

    };


    handleFilterForm = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values['start_date'])
                    values['start_date'] = moment(values['start_date']).format("YYYY-MM-DD")
                if (values['end_date'])
                    values['end_date'] = moment(values['end_date']).format("YYYY-MM-DD")

                SavAnalyticsGet(values).then(res => {
                    this.setAnalyticsData(res.data.total_sav);
                    this.setState({loading: false})
                })
            }
        })
    };

    setAnalyticsData = (results = null) => {
        let {options} = this.state;
        if (results > 0) {
            options['data'][0]['dataPoints'] = [{name: "SAV Count", y: results},];
            options['subtitles'][0]['text'] = `${results}`;
            options['toolTip']['enabled'] = true;
            options['data'][0]['yValueFormatString'] = "#,###";
            options['data'][0]['color'] = '#4F81BC';
            this.setState({options, loading: false});
        } else {
            options['data'][0]['dataPoints'] = [{"name": `${this.props.t("no_data")}`, "y": 0.1},];
            options['subtitles'][0]['text'] = 'Pas de données';
            options['data'][0]['yValueFormatString'] = "#,###";
            options['data'][0]['color'] = '#a9a9a9';
            options['toolTip']['enabled'] = false;
            this.setState({options, loading: false});

        }
    }

    onReset = () => {
        this.props.form.resetFields();
        let options = {
            backgroundColor: '#FBFBFC',
            fontFamily: 'Avenir',
            animationEnabled: true,
            subtitles: [{
                text: 'Pas de données',
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: true,
                fontFamily: 'Avenir',
            }],
            data: [{
                type: "doughnut",
                showInLegend: false,
                color: '#a9a9a9',
                yValueFormatString: "",
                dataPoints: [{"name": "Pas de données", "y": 0.1},],
            }],
            toolTip: {
                enabled: false
            },
        }

        this.setState({options})
    };

    fetchSales = (params = {}) => {
        salesRepresentativeGet(params)
            .then(all_sales => {
                this.setState({all_sales, loading: false})
            })
    };

    handleSales = (salesValue) => {
        this.setState({salesValue})
    }

    fetchClient = (params = {}) => {
        params['ordering'] = 'client_name'
        distributorProfileGet(params)
            .then(response => {
                this.setState({all_clients: response.data, loading: false})
            })
    };

    handleClient = (clientValue) => {
        this.setState({clientValue})
    }

    fetchSAVCategories = (params = {}) => {
        getSAVCategories(params)
            .then(response => {
                this.setState({all_category: response.data, loading: false})
            })
    }

    fetchProduct = (params = {}) => {
        productGet(params)
            .then(response => {
                this.setState({all_product: response.data.results, loading: false})
            })
    };

    categoryChange = (categorydata) => {
        this.setState({categorydata})
    }

    productChange = (productdata) => {
        this.setState({productdata})
    }

    onReset = () => {
        this.props.form.resetFields();
        let options = {
            backgroundColor: '#FBFBFC',
            fontFamily: 'Avenir',
            animationEnabled: true,
            subtitles: [{
                text: 'Pas de données',
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: true,
                fontFamily: 'Avenir',
            }],
            data: [{
                type: "doughnut",
                showInLegend: false,
                color: '#a9a9a9',
                yValueFormatString: "#",
                dataPoints: [{"name": "Pas de données", "y": 0.1},],
            }],
            toolTip: {
                enabled: true
            },
        }

        this.setState({options})
    };

    render() {
        const {loading, options, all_product, productdata, categorydata} = this.state;
        const {all_sales, all_clients, all_category} = this.state
        const {salesValue, clientValue} = this.state
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="row mx-0 py-3">
                <div className="col-md-3 col-sm-3 col-12 col-lg-3">
                    <Form>
                        <div className="row ana-li-que-row-graph-new border-0">
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Catégorie de
                                        SAV :</label>
                                    {getFieldDecorator('sav_category', {})(
                                        <Select
                                            showAction={["focus", "click"]}
                                            value={categorydata}
                                            onSearch={(value) => this.fetchSAVCategories({search: value})}
                                            showSearch
                                            optionFilterProp="children"
                                            onFocus={() => this.fetchSAVCategories()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.categoryChange(val)}
                                            placeholder={'Tout'}>
                                            <Option key={0} value="">Tout</Option>
                                            {all_category.map((d, index) => <Option key={index}
                                                                                    value={d.id}>{d.title}</Option>)}

                                        </Select>)}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Représentants
                                        :</label>
                                    {getFieldDecorator('sales_rep', {})(
                                        <Select
                                            showAction={["focus", "click"]}
                                            value={salesValue}
                                            onSearch={(value) => this.fetchSales({search: value})}
                                            showSearch
                                            optionFilterProp="children"
                                            onFocus={() => this.fetchSales()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleSales(val)}
                                            placeholder={'Tout'}>
                                            <Option key={0} value="">Tout</Option>
                                            {all_sales.map((d, index) => <Option key={`sales_representative_${index}`}
                                                                                 value={d.id}>{`${d.first_name} ${d.last_name}`}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Distributeurs
                                        :</label>
                                    {getFieldDecorator('client', {})(
                                        <Select
                                            showAction={["focus", "click"]}
                                            value={clientValue}
                                            onSearch={(value) => this.fetchClient({search: value})}
                                            showSearch
                                            optionFilterProp="children"
                                            onFocus={() => this.fetchClient()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleSales(val)}
                                            placeholder={'Tout'}>
                                            <Option key={0} value="">Tout</Option>
                                            {all_clients.map((d, index) => <Option key={`client_${d.id}`}
                                                                                   value={d.id}>{d.client_name}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Produits
                                        :</label>
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
                                <label className='mb-0' style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Date
                                    de création :</label>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <Form.Item>
                                            {getFieldDecorator('start_date', {})(<DatePicker
                                                placeholder={'dd/mm/yyyy'}/>)}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <Form.Item>
                                            {getFieldDecorator('end_date', {})(<DatePicker
                                                placeholder={'dd/mm/yyyy'}/>)}
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button onClick={this.handleFilterForm} loading={loading} type="primary" htmlType="submit"
                                className="mr-3 mt-3 col-12" style={{background: '#3E65B0'}}>APPLIQUER LE
                            FILTRE</Button>
                        <Button onClick={this.onReset} type="primary" htmlType="submit"
                                className="mr-3 mt-2 col-12" style={{background: '#BDBDBD',borderColor:'#BDBDBD'}}>Réinitialiser</Button>
                    </Form>
                </div>
                <div className="col-md-9 col-sm-9 col-12 col-lg-9">
                    <div
                        className="row ana-li-que-row-graph border-0 pb-0 h-100 align-items-center justify-content-center">
                        {loading ? <Spin/> : <CanvasJSChart options={options}/>}
                    </div>
                </div>
            </div>);

    }
}

export default withTranslation('common')(Form.create({name: 'savAnalytics'})(SalesServiceTabs));
