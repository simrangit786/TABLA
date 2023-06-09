import React, {Component} from 'react';
import {Button, Form, message, Modal, Select} from "antd";
import {Image as Images} from "../../../Images";
import {withTranslation} from "react-i18next";
import {sendDocumentEmailPost} from "../../../../controller/API/salesOperationAPI";

const {Option} = Select;

class EmailPopup extends Component {

    state = {
        loading: false
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                values['documents'] = this.props.documents;
                sendDocumentEmailPost(values)
                    .then(response => {
                        this.setState({loading: false});
                        message.success("Successfully sent email")
                        this.props.onClose();
                    })
                    .catch(err => {
                        this.setState({loading: false});
                    })
            }
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {t, defaultEmail = []} = this.props;
        const {loading} = this.state;
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.onClose}
                width="45%"
                title={
                    <div className="custom-header-modal">
                        <h4>{t('email')}</h4>
                        <Button onClick={this.props.onClose}
                                className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                            <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                            <div>{t("close_window_new")}</div>
                        </Button>
                    </div>
                }
                className="hide-close-btn"
                footer={[<Button key="submit" loading={loading} type="primary" onClick={this.handleSubmit}>
                    {t('valid')}
                </Button>]
                }>
                {this.props.visible && <div className="p-4 row mx-0">
                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{
                                required: true,
                                message: 'Email'
                            }],
                            initialValue: defaultEmail
                        })(
                            <Select mode="tags" style={{width: '100%'}} placeholder="Email">
                                {defaultEmail.map((item, index) => {
                                    return <Option key={index} value={item} label={item}>{item}</Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                </div>}
            </Modal>
        );
    }
}

export const EmailPopupModal = Form.create()(withTranslation('common')(EmailPopup));
