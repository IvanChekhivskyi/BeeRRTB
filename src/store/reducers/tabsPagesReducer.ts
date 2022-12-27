import {TabsPagesAction, TabsPagesActionType, TabsPagesState} from "../../types/typeTabsPages";


const initialState: TabsPagesState = {
    account: {
        data: false,
        order: false,
        historyOrder: false,
    }
}

export const tabsPagesReducer = (state = initialState, action: TabsPagesAction): TabsPagesState => {
    switch (action.type){
        case TabsPagesActionType.FLIP_BOOKMARK_ACCOUNT:
            return {...state, account: action.payload}


        default:
            return state;
    }
}