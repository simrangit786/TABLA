import React, {Component} from 'react';
import {Image as Images} from "../Images";
import {withTranslation} from "react-i18next";

class LocationCard extends Component {

    render() {
        const {data} = this.props;
        return (
            <div className="text-center w-100 card-shopping">
                <img src={Images.ware_house_big} alt="delivery icon"
                     className="img-fluid"/>
                <h5>{data.address_json.type}</h5>
                <p>{data.address_json.title}</p>
                <p className="mb-0">{`${data.address_json.address}, ${data.address_json.zip_code}, ${data.address_json.city}, ${data.address_json.country}`}</p>
            </div>
        )
    }
}

export default (withTranslation('common')(LocationCard));
