import AccountTabsNavBar from "../Account/AccountTabsNavBar";
import React from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";


const Case = {
    ACCOUNT: '/account',
}


export const Children = (path: string) => {
    const isLogin = useTypedSelector(state => state.account.login.login)
    console.log(isLogin);
    switch (path) {
        case Case.ACCOUNT:
            if(isLogin){return (<AccountTabsNavBar/>)}

            break;

        default:
            break;
    }

}