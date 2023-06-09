import React, {Component} from 'react';
import {SelectAddress} from "./SelectAddress";
import {addressGet} from "../../../controller/API/profileApi";
import {withRouter} from "react-router-dom";
import {Spin} from "antd";

class SelectItemLocation extends Component {
    state = {
        locationSelected: false,
        all_locations: [],
        loading: true
    };

    componentDidMount() {
        this.fetch({client_id: this.props.work_order.client.id, "page_size": "all"})
    }

    fetch = (params = {}) => {
        addressGet(params)
            .then(response => {
                this.setState({all_locations: response, loading: false})
            })
    };

    render() {
        const {all_locations, loading} = this.state;
        if (loading) {
            return <div className={'mt-5 p-0 text-center'}><Spin/></div>
        }
        return (
            <React.Fragment>
                <SelectAddress onPrev={this.props.prev} workorder={this.props.work_order} all_locations={all_locations}
                               onNext={() => this.props.next(this.props.work_order)} fetch={this.fetch}/>
            </React.Fragment>
        );
    }
}

export default withRouter(SelectItemLocation);
