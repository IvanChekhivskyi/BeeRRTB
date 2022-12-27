import {AccountAction, AccountActionType, AccountState,} from "../../types/typeAccount";
import HistoryOrders from "../../components/Account/OrderHistory";


const initialState: AccountState = {
    dataList: {
        phone: "",
        surname: "",
        firstName: "",
        middleName: "",
        username: "",
        password: "",
        deliveryMethod: "SelfDelivery" || "NovaPoshta" || "UkrPoshta",
        addressNovaPoshta: {
            postOffice: "",
            city: "",
            street: "",
            number: ""
        },
        addressUkrPoshta: {
            region: "",
            district: "",
            city: "",
            street: "",
            number: "",
            zipcode: "",
        },
    },


    historyOrder: [{
        id: "",
        date: new Date(),
        productList: [{
            id: "",
            price: 0,
            stateQuantity: 0,
            name: "",
            quantity: 0
        }],
        totalCost: 0,
        status:"being processed" || "finished" || "accepted",
        idOrder: ""
    }],

    login: {
        phone: "",
        password: "",
        login: false,
        registration: false
    },
}

export const accountReducer = (state = initialState,  action: AccountAction): AccountState => {
    switch (action.type){
        case AccountActionType.ADD_DATA_LIST:
            if(action.payload.addressNovaPoshta){
                return {...state, dataList:{...state.dataList, addressNovaPoshta: action.payload.addressNovaPoshta, deliveryMethod: action.payload.deliveryMethod}}
            } else
            if(action.payload.addressUkrPoshta){
                return {...state, dataList:{...state.dataList, addressUkrPoshta: action.payload.addressUkrPoshta, deliveryMethod: action.payload.deliveryMethod}}
            } else
            return {...state, dataList:{...state.dataList,
                    phone: action.payload.phone,
                    surname: action.payload.surname,
                    firstName: action.payload.firstName,
                    middleName: action.payload.middleName,
                    username: action.payload.username,
                    password: action.payload.password,
                    deliveryMethod: action.payload.deliveryMethod
            }}

        case AccountActionType.ADD_HISTORY_ORDER:

            if(state.historyOrder[0].id === ""){
                return {...state, historyOrder: [{...action.payload, status: "finished", idOrder: Math.random().toString(16).slice(2)}]}
            }else return {...state, historyOrder: [...state.historyOrder, {...action.payload, status: "accepted", idOrder: Math.random().toString(16).slice(2)}]}

        case AccountActionType.CORRECT_HISTORY_ORDER:
            return {...state,   historyOrder: state.historyOrder.map(order =>
                        order.idOrder !== action.payload.idOrder
                            ?   order
                            :   action.payload
                )}

        case AccountActionType.REMOVE_ORDER:
            return {...state, historyOrder: state.historyOrder.filter(oder => oder.idOrder !== action.payload.idOrder)}

        case AccountActionType.ENTER_LOGIN:
            return {...state, login: action.payload}

        case AccountActionType.SIGN_OUT:
            return {...state,
                                historyOrder: [{
                                    id: "",
                                    date: new Date(),
                                    productList: [{
                                        id: "",
                                        price: 0,
                                        stateQuantity: 0,
                                        name: "",
                                        quantity: 0
                                    }],
                                    totalCost: 0,
                                    status:"being processed" || "finished" || "accepted",
                                    idOrder: ""
                                }],

                                login: {login:false, registration:false, password: "", phone: ""},
                                dataList: {
                                    phone: "",
                                    surname: "",
                                    firstName: "",
                                    middleName: "",
                                    username: "",
                                    password: "",
                                    deliveryMethod: "SelfDelivery" || "NovaPoshta" || "UkrPoshta",
                                    addressNovaPoshta: {
                                        postOffice: "",
                                        city: "",
                                        street: "",
                                        number: ""
                                    },
                                    addressUkrPoshta: {
                                        region: "",
                                        district: "",
                                        city: "",
                                        street: "",
                                        number: "",
                                        zipcode: "",
                                    }
                                }
                            }

        default:
            return state;
    }
}