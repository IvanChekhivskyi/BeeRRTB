import React, {FC, useState} from 'react';
import {Button, CloseButton, Col, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
// @ts-ignore
import {form_module_style, form_cost_style, form_price_style} from "../../pages/Style";

//======================================================================================================================

interface ProductModule {
    show: boolean,
    setShow: (show: boolean) => void,
    infoProduct: {id: string, price: number, stateQuantity: number, quantity: number, name: string},
    quantity: number,
    setQuantity: (quantity: number) => void,
    addProductInBasket: () => void,
}

const ProductModule: FC<ProductModule> = ({show, setShow, quantity, setQuantity, infoProduct, addProductInBasket}) => {
    const [errorQuantity, setErrorQuantity] = useState(" ");
    const inputQuantity = (value: number) => {setErrorQuantity(" "); setQuantity(value);}

//----------------------------------------------------------------------------------------------------------------------

    const addQuantity = () => {
        if(0 < quantity && quantity < infoProduct.stateQuantity + 1){
            setShow(false);
            addProductInBasket();
        }else setErrorQuantity("Недопустиме значення!!!");
    }

//----------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Modal
                show={show}
            >
                <ModalHeader>
                    <ModalTitle>
                        <Col>{infoProduct.name}</Col>
                        <Col><h6 style={{color: "green"}}>* В наявності: <span style={{color: "darkred"}}>{infoProduct.stateQuantity}:(<span style={{color: "green"}}>{infoProduct.stateQuantity - quantity}</span>)</span></h6></Col>
                    </ModalTitle>
                        <CloseButton onClick={() => setShow(false)} style={{width: 10, height: 10}} />
                    </ModalHeader>
                <ModalBody>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: 10}}>
                        <form style={form_module_style}>Ціна за одиницю / грн.</form>
                        <form style={{...form_module_style, color: "darkred"}}>{errorQuantity}</form>
                        <form style={form_module_style}>Вартість  / грн.</form>
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <form style={form_price_style}>{infoProduct.price}</form>
                        <input
                            style={{width: 140, background: "lightblue", borderRadius: 5}}
                            value={quantity}
                            type={"number"}
                            onChange={(event) => inputQuantity(Number(event.target.value))}
                            min={1}
                            max={infoProduct.stateQuantity}
                        />
                        <form style={form_cost_style}>{Number(infoProduct.price) * Number(quantity)}</form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant={"success"}
                        onClick={addQuantity}
                    >
                        Купити
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ProductModule;
