import React, {Component} from 'react';
import {distributorProfileGet} from "../../controller/API/profileApi";
import {Select, Spin} from "antd";
import {Translation} from "react-i18next";
import {debounce} from "lodash"

const {Option} = Select;

class DistributorClientFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: [],
            loading: false,
            value: this.props.value || []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.value) {
            return {value: []};
        } else return null;
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        params['ordering'] = 'client_name'
        distributorProfileGet(params)
            .then(response => {
                this.setState({values: response.data, loading: false})
            })
    };

    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value)
    };

    componentDidMount() {
        if (this.props.value) {
            this.handleChange(this.props.value)
        }
    }

    render() {
        const {values, loading, value} = this.state;
        return (
            <Translation>
                {(t, {i18n}) =>
                    <Select labelInValue
                            onSearch={debounce((value) => this.fetch({search: value}), 700)}
                            showSearch
                            optionFilterProp="children"
                            value={value}
                            showAction={["focus", "click"]}
                            onFocus={() => this.fetch()}
                            notFoundContent={loading ? <Spin size="small"/> : null}
                            onChange={this.handleChange}
                            placeholder={t('select')}>
                        {values.map((d, index) =>
                            <Option key={`client_${d.id}`} value={d.id}>{d.client_name}</Option>)
                        }
                    </Select>
                }
            </Translation>
        );
    }
}

export default DistributorClientFilter;
