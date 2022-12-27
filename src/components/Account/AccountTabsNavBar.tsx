import React from 'react';
import {useDispatch} from "react-redux";
import {TabsPagesActionType} from "../../types/typeTabsPages";
import {Nav, NavLink} from "react-bootstrap";


const AccountTabsNavBar = () => {
    const dispatch = useDispatch();

    const Data = () => {dispatch({
        type: TabsPagesActionType.FLIP_BOOKMARK_ACCOUNT,
        payload: {data: true, order: false, historyOrder: false}
    })}

    const Order = () => {dispatch({
        type: TabsPagesActionType.FLIP_BOOKMARK_ACCOUNT,
        payload: {data: false, order: true, historyOrder: false}
    })}

    const HistoryOrder = () => {dispatch({
        type: TabsPagesActionType.FLIP_BOOKMARK_ACCOUNT,
        payload: {data: false, order: false, historyOrder: true}
    })}

    return (
                <Nav variant={"tabs"}>
                    <NavLink onClick={Data}>
                        <span style={{color: "lawngreen"}}>Особисті дані</span>
                    </NavLink>
                    <NavLink type={"button"} onClick={Order}>
                        <span style={{color: "lawngreen"}}>Поточне замовлення</span>
                    </NavLink>
                    <NavLink type={"button"} onClick={HistoryOrder}>
                        <span style={{color: "lawngreen"}}>Історія замовлень</span>
                    </NavLink>
                </Nav>

    );
};

export default AccountTabsNavBar;