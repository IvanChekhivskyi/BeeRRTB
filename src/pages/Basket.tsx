import React, {useState} from 'react';
import {Trash} from "react-bootstrap-icons";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {ProductActionType} from "../types/typeProduct";
import PlaceOrderProductForm from "../components/Product/PlaceOrderProductForm";
// @ts-ignore
import {col_head_style, remove_btn} from "./Style"

const Basket = () => {
    const arrBasket = useTypedSelector(state => state.product.product);
    const totalCost = useTypedSelector(state => state.product.totalCost);
    const [show, setShow] = useState<boolean>(false);
    const [showAccept, setShowAccept] = useState<boolean>(false);
    const dispatch = useDispatch();

//__________________________________Описати наадсилання замовлення у БД_________________________________________________
    const sendOrder = () => {
        dispatch({type: ProductActionType.CLINE_LIST_PRODUCT});
    }
//______________________________________________________________________________________________________________________

    const ShowModuleOrder = () => setShow(!show);
    const ShowModuleAccepted = () => {setShowAccept(false); sendOrder();}
    const IsOrderAccepted = () => {setShow(false); setShowAccept(true);}


    const correctQuantity = (id: string, stateQuantity: number, value: number) => {
        if (stateQuantity > value) {
            if (value > 0) {
                dispatch({type:ProductActionType.CORRECT_PRODUCT, payload:{id: id, quantity: value}});
            }else dispatch({type:ProductActionType.CORRECT_PRODUCT, payload:{id: id, quantity: 1}});
        }else dispatch({type:ProductActionType.CORRECT_PRODUCT, payload:{id: id, quantity: stateQuantity}});
    }

    dispatch({type: ProductActionType.ALERT_TOTAL_COST});

    return (
        <div>
            <h1>Basket</h1>
            <>
                <Container fluid>
                    <Row style={{background: "lightgray", border: "1px solid black", marginBottom: -1}}>
                        <Col style={col_head_style}>Назва</Col>
                        <Col sm={2} style={col_head_style}>Ціна, грн/одн.</Col>
                        <Col sm={2} style={col_head_style}>В наявності, одн.</Col>
                        <Col sm={2} style={col_head_style}>Кількість, одн.</Col>
                        <Col sm={2} style={col_head_style}>Вартість, грн</Col>
                        <Col sm={1} style={{...col_head_style, width: 40}}></Col>
                    </Row>
                    {arrBasket.length !== 0
                        ?   <>{arrBasket.map(product =>
                            <Row style={{border: "1px solid black", marginBottom: -1}}>
                                <Col>
                                    {product.name}
                                </Col>
                                <Col sm={2} style={col_head_style}>
                                    {product.price}
                                </Col>
                                <Col sm={2} style={col_head_style}>
                                    <p style={{color: "darkred"}}>{product.stateQuantity}:(<span style={{color: "green"}}>{product.stateQuantity - product.quantity}</span>)</p>
                                </Col>
                                <Col sm={2} style={col_head_style}>
                                    <input
                                        style={{width: 60}}
                                        type={"number"}
                                        value={product.quantity}
                                        onChange={(event) => correctQuantity(product.id, product.stateQuantity, Number(event.target.value))}
                                        min={1}
                                    />
                                </Col>
                                <Col sm={2} style={col_head_style}>
                                    {Number(product.price) * Number(product.quantity)}
                                </Col>
                                <Col sm={1} style={{...col_head_style, width: 40}}>
                                    <button
                                        style={remove_btn}
                                        type={"button"}
                                        onClick={() => dispatch({
                                                                        type: ProductActionType.REMOVE_PRODUCT,
                                                                        payload:{id: product.id}
                                                                    })}
                                    >
                                        <Trash color={"red"} size={20}/>
                                    </button>
                                </Col>
                            </Row>
                        )}
                        </>

                        : <h6>Товари відсутні</h6>
                    }
                    {arrBasket.length !== 0
                        ?   <>
                                <Row style={{background:"gold", marginBottom: 5, marginTop: 10}}>
                                    <Col>
                                        Сумма
                                    </Col>
                                    <Col>
                                        {totalCost}
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 30}}>
                                    <Col>
                                        <Link to={'/bee'}>
                                            <Button
                                                style={{position: "relative", left: "10%"}}
                                                size={"sm"}
                                                variant={"primary"}
                                            >
                                                Продовжити покупки
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col>
                                            <Button
                                                style={{position: "relative", left: "60%"}}
                                                size={"sm"}
                                                variant={"success"}
                                                onClick={ShowModuleOrder}
                                            >
                                                Перейти до оформлення
                                            </Button>
                                    </Col>
                                </Row>
                            </>
                        :    <><Link to={'/head'}>
                                    <button
                                        style={{
                                            background: "green",
                                            color: "yellow",
                                            width: 50,
                                            borderRadius: "10%",
                                            position: "absolute",
                                            bottom: "50%"
                                        }}
                                    >
                                        Head
                                    </button>
                            </Link></>
                    }
                </Container>
            </>
            <>
                <Modal size={"xl"} show={show} onHide={ShowModuleOrder}>
                    <PlaceOrderProductForm IsOrderAccepted={IsOrderAccepted} ShowModuleOrder={ShowModuleOrder}/>
                </Modal>
                <Modal show={showAccept} onHide={ShowModuleAccepted}>
                    <h3 style={{color: "darkred"}}>Замовлення прийнято!</h3>
                    <h5 style={{color: "lightblue"}}>Очікуйте зворотнього звязку протягом вказаного терміну...</h5>
                    <h2 style={{color: "red"}}>Дякуємо за ваш вибір!!!</h2>
                </Modal>
            </>
        </div>
    );
};

export default Basket;