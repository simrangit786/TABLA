import React, {Component} from 'react';
import {Button, Form, message, Spin, Tabs} from 'antd';
import {Image as Images} from "../../../Images"
import {AddAddress} from "../../../drawers/work-order/AddAddress";
import {
    distributorWorkorderAddressGet,
    distributorWorkorderAddressRemove
} from "../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";
import GroupItemList from "./GroupItemList";

const {TabPane} = Tabs;
const _ = require('lodash');

class DiscountItemByGroupForm extends Component {
    state = {
        dropdownVisible: false,
        addAddressShow: false,
        itemListShow: false,
        panes: [],
        activeKey: '0',
        selected_locations: [],
        loading: true
    };

    constructor(props) {
        super(props);
        this.newTabIndex = 0;
    }

    fetch = (params = {}) => {
        distributorWorkorderAddressGet(params)
            .then(response => {
                this.setState({
                    selected_locations: response.data,
                    panes: this.set_panes(response.data),
                    loading: false
                });
            })
    };

    set_panes = (locations) => {
        return locations.map((loc, index) => {
            return {
                title:
                    <div className="w-100">
                        {loc.item_exist ?
                            <img src={Images.full_address_with_item} alt="tab icon" className="img-fluid mb-3"/>
                            :
                            <img src={Images.gray_tab_icon_location} alt="tab icon" className="img-fluid mb-3"/>}
                        <h6 className="w-100 bg-transparent text-center px-3">{loc.address_json.type}</h6>
                        <span className="w-100">{loc.address_json.title}</span>
                        <span
                            className="w-100">{`${loc.address_json.address}, ${loc.address_json.zip_code}, ${loc.address_json.city},  
            ${loc.address_json.country}`}</span>
                    </div>,
                content:
                    <GroupItemList workorder={this.props.work_order} location={loc}/>
                ,
                key: `${index}`,
                location: loc.id,
                closable: false,
            }
        });
    };

    addAddressVisible = (visible) => {
        this.setState({
            addAddressShow: visible,
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
        });
    };

    onChange = activeKey => {
        this.setState({activeKey});
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const {panes} = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({title: 'New Tab', content: 'Content of new Tab', key: activeKey});
        this.setState({panes, activeKey});
    };

    remove = targetKey => {
        let {activeKey, panes} = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const removed = _.remove(panes, function (o) {
            return o.key === targetKey
        });
        removed.forEach(d => this.deleteAddress(d.location)
        );
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({panes, activeKey});
    };

    deleteAddress = (id) => {
        distributorWorkorderAddressRemove(id)
            .then(() => {
                message.success("Address removed.")
            })
    };

    componentDidMount() {
        this.fetch({workorder_id: this.props.work_order.id})
    }

    nextTab = () => {
        const {panes, activeKey} = this.state;
        const len = panes.length;
        if (len > 0 && parseInt(activeKey) === len - 1) {
            this.props.next();
        } else {
            this.setState({activeKey: (parseInt(activeKey) + 1).toString()})
        }
    };

    prevTab = () => {
        const {panes, activeKey} = this.state;
        const len = panes.length;
        if (len > 0 && parseInt(activeKey) === 0) {
            this.props.prev();
        } else {
            this.setState({activeKey: (parseInt(activeKey) - 1).toString()})
        }
    };

    render() {
        const {t} = this.props;
        const {addAddressShow, loading} = this.state;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                <div className="row add-items-div-row mx-0 w-100 h-100">
                    <div className="card-add-items-fixed-div position-fixed">
                        <div className="inner-details-row-item w-100">
                            <div className="row mx-0 flex-align-center pt-4 mt-4">
                                <img src={Images.delivery_small} alt="delivery icon" className="img-fluid mr-3"/>
                                <p className="mb-0 shipping-heading">{t('shipping_address')}</p>
                            </div>
                            <div className="row mx-0 justify-content-center mb-4 pb-3">
                                <Tabs
                                    onChange={this.onChange}
                                    activeKey={this.state.activeKey}
                                    type="editable-card"
                                    onEdit={this.onEdit}
                                    hideAdd={false}
                                    tabPosition={"left"}
                                    className="select-address-item-tab-main"
                                >
                                    {this.state.panes.map((pane => (
                                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                            <React.Fragment>
                                                <div>
                                                    {pane.content}
                                                </div>
                                            </React.Fragment>
                                        </TabPane>
                                    )))}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    <div>
                        <Button style={{marginLeft: 8}} onClick={() => this.prevTab()}
                                className="font-weight-bold text-center text-uppercase mr-3">
                            {t('return')}
                        </Button>
                        <Button type="primary" onClick={() => this.nextTab()}
                                className="font-weight-bold text-center text-white text-uppercase">{t('save_continue')}
                        </Button>
                    </div>
                </div>
                <AddAddress visible={addAddressShow} onClose={() => this.addAddressVisible(false)}/>
            </React.Fragment>
        );
    }
}

export const DiscountItemByGroup = Form.create()(withTranslation('common')(DiscountItemByGroupForm));
