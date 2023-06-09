import React, {Component} from 'react';
import {Button, Form, message, Modal, Select} from "antd";
import {Image as Images} from "../../../../Images";
import {withTranslation} from "react-i18next";

const {Option} = Select;

class EmailModalForm extends Component {
    state = {
        loading: false
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                values['documents'] = this.props.documents;
                this.props.sendAPI(values)
                    .then(response => {
                        this.setState({loading: false});
                        message.success("Successfully sent email")
                        this.props.onClose();
                    })
                    .catch(err => {
                        this.setState({loading: false});
                        this.props.onClose();
                    })
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state
        return (
            <Modal title={"Email"}
                   className="remove-default-close"
                   destroyOnClose={true}
                   visible={this.props.visible}
                   onCancel={this.props.onClose}
                   footer={<Button key="submit" onClick={this.handleSubmit} loading={loading}
                                   type="primary">VALIDER</Button>}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER SANS VALIDER</div>
                    </Button>
                </div>
                <div className="text-capitalize p-4 row mx-0">
                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [{
                                required: true,
                                message: 'Email'
                            }],
                            initialValue: this.props.initialEmail || []
                        })(
                            <Select mode="tags" style={{width: '100%'}} placeholder="Email">
                                {this.props.defaultEmail.map((item, index) => {
                                    return <Option key={index} value={item.email}
                                                   className="workorder-email-select-opt name">
                                        {item.email} <br/>
                                        <span className='workorder-email-name'>{item.name}</span>
                                    </Option>
                                })}
                                {this.props.initialEmail?.map((email, index) => {
                                    return <Option key={index} value={email}
                                                   className="workorder-email-select-opt name">
                                        {email} <br/>
                                    </Option>
                                })}

                            </Select>
                        )}
                    </Form.Item>


                </div>
            </Modal>
        );
    }
}

export const EmailModal = Form.create()(withTranslation('common')(EmailModalForm));
