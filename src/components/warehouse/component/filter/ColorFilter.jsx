import React, {Component} from 'react';
import {componentColourListGet} from "../../../../controller/API/itemApi";
import {Select, Spin} from "antd";
import {withTranslation} from "react-i18next";


const {Option} = Select;

class ComponentColourListFilter extends Component {
  state = {
    values: [],
    value: this.props.value || [],
    loading: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.value) {
      return {value: []};
    } else return null;
  }

  fetch = (params = {}) => {
    this.setState({loading: true});
    componentColourListGet(params)
      .then(values => {
        this.setState({values, loading: false})
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
    const {values, value, loading} = this.state;
    const {t} = this.props;
    return (
      <Select
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
          <Option key={`colour_${index}`} value={d}>{d}</Option>)
        }

      </Select>
    );
  }
}

export default (withTranslation('common')(ComponentColourListFilter));
