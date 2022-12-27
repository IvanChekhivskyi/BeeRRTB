import React, {FC} from 'react';
import ProductForm from "../components/Product/ProductForm";
import InSideBasketForm from "../components/Product/InSideBasketForm";


const ProductionBee: FC = () => {
    const CategoryName = "ProductionBee";
    const link = '/production';
    
    return (
        <>
            <h1>Продукція бджільництва</h1>
            <ProductForm CategoryName={CategoryName} link={link}/>
            <InSideBasketForm/>
        </>
    );
};

export default ProductionBee;