import React, {Component} from 'react';
import {InformationDistributors} from "./DistributorInformationForm";
import WorkOrderSideBar from "../../sidebar/workorder/WorkOrderSideBar";
import SelectItemLocation from "./SelectItemLocation";
import {withTranslation} from "react-i18next";
import {AddedItemByGroup} from "./added-item-group/AddedItemByGroup";
import StepInfo from "./last-step-info/StepInfo";
import {methods} from "../../../controller/Global";
import {distributorWorkorderGetOne} from "../../../controller/API/salesOperationAPI";
import {Spin} from "antd";
import {AddItems} from "./AddItems";
import {DiscountItemByGroup} from "./disocuntItem/AddedItemByGroup";

class DistributorWorkOrderCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            work_order: null,
            locations_selected: false,
        };
    }


    componentDidMount() {
        const {params} = this.props.match;
        if (params.method === methods.edit)
            this.fetch(params.id)
    }

    fetch = (id) => {
        return distributorWorkorderGetOne(id)
            .then(work_order => {
                this.setState({work_order})
            })
    };

    setWorkorder = (work_order) => {
        this.fetch(work_order.id)
            .then(() => this.next());
    };

    locations_selected = () => {
        this.setState({locations_selected: true}, () => this.next())
    };

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    render() {
        const {t} = this.props;
        const steps = [
            {
                title: t('account_info'),
                content: <InformationDistributors work_order={this.state.work_order}
                                                  method={this.props.match.params.method}
                                                  onNext={(data) => this.setWorkorder(data)}/>,
            },
            {
                title: t('choose_address'),
                content: <SelectItemLocation locations_selected={this.state.locations_selected}
                                             method={this.props.match.params.method}
                                             work_order={this.state.work_order}
                                             next={(data) => this.setWorkorder(data)}
                                             prev={() => this.prev()}/>,
            }, {
                title: t('add_article'),
                content: <AddItems onNext={() => this.next()} onPrev={() => this.prev()}
                                   workorder={this.state.work_order}
                                   all_locations={this.state.locations_selected}/>,
            },
            {
                title: t('delivery_details'),
                content: <AddedItemByGroup work_order={this.state.work_order} next={() => this.next()}
                                           prev={() => this.prev()}/>,
            }, {
                title: t('Appliquer coupon'),
                content: <DiscountItemByGroup work_order={this.state.work_order} next={() => this.next()}
                                              prev={() => this.prev()}/>,
            },
            {
                title: t('order_summary'),
                content: <StepInfo work_order={this.state.work_order} prev={() => this.prev()}/>,
            },
        ];
        const {current, work_order} = this.state;
        const {params} = this.props.match;
        return (
            <div className="row clearfix all-common-steps-row mx-0 h-100">
                <div className="col-12 px-0">
                    <WorkOrderSideBar {...this.props} current={current} steps={steps} data={work_order}/>
                    <div className="steps-right-side-div bg-white distributor_steps-inner float-right">
                        {this.props.match.params.method === methods.create ? <div
                            className="steps-content">{steps[current].content}</div> : params.method === methods.edit && work_order ?
                            <div className="steps-content">{steps[current].content}</div> :
                            <div className={'text-center mt-5 p-0'}><Spin/></div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(DistributorWorkOrderCreate));
