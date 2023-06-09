import {combineReducers} from "redux";
import {distributorProfileReducer} from "./DistributorProfileReducer";
import {itemReducer, itemToInvoiceReducer} from "./ItemReducer";
import {workOrderReducer} from "./WorkorderReducer";

const allReducers = combineReducers({
    distributor: distributorProfileReducer,
    item: itemReducer,
    current_workorder: workOrderReducer,
    invoiceItem: itemToInvoiceReducer
});

const rootReducer = (state, action) => {
    return allReducers(state, action)
};

export default rootReducer
