import {ProductAction, ProductActionType, ProductState} from "../../types/typeProduct";


const initialState: ProductState = {
    product: [],
    totalCost: 0,
    ref: {
        id: "",
        comeback: "",
    },
}

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
    switch (action.type) {
        case ProductActionType.ADD_PRODUCT:
            return {...state, product: [...state.product, action.payload]}

        case ProductActionType.CORRECT_PRODUCT:
            return {...state, product: state.product.map(product => product.id === action.payload.id
                    ?   {...product, quantity: action.payload.quantity}
                    :   product
                )}

        case ProductActionType.ALERT_TOTAL_COST:
            let cost = 0;
            for (let i = 0; i < state.product.length; i++){
                cost = cost + state.product[i].price * state.product[i].quantity;
            }
            return {...state, totalCost: cost}

        case ProductActionType.REMOVE_PRODUCT:
            return {...state, product: state.product.filter(product => product.id !== action.payload.id)}

        case ProductActionType.CLINE_LIST_PRODUCT:
            return {...state, product: []}

        case ProductActionType.OPEN_INFO_PRODUCT:
            return {...state, ref: action.payload }

        default:
            return state;
    }
}
