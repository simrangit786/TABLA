import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {methods} from "../../../controller/Global";
import {groupGetOne} from "../../../controller/API/profileApi";
import {Spin} from "antd";
import GroupProfileSidebar from "../../sidebar/profile/GroupProfileSidebar";
import {GroupProfileForm} from "./GroupProfileForm";

class GroupProfileCreate extends Component {
    state = {
        current: 0,
        group: null,
    };

    componentDidMount() {
        const {params} = this.props.match;
        if (params.method === methods.edit) {
            this.fetch(params.id)
        }
    }

    fetch = (id) => {
        return groupGetOne(id).then(response => {
            this.setState({
                group: response,
            })
        })
    };

    render() {
        const {t} = this.props;
        const {group, current} = this.state;

        const steps = [
            {
                title: t('group_information'),
                content: <GroupProfileForm group={group}/>,
            },
        ];
        return (
            <React.Fragment>
                <GroupProfileSidebar {...this.props} current={current} steps={steps}/>
                <div className="steps-right-side-div dashboard-inner-second bg-white float-right">
                    {this.props.match.params.method === methods.create ?
                        <div className="steps-content">{steps[current].content}</div>
                        :
                        this.props.match.params.method === methods.edit && group ?
                            <div className="steps-content">{steps[current].content}</div>
                            :
                            <div className={'text-center mt-5 p-0'}><Spin/></div>}
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(GroupProfileCreate));
