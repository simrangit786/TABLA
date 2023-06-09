import React, {Component} from 'react';
import {Button, Form, Icon, InputNumber} from "antd";
import {Image as Images} from "../../Images";
import ItemDetailsModal from "../../modal/work-order/ItemDetailsModal";

class SingleItemCardform extends Component {
    state = {
        itemDetailsShow: false,
        selected: 0,
    };
    itemDetailsVisible = (visible) => {
        this.setState({
            itemDetailsShow: visible,
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <React.Fragment>
                <div className="col-sm-12 col-lg-6 col-md-6 col-12 pr-2">
                    <div className="row mx-0 item_single-card">
                        <div className="item-img-div flex-align-center-center">
                            <Button onClick={() => this.itemDetailsVisible(true)}
                                    className="bg-transparent shadow-none p-0 border-0 h-auto">
                                <img src={Images.chair_img_1} className="img-fluid" alt="chair-img"/>
                            </Button>
                        </div>
                        <div className="item-data-div position-relative">
                            <h5 className="font-weight-bold">Furtif</h5>
                            <p className="font-weight-normal">Référence produit : BC.FUR-MR</p>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Prix :</li>
                                <li className="list-inline-item m-0">$125.95</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Catégorie :</li>
                                <li className="list-inline-item m-0 dark-gray">Chaise</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">En stock :</li>
                                <li className="list-inline-item m-0 text-success">46</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Conditionnement :</li>
                                <li className="list-inline-item m-0 dark-gray">1</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Livré au plus tôt :</li>
                                <li className="list-inline-item m-0 dark-gray">10/26/2019</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Couleur :</li>
                                <li className="list-inline-item m-0">
                                        <span style={{backgroundColor: '#F7B257'}}
                                              className="color-card d-inline-block mr-1"/>
                                </li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Quantité :</li>
                                <li className="list-inline-item m-0">
                                    <Form.Item>
                                        {getFieldDecorator('quantity', {
                                            initialValue: '',
                                        })(
                                            <InputNumber min={2}/>
                                        )}
                                    </Form.Item>
                                </li>
                            </ul>
                            <div
                                className="card-footer-div flex-align-center justify-content-end position-absolute">
                                <div className="mr-3 card-text-footer">
                                    <small>$125.95</small>
                                    {/*<h6 className="mb-0 font-weight-bold active">$125.95</h6>*/}
                                </div>
                                <Button loading={this.state.buttonLoading} type="primary" onClick={this.handleSubmit}>
                                    <Icon type="plus"/>
                                    AJOUTER
                                </Button>
                            </div>
                            {/*<div className="active-discount-div position-absolute">*/}
                            {/*    <small className="font-weight-bold">10%OFF</small>*/}
                            {/*    <span className="off-span-tag font-weight-bold flex-align-center">10%OFF <small*/}
                            {/*        className="ml-1"> Extra</small></span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-6 col-md-6 col-12 pr-2">
                    <div className="row mx-0 item_single-card">
                        <div className="item-img-div flex-align-center-center">
                            <Button onClick={() => this.itemDetailsVisible(true)}
                                    className="bg-transparent shadow-none p-0 border-0 h-auto">
                                <img src={Images.chair_img_1} className="img-fluid" alt="chair-img"/>
                            </Button>
                        </div>
                        <div className="item-data-div position-relative">
                            <h5 className="font-weight-bold">Furtif</h5>
                            <p className="font-weight-normal">Référence produit : BC.FUR-MR</p>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Prix :</li>
                                <li className="list-inline-item m-0">$125.95</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Catégorie :</li>
                                <li className="list-inline-item m-0 dark-gray">Chaise</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">En stock :</li>
                                <li className="list-inline-item m-0 text-success">46</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Conditionnement :</li>
                                <li className="list-inline-item m-0 dark-gray">1</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Livré au plus tôt :</li>
                                <li className="list-inline-item m-0 dark-gray">10/26/2019</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Couleur :</li>
                                <li className="list-inline-item m-0">
                                        <span style={{backgroundColor: '#F7B257'}}
                                              className="color-card d-inline-block mr-1"/>
                                </li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">Quantité :</li>
                                <li className="list-inline-item m-0">
                                    <Form.Item>
                                        {getFieldDecorator('quantity', {
                                            initialValue: '',
                                        })(
                                            <InputNumber min={2}/>
                                        )}
                                    </Form.Item>
                                </li>
                            </ul>
                            <div
                                className="card-footer-div flex-align-center justify-content-end position-absolute">
                                <div className="mr-3 card-text-footer">
                                    <small>$125.95</small>
                                    {/*<h6 className="mb-0 font-weight-bold active">$125.95</h6>*/}
                                </div>
                                <Button loading={this.state.buttonLoading} type="primary" onClick={this.handleSubmit}>
                                    <Icon type="plus"/>
                                    AJOUTER
                                </Button>
                            </div>
                            {/*<div className="active-discount-div position-absolute">*/}
                            {/*    <small className="font-weight-bold">10%OFF</small>*/}
                            {/*    <span className="off-span-tag font-weight-bold flex-align-center">10%OFF <small*/}
                            {/*        className="ml-1"> Extra</small></span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <ItemDetailsModal visible={this.state.itemDetailsShow} onClose={() => this.itemDetailsVisible(false)}/>
            </React.Fragment>
        );
    }
}

export const SingleItemCard = Form.create()(SingleItemCardform);
