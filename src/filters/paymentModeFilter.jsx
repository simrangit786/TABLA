import React, {Component} from 'react';
import {paymentModeGet} from "../controller/API/profileApi";
import {Select, Spin} from "antd";
import {withTranslation} from "react-i18next";

const {Option} = Select;


class PaymentModeFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: [],
      loading: false,
      value: this.props.value || []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.value && !prevState.value) {
      return {value: []};
    } else return null;
  }

  fetch = (params = {}) => {
    this.setState({loading: true});
    paymentModeGet(params)
      .then(values => {
        this.setState({values, loading: false})
      })
  };

  defaultSet = () => {
    paymentModeGet()
      .then(values => {
        const defaultValue = values.find(item => item.title === 'Comptant');
        if (defaultValue) {
          this.handleChange({
            key: defaultValue.id,
            label: defaultValue.title
          })
        }
      })
  };

  handleChange = (value) => {
    this.setState({value});
    this.props.onChange(value.key)
  };

  componentDidMount() {
    if (this.props.value)
      this.handleChange(this.props.value);
    else
      this.defaultSet()
  }

  render() {
    const {values, loading, value} = this.state;
    const {t} = this.props;
    return (
      <Select labelInValue
              onSearch={(value) => this.fetch({search: value})}
              showSearch
              showAction={["focus", "click"]}
              optionFilterProp="children"
              value={value}
              onFocus={() => this.fetch()}
              notFoundContent={loading ? <Spin size="small"/> : null}
              onChange={(val) => this.handleChange(val)}
              placeholder={t('payment_mthd')}>
        {values.map((d, index) =>
          <Option key={`payment_mode_${index}`} value={d.id}>{d.title}</Option>)
        }
      </Select>
    );
  }
}

export default (withTranslation('common')(PaymentModeFilter));
