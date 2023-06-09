import React, {Component} from "react";
import {Button, Dropdown, Input, Menu, message} from "antd";
import {Image as Images} from "../../../../Images";
import {withTranslation} from "react-i18next";
import {distributorWorkorderUpdate} from "../../../../../controller/API/salesOperationAPI";
import {AdditionalDiscount} from "../../modals/AdditionalDiscount";
import {connect} from "react-redux";
import {getOneWorkorder} from "../../../../../redux/Actions/workOrderAction";
import {withRouter} from "react-router-dom";
import {routes} from "../../../../../controller/routes";
import {methods, profiles} from "../../../../../controller/Global";
import {reverse} from "named-urls";
import {CreditDiscount} from "../../modals/CreditDiscount";
import CancelStatusUpdate from "./CancelStatusUpdate";

const {TextArea} = Input;
const moment = require('moment');

const STATUS = {
    'draft': "BROUILLON",
    'processing': "EN TRAITEMENT",
    'completed': "TERMINÉ",
    'cancel': "Annulé",
    'approved': "Approuvée",
    'partial_delivered': "Partielle"
};

class PriceInfo extends Component {

    state = {
        status: null,
        emailVisible: false,
        loading: false,
        // discountVisible: false,
        creditVisible: false,
        cancelWarningStatus: false
    };

    changeStatus = (status) => {
        distributorWorkorderUpdate(this.props.data.id, {status})
            .then(response => {
                message.success("WorkOrder status updated successfully");
                this.setState({status})
            })
    };

    handleCancelStatus = (cancelWarningStatus) => {
        this.setState({cancelWarningStatus})
    }

    handleEmailPopup = (emailVisible) => {
        this.setState({emailVisible})
    };

    handleDiscountPopup = (discountVisible) => {
        if (!discountVisible && !this.props.invoice) {
            this.props.getOneWorkorder(this.props.workorder.id)
        } else if (!discountVisible && this.props.invoice)
            this.props.fetchInvoice();
        this.setState({discountVisible})
    };

    handleCreditPopup = (creditVisible) => {
        this.setState({creditVisible})
        if (!creditVisible) {
            this.props.getOneWorkorder(this.props.workorder.id)
        }
    }

