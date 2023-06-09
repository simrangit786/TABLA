import React, {Component} from 'react';
import {Button} from "antd";
import {withTranslation} from "react-i18next";
import ConfirmPopup from "../../modal/ConfirmPopup";
import {history} from "../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../controller/routes";
import {methods} from "../../../controller/Global";
import {Image as Images} from "../../Images";
import {containerItemRemove} from "../../../controller/API/itemApi";
import ContainerItemSingle from "./ContainerItemSingle";

const moment = require('moment');

class ContainerSummary extends Component {

    state = {
        confirmVisible: false,
    };
    handleConfirmPopup = (confirmVisible) => {
        this.setState({confirmVisible})
    };

    deleteItem = (id) => {
        containerItemRemove(id)
            .then(() => this.props.fetch())
    };


    render() {
        const items = this.props.container.container_item;
        const {container, t, match} = this.props;
        const {confirmVisible} = this.state;
        return (
            <div className="row mx-0 container-items-row-div">
                <div className="row add-items-div-row container-items-row p-0 mx-0 w-100">
                    <div className="inner-details-row-item w-100">
                        <div className="col-12 pl-0 h-100">
                            <React.Fragment>
                                <div className="row mx-0 container-items-row-div">
                                    <div className="col-lg-3 col-md-3 col-sm-12 col-12 container-left-div">
                                        <div className="row mx-0 container-card-row-left">
                                            <div className="col-12">
                                                <h6 className="font-weight-bold">{container.name}</h6>
                                            </div>
                                            <div className="col-12 text-center container-img">
                                                <img src={Images.container_small_icon} alt="small icon container"
                                                     className="img-fluid"/>
                                            </div>
                                            <div
                                                className="col-12 col-sm-12 col-md-6 d-flex align-items-end  pr-0">
                                                <p className="mb-0 font-weight-normal">Date de livraison :</p>
                                            </div>
                                            <div
                                                className="col-12 col-sm-12 col-md-6 d-flex align-items-end justify-content-end text-right pl-0">
                        <span
                            className="font-weight-normal">{moment(container.date).format("DD-MM-YYYY")}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-lg-9 col-md-9 col-sm-12 col-12 container-right-div container-right-padding">
                                        <div className="row mx-0 container-small-heading">
                                            <h5>Inventaire en attente</h5>
                                        </div>
                                        {
                                            items.map((item, index) =>
                                                <ContainerItemSingle fetch={this.props.fetch} item={item}
                                                                     deleteItem={(id) => this.deleteItem(id)}
                                                                     key={`view_container_${index}`}/>
                                            )
                                        }
                                    </div>
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
                <div className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    <div>
                        <Button style={{marginLeft: 8}} onClick={this.props.onPrev}
                                className="font-weight-bold text-center text-uppercase mr-3">
                            {t('return')}
                        </Button>
                        <Button type="primary" onClick={() => this.handleConfirmPopup(true)}
                                className="font-weight-bold text-center text-white text-uppercase">
                            {match.params.method === methods.edit ? t('update_container') : t('create_container')}
                        </Button>
                    </div>
                </div>
                {confirmVisible && (match.params.method === methods.edit ?
                        <ConfirmPopup
                            remove_left_btn={true}
                            onOk={() => {
                                this.handleConfirmPopup(false);
                                history.push(reverse(routes.dashboard.warehouse.container.method, {
                                    method: methods.view,
                                    id: match.params.id
                                }));

                            }}
                            width="50%"
                            image={Images.check_icon}
                            okText={'VOIR CONTENEUR'}
                            cancelText={"OK"}
                            title={"CONFIRMATION DE MISE À JOUR DU CONTENEUR"}
                            description={"Le conteneur a été mis à jour !"}
                            small_description={"Le conteneur a été mis à jour. Pour voir les détails, mettre à jour ou modifier, sélectionner ‘Voir conteneur’."}
                        />
                        :
                        <ConfirmPopup
                            width="50%"
                            image={Images.check_icon}
                            onOk={() => {
                                this.handleConfirmPopup(false);
                                history.push(reverse(routes.dashboard.warehouse.container.method,
                                    {
                                        method: methods.view,
                                        id: container.id
                                    }));
                            }}
                            // onCancel={() => this.handleConfirmPopup(false)}
                            onCancel={() => history.goBack()}
                            okText={'VOIR CONTENEUR'}
                            cancelText={"OK"}
                            title={"CONFIRMATION DE CRÉATION DU CONTENEUR"}
                            description={"Conteneur créé !"}
                            small_description={"Conteneur a été créé. Pour voir les détails, mettre à jour ou modifier, sélectionner ‘Voir conteneur’."}
                        />
                )}
            </div>
        );
    }
}

export default (withTranslation('common')(ContainerSummary));
