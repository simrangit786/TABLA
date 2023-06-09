import {ITEM_TO_INVOICE} from "../Actions/ItemAction"

export const itemReducer = (state = {loading: true}, {type, payload}) => {
  switch (type) {
    case 'VARIANT_ONE_GET':
      return {...state, loading: true,};
    case 'VARIANT_ONE_GET_SUCCESS':
      return {...state, variant: payload, loading: false};
    case 'VARIANT_ONE_UPDATE':
      return {...state, variant: {item: payload, count: 1}, loading: false};
    default:
      return state;
  }

};


export const itemToInvoiceReducer = (state = {group:null, item:null}, {type, payload}) => {
  switch (type) {
    case ITEM_TO_INVOICE:
      return {group:payload.list, item:payload.data};
    default:
      return state;
  }
};


