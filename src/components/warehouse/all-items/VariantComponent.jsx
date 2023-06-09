import React, {Component} from 'react';
import {Button, Form, Input} from "antd";
import {withTranslation} from "react-i18next";
import {variantComponentAdd, variantComponentRemove, variantComponentUpdate} from "../../../controller/API/itemApi";
import {showErrors} from "../../../controller/utils";

class VariantComponentForm extends Component {

    state = {
        components: [],
        editComponent: null,
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {components, editComponent} = this.state;
                values['variant'] = this.props.variant.id;
                if (editComponent) {
                    variantComponentUpdate(editComponent, values).then(response => {
                        let newArr = components.map(item => {
                            if (item.id === response.data.id) {
                                return response.data
                            } else {
                                return item
                            }
                        });
                        this.setState({components: newArr, editComponent: null});
                    }).catch(err => showErrors(err.response.data, this.props.form))
                } else {
                    variantComponentAdd(values)
                        .then(response => {
                            components.push(response.data);
                            this.setState({components, editComponent: null});
                        }).catch(err => showErrors(err.response.data, this.props.form))
                }
                this.props.form.resetFields();
            }
        })
    };

    handleRemoveCard = (id, index) => {
        variantComponentRemove(id)
            .then(() => {
                let {components} = this.state;
                components.splice(index, 1);
                this.setState({components});
            })
    };

    componentDidMount() {
        if (this.props.variant.components.length > 0) {
            this.setState({components: this.props.variant.components})
        }
    }


    render() {
        const {t} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {components, editComponent} = this.state;
        return (
            <React.Fragment>
                <div className="col-sm-12 col-12 col-md-12 col-lg-12">
                    <div className="row">
                        <div className="col-12">
                            <Form.Item label={t('name')}>
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: `${t('input_your')}`
                                    }],
                                })(
                                    <Input placeholder={t('name')}/>,
                                )}
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <Button onClick={this.handleSubmit}
                            type="primary">{editComponent ? t('edit_component') : t('add_component')}</Button>
                    <div className="row">
                        {components.map((data, index) =>
                            <div key={`component_card_${index}`} className="col-sm-6 col-12">
                                <div className="row mx-0 address-add-row mb-0 position-relative">
                                    <div className="col-lg-5 col-sm-12 col-12">
                                        <h5 className="mb-0 text-capitalize">{data.name}</h5>
                                    </div>
                                    <div className="col-lg-4 col-sm-12 col-12 position-relative">
                                        <p className="mb-0">{data.sku_id}</p>
                                    </div>
                                    <div className="col-sm-3 col-12 edit-delete-div">
                                        <Button onClick={() => {
                                            this.props.form.setFieldsValue({
                                                name: data.name,
                                            });
                                            this.setState({editComponent: data.id})

                                        }} className="mt-n5 bg-transparent rounded-0 border-0 shadow-none p-0 h-auto"
                                        >{t("edit")}</Button>
                                        <Button
                                            onClick={() => this.handleRemoveCard(data.id, index)}
                                            className="bg-transparent rounded-0 border-0 shadow-none p-0 h-auto">
                                            {t("delete")}
                                        </Button>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export const VariantComponent = Form.create()(withTranslation('common')(VariantComponentForm));
