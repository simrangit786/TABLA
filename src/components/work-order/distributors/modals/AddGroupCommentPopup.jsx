import React, {Component} from 'react';
import {Button, Form, message, Modal} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {groupItemUpdate} from "../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";

class AddGroupCommentPopupForm extends Component {

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {data} = this.props;
                groupItemUpdate(data.id, values)
                    .then(response => {
                        message.success("Successfully added comment on delivery group");
                        this.props.fetch();
                        this.props.close()
                    })
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {data, t} = this.props;
        return (
            <Modal title={t('grp_cmnt')}
                   visible={this.props.visible}
                   onCancel={this.props.close}
                   footer={[<Button key="submit" type="primary" onClick={this.handleSubmit}>
                       {data.comment ? t('edit_comment') : t('add_comment')}
                   </Button>]
                   }>
                <div className="p-4 row mx-0">
                    <Form.Item label={t('grp_cmnt_label')}>
                        {getFieldDecorator('comment', {
                            initialValue: data.comment,
                            rules: [{
                                required: true,
                                message: t('enter')
                            }],
                        })(
                            <TextArea rows={6}/>,
                        )}
                    </Form.Item>
                </div>
            </Modal>
        );
    }
}

export const AddGroupCommentPopup = Form.create()(withTranslation('common')(AddGroupCommentPopupForm));
