import React, {Component} from 'react';
import {Button, Checkbox, Form, Icon, Menu, message, Spin, Tabs} from 'antd';
import {Image as Images} from "../../Images"
import {AddAddress} from "../../drawers/work-order/AddAddress";
import {
    distributorWorkorderAddressGet,
    distributorWorkorderAddressRemove
} from "../../../controller/API/salesOperationAPI";
import ItemList from "./ItemList";
import {withTranslation} from "react-i18next";
import {addressGet} from "../../../controller/API/profileApi";

const {TabPane} = Tabs;
const _ = require('lodash');

class AddItemsForm extends Component {
    state = {
        dropdownVisible: false,
        addAddressShow: false,
        itemListShow: false,
        activeKey: '0',
        selected_locations: [],
        loading: true,
        buttonFaded: true,
    };

    constructor(props) {
        super(props);
        this.newTabIndex = 0;
    }

    toggleFaded = () => {
        this.setState({buttonFaded: false})
    };

    fetch = (params = {}) => {
        distributorWorkorderAddressGet(params)
            .then(response => {
                this.setState({
                    selected_locations: response.data,
                    loading: false
                });
            })
    };


    addressFetch = (params = {client_id: this.props.work_order.client.id}) => {
        addressGet(params)
            .then(response => {
                this.setState({all_locations: response, loading: false})
            })
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

    onChangeValue = (selected_locations) => {
        this.setState({selected_locations});
    };

    nextTab = () => {
        const {selected_locations, activeKey} = this.state;
        const len = selected_locations.length;
        if (len > 0 && parseInt(activeKey) === len - 1) {
            this.props.onNext();
        } else {
            this.setState({activeKey: (parseInt(activeKey) + 1).toString()})
        }
    };

    prevTab = () => {
        const {selected_locations, activeKey} = this.state;
        const len = selected_locations.length;
        if (len > 0 && parseInt(activeKey) === 0) {
            this.props.onPrev();
        } else {
            this.setState({activeKey: (parseInt(activeKey) - 1).toString()})
        }
    };


    menu = () => {
        const {getFieldDecorator} = this.props.form;
        const {all_locations, t} = this.props;
        const {selected_locations} = this.state;
        return <Menu className="p-0">
            <Menu.Item className="p-0">
                <div className="card w-100 card-main border-0 rounded bg-white">
                    <Form onSubmit={this.handleSubmit} className="main-form">
                        <Form.Item label={t('address')} className="mb-0">
                            {getFieldDecorator('address', {
                                rules: [{
                                    required: true,
                                    message: `${t('please_input')} ${t('address')}!`,
                                }],
                            })(
                                <div className="row mx-0">
                                    <ul className="list-inline w-100">
                                        <Checkbox.Group defaultValue={selected_locations} onChange={this.onChangeValue}>
                                            {all_locations.map((d, index) => {
                                                return <li key={`all_address_list_${index}`}>
                                                    <Checkbox
                                                        className="position-relative w-100"
                                                        value={d}>{d.title}</Checkbox>
                                                </li>
                                            })}
                                        </Checkbox.Group>
                                    </ul>
                                </div>
                            )}
                        </Form.Item>
                        <Button onClick={() => this.setState({dropdownVisible: false})} type="primary"
                                className="w-100">{t('add_loc_caps')}</Button>
                        <Button onClick={() => this.addAddressVisible(true)}
                                className="bg-transparent text-left w-100 shadow-none text-capitalize border-0 text-primary p-0">
                            <Icon type="plus"/>
                            {t('add_address')}
                        </Button>
                    </Form>
                </div>
            </Menu.Item>
        </Menu>
    };

    componentDidMount() {
        this.fetch({workorder_id: this.props.workorder.id})
    }

    render() {
        const {t, workorder} = this.props;
        const {addAddressShow, loading, selected_locations, buttonFaded} = this.state;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                <div className="row add-items-div-row mx-0 w-100">
                    <div className="card-add-items-fixed-div position-fixed">
                        <div className="inner-details-row-item w-100">
                            <div className="row mx-0 flex-align-center pt-4 mt-4">
                                <img src={Images.delivery_small} alt="delivery icon" className="img-fluid mr-3"/>
                                <p className="mb-0 shipping-heading">{t('shipping_address')}</p>
                            </div>
                            <div className="row mx-0 justify-content-center pb-3 mb-4">
                                <div className="col-12 px-0">
                                    <Tabs
                                        onChange={this.onChange}
                                        activeKey={this.state.activeKey}
                                        type="editable-card"
                                        onEdit={this.onEdit}
                                        hideAdd={false}
                                        tabPosition={"left"}
                                        className="select-address-item-tab-main"
                                    >
                                        {selected_locations.map((loc, index) => {
                                            return <TabPane tab={<div className="w-100">
                                                {loc.item_exist ?
                                                    <img src={Images.full_address_with_item} alt="tab icon"
                                                         className="img-fluid mb-3"/>
                                                    :
                                                    <img src={Images.gray_tab_icon_location} alt="tab icon"
                                                         className="img-fluid mb-3"/>
                                                }
                                                <h6 className="w-100 bg-transparent text-center px-3 ">{loc.address_json.type}</h6>
                                                <span className="w-100">{loc.address_json.title}</span>
                                                <span
                                                    className="w-100">{`${loc.address_json.address}, ${loc.address_json.zip_code}, ${loc.address_json.city},  
            ${loc.address_json.country}`}</span>
                                            </div>} key={index} closable={false}>
                                                <React.Fragment>
                                                    <div>
                                                        <ItemList fetch={() => this.fetch({workorder_id: workorder.id})}
                                                                  buttonFaded={this.toggleFaded} groupSorted={false}
                                                                  location={loc}/>
                                                    </div>
                                                </React.Fragment>
                                            </TabPane>
                                        })}
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    <div>
                        <Button style={{marginLeft: 8}} onClick={() => this.prevTab()}
                                className="font-weight-bold text-center text-uppercase mr-3">
                            {t('return')}
                        </Button>
                        <Button disabled={buttonFaded} type="primary" onClick={() => this.nextTab()}
                                className="font-weight-bold text-center text-white text-uppercase">{t('save_continue')}
                        </Button>
                    </div>
                </div>
                {addAddressShow &&
                <AddAddress workorder={workorder} fetch={this.addressFetch()} visible={addAddressShow}
                            onClose={() => this.addAddressVisible(false)}/>}
            </React.Fragment>
        );
    }
}

export const AddItems = Form.create()(withTranslation('common')(AddItemsForm));
