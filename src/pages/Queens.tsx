import React, {FC} from 'react';
import ProductForm from "../components/Product/ProductForm";
import InSideBasketForm from "../components/Product/InSideBasketForm";


const Queens: FC  = () => {
    const CategoryName = "Queens";
    const link = '/queens';

    return (
        <>
          <h1>Матководство</h1>
            <ProductForm CategoryName={CategoryName} link={link}/>
            <InSideBasketForm/>
        </>
    );
};

export default Queens;