import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import {
    bankRemove,
    codificationRemove,
    contactRemove,
    distributorProfileGetOne,
} from "../../../../../controller/API/profileApi";
import {Button} from "antd";
import AddBank from "../../../../drawers/AddBank";
import AddContact from "../../../../drawers/AddContact";
import {AddCodificationDistributer} from "../../../../drawers/AddCodification";
import {getPhoneFormatting} from "../../PhoneNumberField";
import {getStatus, isAccessible} from "../../../../../utils";
import moment from "moment";

const _ = require("lodash");

class SummaryInformation extends Component {
    state = {
        profile: this.props.profile,
        editCodificationVisible: false,
        currentCodification: null,
        editBankVisible: false,
        currentBank: null,
        editContactVisible: false,
        currentContact: null,
    };
    element;

    handleCodificationEdit = (visible, data = null) => {
        this.setState({
            editCodificationVisible: visible,
            currentCodification: data,
        });
    };

    handleBankEdit = (visible, data = null) => {
        this.setState({editBankVisible: visible, currentBank: data});
    };

    handleContactEdit = (visible, data = null) => {
        this.setState({editContactVisible: visible, currentContact: data});
    };

    deleteCodification = (id) => {
        codificationRemove(id).then(() => {
            this.props.fetch(this.props.profile.id);
        });
    };

    deleteBank = (id) => {
        bankRemove(id).then(() => {
            this.props.fetch(this.props.profile.id);
        });
    };

