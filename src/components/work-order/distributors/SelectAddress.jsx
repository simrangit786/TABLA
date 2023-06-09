import React, {Component} from 'react';
import {Button, Checkbox, Form, Icon, message} from 'antd';
import {Image as Images} from "../../Images"
import {AddAddress} from "../../drawers/work-order/AddAddress";
import {withTranslation} from "react-i18next";
import {distributorWorkorderBulkAddressPost} from "../../../controller/API/salesOperationAPI";


class SelectAddressForm extends Component {

    state = {
        addAddressShow: false,
        addPhoneVisible: false,
        data: [],
        selected_address: [],
    };

    addAddressVisible = (visible) => {
        this.setState({
            addAddressShow: visible,
        })
    };
    addPhoneVisible = (visible) => {
        this.setState({
            addPhoneVisible: visible,
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.selected_address) {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    values['workorder'] = this.props.workorder.id;
                    values['address'] = this.state.selected_address;
                    distributorWorkorderBulkAddressPost(values)
                        .then(res => {
                            this.props.onNext();
                        }).catch(err => {
                        err.response.data.keys().forEach(d => {
                            message.error(`${d} ${err.response.data[d]}`)
                        })
                    });
                }
            });
        } else {
            message.error("Sélectionnez au moins une adresse.")
        }
    };
    handleCheckbox = (selected_address) => {
        this.setState({selected_address})
    };

    componentDidMount() {
        this.setState({selected_address: this.props.workorder.addresses})
    }

    render() {
        const {t, all_locations, workorder} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {addAddressShow} = this.state;
        return (
            <React.Fragment>
                <div className="add-items-div-row w-100">
                    <div className="card-add-items-fixed-div position-fixed">
                        <div className="inner-details-row-item w-100">
                            <div className="row mx-0 justify-content-center pt-4 mt-5">
                                <img src={Images.delivery_small} alt="delivery icon" className="img-fluid mb-3"/>
                                <p>{t('havent_add_loc')}</p>
                            </div>
                            <div className="row mx-0 justify-content-center pt-4 pb-3 mt-3">
                                <div className="card card-main border-0 rounded bg-white">
                                    <Form onSubmit={this.handleSubmit} className="main-form">
                                        <Form.Item label={t('address')} className="mb-0">
                                            {getFieldDecorator('address', {
                                                initialValue: workorder.addresses,
                                                rules: [{
                                                    required: true,
                                                    message: `${t('please_input')} ${t('address')} !`,
                                                }],
                                            })(<div className="row mx-0">
                                                    <ul className="list-inline w-100">
                                                        <Checkbox.Group defaultValue={workorder.addresses}
                                                                        onChange={this.handleCheckbox}>
                                                            {all_locations.map((d, index) => {
                                                                    return <li key={`address_${index}`}>
                                                                        {workorder.addresses.indexOf(d.id) >= 0 ?
                                                                            <Checkbox style={{"opacity": "0.5"}} disabled
                                                                                      className="position-relative w-100"
                                                                                      value={d.id}>{d.type}<br/><span
                                                                                style={{
                                                                                    "fontSize": "11px",
                                                                                    "fontWeight": "400"
                                                                                }}>{d.title}</span></Checkbox>
                                                                            :
                                                                            <Checkbox className="position-relative w-100"
                                                                                      value={d.id}>{d.type}<br/><span
                                                                                style={{
                                                                                    "fontSize": "11px",
                                                                                    "fontWeight": "400"
                                                                                }}>{d.title}</span></Checkbox>
                                                                        }
                                                                    </li>
                                                                }
                                                            )}
                                                        </Checkbox.Group>
                                                    </ul>
                                                </div>
                                            )}
                                        </Form.Item>
                                        <Button type="primary" onClick={this.handleSubmit}
                                                disabled={this.state.selected_address < 1}
                                                className="w-100">{t('workorder_choose_address')}</Button>
                                        <Button onClick={() => this.addAddressVisible(true)}
                                                className="bg-transparent text-left w-100 shadow-none text-transform-inherit border-0 text-primary p-0">
                                            <Icon type="plus"/>
                                            {t('workorder_add_address')}
                                        </Button>
                                        {/* <Button onClick={() => this.addPhoneVisible(true)}
                            className="bg-transparent text-left w-100 shadow-none text-transform-inherit border-0 text-primary p-0">
                      <Icon type="plus"/>
                      {t('workorder_add_phone')}
                    </Button> */}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-item-row">
                        <div className="card-add-items-div card-before">
                            <div className="text-center">
                                <img src={Images.add_article_gray} alt="delivery icon" className="img-fluid mb-3"/>
                                <p>{t('items_add')}</p>
                                <Button disabled={true} type="primary">
                                    <Icon type="plus"/>
                                    {t('add_article_caps')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    {/*<Button*/}
                    {/*  className="bg-transparent text-capitalize border-0 reset-btn font-weight-bold">Reset</Button>*/}
                    <div>
                        <Button style={{marginLeft: 8}} onClick={this.props.onPrev}
                                className="font-weight-bold text-center text-uppercase mr-3">
                            {t('return')}
                        </Button>
                        <Button type="primary" disabled={this.state.selected_address < 1} onClick={this.handleSubmit}
                                className="font-weight-bold text-center text-white text-uppercase">{t('save_next')}
                        </Button>
                    </div>
                </div>
                <AddAddress workorder={this.props.workorder} fetch={this.props.fetch} visible={addAddressShow}
                            onClose={() => this.addAddressVisible(false)}/>
                {/* <AddPhoneDrawer visible={this.state.addPhoneVisible}
                    onClose={() => this.addPhoneVisible(false)} workorder={this.props.workorder}/> */}
            </React.Fragment>
        );
    }
}

export const SelectAddress = Form.create()(withTranslation('common')(SelectAddressForm));
