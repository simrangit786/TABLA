import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {productGet} from "../controller/API/itemApi";
import {Translation} from "react-i18next";

const {Option} = Select;


class ProductFilter extends Component {

    state = {
        values: [],
        value: this.props.value || [],
        loading: false,
        params: {
            category_id: this.props.cat
        }
    };
    fetch = (params = {}) => {
        this.setState({loading: true});
        const newParams = {...params, category_id: this.props.cat};
        this.setState({params: newParams});
        productGet(newParams)
            .then(response => {
                this.setState({values: response.data.results, loading: false})
            })
    };
    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value.key)
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.value) {
            return {value: []};
        } else return null;
    }

    componentDidMount() {
        if (this.props.value) {
            this.handleChange(this.props.value)
        }
    }

    render() {
        const {values, value, loading} = this.state;
        return (
            <Translation>
                {(t, {i18n}) => <Select labelInValue
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

export default ProductFilter;
