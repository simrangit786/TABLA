import React, {Component} from "react";
import {Button, Form, Icon, Input, InputNumber} from "antd";
import ItemDetailsModal from "../../../modal/work-order/ItemDetailsModal";
import {withTranslation} from "react-i18next";

const moment = require("moment");

class SingleItemCardForm extends Component {

    state = {
        itemDetailsShow: false,
        selected: 0,
        price: null,
        quantity: this.props.product.variant[0].units_per_set,
        buttonLoading: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({buttonLoading: true});
        const {selected, price} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submit(values, selected, price.toFixed(2));
                this.setState({buttonLoading: false});
            }
        });
    };

    setPrice = (quantity) => {
        const {selected} = this.state;
        this.setState({price: this.getPrice(selected, quantity), quantity});
    };

    getPrice = (selected, quantity = null) => {
        const {product} = this.props;
        if (!quantity) {
            quantity = product.variant[selected].units_per_set;
        }
        return quantity * product.variant[selected].price;
    };

    componentDidMount() {
        this.setState({price: this.getPrice(this.state.selected)});
    }

    itemDetailsVisible = (visible) => {
        this.setState({
            itemDetailsShow: visible
        });
    };
    changeSelected = (selected) => {
        this.setState({
            selected, quantity: this.props.product.variant[selected].units_per_set,
            price: this.getPrice(selected)
        });
    };

    render() {
        const {product, t, container} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {selected, itemDetailsShow, price, buttonLoading} = this.state;
        return (
            <React.Fragment>
                <div className="col-sm-12 col-lg-6 col-md-12 col-12 pr-2 padding-responsive-right">
                    <div className="row mx-0 item_single-card">
                        <div className="item-img-div flex-align-center-center">
                            <Button onClick={() => this.itemDetailsVisible(true)}
                                    className="bg-transparent shadow-none p-0 border-0 h-auto">
                                <img
                                    src={product.variant[selected].variant_images.length > 0 ? product.variant[selected].variant_images[0].image : ""}
                                    className="img-fluid" alt="chair-img"/>
                            </Button>
                        </div>
                        <div className="item-data-div position-relative">
                            <h5 className="font-weight-bold">{product.name}</h5>
                            <p className="font-weight-normal">{t("product_ref")} : {product.variant[selected].sku}</p>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">{t("selling_price")} :</li>
                                <li
                                    className="list-inline-item m-0">€{parseFloat(product.variant[selected].price).toFixed(2)}</li>
                            </ul>
                            {/*<ul className="list-inline mb-0 w-100">*/}
                            {/*  <li className="list-inline-item m-0">{t("Coupon")} :</li>*/}
                            {/*  <li*/}
                            {/*    className="list-inline-item m-0">{product.variant[selected].coupon_price ? `€${parseFloat(product.variant[selected].coupon_price).toFixed(2)} pour ${product.variant[selected].coupon_quantity} articles ou plus` : "-"}</li>*/}
                            {/*</ul>*/}
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item ">{t("category")} :</li>
                                <li className="list-inline-item  dark-gray">{product.category.name}</li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item ">{t("in_stock")} :</li>
                                {product.variant[selected].in_stock > 0 ?
                                    <li className="list-inline-item  text-success">{product.variant[selected].in_stock}</li>
                                    :
                                    <li className="list-inline-item  text-danger">{product.variant[selected].in_stock}</li>
                                }
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item ">{t("conditioning")} :</li>
                                <li className="list-inline-item  dark-gray">{product.variant[selected].units_per_set}</li>
                            </ul>
                            {container ? "" : <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item m-0">{t("diliver_soon")} :</li>
                                <li className="list-inline-item m-0 dark-gray">{product.variant[selected].in_stock ?
                                    moment().add(21, "days").format("DD/MM/YYYY") :
                                    moment().add(60, "days").format("DD/MM/YYYY")}</li>
                            </ul>}
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item ">{t("color")} :</li>
                                <li className="list-inline-item ">
                                    {product.variant.map((variant, index) =>
                                        <span key={`color_code_${index}`} style={{backgroundColor: variant.colour_code}}
                                              onClick={() => this.changeSelected(index)}
                                              className={`color-card d-inline-block mr-1 ${selected === index ? "active" : null}`}/>
                                    )}
                                </li>
                            </ul>
                            <ul className="list-inline mb-0 w-100">
                                <li className="list-inline-item ">{t("quantity")} :</li>
                                <li className="list-inline-item ">
                                    <div className="d-flex align-items-center item-qty-tag-div position-relative">
                                        <Form.Item className="mb-0">
                                            {getFieldDecorator("quantity", {
                                                initialValue: this.state.quantity
                                            })(
                                                <InputNumber className="mb-0" onChange={this.setPrice}
                                                             step={product.variant[selected].units_per_set}
                                                             min={product.variant[selected].units_per_set}/>
                                            )}
                                        </Form.Item>
                                        <h6 className="mb-0">{this.state.quantity / product.variant[selected].units_per_set} sets</h6>
                                    </div>
                                </li>
                            </ul>
                            {
                                container && <ul className="list-inline mb-0 w-100 pi-number-ul">
                                    <li className="list-inline-item ">Numéro de PI :</li>
                                    <li className="list-inline-item "><Form.Item className="mb-0">
                                        {getFieldDecorator("pi_number", {})(
                                            <Input className="mb-0"/>
                                        )}
                                    </Form.Item></li>
                                </ul>
                            }

                            <div
                                className="card-footer-div flex-align-center justify-content-end position-absolute">
                                <div className="mr-3 card-text-footer">
                                    <h6 className="mb-0 font-weight-bold active">
                                        {/*{product.variant[selected].coupon_price && this.state.quantity >= product.variant[selected].coupon_quantity ?*/}
                                        {/*    <p>*/}
                                        {/*        <del>€{price ? price.toFixed(2) : 0}</del>*/}
                                        {/*        €{(product.variant[selected].coupon_price * this.state.quantity).toFixed(2)}*/}
                                        {/*    </p>*/}
                                        {/*    :*/}
                                        {/*    // TODO: can be replaced back to toFixed(2)*/}
                                        {/*}*/}
                                        <p>€{price ? price.toFixed(2) : 0}</p>
                                    </h6>
                                </div>
                                <Button loading={buttonLoading} type="primary" onClick={this.handleSubmit}>
                                    <Icon type="plus"/>
                                    {t("add")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {itemDetailsShow &&
                <ItemDetailsModal quantity={this.state.quantity} onChange={this.setPrice}
                                  handleSubmit={this.handleSubmit}
                                  location={this.props.location}
                                  container={this.props.container}
                                  product={product} visible={itemDetailsShow}
                                  onClose={() => this.itemDetailsVisible(false)}/>}
            </React.Fragment>
        );
    }
}

export const SingleItemCard = Form.create()(withTranslation("common")(SingleItemCardForm));
