import React, {FC, useEffect, useState} from 'react';
import {Row, Col, Form, Card, Button, Container} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {AccountActionType} from "../../types/typeAccount";
import ModuleLogin from "../UI/ModuleLogin";
import NetworksForm from "../UI/RegistrationModule/NetworksForm";
import RegistrationForm from "../UI/RegistrationModule/RegistrationForm";
import {ButtonsRegistration} from "../UI/Buttons/ButtonsRegistration";


interface PlaceOrderProductForm {
    IsOrderAccepted: () => void,
    ShowModuleOrder: () => void,
}

const PlaceOrderProductForm: FC<PlaceOrderProductForm> = ({IsOrderAccepted, ShowModuleOrder}): JSX.Element => {

    const dispatch = useDispatch();
    const textEvent = {text: "Event-text"};
    const [isEventText, setIsEventText] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const isLogin = useTypedSelector(state => state.account.login.login);
    const productList = useTypedSelector(state => state.product.product);
    const totalCost = useTypedSelector(state => state.product.totalCost)
    const dataList = useTypedSelector(state => state.account.dataList)
    const [clickLogin, setClickLogin] = useState<boolean>(false);

    const OrderAccepted = () => {
        const dataNow: Date = new Date();
        if(isLogin) dispatch({
            type:  AccountActionType.ADD_HISTORY_ORDER,
            payload: {
                id: dataList.phone,
                productList: productList,
                date: dataNow,
                totalCost: totalCost
            }
        });
        console.log(dataNow)
        IsOrderAccepted();
    };

    useEffect(() => {
        if(isLogin) setClickLogin(false);}, [isLogin, clickLogin])

    return (
            <Container style={{margin: 10}}>
                <Row style={{justifyContent: "center"}}>
                    <Col sm={2}><NetworksForm/></Col>

                    <Col>
                        <Row>
                            {isEventText
                                ?   <Form style={{height: 30, display: "flex", justifyContent: "center", margin: 10, background: "#bebeb3"}}>
                                        {textEvent.text}
                                    </Form>
                                :   <Form style={{height: 30}}></Form>
                            }
                        </Row>
                        <Row>
                            <RegistrationForm notRegistration={true}/>
                        </Row>
                    </Col>
                    <Col sm={4}>

                        <Row style={{height: 150}}>
                            {(!isLogin && isVisible) &&
                                <Card style={{width: 340, position: "relative", marginTop: 12, marginBottom: 12}}>
                                    <p style={{border: "1px solid lightgrey", marginBottom: 1, textAlign: "justify", marginTop: 5}}>
                                        Авторизуйтеся і отримайте змогу переглядати історію і поточний стан виконання ваших замовлень
                                    </p>
                                    <Row style={{display: "flex", justifyContent: "center", marginTop: 2}}>
                                        <Col sm={2} style={{width: "55%", display: "flex", justifyContent: "center"}}>
                                            <ButtonsRegistration/>
                                        </Col>
                                        <Col sm={2} style={{width: "35%", display: "flex", justifyContent: "center"}}>
                                            <Button variant={"success"} onClick={() => setClickLogin(true)}>Увійти</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            }
                        </Row>
                    <Row>
                        { !isLogin &&
                            <Form.Check
                                type="checkbox"
                                label="Продовжити без авторизації"
                                onClick={() => setIsVisible(!isVisible)}
                            />
                        }
                    </Row>
                    </Col>
                </Row>
                <Row>
                    <Col style={{display: "flex", justifyContent: "center", margin: 10}}>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={ShowModuleOrder}
                        >
                            Повернутися
                        </Button>
                    </Col>
                    <Col style={{display: "flex", justifyContent: "center", margin: 10}}>
                        <Button
                            variant="success"
                            type="button"
                            onClick={OrderAccepted}
                        >
                            Підтвердити замовлення
                        </Button>
                    </Col>
                </Row>
                {clickLogin && <ModuleLogin show={true}/>}
            </Container>
    );
};

export default PlaceOrderProductForm;

