import React, {Component} from 'react';
import {Icon, Select, Spin} from "antd";
import {salesAnalyticsWorkOrder, salesRepresentativeGetOneByUser} from "../../../controller/API/profileApi";
import {withTranslation} from "react-i18next";
import CanvasJSReact from '../../canvas/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const {Option} = Select;


function sum(array) {
    return array.reduce(function (a, b) {
        return a + b;
    }, 0);
}

const colorSet1 = ["#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#7F6084", "#77A033", "#33558B", "#E59566"]

class SalesAnalyticsRepresentativeWorkOrder extends Component {

    chartRef = React.createRef();

    state = {
        profile: {},
        dataPointIndex: null,
        data: {labels: [], datasets: []},
        no_data: {
            labels: [
                this.props.t('no_data')
            ],
            datasets: [{
                data: [100]
            }]
        },
        loading: false,
        total_year_amount: 0,
        total_month_amount: 0,
        total_profiles: 0,
        results: [],
        graph_date: null,
        options_updated: false,
        options: {
            backgroundColor: '#FBFBFC',
            fontFamily: 'Avenir',
            animationEnabled: true,
            // title: {
            // 	text: "Customer Satisfaction"
            // },
            subtitles: [{
                text: `${this.props.t("no_data")}`,
                verticalAlign: "center",
                fontSize: 24,
                dockInsidePlotArea: true,
                fontFamily: 'Avenir',
            }],
            data: [{
                type: "doughnut",
                showInLegend: true,
                // indexLabel: "{name}: {y}",
                yValueFormatString: "'€'#,###",
                dataPoints: [],
            }],
            toolTip: {
                enabled: true
            },
        },
        sortBtn: {per: 0, name: 0}
    };

    getRowColor(index, rowIndex) {
        const {dataPointIndex} = this.state
        if (dataPointIndex === rowIndex)
            return "#FBFBFC"
        return colorSet1[index % colorSet1.length]
    }

    getRowBackgroundColor(index, rowIndex) {
        const {dataPointIndex} = this.state
        if (dataPointIndex === rowIndex)
            return colorSet1[index % colorSet1.length]
        return "#FBFBFC"
    }

    showRowOnCanvasClick = ({dataPoint}) => {
        const dataPointIndex = dataPoint.rowIndex
        if (dataPointIndex === this.state.dataPointIndex)
            this.setState({dataPointIndex: null})
        else
            this.setState({dataPointIndex})
        let elem = document.getElementById(`scroll-div${dataPointIndex}`);
        // window.scrollTo(0, elem.offsetTop + 100)
        window.scroll({
            left: 0,
            top: elem.offsetTop + 100,
            behavior: 'smooth',
        })
    }

