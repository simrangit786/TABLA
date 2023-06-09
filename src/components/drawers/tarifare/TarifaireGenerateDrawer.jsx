import React, {Component} from 'react';
import {Button, Drawer, Form, Input,Select} from "antd";
import {Image as Images} from '../../../components/Images'
import {withTranslation} from "react-i18next";
import {createWorkOrderEntity} from "../../../controller/API/salesOperationAPI";

class TarifaireGenerateDrawer extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                createWorkOrderEntity(values).then(response => {
                    this.props.onClose()
                }).catch(err => {
                })
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        const {Option}=Select;
        return (
            <Drawer
                title='GÉNÉRER TARIF TTC PDF AU COEFFICIENT'
                placement="right"
                width="520px"
                destroyOnClose={true}
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>{t('close')}</div>
                    </Button>
                    <div className="col-12 px-0 ">
                        <Form onSubmit={this.handleSubmit} className="main-form">
                            <div className="row mx-0">
                                <Form.Item label={'Sales Coefficient :'}>
                                    {getFieldDecorator('sales_coefficient', {
                                        rules: [{
                                            required: true,
                                            message: "Please input sales coefficient!"
                                        }],
                                    })(
                                        <Input/>,
                                    )}
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.props.onClose} type="primary">
                            GÉNÉRER UN PDF
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export const CreateTarifarePDF = Form.create()(withTranslation('common')(TarifaireGenerateDrawer));