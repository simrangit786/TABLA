import React, {Component} from 'react';
import {Button, Form, Icon, Input, InputNumber, message, Popover, Radio, Tabs} from "antd";
import {Image as Images} from "../../Images";
import {CreateCategoty} from "../../drawers/CreateCategoty";
import {CreateFamily} from "../../drawers/CreateFamily";
import ItemCategoryFilter from "../../../filters/itemCategoryFilter";
import ProductFilter from "../../../filters/productFilter";
import {variantAdd, variantUpdate} from "../../../controller/API/itemApi";
import {ChromePicker} from "react-color";
import {withTranslation} from "react-i18next";
import {CreateSupplier} from "../../drawers/CreateSupplier";
import WarehouseSupplierFilter from "../../../filters/warehouseSupplierFilter";
import {showErrors} from "../../../controller/utils";
import OriginCountryFilter from "../../../filters/OriginCountryFilter";
import MultiSiteFilter from "../../../filters/multiSiteFilter";

const {TextArea} = Input;
const {TabPane} = Tabs;


const _ = require('lodash');

class CreateArticleForm extends Component {

    state = {
        createCategory: false,
        createFamily: false,
        btnLoading: false,
        color: "#333",
        createSupplier: false,
        material_fr: null,
        material_en: null,
        material_es: null,
        description_fr: null,
        description_en: null,
        description_es: null,
    };

