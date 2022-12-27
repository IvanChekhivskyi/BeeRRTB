import React, {FC, useEffect, useState} from 'react';
import AccountList from "../components/Account/AccountList";
import ModuleLogin from "../components/UI/ModuleLogin";
import {useTypedSelector} from "../hooks/useTypedSelector";
import RegistrationForm from "../components/UI/RegistrationModule/RegistrationForm";
import {Button, Row, Container, Col} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {AccountActionType} from "../types/typeAccount";
import {Link} from "react-router-dom";


const Account: FC  = () => {
    const dispatch = useDispatch();
    const show = useTypedSelector(state => state.account.login.login)
    const registration = useTypedSelector(state => state.account.login?.registration)
    const dataList = useTypedSelector(state => state.account.dataList)
    const [error, setError] = useState<boolean>(false);


    const EnterData = () => {
        if(dataList.phone !== "" && dataList.password !== ""){
            dispatch({
                type: AccountActionType.ENTER_LOGIN,
                payload: {
                    phone: dataList?.phone,
                    password: dataList?.password,
                    login: true,
                    registration: false
                }
            })
        }else setError(true);
    }
    console.log(show)
    console.log(registration)
    useEffect(() => {
       if (error) {
           setTimeout(() => {
               setError(false);
           }, 1000);
       }
    },[error])

    return (
        <>
            {registration === true
                ?   <Container>
                        <Col sm={2}>
                            <Link to={'/head'}>
                                <Button
                                    style={{position: "absolute", top: "50%", left:0}}
                                    onClick={() => dispatch({
                                        type: AccountActionType.ENTER_LOGIN,
                                        payload: {
                                            phone: "",
                                            password: "",
                                            login: false,
                                            registration: false
                                        }
                                    })}
                                >
                                    На головну
                                </Button>
                            </Link>
                        </Col>
                        <Col style={{marginTop: 30}}>
                            <Row><RegistrationForm/></Row>
                            <Row>
                                <Button
                                    variant={error ? "danger" : "success"}
                                    onClick={EnterData}
                                >
                                    Підтвердити
                                </Button>
                            </Row>
                        </Col>
                    </Container>

                :   <>
                        <AccountList/>
                        <ModuleLogin show={!show}/>
                    </>
            }

        </>
    );
};

export default Account;