    render() {
        const {t, data} = this.props;
        const {status, loading} = this.state;
        return (
            <React.Fragment>
                <div className="row mx-0">
                    <div className="col-sm-12 col-md-12 col-lg-8 col-12 step-info-left">
                        <div className="row step-info-div">
                            <div className="col-12 pl-0">
                                <h5>{t("info")}</h5>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <p className="font-weight-normal">
                                            {t("purchase_ourder_no")} :
                                        </p>
                                    </div>
                                    <div className="col-sm-6 col-12 p-0">
                                        <p>{data.id}</p>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <p className="font-weight-normal">{t("order_status")} :</p>
                                    </div>
                                    <div className="col-sm-6 col-12 p-0">
                                        <div className="row mx-0 align-items-center">
                                            <Dropdown overlayClassName="dropdown-status"
                                                      overlay={data.status === 'processing' && !status ?
                                                          <Menu>
                                                              <Menu.Item key="1">
                                                                  <Button onClick={() => this.handleCancelStatus(true)}
                                                                          className="text-uppercase cancel-btn">{STATUS['cancel']}</Button>
                                                              </Menu.Item>
                                                          </Menu> : <Menu/>
                                                      } trigger={['click']}>
                                                <Button
                                                    className={"ant-dropdown-link status-btn text-uppercase font-weight-bold mr-2 pl-2 " + (status || data.status)}
                                                    onClick={e => e.preventDefault()}>
                                                    {STATUS[status || data.status]}
                                                </Button>
                                            </Dropdown>

                                            <a className="d-inline-block" href="#">
                                                <img
                                                    src={Images.info_icon}
                                                    alt="info icon"
                                                    className="img-fluid"
                                                />
                                            </a>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <p className="font-weight-normal">
                                            {t("date_creted_purchase_order")} :
                                        </p>
                                    </div>
                                    <div className="col-sm-6 col-12 p-0">
                                        <p>{moment(data.workorder_creation_date).format('DD/MM/YYYY')}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <p className="font-weight-normal">{t("payment_mthd")} :</p>
                                    </div>
                                    <div className="col-sm-6 col-12 p-0">
                                        <p>{data.payment_mode ? data.payment_mode.title : ""}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <p className="font-weight-normal">{t("pay_status")} :</p>
                                    </div>
                                    <div className="col-sm-6 col-12 p-0">
                                        <p>{t("outstanting_payment")}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <p className="font-weight-normal">{t("total_items")} :</p>
                                    </div>
                                    <div className="col-sm-6 col-12 p-0">
                                        <p>{data.total_items}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <p className="font-weight-normal">{t("internal_note")} :</p>
                                    </div>
                                    <div className="col-sm-6 col-12 p-0">
                                        <p>{data.internal_note}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <h5>{t("account_info")}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12 pl-0">
                                        <p className="font-weight-normal">{t("distributor_name")} :</p>
                                        <p className="font-weight-normal">{t("email")} : </p>
                                        <p className="font-weight-normal">{t("company_number")} :</p>
                                        <p className="font-weight-normal">{t("address")} : </p>
                                    </div>
                                    <div className="col-sm-6 col-12 p-0">
                                        <p>{data.client.client_name}</p>
                                        <p>{data.client.client_email}</p>
                                        <p>{data.client.address.length > 0 ? `(${data.client.address[0].country_code}) ${data.client.address[0].phone_number?.match(/.{1,2}/g).join(" - ")}` : 'N/A'}</p>
                                        <p>{data.client.address.length > 0 ? `${data.client.address[0].address}, ${data.client.address[0].zip_code}, ${data.client.address[0].city}, ${data.client.address[0].country}` : 'N/A'}</p>
                                    </div>
                                </div>
                                {this.props.sav &&
                                <div className="row mt-2">
                                    <div className="col-12 col-sm-6 pl-0">
                                        <p className="font-weight-normal">SAV Cm :</p>
                                    </div>
                                    <div className="col-12 col-sm-6 p-0">
                                        <TextArea onChange={this.props.SAVcmMessage} className="sav-cm-textarea"
                                                  rows={4}/>
                                    </div>
                                </div>}
                                {this.props.credit &&
                                <div className="row mt-2">
                                    <div className="col-12 col-sm-6 pl-0">
                                        <p className="font-weight-normal">Avoir Cm :</p>
                                    </div>
                                    <div className="col-12 col-sm-6 p-0">
                                        <TextArea onChange={this.props.CreditCMMessage} className="sav-cm-textarea"
                                                  rows={4}/>
                                    </div>
                                </div>}
                                {this.props.invoiceCredit &&
                                <div className="row mt-2">
                                    <div className="col-12 col-sm-6 pl-0">
                                        <p className="font-weight-normal">Facture Cm :</p>
                                    </div>
                                    <div className="col-12 col-sm-6 p-0">
                                        <TextArea onChange={this.props.InvoiceCMMessage} className="sav-cm-textarea"
                                                  rows={4}/>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-lg-4 col-md-12 col-12 step-info-right">
                        <h4>{t("payment_details")} : </h4>
                        <div className="row">
                            <div className="col-sm-7 col-12">
                                <p>Total HT :</p>
                            </div>
                            <div className="col-sm-5 col-12">
                                <p className="text-right">€ {data.total_amount.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7 col-12">
                                <p>Net HT <small>({data.total_items} articles)</small> :</p>
                            </div>
                            <div className="col-sm-5 col-12">
                                <p className="text-right">€ {data.total_amount.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7 col-12">
                                <p>Total Eco-Part HT :</p>
                            </div>
                            <div className="col-sm-5 col-12">
                                <p className="text-right">€ {data.net_eco_part.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7 col-12">
                                <p>{t('additional_discount') + '(€)'}:</p>
                            </div>
                            <div className="col-sm-5 col-12">
                                <p className="text-right">€ {data.discount_price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7 col-12">
                                <p>{t('additional_discount') + '(%)'}:</p>
                            </div>
                            <div className="col-sm-5 col-12">
                                <p className="text-right">% {data.discount_percentage.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7 col-12">
                                <p>Frais de livraison :</p>
                            </div>
                            <div className="col-sm-5 col-12">
                                <p className="text-right">
                                    € {data.delivery_fees}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7 col-12">
                                <p>Total TVA (20%) :</p>
                            </div>
                            <div className="col-sm-5 col-12">
                                <p className="text-right">€ {data.total_tva.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7 col-12">
                                <p>Net TTC :</p>
                            </div>
                            <div className="col-sm-5 col-12">
                                <p className="text-right">€ {data.net_ttc.toFixed(2)}</p>
                            </div>
                        </div>
                        {data.credit_discount ?
                            <div className="row total-row-info">
                                <div className="col-sm-7 col-12">
                                    <p>{t("price")} total :</p>
                                </div>
                                <div className="col-sm-5 col-12">
                                    <p className="float-right">€ {data.final_without_credit.toFixed(2)}</p>
                                </div>
                                <div className="col-sm-7 col-12">
                                    <p>Total avoir HT : </p>
                                </div>
                                <div className="col-sm-5 col-12">
                                    <p className="float-right">- € {data.credit_discount.toFixed(2)}</p>
                                </div>
                                <div className="col-sm-7 col-12">
                                    <p>Total Avoir Eco-Part HT :</p>
                                </div>
                                <div className="col-sm-5 col-12">
                                    <p className="float-right">- € {data.credit_net_eco_part?.toFixed(2)}</p>
                                </div>
                                <div className="col-sm-7 col-12">
                                    <p>Total Avoir TVA (20%) : </p>
                                </div>
                                <div className="col-sm-5 col-12">
                                    <p className="float-right">- € {data.credit_tva?.toFixed(2)}</p>
                                </div>
                                <div className="col-sm-7 col-12">
                                    <p>Net Avoir TTC :</p>
                                </div>
                                <div className="col-sm-5 col-12">
                                    <p className="float-right">- € {data.credit_net_ttc?.toFixed(2)}</p>
                                </div>
                            </div> : ""}
                        <div className="row total-row-info">
                            <div className="col-sm-7 col-12">
                                <h5>{t("price")} total :</h5>
                            </div>
                            <div className="col-sm-5 col-12">
                                <h5 className="float-right">€ {data.final_amount.toFixed(2)}</h5>
                            </div>
                        </div>
                        {this.props.invoice &&
                        <div className="row total-row-info p-3">
                            <div className="col-sm-12 col-12 p-0">
                                <Button className="discount-btn"
                                        onClick={() => this.handleDiscountPopup(true)}>{t('add_additional_discount')}</Button>
                            </div>
                        </div>
                        }
                        {this.props.credit &&
                        <div className="row total-row-info p-3">
                            <div className="col-sm-12 col-12 p-0">
                                <Button className="discount-btn"
                                        onClick={() => this.handleCreditPopup(true)}>{"Choisir un montant d'avoir"}</Button>
                            </div>
                        </div>}
                    </div>
                    {this.props.invoice && <div className="total-amount-fix-footer position-fixed">
                        <div className="row mx-0 total-fix-amount flex-align-center px-4 justify-content-end">
                            <h6 className="mb-0 font-weight-bold">Total ({data.total_items} articles) :
                                €{data.final_amount.toFixed(2)}</h6>
                        </div>
                        <div className="row mx-0 mt-2 button-step-info px-4 justify-content-end">
                            <Button onClick={this.props.prev}
                                    className="font-weight-bold mr-3">{t('return')}</Button>
                            <Button loading={loading} type="primary"
                                    onClick={() => this.props.history.push(
                                        reverse(routes.dashboard.sales.work_order.method, {
                                            type: profiles.distributor,
                                            method: methods.view,
                                            id: this.props.match.params.workorderId
                                        })
                                    )}
                                    className="font-weight-bold">GENERER UNE FACTURE POUR CES ARTICLES</Button>
                        </div>
                    </div>}

                </div>
                {/*<EmailPopupModal visible={this.state.emailVisible} data={data} close={() => this.handleEmailPopup(false)}/>*/}
                <AdditionalDiscount visible={this.state.discountVisible} data={data}
                                    invoice={this.props.invoice}
                                    close={() => this.handleDiscountPopup(false)}/>
                <CreditDiscount visible={this.state.creditVisible}
                                close={() => this.handleCreditPopup(false)}/>
                <CancelStatusUpdate visible={this.state.cancelWarningStatus} changeStatus={this.changeStatus}
                                    close={() => this.handleCancelStatus(false)}/>
            </React.Fragment>
        )
            ;
    }
}

const mapStateToProps = (state) => {
    return {
        workorder: state.current_workorder.data
    }
};

export default connect(mapStateToProps, {getOneWorkorder})(withTranslation('common')(withRouter(PriceInfo)));