    handleSubmit = e => {
        const {t} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!this.state.material_fr && !this.state.material_en && !this.state.material_es) {
                    this.props.form.setFields({
                        material: {
                            // value: values.user,
                            errors: [new Error(`${t('input_your')} ${t('description_supplier')}!`)],
                        },
                    });
                } else {
                    values['material_fr'] = this.state.material_fr;
                    values['material_en'] = this.state.material_en;
                    values['material_es'] = this.state.material_es;
                    values['description_fr'] = this.state.description_fr;
                    values['description_en'] = this.state.description_en;
                    values['description_es'] = this.state.description_es;
                    this.setState({btnLoading: true});
                    if (this.props.item) {
                        variantUpdate(this.props.item.id, values)
                            .then(response => {
                                message.success("product updated successfully.");
                                this.props.next(response.data);
                                this.setState({btnLoading: false});
                            }).catch(err => {
                            this.setState({btnLoading: false});
                            showErrors(err.response.data, this.props.form)
                        })
                    } else {
                        variantAdd(values)
                            .then(response => {
                                message.success("produit ajouté avec succès.");
                                this.props.next(response.data);
                                this.setState({btnLoading: false});
                            }).catch(err => {
                            this.setState({btnLoading: false});
                            showErrors(err.response.data, this.props.form)
                        })
                    }
                }
            }
        });
    };

    createCategoryShow = (visible) => {
        this.setState({
            createCategory: visible,
        })
    };

    createSupplierShow = (visible) => {
        this.setState({
            createSupplier: visible,
        })
    };

    createFamilyShow = (visible) => {
        this.setState({
            createFamily: visible,
        })
    };

    onChange = (val) => {
    };

    componentDidMount() {
        const {item} = this.props;
        this.setState({"material_fr": _.get(item, 'material_fr', null)});
        this.setState({"material_en": _.get(item, 'material_en', null)});
        this.setState({"material_es": _.get(item, 'material_es', null)});
        this.setState({"description_fr": _.get(item, 'description_fr', null)});
        this.setState({"description_en": _.get(item, 'description_en', null)});
        this.setState({"description_es": _.get(item, 'description_es', null)});
    }

    handleMaterial = (field, e) => {
        this.setState({[field]: e.target.value})
    };

    handleDescription = (field, e) => {
        this.setState({[field]: e.target.value})
    };
    handleColor = (val) => {
        this.setState({color: val.hex});
        this.props.form.setFieldsValue({colour_code: val.hex});
    };

    onFactoryPriceChange = (e) => {
        const value = e.target.value;
        const data = this.props.form.getFieldsValue(['price', 'sales_price', 'retail_price']);
        const tablacasa_sales_coefficient = this.props.form.getFieldValue('price');
        this.props.form.setFieldsValue({
            "tablacasa_sales_coefficient": (data['price'] / value || 0.00).toFixed(2),
            "suggested_sales_coefficient": ((data['sales_price'] / tablacasa_sales_coefficient) || 0.00).toFixed(2),
        });
        if (data['retail_price']) {
            this.props.form.setFieldsValue({
                "suggested_retail_coefficient": ((data['retail_price'] / value) || 0.00).toFixed(2),
            })
        }

    };
    onTablaCasaSalesChange = (e) => {
        const value = e.target.value;
        const factory_price = this.props.form.getFieldValue('factory_price_euro');
        const sales_price = this.props.form.getFieldValue('sales_price');
        this.props.form.setFieldsValue({
            "tablacasa_sales_coefficient": ((value / factory_price) || 0.00).toFixed(2),
            "suggested_sales_coefficient": ((sales_price / value) || 0.00).toFixed(2)
        });
    };

    onSuggestedSalesChange = (e) => {
        const value = e.target.value;
        const tablacasa_sales_coefficient = this.props.form.getFieldValue('price');
        this.props.form.setFieldsValue({"suggested_sales_coefficient": ((value / tablacasa_sales_coefficient) || 0.00).toFixed(2)});
    };

    onSuggestedRetailChange = (e) => {
        const value = e.target.value;
        const factory_price = this.props.form.getFieldValue('factory_price_euro');
        this.props.form.setFieldsValue({"suggested_retail_coefficient": ((value / factory_price) || 0.00).toFixed(2)});
    };

    render() {
        const {t, method} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {createCategory, createFamily, btnLoading, createSupplier, color} = this.state;
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} className="main-form article-form-main">
                    <div className="row steps-main-row p-0 mx-0 inventory-form">
                        <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="text-capitalize font-weight-bold mb-3">{t('general')}</h6>
                                </div>
                                <div className="col-12">
                                    <Form.Item className="position-relative select-arrow-none"
                                               label={t('category')}>
                                        {getFieldDecorator('category', {
                                            rules: [{
                                                required: true,
                                                message: `${t('input_your')} ${t('category')} !`
                                            }],
                                        })(<ItemCategoryFilter method={method}
                                                               onChange={(v) => this.setState({selectedCat: v})}/>,
                                        )}
                                        <Button onClick={() => this.createCategoryShow(true)}
                                                className="create-btn-select position-absolute font-weight-bold m-auto px-2 flex-align-center">
                                            <span>{t('create_caps')}</span>
                                            <img src={Images.plus_icon_primary} alt="plus icon"
                                                 className="img-fluid"/>
                                        </Button>
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <Form.Item label={t('family')} className="position-relative select-arrow-none">
                                        {getFieldDecorator('product', {
                                            rules: [{
                                                required: true,
                                                message: `${t('select_family')}!`
                                            }],
                                        })(<ProductFilter cat={this.state.selectedCat}/>,)}
                                        <Button onClick={() => this.createFamilyShow(true)}
                                                className="create-btn-select position-absolute font-weight-bold m-auto px-2 flex-align-center">
                                            <span>{t('create_caps')}</span>
                                            <img src={Images.plus_icon_primary} alt="plus icon"
                                                 className="img-fluid"/>
                                        </Button>
                                    </Form.Item>
                                </div>

                                <div className="col-12">
                                    <Form.Item label={t('supplier')} className="position-relative select-arrow-none">
                                        {getFieldDecorator('supplier', {
                                            rules: [{required: true, message: `${t('input_your')} ${t('supplier')}!`}],
                                        })(<WarehouseSupplierFilter/>,)}
                                        <Button onClick={() => this.createSupplierShow(true)}
                                                className="create-btn-select position-absolute font-weight-bold m-auto px-2 flex-align-center">
                                            <span>{t('create')}</span>
                                            <img src={Images.plus_icon_primary} alt="plus icon" className="img-fluid"/>
                                        </Button>
                                    </Form.Item>
                                </div>

                                <div className="col-12">
                                    <Form.Item label={t('native_country')}>
                                        {getFieldDecorator('origin_country', {
                                            rules: [{
                                                required: false,
                                                message: `${t('input_your')} ${t('native_country')}!`
                                            }],
                                        })(<OriginCountryFilter/>,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <div className="row mx-0">
                                        <div className="col-12 col-sm-12 col-lg-4 col-md-4 px-0">
                                            <div className="row mx-0">
                                                <Form.Item label={`${t('widht')} (cm)`}>
                                                    {getFieldDecorator('width', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('widht')}(cm)!`
                                                        }],
                                                    })(
                                                        <InputNumber placeholder={"0 cm"}/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-lg-4 col-md-4">
                                            <div className="row mx-0">
                                                <Form.Item label={`${t('height')} (cm)`}>
                                                    {getFieldDecorator('height', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('height')} (cm)!`
                                                        }],
                                                    })(
                                                        <InputNumber placeholder={"0 cm"}/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-lg-4 col-md-4 px-0">
                                            <div className="row mx-0">
                                                <Form.Item label={t('depth') + "(cm)"}>
                                                    {getFieldDecorator('depth', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('depth')}(cm)!`
                                                        }],
                                                    })(
                                                        <InputNumber placeholder={"0 cm"}/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <Form.Item label={t("weight")}>
                                        {getFieldDecorator('weight', {
                                            rules: [{
                                                required: true,
                                                message: `${t('input_your')}`
                                            }],
                                        })(<InputNumber placeholder={t('enter') + " :"}/>,)}
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <Form.Item label={"m³"}>
                                        {getFieldDecorator('m3', {})(<InputNumber placeholder={t('enter') + " :"}/>,)}
                                    </Form.Item>
                                </div>

                                <div className="col-12">
                                    <div className="row mx-0">
                                        <div className="col-12 col-sm-12 col-lg-6 col-md-6 px-0">
                                            <div className="row mx-0">
                                                <Form.Item label={"Éco-Part code"}>
                                                    {getFieldDecorator('eco_part_code', {})(<Input
                                                        placeholder={t('enter') + " :"}/>)}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-lg-6 col-md-6">
                                            <div className="row mx-0">
                                                <Form.Item label={"Éco-Part"}>
                                                    {getFieldDecorator('eco_part', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')}`
                                                        }],
                                                    })(<InputNumber placeholder={t('enter') + " :"}/>,)}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <Form.Item label={"Publier sur le site"}>
                                        {getFieldDecorator('publish', {
                                            rules: [{
                                                required: true,
                                                message: `${t('input_your')}`
                                            }],
                                        })(<Radio.Group>
                                            <Radio value={true}>Oui</Radio>
                                            <Radio value={false}>Non</Radio>
                                        </Radio.Group>)}
                                    </Form.Item>
                                </div>
                                <div className="col-6 pr-xl-0">
                                    <Form.Item label={"Publier pour représentants/distributeurs"}>
                                        {getFieldDecorator('publish_for_user', {
                                            rules: [{
                                                required: true,
                                                message: `${t('input_your')}`
                                            }],
                                        })(<Radio.Group>
                                            <Radio value={true}>Oui</Radio>
                                            <Radio value={false}>Non</Radio>
                                        </Radio.Group>)}
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <Form.Item label={t('Site')} className="position-relative select-arrow-none">
                                        {getFieldDecorator('site', {
                                            rules: [{required: true, message: `${t('input_your')} ${t('Site')}!`}],
                                        })(<MultiSiteFilter/>,)}
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <Form.Item label={t('component_count')}>
                                        {getFieldDecorator('component_count', {
                                            rules: [{
                                                required: true,
                                                message: `${t('input_your')}`
                                            }],
                                        })(<InputNumber min={1}/>)}
                                    </Form.Item>
                                </div>
                                <div className="col-12">
                                    <h6 className="text-capitalize font-weight-bold mb-3">{t('Coupon')}</h6>
                                </div>
                                <div className="col-12">
                                    <div className="row mx-0">
                                        <div className="col-12 col-sm-12 col-lg-6 col-md-6 px-0">
                                            <div className="row mx-0">
                                                <Form.Item label={"Quantity"}>
                                                    {getFieldDecorator('coupon_quantity', {})(<InputNumber
                                                        placeholder={t('enter') + " :"}/>)}
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-lg-6 col-md-6">
                                            <div className="row mx-0">
                                                <Form.Item label={t('price')}>
                                                    {getFieldDecorator('coupon_price', {})(<InputNumber
                                                        placeholder={t('enter') + " :"}/>,)}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="text-capitalize font-weight-bold mb-3">{t('variant')}</h6>
                                </div>
                                <div className="col-12 p-0">
                                    <div className="col-12">
                                        <Form.Item label={t('code_sku')}>
                                            {getFieldDecorator('sku', {
                                                rules: [{
                                                    required: true,
                                                    message: `${t('input_your')} ${t('code_sku')}!`
                                                }],
                                            })(
                                                <Input
                                                    placeholder={t('enter') + " :"}
                                                />,
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <Form.Item label={t('color_name')}>
                                            {getFieldDecorator('colour', {
                                                rules: [{
                                                    required: true,
                                                    message: `${t('input_your')} ${t('color_name')}!`
                                                }],
                                            })(
                                                <Input placeholder={t('enter') + " :"}/>,
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <Form.Item label={t('color_code')}>
                                            {getFieldDecorator('colour_code', {
                                                rules: [{
                                                    required: true,
                                                    message: `${t('input_your')} ${t('color_code')}!`
                                                }],
                                            })(<Popover trigger="click"
                                                        content={<ChromePicker color={color}
                                                                               onChange={this.handleColor}/>}
                                                        title={`${t('enter_color_code')}`}>
                                                    <Input value={this.props.form.getFieldValue('colour_code')}
                                                           placeholder={t('select')}
                                                           suffix={
                                                               <Icon type="plus-circle"/>
                                                           }/>
                                                </Popover>
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <Form.Item label={t('conditioning')}>
                                            {getFieldDecorator('units_per_set', {
                                                rules: [{
                                                    required: true,
                                                    message: `${t('input_your')} ${t('conditioning')}!`
                                                }],
                                            })(
                                                <InputNumber min={1} placeholder={t('enter') + " :"}/>,
                                            )}
                                        </Form.Item>
                                    </div>

                                    <div className="col-12">
                                        <Form.Item label={t('description_supplier')}>
                                            {getFieldDecorator('description', {})(
                                                <React.Fragment>
                                                    <Tabs className="flag-description-tab"
                                                          type="card">
                                                        <TabPane tab={
                                                            <div className="flag-div-tab">
                                                                <img className="img-fluid" alt="flag icon"
                                                                     src={Images.flag_icon_fr}/>
                                                                <span>FR</span>
                                                            </div>
                                                        } key="1">
                                                            <TextArea rows={3}
                                                                      placeholder={t('description_placeholder')}
                                                                      value={this.state.description_fr}
                                                                      onChange={(e) => this.handleDescription("description_fr", e)}
                                                                      style={{height: "auto", paddingTop: 15}}/>
                                                        </TabPane>
                                                        <TabPane tab={
                                                            <div className="flag-div-tab">
                                                                <img className="img-fluid" alt="flag icon"
                                                                     src={Images.flag_icon_en}/>
                                                                <span>EN</span>
                                                            </div>
                                                        } key="2">
                                                            <TextArea rows={3}
                                                                      value={this.state.description_en}
                                                                      placeholder={t('description_placeholder')}
                                                                      onChange={(e) => this.handleDescription("description_en", e)}
                                                                      style={{height: "auto", paddingTop: 15}}/>
                                                        </TabPane>
                                                        <TabPane tab={
                                                            <div className="flag-div-tab">
                                                                <img className="img-fluid" alt="flag icon"
                                                                     src={Images.flag_icon_es}/>
                                                                <span>ES</span>
                                                            </div>
                                                        } key="3">
                                                            <TextArea rows={3}
                                                                      value={this.state.description_es}
                                                                      placeholder={t('description_placeholder')}
                                                                      onChange={(e) => this.handleDescription("description_es", e)}
                                                                      style={{height: "auto", paddingTop: 15}}/>
                                                        </TabPane>
                                                    </Tabs>
                                                </React.Fragment>
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <Form.Item label={t('material_technique')}>
                                            {getFieldDecorator('material', {})(
                                                <React.Fragment>
                                                    <Tabs className="flag-description-tab"
                                                          type="card">
                                                        <TabPane tab={
                                                            <div className="flag-div-tab">
                                                                <img className="img-fluid" alt="flag icon"
                                                                     src={Images.flag_icon_fr}/>
                                                                <span>FR</span>
                                                            </div>
                                                        } key="1">
                                                            <TextArea rows={3}
                                                                      placeholder={t('material_technique')}
                                                                      value={this.state.material_fr}
                                                                      onChange={(e) => this.handleMaterial("material_fr", e)}
                                                                      style={{height: "auto", paddingTop: 15}}/>
                                                        </TabPane>
                                                        <TabPane tab={
                                                            <div className="flag-div-tab">
                                                                <img className="img-fluid" alt="flag icon"
                                                                     src={Images.flag_icon_en}/>
                                                                <span>EN</span>
                                                            </div>
                                                        } key="2">
                                                            <TextArea rows={3}
                                                                      value={this.state.material_en}
                                                                      placeholder={t('material_technique')}
                                                                      onChange={(e) => this.handleMaterial("material_en", e)}
                                                                      style={{height: "auto", paddingTop: 15}}/>
                                                        </TabPane>
                                                        <TabPane tab={
                                                            <div className="flag-div-tab">
                                                                <img className="img-fluid" alt="flag icon"
                                                                     src={Images.flag_icon_es}/>
                                                                <span>ES</span>
                                                            </div>
                                                        } key="3">
                                                            <TextArea rows={3}
                                                                      value={this.state.material_es}
                                                                      placeholder={t('material_technique')}
                                                                      onChange={(e) => this.handleMaterial("material_es", e)}
                                                                      style={{height: "auto", paddingTop: 15}}/>
                                                        </TabPane>
                                                    </Tabs>
                                                </React.Fragment>
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="col-12">
                                        <div className="row position-relative">
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <Form.Item className="equal-row-div label-small"
                                                           label={t('purchase_price_new')}>
                                                    {getFieldDecorator('factory_price_euro', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('purchase_price_new')}!`
                                                        }],
                                                    })(
                                                        <Input onChange={this.onFactoryPriceChange}
                                                               placeholder={t('enter') + " :"}/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <Form.Item className="label-small" label={t('purchase_price_dollar')}>
                                                    {getFieldDecorator('factory_price_dollar', {
                                                        rules: [{
                                                            required: false,
                                                            message: `${t('input_your')} ${t('purchase_price_dollar')} !`
                                                        }],
                                                    })(
                                                        <Input placeholder={t('enter') + " :"}/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row position-relative">
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <Form.Item className="equal-row-div label-small"
                                                           label={t('sales_coefficent_new_form')}>
                                                    {getFieldDecorator('tablacasa_sales_coefficient', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('sales_coefficent_new_form')}!`
                                                        }],
                                                    })(
                                                        <Input disabled/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <Form.Item className="label-small" label={t('selling_price_new')}>
                                                    {getFieldDecorator('price', {})(
                                                        <Input onChange={this.onTablaCasaSalesChange}
                                                               placeholder={t('enter') + " :"}/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row position-relative">
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <Form.Item className="equal-row-div label-small"
                                                           label={t('distributor_sales_coefficient')}>
                                                    {getFieldDecorator('suggested_sales_coefficient', {
                                                        rules: [{
                                                            required: true,
                                                            message: `${t('input_your')} ${t('distributor_sales_coefficient')}!`
                                                        }],
                                                    })(
                                                        <Input disabled/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <Form.Item className="label-small"
                                                           label={t('distributor_sales_suggested')}>
                                                    {getFieldDecorator('sales_price', {})(
                                                        <Input onChange={this.onSuggestedSalesChange}
                                                               placeholder={t('enter') + " :"}/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row position-relative">
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <Form.Item className="equal-row-div label-small"
                                                           label={t('coefficient_ecommerce')}>
                                                    {getFieldDecorator('suggested_retail_coefficient', {})(
                                                        <Input disabled/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6">
                                                <Form.Item className="label-small"
                                                           label={t('ecommerce_sales_price') + " (€)"}>
                                                    {getFieldDecorator('retail_price', {})(
                                                        <Input onChange={this.onSuggestedRetailChange}
                                                               placeholder={t('enter') + " :"}/>,
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="drawer-footer-fixed drawer-article-footer steps-action steps-action-custom bg-white flex-align-center justify-content-end px-3 py-2">
                            <div>
                                <Button loading={btnLoading}
                                        type="primary"
                                        className="font-weight-bold text-center text-white text-uppercase"
                                        onClick={this.handleSubmit}>
                                    {t('save_continue')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>

                {createCategory &&
                <CreateCategoty visible={createCategory} onClose={() => this.createCategoryShow(false)}/>}
                {createFamily && <CreateFamily visible={createFamily} onClose={() => this.createFamilyShow(false)}/>}
                {createSupplier &&
                <CreateSupplier visible={createSupplier} onClose={() => this.createSupplierShow(false)}/>}

            </React.Fragment>
        );
    }
}

export const ArticleForm = (Form.create({
        mapPropsToFields(props) {
            if (props.item) {
                const {item} = props;
                return {
                    category: Form.createFormField({
                        value: {
                            key: item.product.category.id,
                            label: item.product.category.name
                        }
                    }),
                    product: Form.createFormField({
                        value: {
                            key: item.product.id,
                            label: item.product.name
                        }
                    }),
                    supplier: item.supplier ? Form.createFormField({
                        value: {
                            key: item.supplier.id,
                            label: item.supplier.company_name
                        }
                    }) : "",
                    site: item.site ? Form.createFormField({
                        value: {
                            key: item.site.id,
                            label: item.site.domain
                        }
                    }) : "",
                    sku: Form.createFormField({
                        value: item.sku
                    }),
                    factory_price_dollar: Form.createFormField({
                        value: item.factory_price_dollar
                    }),
                    factory_price_euro: Form.createFormField({
                        value: item.factory_price_euro
                    }),
                    tablacasa_sales_coefficient: Form.createFormField({
                        value: item.tablacasa_sales_coefficient
                    }),
                    suggested_sales_coefficient: Form.createFormField({
                        value: item.suggested_sales_coefficient
                    }),
                    suggested_retail_coefficient: Form.createFormField({
                        value: item.suggested_retail_coefficient || 0.00
                    }),
                    price: Form.createFormField({
                        value: parseFloat(item.price).toFixed(0)
                    }),
                    sales_price: Form.createFormField({
                        value: parseFloat(item.sales_price).toFixed(0)
                    }),
                    retail_price: Form.createFormField({
                        value: parseFloat(item.retail_price).toFixed(0)
                    }),
                    origin_country: Form.createFormField({
                        value: item.origin_country
                    }),
                    depth: Form.createFormField({
                        value: item.depth
                    }),
                    width: Form.createFormField({
                        value: item.width
                    }),
                    height: Form.createFormField({
                        value: item.height
                    }),
                    publish_for_user: Form.createFormField({
                        value: item.publish_for_user
                    }),
                    weight: Form.createFormField({
                        value: item.weight
                    }),
                    m3: Form.createFormField({
                        value: item.m3
                    }),
                    units_per_set: Form.createFormField({
                        value: item.units_per_set
                    }),
                    colour: Form.createFormField({
                        value: item.colour
                    }),
                    colour_code: Form.createFormField({
                        value: item.colour_code
                    }),
                    material: Form.createFormField({
                        value: item.material
                    }),
                    description: Form.createFormField({
                        value: item.description
                    }),
                    eco_part: Form.createFormField({
                        value: item.eco_part
                    }),
                    eco_part_code: Form.createFormField({
                        value: item.eco_part_code
                    }),
                    publish: Form.createFormField({
                        value: item.publish
                    }),
                    component_count: Form.createFormField({
                        value: item.component_count
                    }),
                    coupon_quantity: Form.createFormField({
                        value: item.coupon_quantity
                    }),
                    coupon_price: Form.createFormField({
                        value: item.coupon_price
                    }),
                }
            }
        }
    }
)(withTranslation('common')(CreateArticleForm)));
