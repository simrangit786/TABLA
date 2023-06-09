import React, {Component} from 'react';
import {Spin, Tabs} from "antd";
import {withTranslation} from "react-i18next";
import {getOneWorkOrderEntity} from "../../../controller/API/salesOperationAPI";
import EntityProfileSidebar from "../../sidebar/profile/EntityProfileSidebar";

const {TabPane} = Tabs;

class EntityProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entity: null,
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
        getOneWorkOrderEntity(id)
            .then(response => {
                this.setState({entity: response, loading: false})
            })
    };

    render() {
        const {entity, loading} = this.state;
        const {t} = this.props;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }

        return (
            <React.Fragment>
                <EntityProfileSidebar entity={entity} {...this.props}
                                      fetch={() => this.fetch(this.props.match.params.id)}/>
                <div className="profile-summary-details-row">
                    <div className="col-12 p-0">
                        <Tabs type="card" destroyInactiveTabPane>
                            <TabPane tab={t('summary')} key="1">
                                <div className="row summary-info-row mx-0">
                                    <div className="col-12 px-0">
                                        <h6 className="text-uppercase font-weight-bold mb-4">{t('entity')} </h6>
                                    </div>
                                    <div className="col-12 px-0">
                                        <div className="card border-0 position-relative mb-4">
                                            <div className="card-body">
                                                <div className="row mx-0">
                                                    <div className="col-md-6 col-sm-6 col-12 col-lg-4">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('name')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{entity.name}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('legal_form')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{entity.legal_form}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('RCS')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{entity.rcs}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{t('Siret')} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{entity.siret}</li>
                                                        </ul>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item label-text-li">{'N/Id Cee'} :
                                                            </li>
                                                            <li className="list-inline-item label-name-li">{entity.nidcee}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                        <h5 className="header-tab-heading position-fixed text-uppercase font-weight-bold mb-0">{entity.name}</h5>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(EntityProfileView));
