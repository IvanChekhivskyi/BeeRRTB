
export enum ProductActionType {
    ADD_PRODUCT = "ADD_PRODUCT",
    CORRECT_PRODUCT = "CORRECT_PRODUCT",
    ALERT_TOTAL_COST = "ALERT_TOTAL_COST",
    REMOVE_PRODUCT = "REMOVE_PRODUCT",
    CLINE_LIST_PRODUCT = "CLINE_LIST_PRODUCT",
    OPEN_INFO_PRODUCT = "OPEN_INFO_PRODUCT",
}

export interface ProductArray {
    id: string,
    name: string,
    stateQuantity: number,
    quantity: number,
    price: number,
    infoRef?: string
}

export interface ProductState {
    product: ProductArray[],
    totalCost: number,
    ref: {
        id: string,
        comeback: string,
    },
}

interface AddProductAction {
    type: ProductActionType.ADD_PRODUCT;
    payload: {id: string, name: string, stateQuantity: number, quantity: number, price: number, infoRef?: string};
}

interface CorrectProductAction {
    type: ProductActionType.CORRECT_PRODUCT;
    payload: {id: string, quantity: number};
}

interface AlertTotalCostAction {
    type: ProductActionType.ALERT_TOTAL_COST;
}

interface RemoveProductAction {
    type: ProductActionType.REMOVE_PRODUCT;
    payload: {id: string};
}

interface ClineProductListAction {
    type: ProductActionType.CLINE_LIST_PRODUCT;
    payload: [];
}

interface OpenInfoProductAction {
    type: ProductActionType.OPEN_INFO_PRODUCT;
    payload: {id: string, comeback: string};
}

export type ProductAction =   AddProductAction
                            | CorrectProductAction
                            | AlertTotalCostAction
                            | RemoveProductAction
                            | ClineProductListAction
                            | OpenInfoProductAction


/*


 */