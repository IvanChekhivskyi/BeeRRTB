import React, {FC} from 'react';
import OrderForm from "./OrderForm";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const CurrentOrder: FC = (): JSX.Element => {
    const historyOrder = useTypedSelector(state => state.account.historyOrder)
    const currentOrder = historyOrder.filter(order => order.status !== "finished");
    return (
        <>
            {historyOrder.length !== 0 && historyOrder[0].id !== ""
                ?   <OrderForm infoOrder={currentOrder}/>

                :   <h1>Зробіть ваше перше замовлення...</h1>
            }

        </>
    );
};

export default CurrentOrder;