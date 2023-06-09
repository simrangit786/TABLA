import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProfileDashboard from "./Profiles/ProfileDashboard";
import Header from "./Header";
import SideBar from "./SideBar";
import WareHouse from "./warehouse/wareHouse";
import ViewWorkOrders from "./work-order/ViewWorkOrders";
import { routes } from "../controller/routes";
import WareHouseItem from "./warehouse/wareHouseItem";
import DistributorProfileMethod from "./Profiles/distributors/DistributorProfileMethod";
import InventoryManagement from "./warehouse/InventoryManagement";
import WorkOrderMethod from "./work-order/WorkOrderMethod";
import ToggleSidebar from "./ToggleSidebar";
import ContainerMethod from "./warehouse/ContainerMethod";
import ContainerList from "./warehouse/ContainerList";
import WorkOrderDashboard from "./work-order/WorkOrderDashboard";
import { Role } from "../utils";
import DistributorProfileList from "./Profiles/distributors/DistributorProfileList";
import GroupProfileList from "./Profiles/group/GroupProfileList";
import GroupProfileMethod from "./Profiles/group/GroupProfileMethod";
import RepresentativeProfileMethod from "./Profiles/SalesRepresentative/RepresentativeProfileMethod";
import RepresentativeProfileList from "./Profiles/SalesRepresentative/RepresentativeProfileList";
import EntityProfileMethod from "./Profiles/entity/EntityProfileMethod";
import EntityProfileList from "./Profiles/entity/EntityProfileList";
import SalesPersonAnalytics from "./SalesPersonAnalytics";
import SalesPersonProfileView from "./SalesPersonProfileView";
import WorkorderInvoice from "./work-order/WorkorderInvoice";
import SalesWorkOrderAnalytics from "./Profiles/SalesRepresentative/analytique/SalesWorkOrderAnalytics";
import TarifaireGroupList from './Profiles/group/TarifaireGroupList';
import TarifaireGroupMethod from './Profiles/group/TarifaireGroupMethod';
import TarifsGroupList from './Profiles/group/TarifsGroupList';
import TarifsGroupMethod from './Profiles/group/TarifsGroupMethod';
import ComponentList from './warehouse/component/ComponentList';
import ComponentItem from './warehouse/component/ComponentItem';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        };

    }

    handleToggle = () => {
        this.setState({
            toggle: !this.state.toggle,
        })
    };

    handleToggleBody = (e) => {
        const { toggle } = this.state;
        if (e.target.id === "toggle_btn" || e.path[1].id === "toggle_btn") {
            e.stopPropagation();
            this.setState({ toggle: !this.state.toggle })
        } else {
            toggle && this.setState({ toggle: false })
        }
    };

    componentDidMount() {
        document.body.addEventListener('click', this.handleToggleBody);
    }

    render() {
        const { toggle } = this.state;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <SideBar />
                <div><ToggleSidebar toggle={toggle} switch={() => this.handleToggle()} /></div>
                <Switch>
                    <React.Fragment>
                        <Route exact path={routes.dashboard.self} component={Dashboard} />
                        <Role allow={["admin"]}>
                            <Route exact path={routes.dashboard.profiles.self} component={ProfileDashboard} />
                            <Route exact path={routes.dashboard.profiles.distributor.self}
                                component={DistributorProfileList} />
                            <Route exact path={routes.dashboard.profiles.distributor.method}
                                component={DistributorProfileMethod} />
                            <Route exact path={routes.dashboard.profiles.groups.self} component={GroupProfileList} />
                            <Route exact path={routes.dashboard.profiles.groups.method} component={GroupProfileMethod} />
                            <Route exact path={routes.dashboard.profiles.representative.self}
                                component={RepresentativeProfileList} />
                            <Route exact path={routes.dashboard.profiles.representative.method}
                                component={RepresentativeProfileMethod} />
                            {/*<Route exact path={'/dashboard/profiles/suppliers/view/coupon-summary/'} component={CouponSummary}/>*/}
                            <Route exact path={routes.dashboard.warehouse.container.self} component={ContainerList} />
                            <Route exact path={routes.dashboard.warehouse.container.method}
                                component={ContainerMethod} />
                            <Route exact path={routes.dashboard.sales.self} component={WorkOrderDashboard} />
                            <Route exact path={routes.dashboard.sales.work_order.self} component={ViewWorkOrders} />
                            <Route exact path={routes.dashboard.sales.work_order.method} component={WorkOrderMethod} />
                            <Route exact path={routes.dashboard.sales.invoice} component={WorkorderInvoice} />
                            <Route exact path={routes.dashboard.profiles.entity.method}
                                component={EntityProfileMethod} />
                            <Route exact path={routes.dashboard.profiles.entity.self} component={EntityProfileList} />
                            <Route exact path={routes.dashboard.profiles.tarifaire.self} component={TarifaireGroupList} />
                            <Route exact path={routes.dashboard.profiles.tarifaire.method} component={TarifaireGroupMethod} />
                            <Route exact path={routes.dashboard.profiles.tarifs.self} component={TarifsGroupList} />
                        <Route exact path={routes.dashboard.profiles.tarifs.method} component={TarifsGroupMethod} />
                            <Route exact path={routes.dashboard.sales_workorder_analytics}
                                component={SalesWorkOrderAnalytics} />
                        </Role>
                        <Role allow={["sales_person"]}>
                            <Route exact path={routes.dashboard.distributor.self} component={DistributorProfileList} />
                            <Route exact path={routes.dashboard.distributor.view} component={SalesPersonProfileView} />
                        </Role>
                        <Route exact path={routes.dashboard.sales_analytics} component={SalesPersonAnalytics}/>
                        <Route exact path={routes.dashboard.warehouse.self} component={WareHouse}/>
                        <Route exact path={routes.dashboard.warehouse.inventory} component={InventoryManagement}/>
                        <Route exact path={routes.dashboard.warehouse.item} component={WareHouseItem}/>
                        <Route exact path={routes.dashboard.warehouse.component} component={ComponentList}/>
                        <Route exact path={routes.dashboard.warehouse.componentItem} component={ComponentItem}/>
                    </React.Fragment>
                </Switch>
            </React.Fragment>
        );
    }
}


export default Main;


//ViewWorkOrders
