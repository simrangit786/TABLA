import React, {Component} from 'react';
import {departmentGet} from "../controller/API/profileApi";
import {Select, Spin} from "antd";
import {withTranslation} from "react-i18next";


const {Option} = Select;

class DepartmentFilter extends Component {
  state = {
    values: [],
    loading: false,
    value: this.props.value || []
  };

  fetch = (params = {}) => {
    this.setState({loading: true});
    departmentGet(params)
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.value) {
      return {value: []};
    }
    else if (typeof nextProps.value === "object") {
      return {value: nextProps.value}
    }
    else return null;
  }

  componentDidMount() {
    if (this.props.value) {
      this.handleChange(this.props.value)
    }
  }

  render() {
    const {values, loading, value} = this.state;
    const {t} = this.props;
    return (
      <Select labelInValue
              value={value}
              onSearch={(value) => this.fetch({search: value})}
              showSearch
              showAction={["focus","click"]}
              optionFilterProp="children"
              onFocus={() => this.fetch()}
              notFoundContent={loading ? <Spin size="small"/> : null}
              onChange={(val) => this.handleChange(val)}
              placeholder={t('select')}>
        {values.map((d, index) => <Option key={`department_${index}`} value={d.id}>{d.title}</Option>)}
      </Select>
    );
  }
}

export default withTranslation('common')(DepartmentFilter);
