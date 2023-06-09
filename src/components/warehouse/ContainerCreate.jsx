import React, {Component} from 'react';
import ContainerSidebar from "../sidebar/warehouse/ContainerSidebar";
import ContainerSummary from "./container/ContainerSummary";
import {CreateContainerForm} from "./container/CreateContainerForm"
import ContainerAddArticles from "./container/ContainerAddArticles";
import {withTranslation} from "react-i18next";
import {methods} from "../../controller/Global";
import {containerGetOne} from "../../controller/API/itemApi";
import {showErrors} from "../../controller/utils";

class ContainerCreate extends Component {
    state = {
        current: 0,
        container: null,
        loading: false,
    };

    componentDidMount() {
        const {params} = this.props.match;
        if (params.method === methods.edit && params.id) {
            this.fetch(params.id)
        }
    }


    fetch(id) {
        this.setState({loading: true});
        return containerGetOne(id)
            .then(container => {
                this.setState({container, loading: false})
            }).catch(
                err => {
                    this.setState({loading: false});
                    showErrors(err.response.data)
                }
            )
    }

    setContainer = (id) => {
        this.fetch(id)
            .then(() => this.next())
    };

    next = () => {
        const current = this.state.current + 1;
        this.setState({current});
    };

    prev = () => {
        const current = this.state.current - 1;
        this.setState({current});
    };

    render() {
        const {t} = this.props;
        const {container} = this.state;
        const steps = [
            {
                title: t('add_info_container'),
                content: <CreateContainerForm match={this.props.match} container={container}
                                              onNext={(id) => this.setContainer(id)}/>,
            },
            {
                title: t('add_article'),
                content: <ContainerAddArticles container={container}
                                               fetch={() => this.fetch(container.id)}
                                               onNext={(id) => this.setContainer(id)}
                                               onPrev={this.prev}/>,
            },
            {
                title: t('container_summary'),
                content: <ContainerSummary container={container} match={this.props.match} onPrev={this.prev}
                                           fetch={() => this.fetch(container.id)}/>,
            },
        ];
        const {current} = this.state;
        return (
            <React.Fragment>
                <ContainerSidebar {...this.props} current={current} steps={steps}/>
                <div className="steps-right-side-div dashboard-inner-second bg-white h-100 float-right">
                    <div className="steps-content h-100">{steps[current].content}</div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(ContainerCreate));
