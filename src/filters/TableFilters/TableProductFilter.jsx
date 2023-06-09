import ProductFilter from "../productFilter";
import {productGet} from "../../controller/API/itemApi";
import {Translation} from "react-i18next";
import {Select, Spin} from "antd";
import React from "react";

const {Option} = Select;


export default class TableProductFilter extends ProductFilter {
    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value)
    };

    fetch = (params = {}) => {
        this.setState({loading: true});
        const newParams = {...params, category_id: this.props.cat};
        this.setState({params: newParams});
        productGet(newParams)
            .then(response => {
                const data = response.data.results.filter((item, index, self) =>
                    index === self.findIndex((t) => (
                        t.name === item.name
                    )))
                this.setState({values: data, loading: false})
            })
    };

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
                        <Option key={`familli_${index}`} value={d.name}>{d.name}</Option>)
                    }
                </Select>
                }
            </Translation>
        );
    }
}
