import React, {Component} from 'react';
import {Button, Form, Modal} from "antd";
import {withTranslation} from "react-i18next";
import CentraleFilter from "../../../../../filters/centraleFilter"
import {Image as Images} from "../../../../Images";

class CentraleForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onChange(values["centrale"])
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <Modal title={t('central')}
                   visible={this.props.visible}
                   onCancel={this.props.close}
                   closable={false}
                   footer={[<Button key="submit" type="primary" onClick={this.handleSubmit}>
                       {t('add')}
                   </Button>]
                   }>
                <div className="row mx-0">
                    <Button onClick={this.props.close}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                </div>
                <div className="text-capitalize p-4 row mx-0">
                    <Form.Item label={t('central')}>
                        {getFieldDecorator('centrale', {
                            rules: [{
                                required: true,
                                message: t('enter')
                            }],
                        })(<CentraleFilter/>,)}
                    </Form.Item>
                </div>
            </Modal>
        );
    }
}

export const Centrale = Form.create()(withTranslation('common')(CentraleForm));
