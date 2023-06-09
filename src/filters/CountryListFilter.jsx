import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {addressGet} from "../controller/API/profileApi";
import {withTranslation} from "react-i18next";


const {Option} = Select;

class CountryListFilter extends Component {
    
    state = {
        values: [],
        loading: false,
        value: this.props.value || []
    };

    componentDidMount() {
        if (this.props.value) {
            this.handleChange(this.props.value)
        }

    }

    fetch = (params = {}) => {
        this.setState({loading: true});
        addressGet(params)
            .then(values => {
                this.setState({values, loading: false})
            })
    };

    resetField = () => {
        this.setState({value: []})
    };

    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value.key)
    };


    render() {
        const {values, loading, value} = this.state;
        const {t} = this.props;
        return (
            <Select labelInValue
                    showSearch
                    showAction={["focus","click"]}
                    onSearch={(value) => this.fetch({search: value})}
                    optionFilterProp='children'
                    style={{width: '100%'}}
                    value={value}
                    onFocus={() => this.fetch()}
                    notFoundContent={loading ? <Spin size="small"/> : null}
                    onChange={(val) => this.handleChange(val)}
                    placeholder={t('select')}>
                {values.map((d, index) =>
                    <Option key={`client_type_${index}`} value={d.id}>{d.country}</Option>)
                }
            </Select>
        );
    }
}


export default (withTranslation('common')(CountryListFilter));
