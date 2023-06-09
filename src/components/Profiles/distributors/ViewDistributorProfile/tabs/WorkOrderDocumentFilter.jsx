import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, Radio} from "antd";
import DistributorClientFilter from "../../../../../filters/TableFilters/DistributorClientFilter";
import SalesRepresentativeFilter from "../../../../../filters/salesRepresentativeFilter";
import {dateFormat} from "../../../../../utils";

const {RangePicker} = DatePicker;

class WorkOrderDocumentFilter extends Component {
    handleFilterForm = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values['creation_date']) {
                    values['start_date'] = values['creation_date'][0].format('YYYY-MM-DD');
                    values['end_date'] = values['creation_date'][1].format('YYYY-MM-DD');
                    delete values['creation_date']
                }
                if (values['client']) {
                    values['client'] = values['client'].key
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
        return (
            <div className="row mx-0 common-form-div">
                <div className="col-12 p-0">
                    <Form className="filter-work-order-form">
                        <div className="row mx-0">
                            <div className="col-12 col-sm-12 col-md-6">

                                <Form.Item label="Nom du distributeur :">
                                    {getFieldDecorator('client', {})(<DistributorClientFilter/>)}
                                </Form.Item>

                                <Form.Item label="Représentant :">
                                    {getFieldDecorator('sales_rep', {})(<SalesRepresentativeFilter/>)}
                                </Form.Item>


                                <Form.Item label="Numéro du bon de livraison :">
                                    <React.Fragment>
                                        <div
                                            className="row mx-0 align-items-center position-relative justify-content-between">
                                            {getFieldDecorator('min_id', {})(<Input placeholder={"Entrer"}/>)}
                                            {getFieldDecorator('max_id', {})(<Input placeholder={"Entrer"}/>)}
                                            <span className="dash-connect-each-tag position-absolute">-</span>
                                        </div>
                                    </React.Fragment>
                                </Form.Item>
                                <Form.Item label="Date de création :">
                                    {getFieldDecorator('date_de_creation', {})(
                                        <React.Fragment>
                                            <div className="row document-filter mx-0 ">
                                                {getFieldDecorator('creation_date', {})(<RangePicker
                                                    format={dateFormat}/>)}
                                            </div>
                                        </React.Fragment>
                                    )}
                                </Form.Item>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <Form.Item label="Statut">
                                    {getFieldDecorator('status', {})(
                                        <Radio.Group style={{width: '100%'}} className="drop-filter-radio">
                                            <Radio value="draft">Brouillon</Radio>
                                            <Radio value="completed">Terminé</Radio>
                                            <Radio value="processing">En traitement</Radio>
                                            <Radio value="cancel">Annulé</Radio>
                                            <Radio value="partial_delivered">Partielle</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>

                                {/*<Form.Item label="Date de livaraison :">*/}
                                {/*    <React.Fragment>*/}
                                {/*        <div className="row document-filter mx-0 ">*/}
                                {/*            {getFieldDecorator('delivery_date', {})(<RangePicker/>)}*/}
                                {/*        </div>*/}
                                {/*    </React.Fragment>*/}
                                {/*</Form.Item>*/}
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="col-12">
                    <div className="row mx-0 flex-align-center justify-content-end footer-btn-filter">
                        <Button onClick={this.onReset} className="mr-3">Réinitialiser</Button>
                        <Button onClick={this.handleFilterForm} type="primary">
                            Recherche
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({name: 'workOrderFilter'})(WorkOrderDocumentFilter);
