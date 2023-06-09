import React, {Component} from 'react';
import {Form, InputNumber} from "antd";
import {generateWorkOrderItemCredit} from "../../../../../../controller/API/salesOperationAPI";

class UpdateItemQuantity extends Component {
    state = {
        credit: null
    }
    updateItemCredit = (value) => {
        const values = {
            "item": this.props.data.id,
            "quantity": value
        }
        generateWorkOrderItemCredit(values)
            .then(response => {
                if (value) {
                    this.props.updateQuantityCheck(true)
                    this.setState({credit: response.data})
                } else {
                    this.props.updateQuantityCheck(false)
                    this.setState({credit: null})
                }
            })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {data, remaining_quantity} = this.props;
        const {credit} = this.state;
        return (
            <div className="added-pricing row mx-0 align-items-center row w-100">
                <div className="col-sm-7 p-0">
                    <div className="d-flex align-items-center w-100">
                        <Form.Item className="design-update-item mb-0">
                            {getFieldDecorator('quantity', {
                                initialValue: 0
                            })(<InputNumber onChange={this.updateItemCredit} step={data.item.units_per_set}
                                            min={0} max={remaining_quantity}/>)}
                        </Form.Item>
                        {credit ? `${credit.quantity / data.item.units_per_set} sets` : ""}
                    </div>
                </div>
                {credit?.price ?
                    <div className="col-sm-5 text-right p-0">
                        <h6 className="mb-0">- €{parseFloat(credit.price).toFixed(2)}
                        </h6>
                    </div> : ""
                }
            </div>
        );
    }
}

export default Form.create()(UpdateItemQuantity);