import React, {Component} from 'react';
import {Button, Form, Input, Modal, Select, Spin} from "antd";
import {Image as Images} from "../../../../../Images";
import AddSAVTypesOption from "./AddSAVTypesOption";
import {getSAVTypes} from "../../../../../../controller/API/salesOperationAPI";
import {withTranslation} from "react-i18next";

const {Option, OptGroup} = Select;
const {TextArea} = Input;

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savTypes: [],
            savTypeLoading: false,
            savTypeVisible: false
        }
        this.textRef = React.createRef()
    }

    formatSAVTypeData = (data) => {
        let savData = {}
        data.forEach((item, index) => {
            if (savData[item.category.title]) {
                savData[item.category.title].push({
                    "id": item.id, "title": item.sav_title
                })
            } else {
                savData[item.category.title] = [{
                    "id": item.id, "title": item.sav_title
                }]
            }
        })
        return savData
    }

    fetchSAVTypes = () => {
        this.setState({savTypeLoading: true})
        getSAVTypes()
            .then(response => {
                const savData = this.formatSAVTypeData(response.data)
                this.setState({savTypes: savData, savTypeLoading: false})
            })
    }

    visibleSAVTypeModel = (savTypeVisible) => {
        this.setState({savTypeVisible})
    }

    handleComment = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values['sav_type'] = values['sav_type'].map(i => i.key)
                this.props.updateSAVComment(values)
                this.props.onClose()
            }
        })
    }

    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {savTypes, savTypeLoading, savTypeVisible} = this.state
        return (
            <React.Fragment>
                <Modal
                    visible={this.props.visible}
                    onCancel={this.props.onClose}
                    width="45%"
                    destroyOnClose={true}
                    title={
                        <div className="custom-header-modal">
                            <h4>Ajouter un commentaire</h4>
                            <Button onClick={this.props.onClose}
                                    className="close-header-icon add-comment-btn w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                                <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                                <div>{t("close_window_new")}</div>
                            </Button>
                        </div>
                    }
                    className="hide-close-btn"
                    footer={
                        <Button type="primary" onClick={this.handleComment}>
                            Ajouter Ce commentaire
                        </Button>
                    }>
                    <div className="row mx-0 py-4 px-4">
                        <div className="col-12">
                            <Form.Item className="position-relative select-arrow-none"
                                       label={t('Type de SAV')}>
                                {getFieldDecorator('sav_type', {
                                    rules: [{
                                        required: true,
                                        message: `${t('input_your')} !`
                                    }],
                                })(<Select labelInValue
                                           mode="multiple"
                                           showSearch
                                           optionFilterProp="children"
                                           showAction={["focus", "click"]}
                                           onFocus={() => this.fetchSAVTypes()}
                                           notFoundContent={savTypeLoading ? <Spin size="small"/> : null}
                                           placeholder={t('select')}>
                                    {Object.keys(savTypes).map((key, index) => {
                                        return <OptGroup key={key} label={key}>
                                            {savTypes[key].map((d, index) =>
                                                <Option key={`types_${index}`} value={d.id}>{d.title}</Option>)
                                            }
                                        </OptGroup>
                                    })}
                                </Select>)}
                                <Button onClick={() => this.visibleSAVTypeModel(true)}
                                        className="create-btn-select position-absolute font-weight-bold m-auto px-2 flex-align-center">
                                    <span>{t('create_caps')}</span>
                                    <img src={Images.plus_icon_primary} alt="plus icon"
                                         className="img-fluid"/>
                                </Button>
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item className="position-relative select-arrow-none"
                                       label={t('Cm')}>
                                {getFieldDecorator('comment', {
                                    rules: [{
                                        required: true,
                                        message: `${t('input_your')} !`
                                    }],
                                })(<TextArea ref={this.textRef} rows={6}/>)}
                            </Form.Item>
                        </div>
                    </div>
                </Modal>
                <AddSAVTypesOption visible={savTypeVisible} onClose={() => this.visibleSAVTypeModel(false)}/>
            </React.Fragment>
        );
    }
}

export default Form.create()(withTranslation('common')(AddComment));