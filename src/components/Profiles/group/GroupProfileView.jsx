import React, {Component} from 'react';
import {Spin, Tabs} from "antd";
import {withTranslation} from "react-i18next";
import {groupGetOne} from "../../../controller/API/profileApi";
import GroupProfileSidebar from "../../sidebar/profile/GroupProfileSidebar";

const {TabPane} = Tabs;

class GroupProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            loading: true
        }
    }

    componentDidMount() {
        this.fetch(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id)
            this.fetch(this.props.match.params.id)
    }

    fetch = (id) => {
        groupGetOne(id)
            .then(response => {
                this.setState({group: response, loading: false})
            })
    };

    render() {
        const {group, loading} = this.state;
        const {t} = this.props;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }

        return (
            <React.Fragment>
                <GroupProfileSidebar group={group} {...this.props}
                                     fetch={() => this.fetch(this.props.match.params.id)}/>
                <div className="profile-summary-details-row">
                    <div className="col-12 p-0">
                        <Tabs type="card" destroyInactiveTabPane>
                            <TabPane tab={t('summary')} key="1">
                                <div className="row summary-info-row mx-0">
                                    <div className="col-12 px-0">
                                        <h6 className="text-uppercase font-weight-bold mb-4">{t('group_info')} </h6>
                                    </div>
                                    <div className="col-12 px-0">
                                        <div className="card border-0 position-relative mb-4">
                                            <div className="card-body">
                                                <div className="row mx-0">
                                                    <div className="col-md-6 col-sm-6 col-12 col-lg-4">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('group_name')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{group.title}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                        <h5 className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">{group.title}</h5>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(GroupProfileView));
