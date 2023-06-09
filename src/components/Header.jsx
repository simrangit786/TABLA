import React, {Component} from 'react';
import {Button, Dropdown, Input, Menu, Select} from "antd";
import {Link} from "react-router-dom";
import {Image as Images} from "./Images";
import WorkOrderType from "./modal/WorkOrderType";
import ProfileType from "./modal/ProfileType";
import TarificationType from "./modal/TarificationType";
import {profileGetOne} from "../controller/API/profileApi";
import {routes} from "../controller/routes";
import {methods, profiles} from "../controller/Global";
import {withTranslation} from 'react-i18next';
import i18n from "../i18n";
import {getLanguage, setLanguage} from "../controller/AuthService";
import ArticleMain from "./drawers/ArticleMain";
import {reverse} from "named-urls";
import {history} from "../controller/history";
import {globalSearchGet} from "../controller/API/itemApi";
import {isAccessible, Role} from "../utils";
import AlertsDrawerCommon from "./drawers/AlertsDrawerCommon"
import {BellOutlined} from "@ant-design/icons";

const {Option} = Select;

class Header extends Component {
    constructor(props) {
        super(props);
        this.list = [];
        this.state = {
            showWorkType: false,
            showProfileType: false,
            showTarificationType: false,
            articleVisible: false,
            profile: null,
            searchData: [],
            cursor: -1,
            visible: false
        };
        this.searchInputRef = React.createRef()
    }

    showAlertD = (visible) => {
        this.setState({
            visible: visible
        })
        this.handleNotificationProfile()
    }

    handleNotificationProfile = () => {
        this.fetchProfile()
    }

    componentDidMount() {
        i18n.changeLanguage(getLanguage());
        this.fetchProfile()
    }


    fetchProfile = () => {
        profileGetOne().then((response) => {
            this.setState({profile: response.data})
        })
    }

