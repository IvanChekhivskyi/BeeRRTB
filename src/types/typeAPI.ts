export enum API_ActionType {
    FETCH_API = "FETCH_API",
    FETCH_API_SUCCESS = "FETCH_API_SUCCESS",
    FETCH_API_ERROR = "FETCH_API_ERROR",
}
export interface API_State {
    accountArray: any[];
    loading: boolean;
    error: null | string;
}

interface FetchAPI_Action {
    type: API_ActionType.FETCH_API;
}

interface FetchSuccessAPI_Action {
    type: API_ActionType.FETCH_API_SUCCESS;
    payload: any[];
}

interface FetchErrorAPI_Action {
    type: API_ActionType.FETCH_API_ERROR;
    payload: string;
}

export type API_Action = FetchAPI_Action | FetchSuccessAPI_Action | FetchErrorAPI_Action;