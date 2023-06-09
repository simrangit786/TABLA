import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {salesRepresentativeGet} from "../controller/API/profileApi";
import {Translation} from "react-i18next";

const {Option} = Select;

class SalesRepresentativeNameFilter extends Component {
    state = {
        values: [],
        loading: false,
        value: this.props.value || ""
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.value) {
            return {value: ""};
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
        this.props.onChange(value)
    };

    render() {
        const {values, loading, value} = this.state;
        return (
            <Translation>
                {(t, {i18n}) =>
                    <Select showAction={["focus", "click"]}
                            value={value}
                            onSearch={(value) => this.fetch({search: value})}
                            showSearch
                            optionFilterProp="children"
                            onFocus={() => this.fetch()}
                            notFoundContent={loading ? <Spin size="small"/> : null}
                            onChange={(val) => this.handleChange(val)}
                            placeholder={t('select')}>
                        {values.map((d, index) => <Option key={`sales_representative_${index}`}
                                                          value={`${d.first_name} ${d.last_name}`}>{`${d.first_name} ${d.last_name}`}</Option>)}
                    </Select>
                }
            </Translation>
        );
    }
}

export default SalesRepresentativeNameFilter;
