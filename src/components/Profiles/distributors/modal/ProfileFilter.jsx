import React, {Component} from 'react';
import {Button, Form, Input, Select} from "antd";
import CountryFilter from "../../../../filters/CountryFilter";
import ClientRankFilter from "../../../../filters/clientRankFilter";
import TableClientTypeFilter from "../../../../filters/TableFilters/TableClientTypeFilter";
import SalesRepresentativeFilter from "../../../../filters/salesRepresentativeFilter";
import {withTranslation} from "react-i18next";
import ProfileGroupNameFilter from "../../../../filters/ProfileGroupNameFilter";

const {Option} = Select;

class ProfileFilter extends Component {
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
        this.props.resetFilter()
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {t} = this.props;
        return (
            <div className="row mx-0 common-form-div">
                <div className="col-12 p-0">
                    <Form>
                        <div className="row mx-0">
                            <div className="col-12 col-sm-12 col-md-6">
                                <Form.Item label="Nom du distributeur :">
                                    {getFieldDecorator('name', {})(<Input placeholder={"Entrer"}/>)}
                                </Form.Item>
                                <Form.Item label="Type de distributeur :">
                                    {getFieldDecorator('client_type', {})(<TableClientTypeFilter/>)}
                                </Form.Item>
                                <Form.Item label="Groupe :">
                                    {getFieldDecorator('group', {}
                                    )(<ProfileGroupNameFilter/>)}
                                </Form.Item>
                                <Form.Item label="Rang :">
                                    {getFieldDecorator('rank', {}
                                    )(<ClientRankFilter/>)}
                                </Form.Item>
                                <Form.Item label="Email :">
                                    {getFieldDecorator('client_email', {}
                                    )(<Input type={"email"} placeholder={"Entrer"}/>)}
                                </Form.Item>
                                <Form.Item label={t('status')}>
                                    {getFieldDecorator('status', {})(
                                        <Select placeholder={'Sélectionner'}>
                                            <Option key="A" value={true}>Actif</Option>
                                            <Option key="B" value={false}>Inactif</Option>
                                        </Select>)}
                                </Form.Item>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <Form.Item label="Représentant :">
                                    {getFieldDecorator('sales_representative', {})(<SalesRepresentativeFilter/>)}
                                </Form.Item>
                                <Form.Item label="Etat/Departement du distributeur :">
                                    {getFieldDecorator('department', {})(<Input placeholder={"Entrer"}/>)}
                                </Form.Item>
                                <div className="row">
                                    <div className="col-6 position-relative pr-2">
                                        <Form.Item label="Ville :">
                                            {getFieldDecorator('city', {})(<Input placeholder={'Entrer'}/>)}
                                        </Form.Item>
                                    </div>
                                    <div className="col-6 pl-2">
                                        <Form.Item label="Code postal :">
                                            {getFieldDecorator('zip_code', {})(<Input placeholder={'Entrer'}/>)}
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item label="Pays :">
                                    {getFieldDecorator('pays', {})(<CountryFilter/>)}
                                </Form.Item>
                                <Form.Item label="Siège social :">
                                    {getFieldDecorator('sierge_address', {})(<Input placeholder={'Entrer'}/>)}
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="col-12">
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

export default Form.create({name: 'profileFilter'})(withTranslation('common')(ProfileFilter));
