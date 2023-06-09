import {applyMiddleware, createStore} from "redux";
import {logger} from "redux-logger";
import rootReducer from "./Reducer/RootReducer";
import thunk from "redux-thunk";

let store = null
if (process.env.NODE_ENV === "PRODUCTION") {
    store = createStore(rootReducer, applyMiddleware(thunk));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk, logger));
}
export default store