    changeLang = (language) => {
        i18n.changeLanguage(language);
        setLanguage(language);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({
                showWorkType: false,
                showProfileType: false,
                showTarificationType: false,
                showArticle: false,
                lng: ""
            })
        }
    }

    searchResult = (q) => {
        if (q.target.value.length >= 3) {
            globalSearchGet({"q": q.target.value})
                .then(response => {
                    this.setState({searchData: response.data.data})
                })
        }
    };
    onKeyPress = e => {
        let {cursor, searchData} = this.state;
        if (e.key === 'ArrowUp') {

            //up
            e.preventDefault();
            if (cursor > 0) {
                cursor -= 1;
                this.setState({
                    cursor
                })
            } else {
                cursor = searchData.length - 1;
                this.setState({cursor})
            }
            this.list[cursor].focus()
        } else if (e.key === 'ArrowDown') {

            //down
            e.preventDefault();
            if (cursor < searchData.length - 1) {
                cursor += 1;
                this.setState({
                    cursor
                });
            } else {
                cursor = 0;
                this.setState({cursor})
            }
            this.list[cursor].focus()
        } else if (e.keyCode === 13) {

            this.list[cursor].click();
            this.setState({cursor: -1, searchData: []});
            this.searchInputRef.current.setValue("")
        }
    };

    workOrderTypeVisible = (visible) => {
        this.setState({showWorkType: visible})
    };
    workProfileTypeVisible = (visible) => {
        this.setState({showProfileType: visible})
    };
    workTarificationTypeVisible = (visible) => {
        this.setState({showTarificationType: visible})
    };
    handleAddItem = (visible) => {
        this.setState({articleVisible: visible})
    };
    menu = () => {
        const {t} = this.props;
        return (
            <Menu>
                <Menu.Item>
                    <Button onClick={() => this.workProfileTypeVisible(true)}
                            className="font-weight-normal text-left text-capitalize bg-transparent border-0 w-100 px-3 py-2">
                        {t('nav.profile')}
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button
                        className="font-weight-normal px-3 py-2 bg-transparent border-0  w-100 text-left"
                        onClick={() => this.workOrderTypeVisible(true)}>
                        {t('purchase_order')}
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={() => history.push(reverse(routes.dashboard.warehouse.container.method,
                        {method: methods.create}))}
                            className="font-weight-normal text-capitalize text-left px-3 py-2 bg-transparent border-0 w-100">
                        {t('container_head')}
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={() => this.handleAddItem(true)}
                            className="font-weight-normal text-left text-capitalize bg-transparent border-0 w-100 px-3 py-2">
                        {t('article_head')}
                    </Button>
                </Menu.Item>

            </Menu>
        );
    };


    render() {
        const {profile, showWorkType, showProfileType, showTarificationType, articleVisible, searchData} = this.state;
        const {t} = this.props;
        return (
            <nav className="navbar navbar-fixed-top bg-white py-0 px-4 ">
                <div className="row mx-0 w-100">
                    <div className="navbar-right w-100 flex-align-center-between">
                        <div className="logo-div text-center h-100 flex-align-center">
                            <div className=" position-relative">
                                <Link to={"/dashboard/"}
                                      className="logo-img d-inline-block">
                                    <img src={Images.logo_white_trans} alt="tabla logo" className="img-fluid logo"/>
                                </Link>
                            </div>
                        </div>
                        <div className="header-search">
                            <form className="search-form position-relative p-0">
                                <div className="search-bar w-100 float-left">
                                    <Input ref={this.searchInputRef} onKeyDown={this.onKeyPress}
                                           disabled={isAccessible(['admin'], true)}
                                           className="form-control m-0 w-100 border-0 bg-white"
                                           placeholder={t('search')}
                                           onChange={isAccessible(['admin']) ? this.searchResult : ''}
                                           type="text"/>
                                    <ul className="searching-list">
                                        {searchData.map((item, index) => {
                                            let icon, first_label, second_label, third_label, link;
                                            if (item.model === "warehouse.variant") {
                                                icon = Images.new_warehouse_sidebar;
                                                first_label = t('inventory_mgmt');
                                                second_label = t('inventory');
                                                third_label = item.fields.sku;
                                                link = reverse(routes.dashboard.warehouse.item, {
                                                    method: methods.view,
                                                    id: item.pk
                                                })
                                            } else if (item.model === "profile.distributorprofile") {
                                                icon = Images.new_profile_sidebar;
                                                first_label = t('all_profiles');
                                                second_label = t('profile_distributor');
                                                third_label = item.fields.client_name;
                                                link = reverse(routes.dashboard.profiles.distributor.method, {
                                                    method: methods.view,
                                                    id: item.pk
                                                })
                                            } else if (item.model === "sales_operation.distributorworkorder") {
                                                icon = Images.new_workorder_sidebar;
                                                first_label = t('dash.sales_ops');
                                                second_label = t('btn_work_order');
                                                third_label = item.pk;
                                                link = reverse(routes.dashboard.sales.work_order.method, {
                                                    method: methods.view,
                                                    type: profiles.distributor,
                                                    id: item.pk
                                                })
                                            } else if (item.model === "warehouse.container") {
                                                icon = Images.new_warehouse_sidebar;
                                                first_label = t('inventory_mgmt');
                                                second_label = t('pending_containers');
                                                third_label = item.fields.name;
                                                link = reverse(routes.dashboard.warehouse.container.method, {
                                                    method: methods.view,
                                                    id: item.pk
                                                })
                                            }
                                            return <li
                                                key={index}>
                                                <Link onKeyDown={this.onKeyPress}
                                                      ref={ref => (this.list[index] = ref)} to={link}> <img
                                                    className="img-fluid" src={icon}
                                                    alt="profile"/> {third_label}
                                                    <div className="search-address">
                                                        <span className='search-text-label'>{first_label}</span><span
                                                        className='search-text-label'>{second_label}</span><span
                                                        className='search-text-label'>{third_label}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                                <button
                                    className="btn btn-search p-0 position-absolute border-0 bg-transparent float-right rounded-circle collapsed btn-toggle-effect"
                                    type="button"
                                    aria-expanded="false" aria-controls="expend_bar">
                                    <img className="img-fluid" src={Images.search_icon} alt="search icon"/>
                                </button>
                            </form>
                        </div>
                        <div className="header-buttons">
                            <div className="justify-content-end flex-align-center">
                                <Role allow={["admin"]}>
                                    <Button onClick={() => this.showAlertD(true)} className={this.state.profile
                                        ?.notification
                                        ? "mr-3 notification-bell-btn notify-btn"
                                        : "mr-3 notification-bell-btn"}>
                                        <BellOutlined/>
                                        {this.state.profile?.notification > 0 ?
                                            <span
                                                className="notification-num-span">{this.state.profile?.notification}</span> : ""
                                        }
                                    </Button>
                                </Role>
                                <Role allow={["admin"]}><Dropdown trigger={['click']} overlayClassName="create-div-btn"
                                                                  overlay={this.menu}
                                                                  placement="bottomCenter">
                                    <Button
                                        className="plus-btng ant-btn-primary px-4 border-0 mr-3 ml-0 my-0 text-white">
                                        <img src={Images.plus_icon_white} alt="plus icon"/> {t('dash.create')}</Button>
                                </Dropdown></Role>
                                <Select showAction={["focus", "click"]} className="language-drop bg-transparent mr-3"
                                        dropdownClassName="language-dropdown"
                                        defaultValue={getLanguage() || "fr"}
                                        onChange={(value) => this.changeLang(value)}>
                                    <Option value={"fr"} key="1">{t('french')}</Option>
                                    <Option value={"en"} key="2">{t('english')}</Option>
                                </Select>
                                {/*<div*/}
                                {/*    className="plus-icon flex-align-center rounded-circle float-right ml-3 text-center d-flex h-100">*/}
                                {/*    <a href="#" className="header-plus mr-2 position-relative">*/}
                                {/*        <img className="header-icon-img" src={Images.chat_icon} alt="iconChat"/>*/}
                                {/*    </a>*/}
                                {/*    <a href="#" className="header-plus mr-2 position-relative">*/}
                                {/*        <img className="header-icon-img" src={Images.saved_icon}*/}
                                {/*             alt="iconBookmark"/>*/}
                                {/*    </a>*/}
                                {/*    <a href="#" className="header-plus mr-2 notification position-relative">*/}
                                {/*        <img className="header-icon-img" src={Images.alert_icon}*/}
                                {/*             alt="iconNotification"/>*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                                <div id="navbar-menu" className="border-0 ml-4">
                                    <div className="user-account m-0 position-relative float-left w-100">
                                        <div className="dropdown mt-0 text-left">
                                            <a href="#" className="dropdown-toggle user-name" data-toggle="dropdown">
                                                <div className="icon_div">
                                                    <div
                                                        className="user_icon rounded-circle text-center p-0 text-uppercase position-relative flex-align-center-center font-weight-bold text-white">{(profile && profile.first_name.charAt(0).toUpperCase()) + (profile && profile.last_name.charAt(0).toUpperCase())}
                                                    </div>
                                                </div>
                                            </a>
                                            <ul className="dropdown-menu p-0 bg-white border-0 dropdown-menu-right account">
                                                <li>
                                                    <div className="user-account-inner d-inline-block w-100">
                            <span className="float-left">
                                <div className="icon_div w-100">
                                    <div
                                        className="user_icon rounded-circle text-center p-0 text-uppercase position-relative flex-align-center-center font-weight-bold text-white">{(profile && profile.first_name.charAt(0).toUpperCase()) + (profile && profile.last_name.charAt(0).toUpperCase())} </div>
                                </div>
                            </span>
                                                        <a href="#"
                                                           className="dropdown-toggle position-relative float-left d-inline-block text-white bg-transparent user-name"
                                                           data-toggle="dropdown">
                              <span
                                  className="w-100 float-left d-inline-block overflowhidden text-capitalize font-weight-bold ">{profile && (profile.first_name + " " + profile.last_name)} </span>
                                                            <span
                                                                className="w-100 float-left d-inline-block overflowhidden">{profile && profile.email}</span>
                                                        </a>
                                                    </div>
                                                </li>
                                                {/*<li>*/}
                                                {/*    <a href="#">{t('dash.create')}</a>*/}
                                                {/*</li>*/}
                                                <li>
                                                    <a href="">{t('setting')}</a>
                                                </li>
                                                <li className="divider m-0">
                                                    <Link to={routes.logout}>
                                                        <i className="icon-power"/>
                                                        {t('logout')}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.visible &&
                <AlertsDrawerCommon visible={this.state.visible} onClose={() => {
                    this.showAlertD(false);
                }}/>
                }
                {showWorkType &&
                <WorkOrderType visible={showWorkType} onClose={() => this.workOrderTypeVisible(false)}/>}
                {showProfileType && <ProfileType match={this.props.match} visible={showProfileType}
                                                 onClose={() => this.workProfileTypeVisible(false)}/>}
                {showTarificationType && <TarificationType visible={showTarificationType}
                                                           onClose={() => this.workTarificationTypeVisible(false)}/>}
                {articleVisible && <ArticleMain method={methods.create} visible={articleVisible}
                                                onClose={() => this.handleAddItem(false)}/>}
            </nav>
        );
    }
}

export default (withTranslation('common')(Header));