    deleteContact = (id) => {
        contactRemove(id).then(() => {
            this.props.fetch(this.props.profile.id);
        });
    };

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.profile !== this.props.profile) {
            this.setState({profile: this.props.profile});
        }
    }

    fetch(params = {}) {
        this.setState({loading: true});
        this.fetchDistributor(this.props.profile.id);
    }

    fetchDistributor(id) {
        distributorProfileGetOne(id).then((response) => {
            this.setState({profile: response, loading: false});
        });
    }

    render() {
        const {t} = this.props;
        const {profile} = this.state;
        this.element = profile && (
            <div>
                <div className="row summary-info-row mx-0">
                    <div className="col-12 px-0">
                        <h6 className="text-uppercase font-weight-bold mb-4">
                            {t("distributor_info")}{" "}
                        </h6>
                    </div>
                    <div className="col-12 px-0">
                        <div className="card border-0 position-relative mb-4">
                            <div className="card-body">
                                <div className="row mx-0">
                                    <div className="col-md-6 col-sm-6 col-12 col-lg-4">
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("date_created")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {moment(profile.created_at).format('DD/MM/YYYY')}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("entity")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.entity?.name}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("distributor_name")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.client_name}
                                            </li>
                                        </ul>

                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("type_distributor")}:
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.client_type && profile.client_type.title}
                                                <span style={{color: "#1655a2"}}>
                          {" "}
                                                    {profile.centrale &&
                                                    profile.client_type.title === "Centrale"
                                                        ? profile.centrale.title
                                                        : "-"}
                        </span>
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("Group")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.group ? profile.group.title : "-"}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("distributor_rank")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.client_rank || "-"}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("status")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {`${getStatus[profile.status]} (${moment(profile.status_changed_date).format('DD/MM/YYYY') || "-"}) `}
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="col-md-6 col-sm-6 col-12 col-lg-4">
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("closing_days")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.closing_days || "-"}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("profile_email")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.user.email || "-"}
                                            </li>
                                        </ul>
                                        {/*<ul className="list-inline">*/}
                                        {/*  <li className="list-inline-item label-text-li">{t('main_email')} :</li>*/}
                                        {/*  <li className="list-inline-item label-name-li">{profile.main_email || profile.client_email}</li>*/}
                                        {/*</ul>*/}
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("pay_method")}:
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.payment_mode &&
                                                (profile.payment_mode.title || "-")}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-12 col-lg-4">
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">% :</li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.percentage || "-"}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("days")}:
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {profile.days || "-"}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("Price_list")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {_.get(profile.price_list, "title", "-")}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("representative")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {_.get(profile.sales_representative, "first_name", "-")}{" "}
                                                {_.get(profile.sales_representative, "last_name", "-")}
                                            </li>
                                        </ul>
                                        <ul className="list-inline">
                                            <li className="list-inline-item label-text-li">
                                                {t("Etat/Departement du distributeur")} :
                                            </li>
                                            <li className="list-inline-item label-name-li">
                                                {_.get(profile, "department")}
                                            </li>
                                        </ul>
                                        {/*<ul className="list-inline">*/}
                                        {/*<li className="list-inline-item label-text-li mr-0">Tel - Depot*/}
                                        {/*:*/}
                                        {/*</li>*/}
                                        {/*<li*/}
                                        {/*className="list-inline-item label-name-li">{profile.sales_representative && profile.sales_representative.phone}*/}
                                        {/*</li>*/}
                                        {/*</ul>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 px-0">
                        <div className="row">
                            <div className="col-sm-12 col-12">
                                {profile.address &&
                                profile.address.map((address, index) => (
                                    <div
                                        key={index}
                                        className="card border-0 card-custom h-auto-min position-relative"
                                    >
                                        <div className="card-header bg-transparent border-0">
                                            <h6 className="mb-0 font-weight-bold text-capitalize">
                                                {address.type}
                                                {address.default ? (
                                                    <span className="default">
                              Adresse de livraison
                            </span>
                                                ) : (
                                                    ""
                                                )}
                                                {address.invoice_address ? (
                                                    <span className="invoice">
                              Adresse de facturation
                            </span>
                                                ) : (
                                                    ""
                                                )}
                                                {address.default_confirmation ? (
                                                    <span className="confirmation">
                              Adresse de confirmation de commande
                            </span>
                                                ) : (
                                                    ""
                                                )}
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="row mx-0">
                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            {"Type de service"}:
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.type}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            {t("address")} :
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.address || "-"}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            {"Nom de l'adresse"}:
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.title || "-"}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            {t("zip_code")} :
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.zip_code || "-"}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            Jours et horaires d’ouverture:
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.opening_days || "-"}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            {t("city")} :
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.city || "-"}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            {t("Numéro de téléphone")} :
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.country_code}-
                                                            {getPhoneFormatting(
                                                                address.country_code,
                                                                address.phone_number
                                                            )}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            {t("country")} :
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.country || "-"}
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item label-text-li">
                                                            {t("Email")} :
                                                        </li>
                                                        <li className="list-inline-item label-name-li">
                                                            {address.email || "-"}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 px-0">
                        <h6 className="text-uppercase font-weight-bold my-4 pt-2">
                            {" "}
                            {"Tarification"}
                        </h6>
                    </div>
                    <div className="col-12 px-0">
                        <div className="row">
                            <div className="col-sm-12 col-12">
                                <div className="card border-0 card-custom h-auto-min position-relative">
                                    <div className="card-body">
                                        <div className="row mx-0">
                                            <div className="col-12 col-sm-12 col-md-7 col-sm-7 col-lg-7 p-0">
                                                <ul className="list-inline pb-2">
                                                    <li className="list-inline-item label-text-li">
                                                        Coefficient de vente suggéré aux <br/>{" "}
                                                        distributeurs pour son consommateur B2C:
                                                    </li>
                                                    <li className="list-inline-item label-name-li">
                                                        {profile.coefficient}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-12">
                                                {profile.discounts &&
                                                profile.discounts.map((traf, index) => (
                                                    <div className="row border-top-1 pt-3 mb-2">
                                                        <div className="col-12 px-0">
                                                            <h6
                                                                style={{
                                                                    color: "#646464",
                                                                    fontSize: "14px",
                                                                    fontWeight: 800,
                                                                }}
                                                            >
                                                                Coupon - {index + 1}
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {traf.category ? "Catégorie" : "Produit"}:
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {traf.category
                                                                        ? traf.category?.name
                                                                        : traf.product?.name}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    Type de réduction :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {traf.discount_type === "REDUCTION_AMOUNT"
                                                                        ? "Nouveau montant"
                                                                        : "Pourcentage de réduction"}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    Quantité :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {traf.quantity}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div
                                                            className="col-12 col-sm-12 col-md-6 col-sm-6 col-lg-6 p-0">
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    Réduction :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {traf.discount_type === "REDUCTION_AMOUNT"
                                                                        ? traf.amount
                                                                        : traf.percentage + "%"}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    Condition d’accumulation :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {traf.condition.split("_OF")[0]}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    Date d’expiration :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {traf.expired_date}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 px-0">
                        <h6 className="text-uppercase font-weight-bold my-4 pt-2">
                            {" "}
                            {t("legal_info")}{" "}
                        </h6>
                    </div>
                    <div className="col-12 px-0">
                        <div className="row mx-0">
                            <div className="col-12 col-sm-6 col-lg-5 pl-0 padding-responsive-left">
                                <div className="row mx-0">
                                    <div className="col-12 col-md-12 col-sm-12 p-0">
                                        <div className="card border-0 card-custom position-relative">
                                            <div className="card-header bg-transparent border-0">
                                                <h6 className="mb-0 d-flex align-items-left justify-content-between font-weight-bold">
                                                    {t("codification")}
                                                    {profile.codification ? (
                                                        isAccessible(['admin']) &&
                                                        <div className="edit-btn-div">
                                                            <Button
                                                                onClick={() =>
                                                                    this.handleCodificationEdit(
                                                                        true,
                                                                        profile.codification
                                                                    )
                                                                }
                                                                className="text-uppercase bg-transparent border-0 p-0 shadow-none px-1"
                                                            >
                                                                {t("edit")}
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    this.deleteCodification(
                                                                        profile.codification.id
                                                                    )
                                                                }
                                                                className="text-uppercase bg-transparent border-0 p-0 shadow-none px-1"
                                                            >
                                                                {t("delete")}
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <div className="row mx-0">
                                                    <div className="col-12 p-0">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">
                                                                {t("legal_status")} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">
                                                                {profile.codification &&
                                                                profile.codification.legal_form
                                                                    ? profile.codification.legal_form.join(", ")
                                                                    : "-"}
                                                            </li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">
                                                                {t("social_capital")} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">
                                                                {profile.codification &&
                                                                (profile.codification.share_capital || "-")}
                                                            </li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">
                                                                {t("number_s")} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">
                                                                {profile.codification &&
                                                                (profile.codification.siret_number || "-")}
                                                            </li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">
                                                                {t("community_number")} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">
                                                                {profile.codification &&
                                                                (profile.codification.intracommunity_number ||
                                                                    "-")}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-7 pr-0 padding-responsive-right">
                                <div className="row mx-0">
                                    {profile.bank_info &&
                                    profile.bank_info.map((bank, index) => (
                                        <div className="col-12 col-md-12 col-sm-12 px-0 pr-0">
                                            <div className="card border-0 card-custom position-relative">
                                                <div className="card-header bg-transparent border-0">
                                                    <h6 className="mb-0 d-flex align-items-center justify-content-between font-weight-bold">
                                                        {t("bank_info")}{" "}
                                                        {String.fromCharCode("A".charCodeAt(0) + index)}
                                                        {isAccessible(['admin']) &&
                                                        <div className="edit-btn-div">
                                                            <Button
                                                                onClick={() =>
                                                                    this.handleBankEdit(true, bank)
                                                                }
                                                                className="text-uppercase bg-transparent border-0 p-0 shadow-none px-1"
                                                            >
                                                                {t("edit")}
                                                            </Button>
                                                            <Button
                                                                onClick={() => this.deleteBank(bank.id)}
                                                                className="text-uppercase bg-transparent border-0 p-0 shadow-none px-1"
                                                            >
                                                                {t("delete")}
                                                            </Button>
                                                        </div>}
                                                    </h6>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row mx-0">
                                                        <div className="col-md-6 col-sm-6 col-12 col-sm-6 p-0">
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("bank")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.bank && bank.bank.name}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("address")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.address || "-"}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("zip_code")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.zip_code}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("city")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.city}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("country")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.country}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("bank_code")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.bank_code}
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <div className="col-md-6 col-sm-6 col-12 col-sm-6 p-0">
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("country_code")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.agency_code}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("acc_number")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.account_number}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    IBAN :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.iban}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("rib_key")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.rib_key}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    BIC :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.bic_swift_address}
                                                                </li>
                                                            </ul>
                                                            <ul className="list-inline">
                                                                <li className="list-inline-item label-text-li">
                                                                    {t("agency")} :
                                                                </li>
                                                                <li className="list-inline-item label-name-li">
                                                                    {bank.bank_branch}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*contact-client*/}

                    {Object.keys(profile.contact_info).length > 0 && (
                        <div className="col-12 px-0">
                            <h6 className="text-uppercase font-weight-bold mb-4 mt-2 pt-2">
                                {t("contact_information")}{" "}
                            </h6>
                        </div>
                    )}
                    {profile.contact_info &&
                    profile.contact_info.map((contact) => (
                        <div className="col-12 px-0">
                            <div className="card border-0 card-custom h-auto-min position-relative">
                                <div className="card-header bg-transparent border-0">
                                    <h6 className="mb-0 d-flex align-items-center justify-content-between font-weight-bold text-capitalize">
                                        {contact.name}
                                        {isAccessible(['admin']) &&
                                        <div className="edit-btn-div">
                                            <Button
                                                onClick={() => this.handleContactEdit(true, contact)}
                                                className="text-uppercase bg-transparent border-0 p-0 shadow-none px-1"
                                            >
                                                {t("edit")}
                                            </Button>
                                            <Button
                                                onClick={() => this.deleteContact(contact.id)}
                                                className="text-uppercase bg-transparent border-0 p-0 shadow-none px-1"
                                            >
                                                {t("delete")}
                                            </Button>
                                        </div>
                                        }
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="row mx-0">
                                        <div className="col-12 col-sm-12 col-md-4 p-0">
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    {t("name")} :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {contact.name}{" "}
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    {t("department")} :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {(contact.department && contact.department.title) ||
                                                    "-"}
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    {t("role")} :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {contact.position || "-"}
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    {t("email")} :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {contact.email || "-"}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-4 p-0">
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    {t("address")} :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {contact.address || "-"}
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    Code postal :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {contact.zip_code || "-"}
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    {t("state_dep_view")} :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {contact.state_province || "-"}
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    Ville :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {contact.city || "-"}
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item label-text-li">
                                                    {t("country")} :
                                                </li>
                                                <li className="list-inline-item label-name-li">
                                                    {contact.country || "-"}
                                                </li>
                                            </ul>
                                            <div className="row mx-0 summary-info-num-div">
                                                <div className="col-12 p-0 mb-3">
                                                    {contact.phone.map((item, index) => {
                                                        return (
                                                            <ul className="list-inline d-inline-block w-100">
                                                                <li className="label-text-li w-100">
                                                                    Numéro de téléphone {index + 1}:{" "}
                                                                    <span className="label-text-li-span">
                                      {item.phone_type || "-"}
                                    </span>
                                                                    :{" "}
                                                                    {item.phone_number
                                                                        ? `(${
                                                                            item.country_code
                                                                        }) - ${item.phone_number
                                                                            .match(/.{1,2}/g)
                                                                            .join(" - ")}`
                                                                        : "-"}
                                                                </li>
                                                            </ul>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
        return (
            <React.Fragment>
                {this.element}
                <AddBank
                    visible={this.state.editBankVisible}
                    id={profile.id}
                    bank={this.state.currentBank}
                    onClose={() => this.handleBankEdit(false)}
                    update={() => this.fetch()}
                />
                {this.state.editContactVisible && (
                    <AddContact
                        visible={this.state.editContactVisible}
                        id={profile.id}
                        contact={this.state.currentContact}
                        onClose={() => this.handleContactEdit(false)}
                        update={() => this.fetch()}
                    />
                )}
                <AddCodificationDistributer
                    profile={this.props.profile}
                    visible={this.state.editCodificationVisible}
                    update={() => this.fetch()}
                    codification={this.state.currentCodification}
                    id={profile.id}
                    onClose={() => this.handleCodificationEdit(false)}
                />
            </React.Fragment>
        );
    }
}

export default withTranslation("common")(SummaryInformation);
