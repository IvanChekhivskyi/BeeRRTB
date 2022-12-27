import React from 'react';
import AccountData from "./AccountData";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import CurrentOrder from "./CurrentOrder";
import OrderHistory from "./OrderHistory";


const AccountList = () => {
    const show = useTypedSelector(state => state.tabsPages.account)

    return (
        <>
            <form>
                {show.data && <AccountData/>}
                {show.order && <CurrentOrder/>}
                {show.historyOrder && <OrderHistory/>}
            </form>
        </>
    );
};

export default AccountList;