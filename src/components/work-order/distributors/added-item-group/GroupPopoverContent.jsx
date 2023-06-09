import React, {Component} from 'react';
import {Button, ConfigProvider, DatePicker, Form, message, Popover, Tooltip} from "antd";
import {
    distributorWorkorderAddressGet,
    distributorWorkorderGroupChangeAdd
} from "../../../../controller/API/salesOperationAPI";
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import frFR from 'antd/lib/locale-provider/fr_FR';

class GroupPopoverContentForm extends Component {
    state = {
        locations: [],
        params: {workorder_id: this.props.workorder.id},
        visiblePopover: false,
        loading: false,
        deliveryDate: null
    };


    setDeliveryDate = (value) => {
        this.setState({deliveryDate: value.format('YYYY-MM-DD')})
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                values['item'] = this.props.data.id;
                values['delivery_date'] = this.state.deliveryDate;
                distributorWorkorderGroupChangeAdd(values)
                    .then(() => {
                        this.setState({visiblePopover: false, deliveryDate: null, loading: false});
                        message.success("Delivery date updated successfully");
                        this.props.fetch();
                    }).catch(err => {
                    this.setState({loading: false, deliveryDate: null});
                })
            }
        })
    };

    fetch = (params = {}) => {
        distributorWorkorderAddressGet(params)
            .then(response => {
                this.setState({
                    locations: response.data,
                });
            })
    };

    handlePopover = visible => {
        this.setState({visiblePopover: visible});
    };

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state;
        return (
            <Popover
                overlayClassName={'truck-popover'}
                style={{width: '150px'}}
                content={<div className="row">
                    <div className="col-12">
                        <Form.Item label={t('delivery_date')}>
                            {getFieldDecorator('delivery_date', {
                                rules: [{
                                    required: false,
                                    message: t('please_input') + 'infos'
                                }]
                            })(
                                <ConfigProvider locale={frFR}>
                                    <DatePicker placeholder={t('select_date')} onChange={this.setDeliveryDate}
                                                format={"DD/MM/YYYY"}
                                                style={{width: "100%"}}/>
                                </ConfigProvider>
                            )}
                        </Form.Item>
                    </div>
                    <div className="col-6">
                        <Button onClick={() => this.handlePopover(false)}>{t('cancel')}</Button>
                    </div>
                    <div className="col-6">
                        <Button loading={loading} onClick={(e) => this.handleSubmit(e)}
                                type="primary">{t('update_delevery')}</Button>
                    </div>
                </div>}
                title={this.props.title}
                trigger="click"
                placement="left"
                visible={this.state.visiblePopover}
                onVisibleChange={this.handlePopover}
            >
                <Tooltip title={t('change_date')}>
                    <Button>
                        <img alt="del-truck" src={Images.del_truck} className="img-fluid"/>
                    </Button>
                </Tooltip>
            </Popover>

        );
    }
}

export const GroupPopoverContent = Form.create()(withTranslation('common')(GroupPopoverContentForm));
