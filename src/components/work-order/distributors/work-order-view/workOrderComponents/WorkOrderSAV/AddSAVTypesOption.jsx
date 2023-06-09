import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, Select, Spin} from "antd";
import {Image as Images} from "../../../../../Images";
import {createSAVTypes, getSAVCategories} from "../../../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";

const {Option} = Select;

class AddSAVTypesOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SAVCategories: [],
            SAVCategoryLoading: false,
            SAVSubmitLoading: false
        }
    }

    fetchSAVCategories = () => {
        this.setState({SAVCategoryLoading: true})
        getSAVCategories()
            .then(response => {
                this.setState({SAVCategories: response.data, SAVCategoryLoading: false})
            })
    }
    handleSAVTypes = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({SAVSubmitLoading: true})
                values['category'] = values['category'].key
                createSAVTypes(values)
                    .then(() => {
                        this.setState({SAVSubmitLoading: false})
                        message.success("Added SAV Type successfully")
                        this.props.onClose()
                    }).catch(() => {
                    this.setState({SAVSubmitLoading: false})
                })
            }
        })
    }


    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {SAVCategories, SAVCategoryLoading, SAVSubmitLoading} = this.state
        return (
            <React.Fragment>
                <Modal
                    visible={this.props.visible}
                    onCancel={this.props.onClose}
                    width="45%"
                    destroyOnClose={true}
                    title={
                        <div className="custom-header-modal">
                            <h4>CRÉER UN TYPE DE SAV</h4>
                            <Button onClick={this.props.onClose}
                                    className="close-header-icon add-comment-btn w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                                <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                                <div>{t("close_window_new")}</div>
                            </Button>
                        </div>}
                    className="hide-close-btn"
                    footer={
                        <Button loading={SAVSubmitLoading} type="primary" onClick={this.handleSAVTypes}>
                            CRÉER CE TYPE DE SAV
                        </Button>
                    }>
                    <div className="row mx-0 py-4 px-4">
                        <div className="col-12">
                            <Form.Item label={"Catégorie de SAV"}>
                                {getFieldDecorator('category', {
                                    rules: [{
                                        required: true,
                                        message: t('input_your') + '!'
                                    }],
                                })(<Select labelInValue
                                           showSearch
                                           optionFilterProp="children"
                                           showAction={["focus", "click"]}
                                           onFocus={() => this.fetchSAVCategories()}
                                           notFoundContent={SAVCategoryLoading ? <Spin size="small"/> : null}
                                           placeholder={t('select')}>
                                    {SAVCategories.map((d, index) => <Option key={`category_${index}`}
                                                                             value={d.id}>{d.title}</Option>)}</Select>)}
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item className="position-relative select-arrow-none"
                                       label={"Nom du type de SAV"}>
                                {getFieldDecorator('sav_title', {
                                    rules: [{
                                        required: true,
                                        message: `${t('input_your')} !`
                                    }],
                                })(<Input/>)}
                            </Form.Item>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Form.create()(withTranslation('common')(AddSAVTypesOption));