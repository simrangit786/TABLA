import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, Radio} from "antd";
import {withTranslation} from "react-i18next";
import TablaProfileGroupFilter from "../../../../filters/TableFilters/TablaProfileGroupFilter";
import DistributorClientFilter from "../../../../filters/TableFilters/DistributorClientFilter";
import {dateFormat} from "../../../../utils";
import SalesRepresentativeFilter from "../../../../filters/salesRepresentativeFilter";

const {RangePicker} = DatePicker;

class WorkOrderFilter extends Component {
    handleFilterForm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values['creation_date']) {
                    values['creation_start_date'] = values['creation_date'][0].format('YYYY-MM-DD');
                    values['creation_end_date'] = values['creation_date'][1].format('YYYY-MM-DD');
                    delete values['creation_date']
                }
                if (values['delivery_date']) {
                    values['delivery_start_date'] = values['delivery_date'][0].format('YYYY-MM-DD');
                    values['delivery_end_date'] = values['delivery_date'][1].format('YYYY-MM-DD');
                    delete values['delivery_date']
                }
                this.props.onFilter(values)
            }
        })
    };
    onReset = () => {
        this.props.form.resetFields();
        this.props.onFilter({})
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
                                <Form.Item label="Numéro de bon de commande :">
                                    <div className="row">
                                        <div className="col-6 position-relative pr-2">
                                            {getFieldDecorator('min_id', {})(<Input placeholder={'Entrer'}/>)}
                                            <span className="position-absolute arrow-dash-div">-</span>
                                        </div>
                                        <div className="col-6 pl-2">
                                            {getFieldDecorator('max_id', {})(<Input placeholder={'Entrer'}/>)}
                                        </div>
                                    </div>
                                </Form.Item>
                                <Form.Item label="Nom du distributeur :">
                                    {getFieldDecorator('client', {})(<DistributorClientFilter/>)}
                                </Form.Item>

                                <Form.Item label="Groupe :">
                                    {getFieldDecorator('group', {})(<TablaProfileGroupFilter/>)}

                                </Form.Item>
                                <Form.Item label="Représentant :">
                                    {getFieldDecorator('sales_rep', {})(<SalesRepresentativeFilter/>)}
                                </Form.Item>
                                <Form.Item label="Montant total :">
                                    <div className="row">
                                        <div className="col-6 position-relative pr-2">
                                            {getFieldDecorator('min_price', {})(<Input placeholder="€"/>)}
                                            <span className="position-absolute arrow-dash-div">-</span>
                                        </div>
                                        <div className="col-6 pl-2">
                                            {getFieldDecorator('max_price', {})(<Input placeholder="€"/>)}
                                        </div>
                                    </div>
                                </Form.Item>
                            </div>

                            <div className="col-12 col-sm-12 col-md-6">
                                <Form.Item label={t('status')}>
                                    {getFieldDecorator('status', {})(<Radio.Group className="drop-filter-radio">
                                        <Radio value="draft">Brouillon</Radio>
                                        <Radio value="completed">Terminé</Radio>
                                        <Radio value="processing">En traitement</Radio>
                                        <Radio value="cancel">Annulé</Radio>
                                        <Radio value="partial_delivered">Partielle</Radio>
                                    </Radio.Group>)}
                                </Form.Item>
                                <div className="col-12 col-sm-12">
                                    <Form.Item label={t('comments')}>
                                        {getFieldDecorator('comment', {})(<Input placeholder={t('comments')}/>)}
                                    </Form.Item>
                                </div>
                            </div>

                        </div>
                        <div className="row mx-0">
                            <div className="col-12 col-sm-12 col-md-6">
                                <Form.Item label="Date de création :">
                                    {getFieldDecorator('creation_date', {})(<RangePicker format={dateFormat}/>)}
                                </Form.Item>
                            </div>

                            <div className="col-12 col-sm-12 col-md-6">
                                <Form.Item label="Date de livraison :">
                                    {getFieldDecorator('delivery_date', {})(<RangePicker format={dateFormat}/>)}
                                </Form.Item>
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

export default withTranslation('common')(Form.create({name: 'workorderFilter'})(WorkOrderFilter));
