import {distributorWorkorderSummaryGet} from "../../controller/API/salesOperationAPI";

export const WORKORDER_ONE_GET = 'WORKORDER_ONE_GET';

export const getOneWorkorder = (id) => {
  return (dispatch) => {
    return distributorWorkorderSummaryGet(id)
      .then(response => {
        dispatch({
          type: WORKORDER_ONE_GET,
          payload: response
        });
      }).catch(err => {
      })
  }
};
