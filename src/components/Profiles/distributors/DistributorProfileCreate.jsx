import React, {Component} from 'react';
import {InformationDistributors} from "./InformationDistributorsForm";
import {BankLegalInformation} from "./BankLegalInformationForm";
import {ContactInformation} from "./ContactInformation";
import ProfileSidebar from "../../sidebar/profile/DistributorProfileSidebar";
import {withTranslation} from "react-i18next";
import {methods} from "../../../controller/Global";
import {distributorProfileGetOne} from "../../../controller/API/profileApi";
import {Spin} from "antd";
import {CreateDiscount} from "./CreateTarification";

class DistributorProfileCreate extends Component {
    state = {
        current: 0,
        codification: null,
        bank_info: [],
        contact_info: [],
        profile: null,
        loading: true,
    };

    componentDidMount() {
        const {params} = this.props.match;
        if (params.method === methods.edit) {
            this.fetch(params.id)
        }
    }

    fetch = (id) => {
        return distributorProfileGetOne(id).then(response => {
            this.setState({
                profile: response,
                codification: response.codification,
                contact_info: response.contact_info,
                bank_info: response.bank_info
            })
        })
    };

    setProfile = (id) => {
        this.fetch(id)
            .then(() => this.next());
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
                content: <InformationDistributors profile={this.state.profile} method={this.props.match.params.method}
                                                  next={(id) => this.setProfile(id)}/>,
            },
            {
                title: 'Tarification',
                content: <CreateDiscount profile={this.state.profile} refreshProfile={this.fetch}
                                         next={(id) => this.setProfile(id)} prev={() => this.prev()}/>,
            },
            {
                title: t('bank_legal'),
                content: <BankLegalInformation codification={this.state.codification} bank_info={this.state.bank_info}
                                               profile={this.state.profile} method={this.props.match.params.method}
                                               next={(id) => this.setProfile(id)} prev={() => this.prev()}/>,
            },
            {
                title: t('contact_info'),
                content: <ContactInformation contact_info={this.state.contact_info} profile={this.state.profile}
                                             prev={() => this.prev()} method={this.props.match.params.method}/>,
            },
        ];
        const {current} = this.state;
        return (
            <React.Fragment>
                <ProfileSidebar {...this.props} current={current} steps={steps}/>
                <div className="steps-right-side-div dashboard-inner-second bg-white float-right">
                    {this.props.match.params.method === methods.create ? <div
                        className="steps-content">{steps[current].content}</div> : this.props.match.params.method === methods.edit && this.state.profile ?
                        <div className="steps-content">{steps[current].content}</div> :
                        <div className={'text-center mt-5 p-0'}><Spin/></div>}
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(DistributorProfileCreate));
