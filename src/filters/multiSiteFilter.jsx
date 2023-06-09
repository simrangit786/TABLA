import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {siteGet} from "../controller/API/itemApi";
import {Translation} from "react-i18next";


const {Option} = Select;


class MultiSiteFilter extends Component {
    state = {
        values: [],
        loading: false,
        value: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.value) {
            return {value: []};
        } else return null;
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        siteGet(params)
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
                            <Option key={`site_${index}`} value={d.id}>{d.domain}</Option>)
                        }
                    </Select>
                }
            </Translation>
        );
    }
}

export default MultiSiteFilter;
