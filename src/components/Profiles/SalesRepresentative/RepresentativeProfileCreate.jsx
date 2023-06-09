import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {methods} from "../../../controller/Global";
import {salesRepresentativeGetOne} from "../../../controller/API/profileApi";
import {Spin} from "antd";
import {RepresentativeProfileForm} from "./RepresentativeProfileForm";
import RepresentativeProfileSidebar from "../../sidebar/profile/RepresentativeProfileSidebar";

class RepresentativeProfileCreate extends Component {
    state = {
        current: 0,
        representative: null,
    };

    componentDidMount() {
        const {params} = this.props.match;
        if (params.method === methods.edit) {
            this.fetch(params.id)
        }
    }

    fetch = (id) => {
        return salesRepresentativeGetOne(id).then(response => {
            this.setState({
                representative: response,
            })
        })
    };

    render() {
        const {t} = this.props;
        const {representative, current} = this.state;

        const steps = [
            {
                title: t('representative_info'),
                content: <RepresentativeProfileForm representative={representative}/>,
            },
        ];
        return (
            <React.Fragment>
                <RepresentativeProfileSidebar {...this.props} current={current} steps={steps}/>
                <div className="steps-right-side-div dashboard-inner-second bg-white float-right">
                    {this.props.match.params.method === methods.create ?
                        <div className="steps-content">{steps[current].content}</div>
                        :
                        this.props.match.params.method === methods.edit && representative ?
                            <div className="steps-content">{steps[current].content}</div>
                            :
                            <div
                                className='text-center mt-5 h-100 w-100 d-flex align-items-center p-0 justify-content-center'>
                                <Spin/></div>}
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(RepresentativeProfileCreate));
