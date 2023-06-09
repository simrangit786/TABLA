import React, {Component} from 'react';
import {Select} from "antd";
import {withTranslation} from "react-i18next";
import {methods} from "../controller/Global";


const {Option} = Select;

class LegalformFilter extends Component {


  handleChange = (value) => {
    this.props.onChange([value])
  };

  render() {
    const {t, method} = this.props;
    return (
      <Select
        value={this.props.value || []}
        showAction={["focus","click"]}
        autoFocus={method===methods.create}
        onChange={(val) => this.handleChange(val)}
        placeholder={t('select')}>
        <Option key="a" value="SA">SA</Option>
        <Option key="b" value="SAS">SAS</Option>
        <Option key="c" value="EURL">EURL</Option>
        <Option key="d" value="SARL">SARL</Option>
      </Select>
    );
  }
}

export default (withTranslation('common')(LegalformFilter));
