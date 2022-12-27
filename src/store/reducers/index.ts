import {accountReducer} from "./accountReducer";
import {combineReducers} from "redux";
import {API_Reducer} from "./API_Reducer";
import {tabsPagesReducer} from "./tabsPagesReducer";
import {productReducer} from "./productReducer";

export const rootReducer = combineReducers({
    account: accountReducer,
    API: API_Reducer,
    tabsPages: tabsPagesReducer,
    product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>
