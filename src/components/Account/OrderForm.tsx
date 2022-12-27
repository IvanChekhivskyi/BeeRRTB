import React, {FC, useEffect, useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {AccountActionType, HistoryOrderArray} from "../../types/typeAccount";
import {Trash} from "react-bootstrap-icons";
import CorrectOrderForm from "./CorrectOrderForm";
import ModuleEnter from "./ModuleEnter";
import {useDispatch} from "react-redux";
// @ts-ignore
import {content_center, content_center_header, remove_btn} from "../../pages/Style"



interface OrderType {
    infoOrder: HistoryOrderArray[],
}

const OrderForm: FC<OrderType> = ({infoOrder}): JSX.Element => {
    const dispatch = useDispatch();
    const [correct, setCorrect] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [enter, setEnter] = useState<boolean>(false)
    const [removeOrderID, setRemoveOrderID] = useState<string>("");

    const removeOrder = () => {
        dispatch({type: AccountActionType.REMOVE_ORDER, payload: {idOrder: removeOrderID} });
        setRemoveOrderID("");
    }

    useEffect(() => {if (removeOrderID !== "") setEnter(!enter); },[removeOrderID])
    useEffect(() => {if(correct !== "") setShow(!show); }, [correct])

    return (
        <>
        <Container>
            {infoOrder.length === 0
                ?  <h1>Інформація відсутня</h1>

                :   <Row>
                        <Row><Col>{infoOrder[0].id}</Col></Row>
                    {infoOrder.map(info =>
                        <Row>
                            <Row style={{display: "center", justifyContent: "right", background: "grey"}}>
                                <Col sm={2}>
                                    <span style={{color:
                                            info.status === "finished"
                                                ? "lightgrey"
                                                : info.status === "accepted"
                                                    ?"lightgreen"
                                                    : "blue" }}>
                                    {info.status === "finished"
                                        ? "Виконано"
                                        : info.status === "accepted"
                                            ?"Прийнято"
                                            : "Затверджено і виконується" }
                                    </span>
                                </Col>
                                <Col sm={6}>
                                    Замовлення № {info.idOrder}
                                </Col>
                                {info.status === "accepted"
                                    ? <>  <Col sm={1} style={{marginRight: 35}}>
                                                <Button
                                                    size={"sm"}
                                                    onClick={() => setCorrect(info.idOrder)}
                                                    variant={"success"}

                                                >
                                                    Редагувати
                                                </Button>
                                        </Col>
                                        <Col>
                                            <button
                                                style={{...remove_btn, position: "relative", top: 3}}
                                                type={"button"}
                                                onClick={() => setRemoveOrderID(info.idOrder)}
                                            >
                                                <Trash color={"red"} size={20}/>
                                            </button>
                                        </Col>
                                    </>
                                    :<Col sm={2}></Col>
                                }
                                <Col sm={2} style={{background: "#595959", position: "relative", right: -12, display: "flex", justifyContent: "center"}}>
                                    <span style={{color: "white"}}>{info.date.getDate()}.{info.date.getMonth()}.{info.date.getFullYear()} - {info.date.getHours()}:{info.date.getMinutes()}</span>
                                </Col>
                            </Row>
                            <Row style={{border: "1px solid lightgrey", marginBottom: -1, background: "silver"}}>
                                <Col sm={1} style={content_center_header}>
                                    id
                                </Col>
                                <Col style={content_center_header}>
                                    Назва товару
                                </Col>
                                <Col sm={2} style={content_center_header}>
                                    Ціна, грн./од.
                                </Col>
                                <Col sm={2} style={content_center_header}>
                                    Кількість, од.
                                </Col>
                                <Col sm={2} style={content_center}>
                                    Вартість, грн.
                                </Col>
                            </Row>
                            {info.productList.length !== undefined
                                ?  <> {info.productList.map(product =>
                                        <Row style={{border: "1px solid lightgrey", marginBottom: -1}}>
                                            <Col sm={1} style={content_center}>
                                                {product.id}
                                            </Col>
                                            <Col>
                                                {product.name}
                                            </Col>
                                            <Col sm={2} style={content_center}>
                                                {product.price}
                                            </Col>
                                            <Col sm={2} style={content_center}>
                                                {product.quantity}
                                            </Col>
                                            <Col sm={2} style={content_center}>
                                                {product.price * product.quantity}
                                            </Col>
                                        </Row>
                                    )} </>

                                :   <></>
                        }
                            <Row style={{display: "flex", justifyContent: "right", marginBottom: 25}}>
                                <Col sm={1} style={{borderBottom: "1px solid lightgrey", borderLeft: "1px solid lightgrey", background: "#b66c25"}}>
                                    Сумма:
                                </Col>
                                <Col sm={3} style={{borderBottom: "1px solid lightgrey", borderRight: "1px solid lightgrey", background: "#d2d291", marginRight: -12}}>
                                    <span style={{color: "darkblue"}}>{info.totalCost}</span>
                                </Col>
                            </Row>
                        </Row>
                    )}
                </Row>
            }
        </Container>

            <Modal
                size={"xl"}
                show={show}
                       onHide={() => setShow(!show)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Внесіть зміни до замовлення...
                    </Modal.Title>
                </Modal.Header>
                <CorrectOrderForm
                    infoOrder={infoOrder}
                    idOrder={correct}
                    setRedraw={setCorrect}
                    setShow={setShow}
                />
            </Modal>
            {enter  &&  <ModuleEnter
                            enterRemoveOrder={removeOrder}
                            setEnter={setEnter}
                        />
            }

        </>
    );
};

export default OrderForm;