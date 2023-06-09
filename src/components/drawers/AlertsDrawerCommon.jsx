import React, {Component} from "react";
import {Button, Drawer, Spin} from "antd";
import {Image as Images} from "../Images";
import {getNotifications} from "../../controller/API/salesOperationAPI";
import Moment from "react-moment";
import {history} from "../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../controller/routes";
import {methods, profiles} from "../../controller/Global";

class AlertsDrawerCommon extends Component {
    state = {
        next: "",
        notifications: [],
        page: 1,
        loading: true,
    };

    componentDidMount() {
        this.handleNotifications();
    }

    handleNotifications() {
        getNotifications({page: this.state.page}).then((response) => {
            this.setState((prevState) => {
                return {
                    notifications: [...prevState.notifications, ...response.data.results],
                    next: response.data.next,
                };
            });
            this.setState({loading: false});
        });
    }

    handleButton = () => {
        this.setState({page: this.state.page + 1}, () => {
            this.handleNotifications();
        });
    };

    render() {
        return (
            <React.Fragment>
                <Drawer
                    title={"ALERTES"}
                    placement="right"
                    closable={false}
                    maskClosable={false}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                    getContainer={false}
                    width="520px"
                    destroyOnClose={true}
                    className="steps-drawer-div create-article-drawer"
                >
                    {this.state.loading ? (
                        <Spin className="spin-loading"/>
                    ) : (
                        <>
                            <div className="row mx-0">
                                <Button
                                    onClick={this.props.onClose}
                                    className="close-header-icon w-auto px-3 flex-align-center-center position-absolute border-0"
                                >
                                    <img
                                        src={Images.close_icon}
                                        alt="close icon"
                                        className="img-fluid"
                                    />
                                    <div>{"FERMER"}</div>
                                </Button>
                                <div className="col-12 p-0">
                                    {this.state.notifications.map((i) => {
                                        return (
                                            <>
                                                <div className="row mx-0 alerts-row-main">
                                                    <div className="col-2">
                                                        <div className="notification-bell-card mx-auto">
                                                            <img
                                                                src={Images.bell_icon_white}
                                                                alt={""}
                                                                className={"img-fluid"}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-10">
                                                        <h5 className="text-uppercase">
                                                            Nouveaux bons de Commande générés POUR CE
                                                            DISTRIBUTEUR : {i.name}
                                                        </h5>
                                                        <div className="row alerts-inner-row">
                                                            <div className="col-12">
                                                                <ul className="list-inline">
                                                                    <>
                                                                        {i.workorders.map((item) => (
                                                                            <li>
                                                                                <div className="row">
                                                                                    <div className="col-2">{item}</div>
                                                                                    <div className="col-8">
                                                                                        <Button
                                                                                            className="col-8-workorder"
                                                                                            onClick={() =>
                                                                                                history.push(
                                                                                                    reverse(
                                                                                                        routes.dashboard.sales
                                                                                                            .work_order.method,
                                                                                                        {
                                                                                                            method: methods.view,
                                                                                                            type:
                                                                                                            profiles.distributor,
                                                                                                            id: item,
                                                                                                        }
                                                                                                    )
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            VOIR Ce bon de commande
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <Moment format="DD/MM/YYYY">
                                                            <p className="mb-0">{i.created}</p>
                                                        </Moment>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                            {this.state.next && (
                                <button
                                    className="load-more-btn"
                                    onClick={() => {
                                        this.handleButton();
                                    }}
                                >
                                    Load more
                                </button>
                            )}
                        </>
                    )}
                </Drawer>
            </React.Fragment>
        );
    }
}

export default AlertsDrawerCommon;
