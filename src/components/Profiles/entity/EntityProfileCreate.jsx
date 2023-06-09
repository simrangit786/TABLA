import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {methods} from "../../../controller/Global";
import {Spin} from "antd";
import {EntityProfileForm} from "./EntityProfileForm";
import EntityProfileSidebar from "../../sidebar/profile/EntityProfileSidebar";
import {getOneWorkOrderEntity} from "../../../controller/API/salesOperationAPI";

class EntityProfileCreate extends Component {
    state = {
        current: 0,
        entity: null,
    };

    componentDidMount() {
        const {params} = this.props.match;
        if (params.method === methods.edit) {
            this.fetch(params.id)
        }
    }

    fetch = (id) => {
        return getOneWorkOrderEntity(id).then(response => {
            this.setState({
                entity: response,
            })
        })
    };

    render() {
        const {t} = this.props;
        const {entity, current} = this.state;

        const steps = [
            {
                title: t('entity'),
                content: <EntityProfileForm entity={entity}/>,
            },
        ];
        return (
            <React.Fragment>
                <EntityProfileSidebar {...this.props} current={current} steps={steps}/>
                <div className="steps-right-side-div dashboard-inner-second bg-white float-right">
                    {this.props.match.params.method === methods.create ?
                        <div className="steps-content">{steps[current].content}</div>
                        :
                        this.props.match.params.method === methods.edit && entity ?
                            <div className="steps-content">{steps[current].content}</div>
                            :
                            <div className={'text-center mt-5 p-0'}><Spin/></div>}
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(EntityProfileCreate));
