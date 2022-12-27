import React, {FC} from 'react';
import ProductForm from "../components/Product/ProductForm";
import InSideBasketForm from "../components/Product/InSideBasketForm";

const Bee: FC = () => {
    const CategoryName = "Bee";
    const link = '/bee'

    return (
        <>
            <h1>Бджолопакети</h1>
            <ProductForm CategoryName={CategoryName} link={link}/>
            <InSideBasketForm/>
        </>
    );
};

export default Bee;