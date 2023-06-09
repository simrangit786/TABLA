import React, {Component} from 'react';
import {Button, Drawer, Dropdown, Input, Menu,} from 'antd';
import {Image as Images} from "../../Images";
import {SingleItemCard} from "./SingleItemCard";

const {Search} = Input;

class ContainerSingleItem extends Component {

    state = {
        items: [],
        fetched: false,
    };
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
            <Drawer
                title="AJOUTER DES ARTICLES"
                placement="right"
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                width="81.3%"
                destroyOnClose={true}
            >
                <div className="row mx-0">
                    <Button onClick={this.props.onClose}
                            className="close-header-icon w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
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
                                        style={{width: '75%'}}
                                    />
                                    <Dropdown overlay={this.menu} trigger={['click']}>
                                        <Button type="primary" style={{height: '38px'}}
                                                className="ant-dropdown-link ml-3"
                                                onClick={e => e.preventDefault()}>FILTRE
                                            PRODUITS</Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className="row mx-0 list-item-second-header">
                            <div className="col-sm-12 col-12">
                                <h6 className="m-0 font-weight-bold">
                                    <div className="img-cart-add-tag position-relative float-left mr-1">
                                        <img src={Images.container_small_black_icon} alt="ware-house-icon"
                                             className="img-fluid mr-1"/>
                                        {/*to show cart is not empty*/}
                                        {/*<span className="position-absolute tag-cart-notification"> </span>*/}
                                    </div>
                                    Container A
                                    <small> 10 Article(s) ajouté(s)</small>
                                </h6>
                            </div>
                        </div>
                        <div className="row mx-0 list-item-card-row">
                            <SingleItemCard/>
                        </div>
                    </div>
                    <div className="drawer-footer w-100 position-absolute text-right bg-white px-3 py-2 border-top">
                        <Button onClick={this.props.onClose} type="primary">
                            VALIDER
                        </Button>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default ContainerSingleItem;
