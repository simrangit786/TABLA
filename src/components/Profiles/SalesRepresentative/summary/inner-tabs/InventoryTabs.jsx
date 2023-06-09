import React, {Component} from 'react';
import {Button, Form, Select, Spin} from "antd";
import {withTranslation} from "react-i18next";
import {InventoryAnalyticsGet} from "../../../../../controller/API/salesOperationAPI";
import {colourListGet, itemCategoryGet, variantGet} from "../../../../../controller/API/itemApi";
import CanvasJSReact from '../../../../canvas/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const {Option} = Select;

class SalesServiceTabs extends Component {
    state = {
        loading: false,
        all_category: [],
        colourValue: [],
        all_colours: [],
        all_sku: [],
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
                if (!values.type) {
                    values.type = "in_stock";
                }
                InventoryAnalyticsGet(values).then(res => {
                    this.setAnalyticsData(res.data);
                    this.setState({loading: false})
                })
            }
        })
    };

    setAnalyticsData = (results = null) => {
        let {options} = this.state;
        let dataPoints = [];

        if (results !== null) {
            dataPoints = results.items.map((i, index) => {
                return {
                    "name": i.name,
                    "y": i.stocks,
                    // "per": 0,
                    "rowIndex": index,
                    "per": ((parseFloat(i.stocks) * 100) / parseFloat(results.total)).toFixed(2)
                }
            })
            options['data'][0]['dataPoints'] = dataPoints;
            options['subtitles'][0]['text'] = `${results.total}`;
            options['toolTip']['enabled'] = true;
            options['data'][0]['yValueFormatString'] = "#,###";
            delete options['data'][0]['color'];
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

    fetchColour = (params = {}) => {
        colourListGet(params)
            .then(all_colours => {
                this.setState({all_colours, loading: false})
            })
    };

    handleColour = (colourValue) => {
        this.setState({colourValue})
    }

    fetchCategory = (params = {}) => {
        itemCategoryGet(params)
            .then(all_category => {
                this.setState({all_category, loading: false})
            })
    };

    handleCategory = (categoryValue) => {
        this.setState({categoryValue})
    }

    fetchVarient = (params = {}) => {
        variantGet(params).then(res => {
            this.setState({all_sku: res.items})
        })
    }

    variantChange = (varientdata) => {
        this.setState({varientdata})
    }

    inventoryTypeChange = (inventoryType) => {
        this.setState({inventoryType})
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
        const {loading, options, all_colours, inventoryType} = this.state;
        const {all_category, all_sku} = this.state
        const {colourValue, categoryValue, variantdata} = this.state
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="row mx-0 py-3">
                <div className="col-md-3 col-sm-3 col-12 col-lg-3">
                    <Form>
                        <div className="row ana-li-que-row-graph-new border-0">
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Type de
                                        inventaire :</label>
                                    {getFieldDecorator('type', {})(
                                        <Select
                                            defaultValue={'in_stock'}
                                            showAction={["focus", "click"]}
                                            value={inventoryType}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.inventoryTypeChange(val)}
                                            placeholder={'Tout'}>
                                            {/* <Option key={0} value="" >Tout</Option> */}
                                            <Option key={1} value={"in_stock"}>En stock</Option>
                                            <Option key={2} value={"in_production"}>En cours de production</Option>
                                        </Select>)}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Couleur
                                        :</label>
                                    {getFieldDecorator('colour', {})(
                                        <Select
                                            value={colourValue}
                                            showSearch
                                            optionFilterProp="children"
                                            showAction={["focus", "click"]}
                                            onSearch={(value) => this.fetchColour({search: value})}
                                            onFocus={() => this.fetchColour()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => {
                                                this.handleColour(val)}}
                                            placeholder={'Tout'}>
                                            <Option key={0} value="">Tout</Option>
                                            {all_colours.map((d, index) =>
                                                <Option key={`colour_${index}`} value={d}>{d}</Option>)}

                                        </Select>
                                    )}
                                </Form.Item>

                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Catégorie
                                        :</label>
                                    {getFieldDecorator('category', {})(
                                        <Select
                                            showSearch
                                            value={categoryValue}
                                            showAction={["focus", "click"]}
                                            onFocus={() => this.fetchCategory()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.handleCategory(val)}
                                            onSearch={(value) => this.fetchCategory({search: value})}
                                            optionFilterProp='children'
                                            // autoFocus={method === methods.create}
                                            placeholder={'Tout'}>
                                            <Option key={0} value="">Tout</Option>
                                            {all_category.map((d, index) =>
                                                <Option key={`dba_${index}`} value={d.id}>{d.name}</Option>)
                                            }

                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12">
                                <Form.Item>
                                    <label className='mb-0'
                                           style={{fontWeight: '500', fontSize: '14px', color: '#000000'}}>Référence /
                                        code :</label>
                                    {getFieldDecorator('sku', {})(
                                        <Select
                                            showAction={["focus", "click"]}
                                            value={variantdata}
                                            onSearch={(value) => this.fetchVarient({search: value})}
                                            showSearch
                                            optionFilterProp="children"
                                            onFocus={() => this.fetchVarient()}
                                            notFoundContent={loading ? <Spin size="small"/> : null}
                                            onChange={(val) => this.variantChange(val)}
                                            placeholder={'Tout'}>
                                            <Option key={0} value="">Tout</Option>
                                            {all_sku.map((d, index) => <Option key={index}
                                                                               value={d.sku}>{d.sku}</Option>)}

                                        </Select>)}
                                </Form.Item>
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
