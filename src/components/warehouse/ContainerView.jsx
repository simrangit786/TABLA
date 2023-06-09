import React, {Component} from 'react';
import {Spin, Tabs} from "antd";
import {withTranslation} from "react-i18next";
import ContainerSidebar from "../sidebar/warehouse/ContainerSidebar";
import InformationSummary from "./container/InformationSummary";
import {containerGetOne} from "../../controller/API/itemApi";

const {TabPane} = Tabs;

class ContainerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            container: null,
            loading: false
        }
    }


    componentDidMount() {
        this.fetch(this.props.match.params.id);
    }

    fetch = (id) => {
        containerGetOne(id)
            .then(container => {
                this.setState({container, loading: false})
            })
    };


    render() {
        const {t} = this.props;
        const {container, loading} = this.state;
        if (loading) {
            return <div className={'mt-5 p-0 text-center d-flex align-items-center justify-content-center h-100'}>
                <Spin/></div>
        }
        return (
            <React.Fragment>
                <ContainerSidebar {...this.props} fetch={() => this.fetch(this.props.match.params.id)}/>
                <div className="profile-summary-details-row">
                    <div className="col-12 p-0">
                        <Tabs type="card">
                            <TabPane tab={t('summary')} key="1">
                                {container && <InformationSummary container={container}/>}
                            </TabPane>
                        </Tabs>
                        {container &&
                        <h5 className="header-tab-heading header-tab-heading-second position-fixed text-uppercase font-weight-bold mb-0">
                            {container.name}</h5>}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(ContainerView));
