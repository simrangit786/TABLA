import React, {Component} from 'react';
import {Image} from "../Images";

class AppliedFilterBar extends Component {

    getValue(key) {
        const {values = {}, params} = this.props;
        if (params[key]) {
            if (values[params[key]])
                return values[params[key]]
            return params[key].key ? params[key].label : params[key]
        }
        return params[key]
    }

    render() {
        const {params, names} = this.props;
        let keys = Object.keys(params)
        keys = keys.filter(key => params[key] && names[key])
        if (!keys.length) {
            return <div/>
        }
        return (
            <div className="applied-filter-bar">
                <img src={Image.eyes_icon}/>
                <p>{keys.map((key, index) => <span key={index}><b>{names[key]}</b> : {this.getValue(key)}, </span>)}</p>
            </div>
        );
    }
}

export default AppliedFilterBar;
