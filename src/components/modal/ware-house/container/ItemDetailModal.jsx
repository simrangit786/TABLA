import React, {Component} from 'react';
import {Button, Dropdown, Icon, Input, InputNumber, Menu, Modal} from "antd";
import {Image as Images} from "../../../Images";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

const {Search} = Input;

function onChange(value) {
}

class ItemDetailModal extends Component {
    menu = (
        <Menu>
            <Menu.Item key="0">
                <span className="text-dark-main font-weight-bold">Fauteuils</span>
            </Menu.Item>
            <Menu.Item key="1">
                <span className="text-dark-main font-weight-bold">Chaise</span>
            </Menu.Item>
            <Menu.Item key="2">
                <span className="text-dark-main font-weight-bold">Chaises</span>
            </Menu.Item>
            <Menu.Item key="3">
                <span className="text-dark-main font-weight-bold">Chaises avec accoudoirs</span>
            </Menu.Item>
            <Menu.Item key="4">
                <span className="text-dark-main font-weight-bold">Bibliothèques</span>
            </Menu.Item>
            <Menu.Item key="5">
                <span className="text-dark-main font-weight-bold">Salons</span>
            </Menu.Item>
            <Menu.Item key="6">
                <span className="text-dark-main font-weight-bold">Tables de séjour</span>
            </Menu.Item>
            <Menu.Item key="7">
                <span className="text-dark-main font-weight-bold">Tables basses</span>
            </Menu.Item>
            <Menu.Item key="8">
                <span className="text-dark-main font-weight-bold">Tabourets Pistons</span>
            </Menu.Item>
            <Menu.Item key="9">
                <span className="text-dark-main font-weight-bold">Petits meubles</span>
            </Menu.Item>
            <Menu.Item key="10">
                <span className="text-dark-main font-weight-bold">Assises</span>
            </Menu.Item>
        </Menu>
    );

