import React, { Component } from 'react';
import { Spin, Tabs } from "antd";
import { withTranslation } from "react-i18next";
import { componentGetOne } from '../../../../controller/API/itemApi';
import ItemSidebar from '../../../sidebar/warehouse/ItemSidebar';
import SummaryInformation from '../../all-items/SummaryInformation';
import ComponentSidebar from '../sidebar/ComponentSidebar';
import ComponentSummaryInformation from '../ComponentSummaryInformation';

const { TabPane } = Tabs;

class ViewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            loading: true,
            params: props.match.params,
        }
    }

    componentDidMount() {
        const { params } = this.state;
        this.fetch(params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id)
            this.fetch(this.props.match.params.id)
    }

    fetch(id) {
        componentGetOne(id)
            .then(item => {
                this.setState({ item, loading: false })
            })
    }

    render() {
        const { loading, item, params } = this.state;
        const { t } = this.props;
        if (loading) {
            return <div className={'mt-5 p-0 text-center d-flex align-items-center justify-content-center w-100'}>
                <Spin />
            </div>
        }
        return (
            <React.Fragment>
                <ComponentSidebar fetch={() => this.fetch(params.id)}  {...this.props} loading={loading} item={item} />
                <div className="steps-right-side-div dashboard-inner-second view-item-div bg-white float-right">
                    <div className="row mx-0 profile-summary-details-row ">
                        <div className="col-12 px-0">
                            <Tabs type="card">
                                <TabPane tab={t('summary')} key="1">
                                    <ComponentSummaryInformation component={item} fetch={() => this.fetch(params.id)} />
                                </TabPane>
                                {/*<TabPane tab={t('history')} key="2">*/}
                                {/*  <History/>*/}
                                {/*</TabPane>*/}
                            </Tabs>
                            <h5
                                className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">ARTICLE {item.sku}</h5>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default (withTranslation('common')(ViewItem));
