import React, {FC, useEffect, useState} from 'react';
import {Button, CloseButton, Col, Container, Modal, ModalBody, ModalHeader, ModalTitle, Row} from "react-bootstrap";
import {AccountActionType} from "../../types/typeAccount";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {fetchAPI} from "../../store/action-creators/API_Account";


interface ModuleLogin {
    show?: boolean | undefined;
    setShow?: (show: boolean) => void;
}

interface InputValue {
    tel?: string;
    pass?: string;
}

const ModuleLogin: FC<ModuleLogin> = ({show, setShow}) => {
    const dispatch = useDispatch();
    const dataList = useTypedSelector(state => state.account.dataList);
    const arrayAPI = useTypedSelector(state => state.API.accountArray);
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [clickLogin, setClickLogin] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(true);


    const input = ({tel, pass}: InputValue) => {
        if(tel !== undefined) setPhone(tel);
        if(pass !== undefined) setPassword(pass);
    }
    useEffect(() => {
        if(arrayAPI.length === 0){
        // @ts-ignore
            dispatch(fetchAPI());
        }
    },[])


    useEffect(() => {
        if(show === true){
            setIsShow(true);
        } else
            if (show === false) {
            setIsShow(false);
        }
    },[show])

    useEffect(() => {
        if(!isShow && setShow) {
            setShow(false);
        }
    },[isShow])

    useEffect(() => {

//--------------------------для роботи з АРІ---------------------------------
       /* if (dataList.phone === ""){
            for (let i = 0; i < arrayAPI.length; i++) {
                if (arrayAPI[i].phone === phone) {
                    dispatch({
                        type: AccountActionType.ADD_DATA_LIST,
                        payload: {
                              phone: arrayAPI[i].phone,
                              name: arrayAPI[i].name,
                              username: arrayAPI[i].username,
                              street: arrayAPI[i].address.street,
                              suite: arrayAPI[i].address.suite,
                              city: arrayAPI[i].address.city,
                              password: arrayAPI[i].address.zipcode,
                        }
                    })
                }
            }
        }
*/
//--------------------------------------------------------------------------------------------
        if(clickLogin && password !== ""){
           if((password === dataList.password)&&(phone === dataList.phone)){
                dispatch({type: AccountActionType.ENTER_LOGIN, payload: {login: true}});
                setIsShow(false);
           }
        }
    }, [password, phone, clickLogin])

    return (
        <>
            <Modal show={isShow}>
                <ModalHeader><ModalTitle>Вхід</ModalTitle><CloseButton onClick={() => setIsShow(!isShow)}/></ModalHeader>
                <ModalBody>
                    <Container style={{marginBottom: 15}}>
                        <Row>
                            Телефон:
                            <input
                                onChange={(event) => input({tel: event.target.value})}
                            />
                        </Row>
                        <Row>
                            Пароль:
                            <input
                                onChange={(event) => input({pass: event.target.value})}
                            />
                        </Row>
                    </Container>
                    <Row>
                        <Button variant={"success"} onClick={() => setClickLogin(!clickLogin)}> Увійти </Button>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ModuleLogin;