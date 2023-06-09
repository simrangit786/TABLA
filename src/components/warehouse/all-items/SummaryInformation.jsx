import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {withTranslation} from "react-i18next";
import ComponentInformation from "./item-components/ComponentInformation";
import VariantInfoSummery from "./item-components/VariantInfoSummery";
import InventoryInformation from "./item-components/InventoryInformation";
import GeneralInfo from "./item-components/GeneralInfo";
import {Role} from "../../../utils";
import CouponInformation from "./item-components/CouponInformation";

class SummaryInformation extends Component {
    render() {
        const {t, variant} = this.props;
        const {images} = variant;
        return (
            <div className="row mx-0 summary-info-row">
                <div className="col-12 p-0">
                    <div className="row mx-0 py-4">
                        <div className="col-sm-12 col-12 col-md-12 padding-responsive-left col-lg-3 pl-0">
                            <div className="row mx-0">
                                <Carousel showArrows={true} key={`slider_image_${images.map(d => d.id)}`}
                                          className="w-100">
                                    {images.map((img) =>
                                        <div key={`inner_image_${img.id}`} className="col-12 h-100">
                                            <img src={img.image} alt="slider-img" className="img-fluid"/>
                                        </div>
                                    )}
                                </Carousel>
                            </div>
                        </div>
                        <div
                            className="col-sm-12 col-12 col-md-12 col-lg-9 pr-0 margin-top-ipad-30 padding-responsive-right">
                            <div className="row mx-0 view-item-details-row">
                                <div className="col-12">
                                    <h5 className="font-weight-bold mb-4">{t('item_details')}</h5>
                                    <h6 className="font-weight-bold heading-inner">{t('general')}</h6>
                                </div>
                                <GeneralInfo variant={variant} {...this.props} />
                                <div className="col-12">
                                    <h6 className="font-weight-bold heading-inner">{t('variant')}</h6>
                                </div>
                                <VariantInfoSummery variant={variant} {...this.props} />
                                <div className="col-12 mt-3 py-2">
                                    <h5 className="font-weight-bold mb-3">{t('info_view_stocks')}</h5>
                                </div>
                                <InventoryInformation variant={variant} {...this.props} />
                                <Role allow={["admin"]}>
                                    {variant.components.length > 0 ?
                                        <React.Fragment>
                                            <div className="col-12 mt-3 py-2">
                                                <h5 className="font-weight-bold mb-3">{t('component_information')}</h5>
                                            </div>
                                            <div className="col-12">
                                                {variant.components.map((component, index) =>
                                                    <ComponentInformation key={`componentInfo_${index}`}
                                                                          component={component} index={index}/>
                                                )}
                                            </div>
                                        </React.Fragment>
                                        : ""}
                                </Role>
                                <Role allow={["admin"]}>
                                    <CouponInformation variant={variant} {...this.props} />
                                </Role>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(SummaryInformation));
