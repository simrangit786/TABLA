import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {supplierGet} from "../controller/API/itemApi";
import {Translation} from "react-i18next";


const {Option} = Select;


class WarehouseSupplierFilter extends Component {
    state = {
        values: [],
        loading: false,
        value: []
    };


    fetch = (params = {}) => {
        this.setState({loading: true});
        supplierGet(params)
            .then(values => {
                this.setState({values, loading: false})
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
                {(t, {i18n}) =>
                    <Select labelInValue
                            value={value}
                            showAction={["focus", "click"]}
                            showSearch
                            onFocus={() => this.fetch()}
                            notFoundContent={loading ? <Spin size="small"/> : null}
                            optionFilter={false}
                            onChange={(val) => this.handleChange(val)}
                            onSearch={(value) => this.fetch({search: value})}
                            placeholder={t('select')}>
                        {values.map((d, index) =>
                            <Option key={`warehouseSupplier_${index}`} value={d.id}>{d.company_name}</Option>)
                        }
                    </Select>
                }
            </Translation>
        );
    }
}

export default WarehouseSupplierFilter;
