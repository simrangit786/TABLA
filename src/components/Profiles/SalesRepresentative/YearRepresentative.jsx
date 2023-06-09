import React, {Component} from 'react';
import {Tabs} from 'antd';
import {Image as Images} from '../../Images';
import DatePickerGraphDropdown from "./analytique/year/DatePickerGraphDropdown";
import BarChartTableData from "./analytique/year/BarChartTableData";
import BarChartMain from "./analytique/year/BarChartMain";
import LineChartMain from "./analytique/year/LineChartMain";
import {salesProfileYearGet} from "../../../controller/API/profileApi";
import {showErrors} from "../../../controller/utils";

const {TabPane} = Tabs;


class YearRepresentative extends Component {
    state = {
        data: null,
        year1: 2020,
        year2: 2021,
        loading: true,
    };

    componentDidMount() {
        this.fetchSalesProfileYearData({year1: this.state.year1, year2: this.state.year2})
    }

    fetchSalesProfileYearData = (params) => {
        this.setState({loading: true});
        salesProfileYearGet(params)
            .then(response => {
                this.setState({data: response.data, loading: false})
            })
            .catch(error => {
                showErrors(error.response.data);
                this.setState({loading: false})
            })
    };

    updateYears = (year1, year2) => {
        this.setState({year1, year2, data: null});
        this.fetchSalesProfileYearData({year1, year2})
    };

    render() {
        const {loading} = this.state;
        if (loading)
            return <div/>;
        return (
            <React.Fragment>
                <div className="row summary-info-row p-0">
                    <div className="col-12">
                        <div className="card common-graph-card-main border-0 position-relative mb-4">
                            <div className="card-body">
                                <div className="row tab-header-main-graph">
                                    <div className="col-12">
                                        <Tabs className="tab-graph-sales-main" defaultActiveKey="1">
                                            <TabPane tab={
                                                <img src={Images.icon_calculator_primary} alt="" className="img-fluid"/>
                                            } key="1">
                                                <BarChartTableData priceSymbol {...this.state}/>
                                            </TabPane>
                                            <TabPane tab={
                                                <img src={Images.bar_chart_icon_primary} alt="" className="img-fluid"/>
                                            } key="2">
                                                <BarChartMain {...this.state}/>
                                            </TabPane>
                                            <TabPane tab={
                                                <img src={Images.line_chart_icon_primary} alt="" className="img-fluid"/>
                                            } key="3">
                                                <LineChartMain {...this.state}/>
                                            </TabPane>
                                        </Tabs>
                                        <div className="date-details-div position-absolute">
                                            <DatePickerGraphDropdown {...this.state} updateYears={this.updateYears}/>
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

export default YearRepresentative;