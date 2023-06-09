import {DISTRIBUTOR_ONE_GET,DISTRIBUTOR_ONE_GET_SUCCESS} from "../Actions/ProfileActions";

export const distributorProfileReducer = (state = {loading: true}, {type, payload}) => {
    switch (type) {
        case DISTRIBUTOR_ONE_GET:
            return {...state, loading: true,};
        case DISTRIBUTOR_ONE_GET_SUCCESS:
            return {...state, distributor: payload, loading: false}
        default:
            return state;
    }

};
