import React, {Component} from 'react';
import {priceListGet} from "../controller/API/profileApi";
import {Select, Spin} from "antd";
import {withTranslation} from "react-i18next";

const {Option} = Select;


class PriceListFilter extends Component {
  fetch = (params = {}) => {
    this.setState({loading: true});
    priceListGet(params)
      .then(values => {
        this.setState({values, loading: false})
      })
  };
  handleChange = (value) => {
    this.setState({value});
    this.props.onChange(value.key)
  };


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
    }
    else return null;
  }

  componentDidMount() {
    if (this.props.value)
      this.handleChange(this.props.value)
  }

  render() {
    const {values, loading, value} = this.state;
    const {t} = this.props
    return (
      <React.Fragment>
        <Select labelInValue
                showAction={["focus","click"]}
                value={value}
                onSearch={(value) => this.fetch({search: value})}
                showSearch
                optionFilterProp="children"
                onFocus={() => this.fetch()}
                notFoundContent={loading ? <Spin size="small"/> : null}
                onChange={(val) => this.handleChange(val)}
                placeholder={t('select')}>
          {values.map((d, index) =>
            <Option key={`client_type_${index}`} value={d.id}>{d.title}</Option>)
          }
        </Select>
      </React.Fragment>
    );
  }
}

export default (withTranslation('common')(PriceListFilter));
