import React, {Component} from "react";
import {Checkbox} from "antd";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {itemToInvoice} from "../../../../../../redux/Actions/ItemAction";
import CartItemSingleCredit from "./CartItemSingleCredit";

const moment = require('moment');

class AddedOrderItemCredit extends Component {
    state = {
        allChecked: false,
        checkboxArray: [],
        checkedList: [],
        indeterminate: false,
        checkAll: false,
        checkListWithComment: []
    };

    updateCreditCommentWithItem = (item_id, comment) => {
        const {checkListWithComment} = this.state;
        const items_id = checkListWithComment.map(item => item.id)
        const index_id = items_id.indexOf(item_id)
        if (index_id > -1) {
            checkListWithComment[index_id]['comment'] = comment
        } else {
            checkListWithComment.push({id: item_id, comment})
        }
        this.setState(checkListWithComment)
        this.props.getCheckedList(this.state.checkedList, checkListWithComment, this.props.data.id);
    }

    onChangeCheck = checkedList => {
        const {checkboxArray} = this.state;
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < checkboxArray.length,
            checkAll: checkedList.length === checkboxArray.length,
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.checkedList !== this.state.checkedList) {
            this.props.getCheckedList(this.state.checkedList, this.state.checkListWithComment, this.props.data.id);
        }
    }

    componentDidMount() {
        const {data} = this.props;
        const checkboxArray = [];
        data.items.map((item) => checkboxArray.push(item.id));
        this.setState({checkboxArray})
    }

    render() {
        const {data, index, itemCheckbox, invoice} = this.props;
        const {checkedList} = this.state;
        return (
            <React.Fragment>
                <div key={`group_card_${index}`} className="row mx-0 added-by-group">
                    <div className="col-12 p-0">
                        <div className="address-heading row mx-0">
                            <div className="col-12 px-0">
                                <h5 className="text-uppercase mb-0">
                                    {invoice ? "Facturation pour la livraison du" : data.name} : <span>{moment(data.delivery_date).format('DD/MM/YYYY')}</span>
                                    <small>{data.comment}</small>
                                </h5>
                            </div>
                        </div>
                        <div className="row mx-0 shopping-address-cart">
                            <div className="col-12 pr-0 padding-responsive-right">
                                <Checkbox.Group value={checkedList} onChange={this.onChangeCheck}>
                                    {data.items.map((item, index) =>
                                        <CartItemSingleCredit
                                            updateCreditCommentWithItem={this.updateCreditCommentWithItem}
                                            key={index} delivery_ticket={data.delivery_ticket}
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

export default connect(null, {itemToInvoice})(withTranslation("common")(AddedOrderItemCredit));
