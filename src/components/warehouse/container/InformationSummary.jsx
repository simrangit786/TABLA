import React, {Component} from 'react';
import {Image as Images} from "../../Images";
import {withTranslation} from "react-i18next";


const moment = require('moment');

class InformationSummary extends Component {

    render() {
        const {container, t} = this.props;
        const scanned_items = container.container_item.filter(item => item.added_to_inventory > 0);
        const pending_items = container.container_item.filter(item => item.added_to_inventory === 0);
        const addition_items = container.additional_item;
        return (
            <React.Fragment>
                <div className="row summary-info-row mx-0 px-3">
                    <div className="col-12 p-0">
                        <div className="row mx-0 w-100">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                <div className="row mx-0 container-card-row-left">
                                    <div className="col-12">
                                        <h6 className="font-weight-bold">{container.name}</h6>
                                    </div>
                                    <div className="col-12 text-center container-img">
                                        <img src={Images.container_small_icon} alt="small icon container"
                                             className="img-fluid"/>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 pr-0">
                                        <p className="mb-0 font-weight-normal">Date de livraison :</p>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 text-right pl-0">
                                    <span
                                        className="font-weight-normal">{moment(container.date).format("DD-MM-YYYY")}
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-12 col-12 container-right-div">
                                <div className="row mx-0">
                                    <div className="col-12 p-0">
                                        <div className="row mx-0 container-small-heading">
                                            <h5>{t('pending_inventory')}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 p-0">
                                    <div className="container-card-multi-card row">
                                        <div className="col-12">
                                            {pending_items.length > 0 ?
                                                pending_items.map((item, index) => {
                                                        return <div key={`view_container_${index}`}
                                                                    className="container-card-multi-card row">
                                                            <div className="col-12">
                                                                <div
                                                                    className="row mx-0 w-100 align-items-center justify-content-between items-card-container-inner">
                                                                    <div className="items-chair-div item-chair-new">
                                                                        <img alt="chair-icon"
                                                                             src={item.item.images.length > 0 ? item.item.images[0].image : '#'}
                                                                             className="img-fluid"/>
                                                                    </div>
                                                                    <div className="item-details-div item-details-new">
                                                                        <div className="row mx-0">
                                                                            <div className="col-12">
                                                                                <h5 className="font-weight-bold pb-3">{item.item.product.name}
                                                                                    <small
                                                                                        className="ml-1 d-inline-block">{item.item.sku}
                                                                                    </small>
                                                                                </h5>
                                                                                <ul className="list-inline mb-0 container-card-details">
                                                                                    <li className="list-inline-item pr-3">Conditionnement
                                                                                        :
                                                                                    </li>
                                                                                    <li className="list-inline-item cart-text-li-second">{item.item.units_per_set}</li>
                                                                                </ul>
                                                                                <ul className="list-inline mb-0 container-card-details">
                                                                                    <li className="list-inline-item pr-3">Couleur
                                                                                        :
                                                                                    </li>
                                                                                    <li className="list-inline-item cart-text-li-second">
                                                                                          <span
                                                                                              style={{backgroundColor: `${item.item.colour_code}`}}
                                                                                              className="color-tag d-inline-block mr-1"/>{item.item.colour}
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="item-qty-div item-qty-new px-3">
                                                                        <ul className="list-inline mb-0 list-item-ul">
                                                                            <li className="list-inline-item">Quantité
                                                                                attendue :
                                                                            </li>
                                                                            <li className="list-inline-item">{item.quantity / item.item.units_per_set} sets
                                                                                / {item.quantity} articles
                                                                            </li>
                                                                        </ul>
                                                                        <ul className="list-inline list-item-ul">
                                                                            <li className="list-inline-item">Numéro
                                                                                de PI :
                                                                            </li>
                                                                            <li className="list-inline-item">{item.pi_number}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                ) :
                                                <div
                                                    className="row mx-0 w-100 align-items-center gray-card justify-content-center items-card-container-inner">
                                                    <div>{t('no_pending_inventory')}</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/*gray-card*/}
                                <div className="row mx-0">
                                    <div className="col-12 p-0">
                                        <div className="row mx-0 container-small-heading">
                                            <h5>{t('scanned_inventory')}</h5>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        {scanned_items.length > 0 ?
                                            scanned_items.map((item, index) => {
                                                    return <div key={`view_container_${index}`}
                                                                className="container-card-multi-card row">
                                                        <div className="col-12">
                                                            <div
                                                                className="row mx-0 w-100 align-items-center justify-content-between items-card-container-inner">
                                                                <div className="items-chair-div item-chair-new">
                                                                    <img alt="chair-icon"
                                                                         src={item.item.images.length > 0 ? item.item.images[0].image : '#'}
                                                                         className="img-fluid"/>
                                                                </div>
                                                                <div className="item-details-div item-details-new">
                                                                    <div className="row mx-0">
                                                                        <div className="col-12">
                                                                            <h5 className="font-weight-bold pb-3">{item.item.product.name}
                                                                                <small
                                                                                    className="ml-1 d-inline-block">{item.item.sku}
                                                                                </small>
                                                                            </h5>
                                                                            <ul className="list-inline mb-0 container-card-details">
                                                                                <li className="list-inline-item pr-3">Conditionnement
                                                                                    :
                                                                                </li>
                                                                                <li
                                                                                    className="list-inline-item cart-text-li-second">{item.item.units_per_set}</li>
                                                                            </ul>
                                                                            <ul className="list-inline mb-0 container-card-details">
                                                                                <li className="list-inline-item pr-3">Couleur
                                                                                    :
                                                                                </li>
                                                                                <li className="list-inline-item cart-text-li-second">
                                                                                    <span
                                                                                        style={{backgroundColor: `${item.item.colour_code}`}}
                                                                                        className="color-tag d-inline-block mr-1"/>{item.item.colour}
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="item-qty-div item-qty-new px-3">
                                                                    <ul className="list-inline mb-0 list-item-ul">
                                                                        <li className="list-inline-item">Quantité
                                                                            attendue :
                                                                        </li>
                                                                        <li className="list-inline-item">{item.quantity / item.item.units_per_set} sets
                                                                            / {item.quantity} articles
                                                                        </li>
                                                                    </ul>
                                                                    <ul className="list-inline list-item-ul">
                                                                        <li className="list-inline-item">Numéro de
                                                                            PI :
                                                                        </li>
                                                                        <li className="list-inline-item">{item.pi_number}</li>
                                                                    </ul>
                                                                    <ul className="list-inline mb-0 list-item-ul">
                                                                        <li className="list-inline-item">Quantité
                                                                            numérisé :
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            {item.added_to_inventory / item.item.units_per_set} sets
                                                                            / {item.added_to_inventory} articles

                                                                        </li>
                                                                    </ul>
                                                                    <ul className="list-inline mb-0 list-item-ul">
                                                                        <li className="list-inline-item">Quantité
                                                                            en attente :
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            {(item.quantity - item.added_to_inventory) / item.item.units_per_set} sets
                                                                            / {item.quantity - item.added_to_inventory} articles
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            ) :
                                            <div className="container-card-multi-card row">
                                                <div className="col-12">
                                                    <div
                                                        className="row mx-0 w-100 align-items-center gray-card justify-content-center items-card-container-inner">
                                                        <div>Vous n'avez analysé aucun inventaire.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="col-12 p-0">
                                        <div className="row mx-0 container-small-heading">
                                            <h5>{t('additional_inventory')}</h5>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="container-card-multi-card row">
                                            <div className="col-12">
                                                {addition_items.length > 0 ?
                                                    addition_items.map((item, index) =>
                                                        <div key={`view_container_${index}`}
                                                             className="container-card-multi-card row">
                                                            <div className="col-12">
                                                                <div
                                                                    className="row mx-0 w-100 align-items-center justify-content-between items-card-container-inner">
                                                                    <div className="items-chair-div item-chair-new">
                                                                        <img alt="chair-icon"
                                                                             src={item.item.images.length > 0 ? item.item.images[0].image : '#'}
                                                                             className="img-fluid"/>
                                                                    </div>
                                                                    <div className="item-details-div item-details-new">
                                                                        <div className="row mx-0">
                                                                            <div className="col-12">
                                                                                <h5 className="font-weight-bold pb-3">{item.item.product.name}
                                                                                    <small
                                                                                        className="ml-1 d-inline-block">{item.item.sku}
                                                                                    </small>
                                                                                </h5>
                                                                                <ul className="list-inline mb-0 container-card-details">
                                                                                    <li className="list-inline-item pr-3">Conditionnement
                                                                                        :
                                                                                    </li>
                                                                                    <li
                                                                                        className="list-inline-item cart-text-li-second">{item.item.units_per_set}</li>
                                                                                </ul>
                                                                                <ul className="list-inline mb-0 container-card-details">
                                                                                    <li className="list-inline-item pr-3">Couleur
                                                                                        :
                                                                                    </li>
                                                                                    <li className="list-inline-item cart-text-li-second">
                                                                                        <span
                                                                                            style={{backgroundColor: `${item.item.colour_code}`}}
                                                                                            className="color-tag d-inline-block mr-1"/>{item.item.colour}
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="item-qty-div item-qty-new px-3">
                                                                        <ul className="list-inline mb-0 list-item-ul">
                                                                            <li className="list-inline-item">Quantité
                                                                                attendue :
                                                                            </li>
                                                                            <li className="list-inline-item">{item.added_to_inventory / item.item.units_per_set} sets
                                                                                / {item.added_to_inventory} articles
                                                                            </li>
                                                                        </ul>
                                                                        <ul className="list-inline list-item-ul">
                                                                            <li className="list-inline-item">Numéro
                                                                                de PI :
                                                                            </li>
                                                                            <li className="list-inline-item">{item.pi_number}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : <div
                                                        className="row mx-0 w-100 align-items-center gray-card justify-content-center items-card-container-inner">
                                                        <div>Vous n'avez pas analysé d'inventaire supplémentaire.</div>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(InformationSummary));
