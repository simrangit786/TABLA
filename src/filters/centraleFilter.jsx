import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {centraleGet} from "../controller/API/profileApi";
import {withTranslation} from "react-i18next";

const {Option} = Select;

class CentraleFilter extends Component {
  fetch = (params = {}) => {
    this.setState({loading: true});
    centraleGet(params)
      .then(values => {
        this.setState({values, loading: false})
      })
  };
  handleChange = (value) => {
    this.setState({value});
    this.props.onChange(value)
  };

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
    const {t} = this.props
    return (
      <Select labelInValue
              onFocus={() => this.fetch()}
              value={value}
              showAction={["focus","click"]}
              showSearch
              optionFilterProp="children"
              onSearch={(value) => this.fetch({search: value})}
              notFoundContent={loading ? <Spin size="small"/> : null}
              onChange={(val) => this.handleChange(val)}
              placeholder={t('select')}>
        {values.map((d, index) => <Option key={`centrale_${index}`} value={d.id}>{d.title}</Option>)}
      </Select>
    );
  }
}

export default (withTranslation('common')(CentraleFilter));
