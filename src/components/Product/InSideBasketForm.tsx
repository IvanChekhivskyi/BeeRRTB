import React, {FC, useState} from 'react';
import {Basket, Trash} from "react-bootstrap-icons";
import {Button, Col, Container, Offcanvas, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {ProductActionType} from "../../types/typeProduct";
import {useTypedSelector} from "../../hooks/useTypedSelector";
// @ts-ignore
import {basket_form, remove_btn} from "../../pages/Style";


const InSideBasketForm: FC = (): JSX.Element => {
    const arrBasket = useTypedSelector(state => state.product.product)
    const totalCost = useTypedSelector(state => state.product.totalCost)
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const openOrClose = () => setIsOpen(!isOpen);
    const removeProduct = (id: string) => dispatch({type: ProductActionType.REMOVE_PRODUCT, payload: {id: id}});

    const correctQuantity = (id: string, stateQuantity: number, value: number) => {
        if (stateQuantity > value) {
            if (value > 0) {
                dispatch({type:ProductActionType.CORRECT_PRODUCT, payload:{id: id, quantity: value}});
            }else dispatch({type:ProductActionType.CORRECT_PRODUCT, payload:{id: id, quantity: 1}});
        }else dispatch({type:ProductActionType.CORRECT_PRODUCT, payload:{id: id, quantity: stateQuantity}});
    }

    dispatch({type: ProductActionType.ALERT_TOTAL_COST});

    return (
        <>
            <Offcanvas show={isOpen} placement={'end'} onHide={openOrClose} className={basket_form}>
                        <button
                            style={{
                                width: 30,
                                height: 30,
                                backgroundColor: "#093ADAFF",
                                borderRadius: "50%",
                                position: "absolute",
                                bottom: "50%",
                                left: -40,
                                display: "flex",
                                justifyContent: "center"
                            }}
                            onClick={openOrClose}
                        >
                            <Basket color={"yellow"} size={20}/>
                        </button>
                        <div style={{position: "relative", left: 5}}>
                            <Container>
                                {arrBasket.length !== 0
                                    ?   <>{arrBasket.map(product =>
                                            <Row style={{borderBottom: "1px solid black"}}>
                                                <Col>
                                                    {product.name}
                                                </Col>
                                                <Col>
                                                    {product.price}
                                                </Col>
                                                <Col>
                                                    <p style={{color: "darkred"}}>{product.stateQuantity}:(<span style={{color: "green"}}>{product.stateQuantity - product.quantity}</span>)</p>
                                                </Col>
                                                <Col style={{width: 60}}>
                                                    <input
                                                        style={{width: 60}}
                                                        type={"number"}
                                                        value={product.quantity}
                                                        onChange={(event) => correctQuantity(product.id, product.stateQuantity, Number(event.target.value))}
                                                        min={1}
                                                    />
                                                </Col>
                                                <Col>
                                                    {Number(product.price) * Number(product.quantity)}
                                                </Col>
                                                <Col>
                                                    <button
                                                        style={remove_btn}
                                                        type={"button"}
                                                        onClick={() => removeProduct(product.id)}
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
                                    ?   <><Row style={{background:"gold", marginBottom: 5, marginTop: 10}}>
                                            <Col>
                                                Сумма
                                            </Col>
                                            <Col>
                                                {totalCost}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Link to={'/basket'}>
                                                <Button
                                                    style={{position: "relative", left: "70%"}}
                                                    size={"sm"}
                                                    variant={"success"}
                                                >
                                                    У кошик
                                                </Button>
                                            </Link>
                                        </Row></>
                                   :    <></>
                                }
                            </Container>
                        </div>
                </Offcanvas>
            {isOpen
                ?<></>
                :   <button
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: "#2a7019",
                            borderRadius: "50%",
                            position: "absolute",
                            right: "0%",
                            bottom: "50%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        onClick={openOrClose}
                    >
                        <Basket color={"yellow"} size={20}/>
                    </button>
            }
        </>
    );
};

export default InSideBasketForm;