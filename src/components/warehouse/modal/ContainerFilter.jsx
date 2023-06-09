import React, {Component} from 'react';
import {Button, DatePicker, Form} from "antd";
import {dateFormat} from "../../../utils";

const {RangePicker} = DatePicker;

class ContainerFilter extends Component {
    handleFilterForm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values['date']) {
                    values['start_date'] = values['date'][0].format('YYYY-MM-DD');
                    values['end_date'] = values['date'][1].format('YYYY-MM-DD');
                    delete values['date']
                }
                this.props.onFilter(values)
            }
        })
    };
    onReset = () => {
        this.props.form.resetFields();
        this.props.onFilter({})
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="row mx-0 common-form-div">
                <div className="col-12">
                    <Form>
                        <Form.Item label="Date de livraison" rules={[{required: true}]}>
                            {getFieldDecorator('date', {}
                            )(<RangePicker format={dateFormat}/>)}
                        </Form.Item>
                    </Form>
                </div>
                <div className="col-12">
                    <div className="row mx-0 flex-align-center-between footer-btn-filter">
                        <Button onClick={this.onReset}>Réinitialiser</Button>
                        <Button onClick={this.handleFilterForm} type="primary">
                            Recherche
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({name: 'profileFilter'})(ContainerFilter);
