export const VARIANT_ONE_GET = 'DISTRIBUTOR_ONE_GET';
export const VARIANT_ONE_UPDATE = 'VARIANT_ONE_UPDATE';
export const VARIANT_ONE_GET_SUCCESS = 'DISTRIBUTOR_ONE_GET_SUCCESS';
export const ITEM_TO_INVOICE = 'ITEM_TO_INVOICE';

export const getOneVariant = (id = null) => ({
  type: 'VARIANT_ONE_GET',
  payload: id
});


export const updateOneVariant = (params = {}) => ({
  type: 'VARIANT_ONE_UPDATE',
  payload: params
});


export const itemToInvoice = (list,data) => {
  return {
  type: ITEM_TO_INVOICE,
  payload: {list,data}
}};
