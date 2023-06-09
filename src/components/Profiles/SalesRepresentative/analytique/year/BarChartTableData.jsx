import React, {Component} from 'react';

function getColor(first, second) {
    let color = "#828282";
    if (first && second) {
        if (first > second) {
            color = "#eb5757"
        } else color = "#27AE60"
    }
    return color
}

function getSum(total, num) {
    return total + Math.round(num);
}

function diffPercent(first, second) {
    if (first && second) return (((second - first) * 100) / first).toFixed(2)
    return 0
}

function getFRLocale(value) {
    if (value) return value.toLocaleString('fr-FR')
    return null
}

class BarChartTableData extends Component {
    render() {
        const {data, priceSymbol} = this.props;
        if (!data) {
            return <div/>
        }
        const year1_total = data.year1_data.reduce(getSum, 0);
        const year2_total = data.year2_data.reduce(getSum, 0);
        return (<React.Fragment>
                <div className="row mx-0 table-data-chart-main">
                    <div className="col-12 p-0 custom-overflow">
                        <div className="row ml-0 custom-data-row-table">
                            <div className="col-12">
                                <div className="row custom-table-header-main">
                                    <div className="custom-header-col custom-header-col-1">
                                        <span>Année</span>
                                    </div>
                                    <div className="custom-header-col custom-header-col-2">
                                        <span>Mois</span>
                                    </div>
                                </div>
                                <div className="row custom-table-thead">
                                    <div className="col-12">
                                        <div className="row custom-table-thead-tr">
                                            <div className="custom-table-thead-tr-th custom-table-thead-tr-th-1"/>
                                            <div className="custom-table-thead-tr-th">
                                                <span>janv.</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>févr.</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>mars</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>avril</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>mai</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>juin</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>juil.</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>août</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>sept</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>oct.</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>nov.</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>déc.</span>
                                            </div>
                                            <div className="custom-table-thead-tr-th">
                                                <span>Total</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row custom-table-tbody">
                                    <div className="col-12">
                                        <div className="row custom-table-tbody-tr">
                                            <div className="custom-table-tbody-tr-td custom-table-tbody-tr-td-1">
                                                <a href="#">{data.year2}</a>
                                            </div>
                                            {[...Array(12)].map((item, index) => {
                                                return <div key={index} className="custom-table-tbody-tr-td">
                                                    <span>{data.year2_data[index] && priceSymbol ? "€" : ""}{getFRLocale(data.year2_data[index]) || "-"}</span>
                                                </div>
                                            })}
                                            <div key={"year1"} className="custom-table-tbody-tr-td">
                                                <span>{year2_total && priceSymbol ? "€" : ""}{getFRLocale(year2_total) || "-"}</span>
                                            </div>
                                        </div>
                                        <div className="row custom-table-tbody-tr">
                                            <div className="custom-table-tbody-tr-td custom-table-tbody-tr-td-1">
                                                <a href="#">Comp.</a>
                                            </div>
                                            {[...Array(12)].map((item, index) => {
                                                return <div className="custom-table-tbody-tr-td">
                                            <span style={{
                                                color: getColor(data.year1_data[index], data.year2_data[index])
                                            }}
                                                  className="">{diffPercent(data.year1_data[index], data.year2_data[index])}%</span>
                                                </div>
                                            })}
                                            <div key={"year1"} className="custom-table-tbody-tr-td">
                                                <span>{diffPercent(year1_total, year2_total)}%</span>
                                            </div>


                                        </div>
                                        <div className="row custom-table-tbody-tr">
                                            <div className="custom-table-tbody-tr-td custom-table-tbody-tr-td-1">
                                                <a href="#">{data.year1}</a>
                                            </div>
                                            {[...Array(12)].map((item, index) => {
                                                return <div key={index} className="custom-table-tbody-tr-td">
                                                    <span>{data.year1_data[index] && priceSymbol ? "€" : ""}{getFRLocale(data.year1_data[index]) || "-"}</span>
                                                </div>
                                            })}
                                            <div key={"year1"} className="custom-table-tbody-tr-td">
                                                <span>{year1_total && priceSymbol ? "€" : ""}{getFRLocale(year1_total) || "-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>);
    }
}

export default BarChartTableData;