import React, {Component} from 'react';
import {containerItemUpdate} from "../../../controller/API/itemApi";
import {Button, Input, InputNumber} from "antd";
import {withTranslation} from "react-i18next";

class ContainerItemSingle extends Component {
    state = {
        edit_pi: false,
        edit_quantity: false,
    };

    handleEditPi = (edit) => {
        this.setState({edit_pi: edit, edit_quantity: !edit})
    };

    handleEditQuantity = (edit) => {
        this.setState({edit_quantity: edit, edit_pi: !edit})
    };

    changePiValue = (e) => {
        let {item} = this.props;
        item.pi_number = e.target.value;
        this.setState({item})
    };

    changeQuantity = (value) => {
        let {item} = this.props;
        item.quantity = value;
        this.setState({item})
    };

    updateItem = (id, data) => {
        containerItemUpdate(id, data)
            .then(() => {
                this.props.fetch();
                this.setState({edit_pi: false, edit_quantity: false})
            });
    };

    render() {
        const {t, item} = this.props;
        const {edit_pi, edit_quantity} = this.state;
        return (
            <div className="container-card-multi-card container-multi-card-second row position-relative">
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
                      <span style={{backgroundColor: `${item.item.colour_code}`}}
                            className="color-tag d-inline-block mr-1"/>{item.item.colour}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="item-qty-div item-qty-new px-1">
                            <ul className="list-inline mb-0 list-item-ul">
                                <li className="list-inline-item">Quantité attendue :
                                </li>
                                {edit_quantity ? <li className="list-inline-item">
                                        <InputNumber style={{marginRight: "7px"}} value={item.quantity}
                                                     onChange={(e) => this.changeQuantity(e)}
                                                     step={item.item.units_per_set}/> {item.quantity / item.item.units_per_set} sets
                                        <Button
                                            onClick={() => this.updateItem(item.id, {quantity: item.quantity})}><span>Valider</span></Button>
                                    </li>
                                    : <li className="list-inline-item">{(item.quantity / item.item.units_per_set) + " "}
                                        sets / {item.quantity} articles
                                        <Button
                                            onClick={() => this.handleEditQuantity(true)}><span>{t('edit')}</span></Button>
                                    </li>}
                            </ul>
                            <ul className="list-inline list-item-ul">
                                <li className="list-inline-item">Numéro de PI :</li>
                                {edit_pi ? <li className="list-inline-item">
                                        <Input onChange={(e) => this.changePiValue(e)}
                                               value={item.pi_number}/>
                                        <Button
                                            onClick={() => this.updateItem(item.id, {pi_number: item.pi_number})}><span>Valider</span></Button>

                                    </li> :
                                    <li className="list-inline-item">{item.pi_number}
                                        <Button
                                            onClick={() => this.handleEditPi(true)}><span>{t('edit')}</span></Button>
                                    </li>}
                            </ul>
                        </div>
                    </div>
                    <div className="group-action-div-2">
                        <Button className="added-btn"
                                onClick={() => this.props.deleteItem(item.id)}>{t('delete_icon')}</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(ContainerItemSingle));
