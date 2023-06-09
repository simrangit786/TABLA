import React, {Component} from 'react';
import {Button, Dropdown, Form, Menu, message, Select} from 'antd';
import {Image as Images} from '../../../../Images'
import {years} from "../../../../../utils";

const {Option} = Select;


class DatePickerGraphDropdown extends Component {
    state = {
        year1: this.props.year1,
        year2: this.props.year2,
    };

    onUpdateYears = () => {
        const {year1, year2} = this.state;
        if (year1 && year2) {
            this.props.updateYears(year1, year2)
        } else {
            message.error("Please select both years")
        }
    };

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    };

    menu = (
        <Menu>
            <Form>
                <div className="row">
                    <div className="col-12">
                        <Form.Item label={''}>
                            <div onClick={(e) => e.stopPropagation()}
                                 className="row mx-0 align-items-center position-relative justify-content-between">
                                <Select
                                    defaultValue={this.state.year1}
                                    name={"year1"}
                                    onChange={(e) => this.handleChange("year1", e)}
                                    showArrow={true}
                                >{years.map(item => (
                                    <Option value={item}>{item}</Option>
                                ))}
                                </Select>
                                <span className="position-absolute dash-connect-each-tag">-</span>
                                <Select
                                    defaultValue={this.state.year2}
                                    name={"year2"}
                                    showArrow={true}
                                    onChange={(e) => this.handleChange("year2", e)}>
                                    {years.map(item => (
                                        <Option value={item}>{item}</Option>
                                    ))}
                                </Select>
                            </div>
                        </Form.Item>
                        <Form.Item className="mb-0">
                            <div className="row mx-0 justify-content-end">
                                <Button onClick={this.onUpdateYears} className="valid-btn-div">Valider</Button>
                            </div>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Menu>
    );

    render() {
        return (
            <React.Fragment>
                <div className="dropdown-graph-div">
                    <Dropdown overlayClassName="dropdown-main-analysis-div" overlay={this.menu} trigger={['click']}>
                        <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {`${this.state.year1}-${this.state.year2}`}
                            <img src={Images.down_arrow_lite_gray} alt=""
                                 className="img-fluid down-arrow-lite position-absolute"/>
                        </Button>
                    </Dropdown>
                </div>
            </React.Fragment>
        );
    }
}

export default DatePickerGraphDropdown;