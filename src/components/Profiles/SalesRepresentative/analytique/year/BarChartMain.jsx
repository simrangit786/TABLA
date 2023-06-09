import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const MONTH = ['janv', 'févr', 'mars', 'avril', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc']

class BarChartMain extends Component {

    getData = () => {
        const {data} = this.props
        const graph_data = []
        MONTH.forEach((item, index) => {
            graph_data.push({
                name: `${item}.`,
                [data.year1]: data['year1_data'][index],
                [data.year2]: data['year2_data'][index]
            })
        })
        return graph_data
    }

    render() {
        const {data} = this.props
        if (!data) {
            return <div/>
        }
        return (
            <React.Fragment>
                <div className="row table-data-chart-main chart-card-main mx-0">
                    <div className="col-12">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={this.getData()}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey={this.props.data.year1} fill="#448DE5"/>
                                <Bar dataKey={this.props.data.year2} fill="#9B51E0"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BarChartMain;