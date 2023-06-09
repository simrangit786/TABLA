import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {itemCategoryGet} from "../controller/API/itemApi";
import {methods} from "../controller/Global";
import {Translation} from "react-i18next";

const {Option} = Select;

class ItemCategoryFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            value: this.props.value || [],
            loading: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.value) {
            return {value: []};
        } else return null;
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        itemCategoryGet(params)
            .then(values => {
                this.setState({values, loading: false})
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
        const {values, loading, value} = this.state;
        const {method} = this.props;
        return (
            <Translation>
                {(t, { i18n }) =>
                    <Select labelInValue
                            showSearch
                            value={value}
                            showAction={["focus", "click"]}
                            onFocus={() => this.fetch()}
                            notFoundContent={loading ? <Spin size="small"/> : null}
                            onChange={(val) => this.handleChange(val)}
                            onSearch={(value) => this.fetch({search: value})}
                            optionFilterProp='children'
                            autoFocus={method === methods.create}
                            placeholder={t('select')}>
                        {values.map((d, index) =>
                            <Option key={`dba_${index}`} value={d.id}>{d.name}</Option>)
                        }

                    </Select>
                }
            </Translation>
        );
    }
}

export default ItemCategoryFilter;
