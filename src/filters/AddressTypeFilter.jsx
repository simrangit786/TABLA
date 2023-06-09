import React, {Component} from 'react';
import {Select} from "antd";
import {withTranslation} from "react-i18next";

const {Option} = Select;

class AddressTypeFilter extends Component {
  handleChange = (value) => {
    this.props.onChange(value)
  };

  render() {
    const {t} = this.props;
    return (
      <Select
        value={this.props.value || []}
        onChange={(val) => this.handleChange(val)}
        showAction={["focus","click"]}
        placeholder={t('select')}>
        <Option key="Siège social" value="Siège social">Siège social</Option>
        <Option key="Bureau" value="Bureau">Bureau</Option>
        <Option key="Magasin" value="Magasin">Magasin</Option>
        <Option key="Centre de distribution" value="Centre de distribution">Centre de distribution</Option>
        <Option key="Dépôt" value="Dépôt">Dépôt</Option>
      </Select>
    );
  }
}

export default (withTranslation('common')(AddressTypeFilter));