import React, {FC, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Trash} from "react-bootstrap-icons";
import {AccountActionType, HistoryOrderArray} from "../../types/typeAccount";
import {useDispatch} from "react-redux";
import ModuleEnter from "./ModuleEnter";
import {content_center, content_center_header, remove_btn} from "../../pages/Style"


interface Props {
    infoOrder: HistoryOrderArray[];
    idOrder: string;
    setShow: (show: boolean) => void;
    setRedraw: (redraw: string) => void;
}

const CorrectOrderForm: FC<Props> = ({infoOrder,idOrder, setShow, setRedraw}) => {
    const dispatch = useDispatch();
    const [correct, setCorrect] = useState<string>(idOrder);
    const [data, setData] = useState<HistoryOrderArray[]>();
    const [enterCorrect, setEnterCorrect] = useState<boolean>(false)

    const removeProduct = (id: string) => {
                const changed: any = data?.map(elem => elem.productList !== undefined
                        ?   {...elem, productList: elem.productList.filter(product => product.id !== id)}
                        :   elem
                    )
                setData(changed);
    }

    const enterCorrectOrder = () => {
        if(data !== undefined) {
            dispatch({type: AccountActionType.CORRECT_HISTORY_ORDER, payload: data[0]})
            setEnterCorrect(false);
            setCorrect("");
            setShow(false);
            setRedraw("");
        }
    }

    const correctQuantity = (id: string, stateQuantity: number, value: number) => {
        if (data !== undefined) {
            if (stateQuantity > value) {
                if (value > 0) {
                   const correctedData: any[] = data.map(elem => elem.productList !== undefined
                                            ?  {...elem, productList: elem.productList.map(product => product.id === id
                                                       ?   {...product, quantity: value,}
                                                       :   product
                                                    )
                                                }

                                            :   {elem}
                                       )
                    setData(correctedData)

                } else {
                    const correctedData: any = data.map(elem => elem.productList !== undefined
                        ? {...elem, productList: elem.productList.map(product => product.id === id
                                ? {...product, quantity: 1}
                                : product
                            )
                        }
                        : {elem}
                    )
                    setData(correctedData);
                }
            }else {
                const correctedData: any = data.map(elem => elem.productList !== undefined
                    ? {
                        ...elem, productList: elem.productList.map(product => product.id === id
                            ? {...product, quantity: stateQuantity}
                            : product
                        )
                    }
                    : {elem}
                )
                setData(correctedData);
            }
        }
    }

    useEffect(() => {
        if (data !== undefined) {
            const correctCost: any[] = data.map(elem => elem.productList !== undefined
                ? {
                    ...elem, totalCost: elem.productList.map(product => (product.price * product.quantity)).reduce(
                        (accumulator, currentValue) => accumulator + currentValue, 0)
                }
                : {elem}
            )
            setData(correctCost)
        }
    },[data])


    useEffect(() => {
        if(correct !== ""){
            const order = infoOrder.filter(order => order.idOrder === correct);
            setData(order);
        }
    }, [correct])

    return (
        <>
            <Container style={{width: 1136, position: "relative", left: 12}}>
                {data?.map(info =>
                    <Row>
                        <Row style={{display: "center", justifyContent: "right", background: "grey"}}>
                            <Col sm={2}>
                                <span style={{color:"green"}}>
                                    "Прийнято"
                                </span>
                            </Col>
                            <Col sm={6}>
                                Замовлення № {info.idOrder}
                            </Col>
                            <Col sm={2} style={{background: "#595959", position: "relative", right: -12, display: "flex", justifyContent: "center"}}>
                                <span style={{color: "white"}}>{info.date.getDate()}.{info.date.getMonth()}.{info.date.getFullYear()} - {info.date.getHours()}:{info.date.getMinutes()}</span>
                            </Col>
                        </Row>
                        <Row style={{border: "1px solid lightgrey", marginBottom: -1, background: "silver"}}>
                            <Col sm={1} style={content_center_header}>
                                id
                            </Col>
                            <Col sm={5} style={content_center_header}>
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
                                        <Col sm={5}>
                                            {product.name}
                                        </Col>
                                        <Col sm={2} style={content_center}>
                                            {product.price}
                                        </Col>
                                        <Col sm={2} style={content_center}>
                                            <input
                                                style={{width: 60}}
                                                type={"number"}
                                                value={product.quantity}
                                                onChange={(event) => correctQuantity(product.id, product.stateQuantity, Number(event.target.value))}
                                                min={1}
                                            />
                                        </Col>
                                        <Col sm={2} style={content_center}>
                                            <span style={{position: "relative", left: 10}}>
                                                {product.price * product.quantity}
                                            </span>
                                            <button
                                                style={{...remove_btn, position: "relative", left: 60, top: 3}}
                                                type={"button"}
                                                onClick={() => removeProduct(product.id)}
                                            >
                                                <Trash color={"red"} size={20}/>
                                            </button>
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
            </Container>
            <Button onClick={() => setEnterCorrect(true)}>Підтвердити</Button>
            {enterCorrect &&
                <ModuleEnter
                    setEnter={setEnterCorrect}
                    setShow={setShow}
                    enterCorrectOrder={enterCorrectOrder}
                />
            }
        </>
    );
};

export default CorrectOrderForm;