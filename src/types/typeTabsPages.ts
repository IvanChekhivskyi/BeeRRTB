export enum TabsPagesActionType {
    FLIP_BOOKMARK_ACCOUNT = "FLIP_BOOKMARK_ACCOUNT",

}
export interface TabsPagesState {
    account: {
        data: boolean,
        order: boolean,
        historyOrder: boolean,
    }
}

interface AccountTabsPagesAction {
    type: TabsPagesActionType.FLIP_BOOKMARK_ACCOUNT;
    payload: {data: boolean, order: boolean, historyOrder: boolean};
}

export type TabsPagesAction = AccountTabsPagesAction