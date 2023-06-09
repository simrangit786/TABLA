import React from 'react';
import { Image as Images } from "../../../Images";

const ProductCard = (props) => {
    const {item , key,product,removeItem,isShow = false} = props;
    console.log(item,"PROPSSS");

    return (
        <div className="col-12 mt-5">
            <div class="row added-cart-item mx-0 coupon-row p-0" style={{ border: '1px solid #e0e0e0', backgroundColor: '#F4F5F8' }}>
                <div class="col-sm-3 col-12 p-0">

                    <img
                        src={item?.variant_images?.length > 0 ? item?.variant_images[0]?.image : ""}
                        alt="chair_furtif"
                        className="img-fluid mb-0" />
                </div>
                <div className='col-12 col-sm-9 py-3'>
                    <div class="added-cart-price-new">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ fontSize: "20px", color: "#071930" }} className="mb-1 font-weight-bold">{item?.name}</p>
                            {isShow && <p style={{ fontSize: "12px", textDecoration: "underline", color: "#000000", fontWeight: "900", cursor: 'pointer' }} className="wrap-off"  onClick={()=>{removeItem(product,item)}}>ÉFFACER</p>}
                        </div>
                        <ul class="added-pricing justify-content-start list-inline m-0">
                            <li className='list-inline-item'>
                                <small style={{ color: '#646464', fontSize: "12px" }}>Référence/code :</small>
                            </li>
                            <li className='list-inline-item'>
                                <small style={{ color: '#646464', fontSize: "12px" }}>BC.FUR-MR</small>
                            </li>
                        </ul>
                        <ul class="added-pricing justify-content-start list-inline m-0  ">
                            <li className='list-inline-item'>
                                <small style={{ color: '#646464', fontSize: "12px" }}>Catégorie :</small>
                            </li>
                            <li className='list-inline-item'>
                                <small style={{ color: '#646464', fontSize: "12px" }}>Chaise</small>
                            </li>
                        </ul>
                        <ul class="added-pricing justify-content-start list-inline m-0">
                            <li className='list-inline-item'>
                                <small style={{ color: '#071930', fontSize: "12px" }}>Couleur :</small>
                            </li>
                            <li className='list-inline-item'>
                            <span style={{ backgroundColor: `${item.colour_code}` }}
                                        className={`color-card-component d-inline-block position-relative`} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;