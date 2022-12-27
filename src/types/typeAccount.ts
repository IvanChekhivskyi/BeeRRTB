export enum AccountActionType {
    ADD_DATA_LIST = "ADD_DATA_LIST",
    ADD_HISTORY_ORDER = "ADD_HISTORY_ORDER",
    CORRECT_HISTORY_ORDER = "CORRECT_HISTORY_ORDER",
    REMOVE_ORDER = "REMOVE_ORDER",
    ENTER_LOGIN = "ENTER_LOGIN",
    SIGN_OUT = "SIGN_OUT"
}

export enum StatusOrder {
    finished = "finished",

}

export interface HistoryOrderArray {
    id: string,
    date: Date,
    productList: [{
        id: string,
        price: number,
        stateQuantity: number,
        name: string,
        quantity: number
    }],
    totalCost: number,
    status: string
    idOrder: string,
}

export interface AccountState {
    dataList: {
        phone?: string,
        username?: string,
        surname?: string,
        firstName?: string,
        middleName?: string
        password?: string,
        deliveryMethod?: string,
        addressNovaPoshta?:{
            postOffice: string,
            city: string,
            street: string,
            number: string,
        },
        addressUkrPoshta?: {
            region: string,
            district: string,
            city: string,
            street: string,
            number: string,
            zipcode: string,
        }
    },

    historyOrder: HistoryOrderArray[],

    login: {
        phone: string,
        password: string,
        login: boolean,
        registration?: boolean
    }
}


interface AccountDataListAction {
    type: AccountActionType.ADD_DATA_LIST;
    payload: {
        phone?: string,
        username?: string,
        surname?: string,
        firstName?: string,
        middleName?: string
        password?: string,
        deliveryMethod?: string,
        addressNovaPoshta?:{
            postOffice: string,
            city: string,
            street: string,
            number: string,
        },
        addressUkrPoshta?: {
            region: string,
            district: string,
            city: string,
            street: string,
            number: string,
            zipcode: string,
        },
    };
}

interface AccountHistoryOrderAction {
    type: AccountActionType.ADD_HISTORY_ORDER;
    payload: {
        id: string,
        date: Date,
        productList: [{
            id: string,
            price: number,
            stateQuantity: number,
            name: string,
            quantity: number
        }],
        totalCost: number,
    },
}

interface AccountCorrectOrderAction {
    type: AccountActionType.CORRECT_HISTORY_ORDER;
    payload: HistoryOrderArray
}

interface AccountRemoveOrderAction {
    type: AccountActionType.REMOVE_ORDER;
    payload: {idOrder: string}
}

interface AccountLoginAction {
    type: AccountActionType.ENTER_LOGIN;
    payload: {phone: string, password: string, login: boolean, registration?: boolean};
}

interface AccountClenData {
    type: AccountActionType.SIGN_OUT;
}


export type AccountAction =       AccountDataListAction
                                | AccountHistoryOrderAction
                                | AccountLoginAction
                                | AccountCorrectOrderAction
                                | AccountRemoveOrderAction
                                | AccountClenData
