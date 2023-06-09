import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {getWorkOrderEntity} from "../controller/API/salesOperationAPI";
import {methods} from "../controller/Global";
import {withTranslation} from "react-i18next";

const {Option} = Select;

class DistributorEntityFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: [],
            loading: false,
            value: this.props.value || []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.value){
           return {value: nextProps.value}
        }
        else if (!nextProps.value) {
            return {value: []};
        } else return null;
    }

    componentDidMount() {
        if (this.props.value) {
            this.handleChange(this.props.value)
        }
    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        getWorkOrderEntity(params)
            .then(values => {
                this.setState({values: values.data.results, loading: false})
            })
    };
    handleChange = (value) => {
        this.setState({value});
    };

    render() {
        const {values, loading, value} = this.state;
        const {t} = this.props;
        return (
            <Select
                labelInValue
                disabled={this.props.disabled}
                onSearch={(value) => this.fetch({search: value})}
                showSearch
                autoFocus={this.props.method === methods.create}
                showAction={["focus", "click"]}
                optionFilterProp="children"
                value={value}
                onFocus={() => this.fetch()}
                notFoundContent={loading ? <Spin size="small"/> : null}
                onChange={(val) => this.handleChange(val)}
                placeholder={t('select')}
            >
                {values.map((d, index) =>
                    <Option key={`entity_${index}`} value={d.id}>{d.name}</Option>)
                }
            </Select>
        );
    }
}

export default (withTranslation('common')(DistributorEntityFilter))