import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {productGet} from "../controller/API/itemApi";
import {Translation} from "react-i18next";

const {Option} = Select;


class ProductDiscountFilter extends Component {

    state = {
        values: [],
        value: this.props.value || [],
        loading: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.value) {
            return {value: []};
        } else if (nextProps.value?.key) {
            return {value: nextProps.value};
        }
    }

    fetch = (params = {}) => {
        this.setState({loading: true, params});
        productGet(params)
            .then(response => {
                this.setState({values: response.data.results, loading: false})
            })
    };

    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value.key)
    };

    componentDidMount() {
        if (this.props.value) {
            this.handleChange(this.props.value)
        }
    }

    render() {
        const {values, value, loading} = this.state;
        return (
            <Translation>
                {(t, {i18n}) => <Select
                    labelInValue
                    value={value}
                    showSearch
                    optionFilterProp="children"
                    showAction={["focus", "click"]}
                    onFocus={() => this.fetch()}
                    notFoundContent={loading ? <Spin size="small"/> : null}
                    onChange={(val) => this.handleChange(val)}
                    onSearch={(value) => this.fetch({search: value})}
                    placeholder={t('select')}>
                    {values.map((d, index) =>
                        <Option key={`familli_${index}`} value={d.id}>{d.name}</Option>)
                    }
                </Select>
                }
            </Translation>
        );
    }
}

export default ProductDiscountFilter;
