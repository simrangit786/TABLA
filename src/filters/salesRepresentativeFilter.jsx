import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {salesRepresentativeGet} from "../controller/API/profileApi";
import {Translation} from "react-i18next";

const {Option} = Select;

class SalesRepresentativeFilter extends Component {
    state = {
        values: [],
        loading: false,
        value: this.props.value || []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.value) {
            return {value: []};
        } else if (typeof nextProps.value === "object") {
            return {value: nextProps.value}
        } else return null;
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        salesRepresentativeGet()
            .then(values => {
                this.setState({values, loading: false})
            })
    };

    handleChange = (value) => {
        this.setState({value});
        if (this.props.labelInValue)
            this.props.onChange(value)
        else
            this.props.onChange(value.key)
    };

    componentDidMount() {
        if (this.props.value)
            this.handleChange(this.props.value)
    }

    render() {
        const {values, loading, value} = this.state;
        return (
            <Translation>
                {(t, {i18n}) =>
                    <Select labelInValue
                            showAction={["focus", "click"]}
                            value={value}
                            onSearch={(value) => this.fetch({search: value})}
                            showSearch
                            className={this.props.className || ""}
                            optionFilterProp="children"
                            onFocus={() => this.fetch()}
                            notFoundContent={loading ? <Spin size="small"/> : null}
                            onChange={(val) => this.handleChange(val)}
                            placeholder={t('select')}>
                        {values.map((d, index) => <Option key={`sales_representative_${index}`}
                                                          value={d.id}>{`${d.first_name} ${d.last_name}`}</Option>)}
                    </Select>
                }
            </Translation>
        );
    }
}

export default SalesRepresentativeFilter;
