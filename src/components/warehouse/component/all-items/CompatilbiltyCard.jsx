// import React, { Component } from 'react';

// class CompatilbiltyCard extends Component {

//     render() {
//         const {item , key,product,removeItem} = this.props;

//         return (
//             <div
//                 className="w-100 card-shopping card-details-main mb-3">
//                 <div
//                     className="row mx-0 flex align-center justify-content-between card-details-main-comp">
//                     <div className="icon-img">
//                         <img
//                             src={item?.variant_images?.length > 0 ? item?.variant_images[0]?.image : ""}
//                             alt="chair_furtif"
//                             className="img-fluid mb-0" />
//                     </div>
//                     <div className='component-product-info'>
//                         <div
//                             className="product-details position-relative">
//                             <h4 className='text-capitalize font-weight-bold mb-3'>{item.name}
//                             </h4>
//                             <ul className="list-inline mb-0 w-100 flex">
//                                 <li className="list-inline-item ">Color :</li>
//                                 <li className="list-inline-item ">
//                                     <span style={{ backgroundColor: `${item.colour_code}` }}
//                                         className={`color-card-component d-inline-block position-relative`} />
//                                 </li>
//                             </ul>
//                             <div
//                                 className="item-price font-weight-normal d-inline-block w-100 mb-1">
//                                 {/* €{(item.price / item.quantity).toFixed(2)} */}
//                             </div>
//                             <div
//                                 className="item-qunty font-weight-normal d-inline-block w-100 workorder-item-size">
//                                 {/* {item.quantity} article
//                                 ({item.quantity / item.item.units_per_set} sets) */}
//                             </div>
//                             {/* <div
//                             className="item-price-div position-absolute">
//                             <h6
//                                 className="mb-0 font-weight-bold w-100 text-right">
//                                 €{parseFloat(item.price).toFixed(2)}
//                             </h6>
//                         </div> */}
//                         </div>
//                         <div
//                             className="customer-purchase-details px-3">
//                             <p className="mb-0 w-100 font-weight-bold text-center component_custom" onClick={()=>{removeItem(product,item)}}><u>ÉFFACER</u></p>
//                             {/* {item.order_type === order_type.customer_purchase &&
//                             <small
//                                 className="text-center d-inline-block font-weight-normal w-100">{item.customer_note}
//                             </small>} */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default CompatilbiltyCard;