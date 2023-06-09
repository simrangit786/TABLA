import React, {Component} from 'react';
import {Button, message} from "antd";
import {ComponentPDFGetOne} from "../../../../controller/API/itemApi";
import {withTranslation} from "react-i18next";

class ComponentInformation extends Component {
    state = {
        loading: false,
    };

    getPDFUrl = (id) => {
        this.setState({loading: true});
        ComponentPDFGetOne(id).then(response => {
            window.open((response.url));
            this.setState({loading: false})
        }).catch(e => {
            message.error('Error in downloading! Please try later.');
            this.setState({loading: false})
        })
    };

    render() {
        const {component, index, t} = this.props;
        const {loading} = this.state;
        return (
            <div key={`component_${index}`} className="row card-details-general-row py-2">
                <div className="col-12">
                    <ul className="list-inline mb-0 w-100">
                        {/*<li className="list-inline-item width-100-tab w-50 m-0">{t('name')} :</li>*/}
                        <li className="list-inline-item width-100-tab w-50 m-0 text-capitalize">
                            <span>{component.name}</span>
                        </li>
                        <li className="list-inline-item width-100-tab w-50 m-0">
                            <span>{component.sku_id}</span>
                        </li>
                        <li className="list-inline-item width-100-tab w-30 m-0">
                            <Button loading={loading} onClick={() => this.getPDFUrl(component.id)}
                                    className="dwn-barcode-btn">
                                {t('download_barcode')}
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withTranslation('common')(ComponentInformation);
