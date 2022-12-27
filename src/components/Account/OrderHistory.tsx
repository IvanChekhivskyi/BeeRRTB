import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import OrderForm from "./OrderForm";

const HistoryOrders: FC = (): JSX.Element => {
    const historyOrder = useTypedSelector(state => state.account.historyOrder)
    return (
        <>
            {historyOrder.length !== 0 && historyOrder[0].id !== ""
                ?   <OrderForm infoOrder={historyOrder}/>

                :   <h1>Історія замовлень пуста. Зробіть ваше перше замовлення...</h1>
            }
        </>
    );
};

export default HistoryOrders;