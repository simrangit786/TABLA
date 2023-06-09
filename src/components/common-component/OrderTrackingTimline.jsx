import React, {Component} from 'react';
import {Image as Images} from "../Images";
import {withTranslation} from "react-i18next";

class OrderTrackingTimeline extends Component {

    render() {
        const {t, delivery_status} = this.props;
        return (
            <div className="row mx-0 steps-card-div mt-5 flex-align-center-between">
                <div className="steps-div position-relative active">
                    <div className="row w-100 steps-inner">
                        <div className="steps-card-icon mx-auto mb-2 flex-align-center-center">
                            <img src={Images.documents_file} alt="document-icon"
                                 className="img-fluid"/>
                        </div>
                    </div>
                    <h6 className="w-100 flex-align-center-center active text-uppercase mb-0">{t('ordered')}</h6>
                </div>
                <div className="steps-div position-relative">
                    <div className="row w-100 steps-inner">
                        <div className="steps-card-icon mx-auto mb-2 flex-align-center-center">
                            {/*<img src={Images.documents_file} alt="document-icon" className="img-fluid"/>*/}
                        </div>
                    </div>
                    <h6 className={`w-100 flex-align-center-center ${delivery_status && 'active'} text-uppercase mb-0`}>
                        {t('request_delevry')}</h6>
                </div>
                <div className="steps-div position-relative">
                    <div className="row w-100 steps-inner">
                        <div className="steps-card-icon mx-auto mb-2 flex-align-center-center">
                            {/*<img src={Images.documents_file} alt="document-icon" className="img-fluid"/>*/}
                        </div>
                    </div>
                    <h6 className="w-100 flex-align-center-center text-uppercase mb-0">{t('shipped')}</h6>
                </div>
                <div className="steps-div position-relative">
                    <div className="row w-100 steps-inner">
                        <div className="steps-card-icon mx-auto mb-2 flex-align-center-center">
                            {/*<img src={Images.documents_file} alt="document-icon" className="img-fluid"/>*/}
                        </div>
                    </div>
                    <h6 className="w-100 flex-align-center-center text-uppercase mb-0">{t('delever')}</h6>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(OrderTrackingTimeline));