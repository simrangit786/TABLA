import React, {Component} from 'react';
import {Select, Spin} from "antd";
import {bankListGet} from "../controller/API/profileApi";
import {withTranslation} from "react-i18next";


const {Option} = Select;

class BankListFilter extends Component {
  state = {
    values: [],
    loading: false,
    value: this.props.value || []
  };
  fetch = (params = {}) => {
    this.setState({loading: true});
    bankListGet(params)
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
              showSearch
              onSearch={(value) => this.fetch({search: value})}
              optionFilterProp='children'
              style={{width: '100%'}}
              showAction={["focus","click"]}
              value={value}
              onFocus={() => this.fetch()}
              notFoundContent={loading ? <Spin size="small"/> : null}
              onChange={(val) => this.handleChange(val)}
              placeholder={t('select')}>
        {values.map((d, index) =>
          <Option key={`client_type_${index}`} value={d.id}>{d.name}</Option>)
        }
      </Select>
    );
  }
}

export default withTranslation('common')(BankListFilter);

