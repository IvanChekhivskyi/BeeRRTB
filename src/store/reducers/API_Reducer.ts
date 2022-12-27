import {API_Action, API_ActionType, API_State} from "../../types/typeAPI";


const initialState: API_State = {
    accountArray: [],
    loading: false,
    error: null,
}

export const API_Reducer = (state = initialState, action: API_Action): API_State => {
    switch (action.type){

        case API_ActionType.FETCH_API:
            return {...state, loading: true, error: null, accountArray: []}

        case API_ActionType.FETCH_API_SUCCESS:
            return {...state, loading: false, error: null, accountArray: action.payload}

        case API_ActionType.FETCH_API_ERROR:
            return {...state, loading: false, error: action.payload, accountArray: []}

        default:
            return state;
    }
}