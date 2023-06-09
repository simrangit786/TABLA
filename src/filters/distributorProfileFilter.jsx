import React, {Component} from 'react';
import {distributorProfileGet} from "../controller/API/profileApi";
import {Select, Spin} from "antd";
import {withTranslation} from "react-i18next";

const {Option} = Select;

class DistributorProfileFilter extends Component {

  fetch = (params = {}) => {
    this.setState({loading: true});
    if(this.props.entity)
      params['entity'] = this.props.entity;
    params['ordering'] = 'client_name'
    distributorProfileGet(params)
      .then(response => {
        this.setState({values: response.data, loading: false})
      })
  };

  handleChange = (value) => {
    this.setState({value});
    let org = JSON.parse(value.key);
    this.props.onChange(org)
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.value) {
      return {value: []};
    }
    else return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      values: [],
      loading: false,
      value: this.props.value || []
    };
  }

  componentDidMount() {
    if (this.props.value) {
      this.handleChange(this.props.value)
    }

  }

  onSearch = (search) => {
    if(search.length >=3 )
      this.fetch({search})
  }

  render() {
    const {values, loading, value} = this.state;
    const {t} = this.props;
    return (
      <Select labelInValue
              onSearch={this.onSearch}
              showSearch
              optionFilterProp="children"
              value={value}
              // autoFocus={method===methods.create}
              showAction={["focus","click"]}
              onFocus={() => this.fetch()}
              notFoundContent={loading ? <Spin size="small"/> : null}
              onChange={this.handleChange}
              placeholder={t('select')}>
        {values.map((d, index) =>
          <Option key={`client_${d.id}`} value={JSON.stringify(d)}>{d.client_name}</Option>)
        }
      </Select>
    );
  }
}

export default (withTranslation('common')(DistributorProfileFilter));
