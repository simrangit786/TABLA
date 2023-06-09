import React, {Component} from 'react';
import {groupGet} from "../controller/API/profileApi";
import {Select, Spin} from "antd";
import {Translation} from "react-i18next";

const {Option} = Select;


class ProfileGroupNameFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
            loading: false,
            value: this.props.value || [],
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.value) {
            return {value: []};
        } else return null;
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        groupGet(params)
            .then(values => {
                this.setState({values: values.data.results, loading: false})
            })
    };

    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value)
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
                            value={value}
                            onSearch={(value) => this.fetch({search: value})}
                            showSearch
                            showAction={["focus", "click"]}
                            optionFilterProp="children"
                            onFocus={() => this.fetch()}
                            notFoundContent={loading ? <Spin size="small"/> : null}
                            onChange={(val) => this.handleChange(val)}
                            placeholder={t('select')}>
                        {values.map((d, index) =>
                            <Option key={`client_type_${index}`} value={d.id}>{d.title}</Option>)
                        }
                    </Select>
                }
            </Translation>
        );
    }
}

export default ProfileGroupNameFilter;