    render() {
        return (
            <Modal
                style={{top: 15}}
                title="Ajouter un Numero"
                visible={this.props.visible}
                onOk={this.props.onClose}
                onCancel={this.props.onClose}
                width="75%"
                okText="Ajouter"
                cancelText="Annuler"
                className="confirm-modal-main"
            >
                <div className="row mx-0 py-4 px-3">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon close-header-second w-auto flex-align-center-center px-2 position-absolute p-0 border-0">
                        <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                        <div>FERMER</div>
                    </Button>
                    <div className="col-12 clearfix list-main-drawer">
                        <div className="row mx-0 add-item-list-row-header">
                            <div className="col-12 col-sm-4 col-lg-3 col-md-3 p-0">
                                <div className="row mx-0 left-right-btn">
                                    <Button className="bg-transparent border-0 shadow-none p-0 mr-2 flex-align-center">
                                        <img src={Images.left_arrow_icon} alt="arrow icon" className="img-fluid mr-1"/>
                                        Retour
                                    </Button>
                                    <Button
                                        className="bg-transparent border-0 shadow-none p-0 ml-2 flex-align-center-center">
                                        vers l'avant
                                        <img src={Images.right_arrow_icon} alt="arrow icon" className="img-fluid ml-1"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="col-12 col-sm-8 col-lg-9 col-md-9 pr-0">
                                <div className="row mx-0">
                                    <Search
                                        placeholder="Rechercher des articles"
                                        style={{width: '74%'}}
                                    />
                                    <Dropdown overlay={this.menu} trigger={['click']}>
                                        <Button type="primary" style={{height: '38px'}}
                                                className="ant-dropdown-link ml-3" onClick={e => e.preventDefault()}>FILTRE
                                            PRODUITS</Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-0 item-detail-height">
                            <div className="row mx-0 list-item-second-header">
                                <div className="col-sm-8 col-12 flex-align-center">
                                    <h6 className="m-0 font-weight-bold">
                                        <div className="img-cart-add-tag position-relative float-left mr-1">
                                            <img src={Images.warehouse_black_icon} alt="ware-house-icon"
                                                 className="img-fluid mr-1"/>
                                            {/*to show cart is not empty*/}
                                            <span className="position-absolute tag-cart-notification"> </span>
                                        </div>
                                        Siège social :
                                        <small> 0 Article(s) ajouté(s)</small>
                                    </h6>
                                </div>
                                <div className="col-sm-4 col-12">
                                    <div className="row mx-0 left-right-btn justify-content-end flex-align-center">
                                        <Button
                                            className="bg-transparent border-0 shadow-none text-capitalize p-0 mr-2 flex-align-center">
                                            <img src={Images.left_arrow_black} alt="arrow icon"
                                                 className="img-fluid mr-1"/>
                                            Retour
                                        </Button>
                                        <Button
                                            className="bg-transparent border-0 text-capitalize shadow-none p-0 ml-2 flex-align-center-center">
                                            vers l'avant
                                            <img src={Images.right_arrow_black} alt="arrow icon"
                                                 className="img-fluid ml-1"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mx-0 list-item-card-row">
                                <div className="col-12">
                                    <div className="row mx-0 item_single-card w-100 bg-transparent border-0">
                                        <div className="item-img-div flex-align-center-center item-slider-div">
                                            <Carousel className="w-100">
                                                <div className="w-100 h-100 flex-align-center-center">
                                                    <img src={Images.chair_img_1} alt="slider-img"
                                                         className="img-fluid w-auto"/>
                                                </div>
                                                <div className="w-100 h-100 flex-align-center-center">
                                                    <img src={Images.chair_img_1} alt="slider-img"
                                                         className="img-fluid w-auto"/>
                                                </div>
                                                <div className="w-100 h-100 flex-align-center-center">
                                                    <img src={Images.chair_img_1} alt="slider-img"
                                                         className="img-fluid w-auto"/>
                                                </div>
                                                <div className="w-100 h-100 flex-align-center-center">
                                                    <img src={Images.chair_img_1} alt="slider-img"
                                                         className="img-fluid w-auto"/>
                                                </div>
                                            </Carousel>
                                        </div>
                                        <div
                                            className="item-data-div position-relative item-slider-data-div bg-transparent">
                                            <h5 className="font-weight-bold">Furtif</h5>
                                            <p className="font-weight-normal">Référence produit : BC.FUR-MR</p>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item ">Prix :</li>
                                                <li className="list-inline-item ">$125.95</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item ">Catégorie :</li>
                                                <li className="list-inline-item  dark-gray">Chaise</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item ">En stock :</li>
                                                <li className="list-inline-item  text-success">46</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item ">Conditionnement :</li>
                                                <li className="list-inline-item  dark-gray">1</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item ">Livré au plus tôt :</li>
                                                <li className="list-inline-item  dark-gray">10/26/2019</li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item ">Couleur :</li>
                                                <li className="list-inline-item ">
                                                <span style={{backgroundColor: '#F7B257'}}
                                                      className="color-card d-inline-block mr-1 active"/>
                                                    <span style={{backgroundColor: '#C4BCB1'}}
                                                          className="color-card d-inline-block mr-1"/>
                                                    <span style={{backgroundColor: '#B6BABD'}}
                                                          className="color-card d-inline-block mr-1"/>
                                                    <span style={{backgroundColor: '#A2CAE9'}}
                                                          className="color-card d-inline-block mr-1"/>
                                                    <span style={{backgroundColor: '#E9C4A2'}}
                                                          className="color-card d-inline-block"/>
                                                </li>
                                            </ul>
                                            <ul className="list-inline mb-0 w-100">
                                                <li className="list-inline-item ">Quantité :</li>
                                                <li className="list-inline-item ">
                                                    <InputNumber min={1} max={10} defaultValue={1} onChange={onChange}/>
                                                </li>
                                            </ul>
                                            <div
                                                className="card-footer-div flex-align-center w-100 list-footer mt-3 position-relative">
                                                <div className="mr-3 card-text-footer">
                                                    <small>$150.95</small>
                                                    <h6 className="mb-0 font-weight-bold active">$125.95</h6>
                                                </div>
                                                <Button style={{width: '40%', marginLeft: '10%'}} type="primary">
                                                    <Icon type="plus"/>
                                                    AJOUTER
                                                </Button>
                                            </div>
                                            <div className="promotions-div col-12 p-0 w-100 mt-5 pt-4">
                                                <h6 className="w-100 font-weight-bold">Promotions</h6>
                                                <Button
                                                    className="add-btn p-0 bg-white flex-align-center-center float-left mr-2">
                                                    <img src={Images.plus_icon} alt="plus icon" className="img-fluid"/>
                                                </Button>
                                                <span className="hover-common-div-down flex-align-center float-left">
                                                <img src={Images.cross_icon} alt="plus icon"
                                                     className="img-fluid mr-2"/>
                                                DEC20OFF
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ItemDetailModal;
