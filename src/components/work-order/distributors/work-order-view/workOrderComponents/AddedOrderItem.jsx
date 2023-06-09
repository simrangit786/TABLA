import React, {Component} from "react";
import {Checkbox} from "antd";
import {withTranslation} from "react-i18next";
import CartItemSingle from "./CartItemSingle";
import {connect} from "react-redux";
import {itemToInvoice} from "../../../../../redux/Actions/ItemAction";

const moment = require('moment');

function DeliveryTicketStatus(data) {
    return !!data.items.find(item => !item.delivery_ticket_generated)
}

class AddedOrderItem extends Component {
    state = {
        allChecked: false,
        checkboxArray: [],
        checkedList: [],
        indeterminate: false,
        checkAll: false,
    };

    onChangeCheck = checkedList => {
        const {checkboxArray} = this.state;
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < checkboxArray.length,
            checkAll: checkedList.length === checkboxArray.length,
        });
    };

    onCheckAllChange = e => {
        const {checkboxArray} = this.state;
        this.setState({
            checkedList: e.target.checked ? checkboxArray : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.checkedList !== this.state.checkedList) {
            this.props.getCheckedList(this.state.checkedList, this.props.data.id);
        }
    }

    componentDidMount() {
        const {data} = this.props;
        const checkboxArray = [];
        data.items.map((item) => checkboxArray.push(item.id));
        this.setState({checkboxArray})
    }

    render() {
        const {data, index, groupCheckbox, itemCheckbox, invoice} = this.props;
        const {checkedList, checkAll, indeterminate} = this.state;
        return (
            <React.Fragment>
                <div key={`group_card_${index}`} className="row mx-0 added-by-group">
                    <div className="col-12 p-0">
                        <div className="address-heading row mx-0">
                            <div className="col-12 px-0">
                                <h5 className="text-uppercase mb-0">
                                    {groupCheckbox && DeliveryTicketStatus(data) && <Checkbox
                                        indeterminate={indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={checkAll}>
                                    </Checkbox>}
                                    {invoice ? "Facturation pour la livraison du" : data.name} : <span>{moment(data.delivery_date).format('DD/MM/YYYY')}</span>
                                    <small>{data.comment}</small>
                                </h5>
                            </div>
                        </div>
                        <div className="row mx-0 shopping-address-cart">
                            <div className="col-12 pr-0 padding-responsive-right">
                                {/* <AddedOrderItem data={d.items} /> */}
                                <Checkbox.Group value={checkedList} onChange={this.onChangeCheck}>
                                    {data.items.map((item, index) =>
                                        <CartItemSingle key={index} delivery_ticket={data.delivery_ticket}
                                                        itemCheckbox={itemCheckbox} index={index} item={item}/>
                                    )}
                                </Checkbox.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, {itemToInvoice})(withTranslation("common")(AddedOrderItem));
