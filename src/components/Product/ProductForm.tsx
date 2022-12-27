import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {arrBee, arrMead, arrQueens} from "./productArray";
import {Button, Col, Container, Row, Tooltip,OverlayTrigger} from "react-bootstrap";
import {Link} from "react-router-dom";
import ProductModule from "./ProductModule";
import {Info} from "react-bootstrap-icons";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ProductActionType} from "../../types/typeProduct";
// @ts-ignore
import {containerStyle, info_btn} from "../../pages/Style"

//======================================================================================================================

interface ProductForm {
    CategoryName: string;
    link: string;
}

interface infoProduct {
    id: string,
    price: number,
    stateQuantity: number,
    quantity: number,
    name: string
}

interface arr {
    id: string,
    price: number,
    stateQuantity: number,
    name: string,
    then: string
}

//======================================================================================================================

const ProductForm: FC<ProductForm> = ({CategoryName, link}): JSX.Element => {
    const dispatch = useDispatch();
    const [arr, setArr]= useState<arr[]>([] );
    const [correctQuantity, setCorrectQuantity] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [infoProduct, setInfoProduct] = useState<infoProduct>({id: "", price: 0, stateQuantity: 0, quantity: 0, name: ""});
    const arrBasket = useTypedSelector(state => state.product.product);
    const info = [  {id: "1Q", text: "опис 1"},
                    {id: "2Q", text: "опис 2"},
                    {id: "3Q", text: "опис 3"},
                 ]

//----------------------------------------------------------------------------------------------------------------------

    const textAboutProduct = (id:string) => {
        for(let i = 0; i < info.length; i++){
            if (info[i].id === id){
                if(info[i].text !== "") {
                    return (<>{info[i].text}</>);
                }else return (<>Опис відсутній</>);
            }
        }

    }

//----------------------------------------------------------------------------------------------------------------------

    const giveValueQuantity = (id: string) => {
        for(let i = 0; i < arrBasket.length; i++){
            if(arrBasket[i].id === id){
                    setQuantity(arrBasket[i].quantity)
            }
        }
    }


//----------------------------------------------------------------------------------------------------------------------

    const clickAddProduct = (id: string, name: string, stateQuantity: number, price: number) => {
        if(id !== " ") {
            if(arrBasket.some(product => product.id === id)) {
                giveValueQuantity(id);
                setInfoProduct({
                    id: id,
                    name: name,
                    price: price,
                    stateQuantity:
                    stateQuantity,
                    quantity: quantity
                });
                setShow(true);
                setCorrectQuantity(true);
            }else{
                setInfoProduct({
                    id: id,
                    name: name,
                    price: price,
                    stateQuantity: stateQuantity,
                    quantity: 1
                });
                setQuantity(1);
                setShow(true);
                setCorrectQuantity(false);
            }
        } else return("Error Id");
    }

//----------------------------------------------------------------------------------------------------------------------

    const addProductInBasket = () => {
        if(correctQuantity){
            for (let i = 0; i < arrBasket.length; i++){
                if(arrBasket[i].id === infoProduct.id){
                    dispatch({
                        type: ProductActionType.CORRECT_PRODUCT,
                        payload: {
                            id: infoProduct.id,
                            name: infoProduct.name,
                            stateQuantity: infoProduct.stateQuantity,
                            quantity: quantity,
                            price: infoProduct.price
                        }
                    });
                    dispatch({type: ProductActionType.ALERT_TOTAL_COST})
                }
            }
        }else
            dispatch({
                type: ProductActionType.ADD_PRODUCT,
                payload: {
                    id: infoProduct.id,
                    name: infoProduct.name,
                    stateQuantity: infoProduct.stateQuantity,
                    quantity: quantity,
                    price: infoProduct.price
                }
            });
            dispatch({type: ProductActionType.ALERT_TOTAL_COST});
    }

//----------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        if(CategoryName === "Bee"){
            setArr(arrBee);
        }else

        if(CategoryName === "ProductionBee"){
            setArr(arrMead);
        }else

        if(CategoryName === "Queens"){
            setArr(arrQueens);
        }
    }, [CategoryName])

//----------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <div style={containerStyle}>
                <Container fluid style={{background: "white"}} >
                    {arr.map(position =>
                        <div id={position.id}>
                            <Row style={{border: "lightgray ridge 0.1px"}} className="justify-content-md-center">
                                <Col>
                                    <div>{position.name}</div>
                                </Col>
                                <Col xs={"auto"}>
                                    <div>{position.price}</div>
                                </Col>
                                <Col xs={"auto"}>
                                    <div>
                                        <Link to={'/info'}>
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip>
                                                        {textAboutProduct(position.id) !== undefined
                                                            ? textAboutProduct(position.id)
                                                            : <>Опис відсутній</>
                                                        }
                                                    </Tooltip>
                                                }
                                            >
                                                <button
                                                    style={info_btn}
                                                    type={"button"}

                                                    onClick={() => dispatch({
                                                        type: ProductActionType.OPEN_INFO_PRODUCT,
                                                        payload: {id: position.id, comeback: link}
                                                    })}
                                                >
                                                    <Info color={"blue"} size={20}/>
                                                </button>
                                            </OverlayTrigger>
                                        </Link>
                                    </div>
                                </Col>
                                <Col xs={"auto"}>
                                    <div>
                                        <Button
                                            variant={"success"}
                                            onClick={() => clickAddProduct(
                                                position.id,
                                                position.name,
                                                position.stateQuantity,
                                                position.price
                                            )}
                                        >
                                            Додати у кошик
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>

                <ProductModule
                    show={show}
                    setShow={setShow}
                    infoProduct={infoProduct}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    addProductInBasket={addProductInBasket}
                />
            </div>
        </>
    );
};

export default ProductForm;