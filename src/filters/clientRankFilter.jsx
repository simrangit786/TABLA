import React, {Component} from 'react';
import {Select} from "antd";
import {withTranslation} from "react-i18next";

const {Option} = Select;

class ClientRankFilter extends Component {

  handleChange = (value) => {
    this.props.onChange(value)
  };

  render() {
    return (
      <Select
        value={this.props.value || []}
        onChange={(val) => this.handleChange(val)}
        showAction={["focus","click"]}
        placeholder={'Sélectionner'}>
        <Option key="A" value="A">A</Option>
        <Option key="B" value="B">B</Option>
        <Option key="C" value="C">C</Option>
        <Option key="BLOQUE" value="BLOQUE">BLOQUÉ</Option>
        <Option key="PROSPECT" value="PROSPECT">PROSPECT</Option>
      </Select>
    );
  }
}

export default (withTranslation('common')(ClientRankFilter));
