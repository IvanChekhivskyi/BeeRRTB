import {Dispatch} from "redux";
import {API_Action, API_ActionType} from "../../types/typeAPI";
import axios from "axios";


export const fetchAPI = () => {
    return async (dispatch: Dispatch<API_Action>) => {
        try {
            dispatch({type: API_ActionType.FETCH_API})
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch({type: API_ActionType.FETCH_API_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: API_ActionType.FETCH_API_ERROR,
                payload: "Виникла помилка при отриманні завантаженні списку Account-ів"
            })
        }
    }
}