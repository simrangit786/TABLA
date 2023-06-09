import React, {Component} from 'react';
import {Select} from "antd";
import {withTranslation} from "react-i18next";
import {country} from "../assets/country";

const {Option} = Select;


class OriginCountryFilter extends Component {

  handleChange = (value) => {
    this.props.onChange(value)
  };

  componentDidMount() {
    this.handleChange("France")
  }


  render() {
    const {t, i18n} = this.props;
    return (
      <Select
        value={this.props.value}
        showAction={["focus","click"]}
        onChange={(val) => this.handleChange(val)}
        placeholder={t('select')}>
        {country.map((country, index) =>
          <Option key={`country_${index}`} value={country[i18n.language]}>{country[i18n.language]}</Option>
        )}
      </Select>
    );
  }
}

export default (withTranslation('common')(OriginCountryFilter));
