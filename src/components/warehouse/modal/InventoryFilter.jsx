import React, { Component } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import CategoryItemFilter from "../../../filters/TableFilters/CategoryItemFilter"
import TableProductFilter from "../../../filters/TableFilters/TableProductFilter"
import TableWarehouseSupplierFilter from "../../../filters/TableFilters/TableWarehouseSupplierFilter"
import ColourListFilter from "../../../filters/ColourListFilter";
import { Role } from "../../../utils";


class InventoryFilter extends Component {
    state = {
        selectedCat: { key: null }
    }
    handleFilterForm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onFilter(values)
            }
        })
    };
    onReset = () => {
        this.props.form.resetFields();
        this.props.onFilter({})
        this.setState({ selectedCat: {} })
    };
    selectedCategory = (v) => {
        this.setState({ selectedCat: v })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="row mx-0 w-100 common-form-div">
                <div className="col-12 p-0">
                    <Form className="w-100">
                        <div className="row w-100 mx-0">
                            <div className="col-12 col-sm-12 col-md-6">
                                {getFieldDecorator('stock', {})(
                                    <Radio.Group className="inventory-radio-filter">
                                        <Radio value="in_stock">En stock</Radio>
                                        <Radio value="in_transit">En cours d’acheminement</Radio>
                                    </Radio.Group>
                                )}
                                <Form.Item label="Categorie :">
                                    {getFieldDecorator('category', {})(<CategoryItemFilter
                                        onChange={this.selectedCategory} />)}
                                </Form.Item>
                                <Form.Item label="Famille :">
                                    {getFieldDecorator('product', {})(<TableProductFilter
                                        cat={this.state.selectedCat.key} />)}
                                </Form.Item>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <Form.Item label="Prix de vente">
                                    <div className="row">
                                        <div className="col-6 position-relative pr-2">
                                            {getFieldDecorator('min_price', {})(<Input placeholder="€" />)}
                                            <span className="position-absolute arrow-dash-div">-</span>
                                        </div>
                                        <div className="col-6 pl-2">
                                            {getFieldDecorator('max_price', {})(<Input placeholder="€" />)}
                                        </div>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Couleur :">
                                    {getFieldDecorator('colour', {})(<ColourListFilter />)}
                                </Form.Item>
                                <Role allow={['admin']}>
                                    <Form.Item label="Fournisseur :">
                                        {getFieldDecorator('supplier', {})(<TableWarehouseSupplierFilter />)}
                                    </Form.Item>
                                </Role>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="col-12 col-sm-12 col-md-6 offset-md-6">
                    <div className="row mx-0 flex-align-center justify-content-between footer-btn-filter">
                        <Button onClick={this.onReset}>Réinitialiser</Button>
                        <Button onClick={this.handleFilterForm} type="primary">
                            Recherche
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({ name: "filterForm" })(InventoryFilter);
