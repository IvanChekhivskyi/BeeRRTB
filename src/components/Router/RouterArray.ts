import Account from "../../pages/Account";
import Queens from "../../pages/Queens";
import Bee from "../../pages/Bee";
import Info from "../../pages/Info";
import ProductionBee from "../../pages/ProductionBee";
import Basket from "../../pages/Basket";
import Head from "../../pages/Head";


export const RouterArray = [
    {path: '/queens', component: Queens, exact: true},
    {path: '/bee', component: Bee, exact: true},
    {path: '/production', component: ProductionBee, exact: true},
    {path: '/info', component: Info, exact: true},
    {path: '/basket', component: Basket, exact: true},
    {path: '/account', component: Account, exact: true},
    {path: '/head', component: Head, exact: true},
]

