import {WORKORDER_ONE_GET} from "../Actions/workOrderAction";

export const workOrderReducer = (state = {data: null}, {type, payload}) => {
  switch (type) {
    case WORKORDER_ONE_GET:
      return {data:payload};
    default:
      return state;
  }

};
