import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { withTranslation } from "react-i18next";
// import ComponentInformation from "./item-components/ComponentInformation";
import VariantInfoSummery from "../all-items/item-components/VariantInfoSummery";
import InventoryInformation from "../all-items/item-components/InventoryInformation";
import GeneralInfo from "../all-items/item-components/GeneralInfo";
import { Role } from "../../../utils";
// import CouponInformation from "./item-components/CouponInformation";
import ComponentInformation from '../all-items/item-components/ComponentInformation';
import CouponInformation from '../all-items/item-components/CouponInformation';
import { SingleItemCardComponent } from './all-items/SingleItemCardComponent';
import CompatilbiltyCard from './all-items/CompatilbiltyCard';
import ProductCard from './components/ProductCard';
import ComponentsGeneralInfo from './all-items/ComponentsGeneralInfo';
import ComponentsVariantInfoSummary from './all-items/ComponentsVariantInfoSummary';

class ComponentSummaryInformation extends Component {

    render() {

        const { t, component } = this.props;
        console.log("component id > ", component)
        const { images } = component;
        
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
                                            <img src={img.image} alt="slider-img" className="img-fluid" />
                                        </div>
                                    )}
                                </Carousel>
                            </div>
                        </div>
                        <div
                            className="col-sm-12 col-12 col-md-12 col-lg-9 pr-0 margin-top-ipad-30 padding-responsive-right">
                            <div className="row mx-0 view-item-details-row">
                                <div className="col-12">
                                    <h5 className="font-weight-bold mb-4">{t('component_details')}</h5>
                                    <h6 className="font-weight-bold heading-inner">{t('general')}</h6>
                                </div>
                                <ComponentsGeneralInfo variant={component} {...this.props}/>
                                <div className="col-12">
                                    <h6 className="font-weight-bold heading-inner">{t('variant')}</h6>
                                </div>
                                <ComponentsVariantInfoSummary ummary variant={component} {...this.props} />
                                <div className="col-12 mt-3 py-2">
                                    <h5 className="font-weight-bold mb-3">{t('info_view_stocks')}</h5>
                                </div>
                                <InventoryInformation variant={component} {...this.props} />
                                {/* <Role allow={["admin"]}>
                                    {component.product.length > 0 ?
                                        <React.Fragment>
                                            <div className="col-12 mt-3 py-2">
                                                <h5 className="font-weight-bold mb-3">{t('component_information')}</h5>
                                            </div>
                                            <div className="col-12">
                                                {component.product.map((component, index) =>
                                                    <ComponentInformation key={`componentInfo_${index}`}
                                                        component={component} index={index} />
                                                )}
                                            </div>
                                        </React.Fragment>
                                        : ""}
                                </Role> */}
                                {/* <Role allow={["admin"]}>
                                    <CouponInformation variant={variant} {...this.props} />
                                </Role> */}
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <div className="row">
                                        <div className="col-12">
                                            <h5 className="text-capitalize font-weight-bold mb-3">{t('compatibility')}</h5>
                                        </div>
                                        {/* <SingleItemCardComponent product={component}/> */}
                                        {component.product.length > 0 && component.product.map((item, index) =>
                                    <ProductCard key={`item_product_card_${index}`} item={item} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (withTranslation('common')(ComponentSummaryInformation));