    setCustomDate = (datetime) => {
        this.setState({loading: true});
        const currentDateTime = new Date();
        if (datetime === 'year') {
            datetime = new Date(currentDateTime.getFullYear(), 0, 1)
        } else if (datetime === 'month') {
            datetime = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), 1)
        }
        this.setState({graph_date: datetime}, () => this.setAnalyticsData())

    };

    setTotalValues = (results = null) => {
        if (!results)
            results = this.state.results;
        const currentDateTime = new Date();
        const thisYearFirstDay = new Date(currentDateTime.getFullYear(), 0, 1);
        const thisMonthFirstDay = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), 1);
        const total_year_amount = sum(results.map(o => o.data.reduce(function (a, b) {
            if (new Date(b.date) >= thisYearFirstDay)
                return a + b.amount;
            return a + 0
        }, 0)));
        const total_month_amount = sum(results.map(o => o.data.reduce(function (a, b) {
            if (new Date(b.date) >= thisMonthFirstDay)
                return a + b.amount;
            return a + 0
        }, 0)));
        const total_profiles = results.length;
        this.setState({total_year_amount, total_profiles, total_month_amount})

    };

    setAnalyticsData = (results = null) => {
        if (!results)
            results = this.state.results;
        let dataPoints = [];
        let {options} = this.state;
        if (results.length > 0) {
            const graph_date = this.state.graph_date;
            dataPoints = results.map(o => {
                const amount = o.data.reduce(function (a, b) {
                    if (new Date(b.date) >= graph_date)
                        return a + b.amount;
                    return a + 0
                }, 0);
                return {"name": o.name, "y": amount}
            });
            dataPoints = dataPoints.filter((o) => o.y > 0);
            if (dataPoints.length > 0) {
                const total_amount = dataPoints.reduce(function (a, b) {
                    return a + parseFloat(b.y)
                }, 0);

                dataPoints = dataPoints.map((o, i) => {
                    return {
                        click: this.showRowOnCanvasClick,
                        "name": o.name,
                        "y": o.y,
                        "rowIndex": i,
                        "per": ((parseFloat(o.y) * 100) / parseFloat(total_amount)).toFixed(2)
                    }
                });
                options['data'][0]['dataPoints'] = dataPoints;
                options['subtitles'][0]['text'] = `€${parseFloat(total_amount).toLocaleString('fr-FR')}`;
                options['toolTip']['enabled'] = true;
                // options['data'][0]['indexLabel'] = "{name}: {y} ({per}%)";
                options['data'][0]['yValueFormatString'] = "'€'#,###";
                options['data'][0]['showInLegend'] = false;
                delete options['data'][0]['color'];
                this.setState({options, loading: false});
            } else {
                dataPoints = [{"name": this.props.t("no_data"), per: 0, "y": 100}];
                options['data'][0]['dataPoints'] = dataPoints;
                options['subtitles'][0]['text'] = this.props.t("no_data");
                // options['data'][0]['indexLabel'] = "{name}";
                options['data'][0]['yValueFormatString'] = "";
                options['data'][0]['color'] = "#a9a9a9";
                options['toolTip']['enabled'] = false;
                options['data'][0]['showInLegend'] = false;
                this.setState({options, loading: false});
            }

        } else {
            dataPoints = [{"name": this.props.t("no_data"), "y": 100}];
            options['data'][0]['dataPoints'] = dataPoints;
            options['subtitles'][0]['text'] = this.props.t("no_data");
            options['data'][0]['indexLabel'] = "{name}";
            options['data'][0]['yValueFormatString'] = "";
            options['data'][0]['color'] = "#a9a9a9";
            options['toolTip']['enabled'] = false;
            options['data'][0]['showInLegend'] = false;
            this.setState({options, loading: false})
        }
    };

    componentDidMount() {
        const {id} = this.props.representative;
        if (id) {
            this.setState({loading: true});
            salesAnalyticsWorkOrder(id).then(
                resp => {
                    const graph = resp.data.graph
                    this.setState({results: graph});
                    this.setAnalyticsData(graph);
                    this.setTotalValues(graph);
                    this.setState({loading: false})
                }
            ).catch(err => {
                this.setState({loading: false})
            })
            salesRepresentativeGetOneByUser(id)
                .then(response => {
                    this.setState({profile: response})
                })
                .catch(err => {

                })
        }

    }

    sortingTable = (key, type) => {
        const {options} = this.state
        let dataPoints = options.data[0].dataPoints;
        let dat;
        const sortBtn = {name: 0, per: 0};

        if (key === "name" && type) {
            dat = dataPoints.sort((a, b) => a.name.localeCompare(b.name))
            sortBtn.name = 1
            this.setState({sortBtn})
        }
        if (key === "name" && !type) {
            dat = dataPoints.sort((b, a) => a.name.localeCompare(b.name))
            sortBtn.name = -1
            this.setState({sortBtn})
        }
        if (key === "pct" && type) {
            dat = dataPoints.sort((a, b) => parseFloat(a.per) - parseFloat(b.per));
            sortBtn.per = 1
            this.setState({sortBtn})
        }
        if (key === "pct" && !type) {
            dat = dataPoints.sort((a, b) => parseFloat(b.per) - parseFloat(a.per));
            sortBtn.per = -1
            this.setState({sortBtn})
        }
        // dataPoints.map()
        options.data[0].dataPoints = dataPoints
        this.setState({options})
    }


    render() {
        const {data, loading, options, profile} = this.state;
        const {t} = this.props;
        return (
            <React.Fragment>
                <div className="row summary-info-row mx-0 p-0">
                    <div className="col-12 px-0">
                        <div className="card border-0 position-relative mb-4">
                            <div className="card-body">
                                <div className="row mx-0">
                                    <div className="col-md-3 col-sm-3 col-12 col-lg-3">
                                        <div className="row ana-li-que-row-data">
                                            <div className="col-12 ana-div-inn">
                                                <h4 className="mb-0">€{this.state.total_year_amount.toLocaleString('fr-FR')}</h4>
                                                <p>{t('year_to_date')}</p>
                                            </div>
                                            <div className="col-12 ana-div-inn">
                                                <h4 className="mb-0">€{this.state.total_month_amount.toLocaleString('fr-FR')}</h4>
                                                <p>{t('month_to_date')}</p>
                                            </div>
                                            <div className="col-12 ana-div-inn">
                                                <h4 className="mb-0">{this.state.total_profiles}</h4>
                                                <p>{t('distributor_representant')}</p>
                                            </div>
                                            <div className="col-12 ana-div-inn">
                                                <h4 className="mb-0">{profile.implantation || 0}</h4>
                                                <p>Implantations</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9 col-sm-9 col-12 col-lg-9">
                                        <div className="row ana-li-que-row-graph">
                                            <div className="col-12">
                                                <Select onChange={this.setCustomDate} placeholder="Tout le temps">
                                                    <Option key={'1'} value={null}>Tout le temps</Option>
                                                    <Option key={'2'} value={'year'}>CA depuis le début de
                                                        l’année</Option>
                                                    <Option key={'3'} value={'month'}>CA depuis le début du
                                                        mois</Option>
                                                </Select>
                                            </div>
                                            <div className="col-12 graph-div-main">
                                                {loading ? <Spin/> : <div> {data.labels.length <= 0 ? <CanvasJSChart
                                                        ref={this.chartRef}
                                                        options={options}/> :
                                                    <CanvasJSChart options={options}/>}</div>}
                                            </div>
                                        </div>
                                        <div className="row mx-0 list-common-row">
                                            <div className="col-12">
                                                <div
                                                    className="row mx-0 list-inner-row align-items-center justify-content-between"
                                                    style={{background: "rgb(7,71,154)"}}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className="count-div-n"></div>
                                                        {/*<div className="color-round-tag">*/}
                                                        {/*    <span*/}
                                                        {/*        className="circle-tag"/>*/}
                                                        {/*</div>*/}
                                                        <div className="distributor-name-heading"
                                                             style={{
                                                                 display: "flex",
                                                                 alignItems: "center",
                                                                 fontSize: 14,
                                                                 color: "white"
                                                             }}>
                                                            Nom du distributeur
                                                            <div style={{
                                                                display: "inline-block",
                                                                margin: "0px 0px 0px 5px"
                                                            }}>
                                                                <Icon type="caret-up"
                                                                      style={this.state.sortBtn.name === 1 ? {
                                                                          display: "block",
                                                                          color: "#808080"

                                                                      } : {display: "block"}}
                                                                      onClick={() => {
                                                                          this.sortingTable("name", 1)
                                                                      }}/>
                                                                <Icon type="caret-down"
                                                                      style={this.state.sortBtn.name === -1 ? {
                                                                          display: "block",
                                                                          marginTop: "-3px",
                                                                          color: "#808080"

                                                                      } : {display: "block", marginTop: "-3px"}}
                                                                      onClick={() => {
                                                                          this.sortingTable("name", 0)
                                                                      }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="distributor-name-heading"
                                                         style={{
                                                             display: "flex",
                                                             alignItems: "center",
                                                             fontSize: 14,
                                                             color: "white"
                                                         }}>
                                                        Pourcentage%
                                                        <div style={{
                                                            display: "inline-block",
                                                            margin: "0px 0px 0px 5px"
                                                        }}>
                                                            <Icon type="caret-up"
                                                                  style={this.state.sortBtn.per === 1 ? {
                                                                      display: "block",
                                                                      color: "#808080"

                                                                  } : {display: "block"}}
                                                                  onClick={() => {
                                                                      this.sortingTable("pct", 1)
                                                                  }}/>
                                                            <Icon type="caret-down"
                                                                  style={this.state.sortBtn.per === -1 ? {
                                                                      display: "block",
                                                                      marginTop: "-3px",
                                                                      color: "#808080"
                                                                  } : {display: "block", marginTop: "-3px"}}
                                                                  onClick={() => {
                                                                      this.sortingTable("pct", 0)
                                                                  }}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                {options.data[0].dataPoints.map((item, index) => {
                                                    const color = this.getRowColor(index, item.rowIndex)
                                                    const backgroundColor = this.getRowBackgroundColor(index, item.rowIndex)
                                                    return <div key={index} style={{backgroundColor: backgroundColor}}
                                                                className="row mx-0 list-inner-row align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <div id={`scroll-div${item.rowIndex}`}
                                                                 className="count-div-n"
                                                                 style={{color: color}}>{index + 1}.
                                                            </div>
                                                            <div className="color-round-tag">
                                                            <span style={{backgroundColor: color}}
                                                                  className="circle-tag"/>
                                                            </div>
                                                            <div className="distributor-name-heading"
                                                                 style={{color: color, fontSize: 14}}>
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                        <div className="distributor-total-pr-amount">
                                                            <ul className="list-inline mb-0">
                                                                <li style={{color: color, fontSize: 14}}
                                                                    className="list-inline-item">{item.per}%
                                                                </li>
                                                                <li style={{color: color}}
                                                                    className="list-inline-item">|
                                                                </li>
                                                                <li style={{color: color, fontSize: 14}}
                                                                    className="list-inline-item">€{item.y.toLocaleString('fr-FR')}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withTranslation('common')(SalesAnalyticsRepresentativeWorkOrder);
