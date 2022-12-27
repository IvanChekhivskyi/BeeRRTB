import React, {FC, useState} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Delivery from "./Delivery";
import {AccountActionType} from "../../../types/typeAccount";


interface Data {
    phone?: string,
    surname?: string,
    firstName?: string,
    middleName?: string,
    username?: string,
    password?: string,
    passwordEnter?: string,
    deliveryMethod?: string
}

interface Props {
    notRegistration?: boolean | undefined,
}

const RegistrationForm: FC<Props> = ({notRegistration}): JSX.Element => {
    const dispatch = useDispatch();
    const clientData = useTypedSelector(state => state.account.dataList)
    const [DataList, setDataList] = useState<Data>({
        phone: "",
        surname: "",
        firstName: "",
        middleName: "",
        username: "",
        password: "",
        passwordEnter: "",
        deliveryMethod: "",
    })


    const addClientData = (data: Data) => {
        if (data.phone !== undefined && data.phone.length === 13){
            setDataList({...DataList, phone: data.phone});
        }
        if (data.surname !== undefined){
            setDataList({...DataList, surname: data.surname});
        }
        if (data.firstName !== undefined){
            setDataList({...DataList, firstName: data.firstName});
        }
        if (data.middleName !== undefined){
            setDataList({...DataList, middleName: data.middleName});
        }

    //--------------------------тільки при реєстрації--------------------------------
        if(notRegistration !== true){
            if (data.username !== undefined){
                setDataList({...DataList, username: data.username});
            }
            if (data.password !== undefined){
                setDataList({...DataList, password: data.password});
            }
            if (data.passwordEnter !== undefined){
                setDataList({...DataList, passwordEnter: data.passwordEnter});
            }
        }
    //--------------------------------------------------------------------------------

        dispatch({
            type: AccountActionType.ADD_DATA_LIST,
            payload:{
                phone: DataList.phone,
                surname: DataList.surname,
                firstName: DataList.firstName,
                middleName: DataList.middleName,
                username: DataList.username,
                password: DataList.password
            }
        })
    }



    return (
        <>
            <Container>
                <Row style={{marginRight: 20}}>
                    <Form>
                        <div style={{display: "flex", justifyContent: "right", marginBottom: 20}}>
                            Тел.: {DataList.phone?.length === 13 || clientData.phone !== ""
                                ? <span style={{color: "green"}}> *</span>
                                : <span style={{color: "red"}}> *</span>
                            }
                            <input
                                style={{width: 140, marginLeft: 5}}
                                type={"tel"}
                                maxLength={13}
                                defaultValue={clientData.phone !== "" ? clientData.phone : "+380"}
                                onChange={(event) => addClientData({phone: event.target.value})}
                            />
                        </div>

                        <div style={{display: "flex", justifyContent: "right", marginBottom: 10}}>
                            Прізвище:  {DataList.surname?.length !== 0 || clientData.surname !== ""
                                ? <span style={{color: "green"}}> *</span>
                                : <span style={{color: "red"}}> *</span>
                            }
                            <input
                                style={{marginLeft: 5, width: 350}}
                                type={"text"}
                                defaultValue={clientData.surname !== "" ? clientData.surname : ""}
                                onChange={(event) => addClientData({surname: event.target.value})}
                            />
                        </div>

                        <div style={{display: "flex", justifyContent: "right", marginBottom: 10}}>
                            Ім'я:  {DataList.firstName?.length !== 0 || clientData.firstName !== ""
                                ? <span style={{color: "green"}}> *</span>
                                : <span style={{color: "red"}}> *</span>
                            }
                            <input
                                style={{marginLeft: 5, width: 350}}
                                type={"text"}
                                defaultValue={clientData.firstName !== "" ? clientData.firstName : ""}
                                onChange={(event) => addClientData({firstName: event.target.value})}
                            />
                        </div>

                        <div style={{display: "flex", justifyContent: "right", marginBottom: 20}}>
                            По-батькові: {DataList.middleName?.length !== 0 || clientData.middleName !== ""
                                ? <span style={{color: "green"}}> *</span>
                                : <span style={{color: "red"}}> *</span>
                            }
                            <input
                                style={{marginLeft: 5, width: 350}}
                                type={"text"}
                                defaultValue={clientData.middleName !== "" ? clientData.middleName : ""}
                                onChange={(event) => addClientData({middleName: event.target.value})}
                            />
                        </div>

            {/*-------------------------------------тільки при реєстрації------------------------------------------------*/}
                {notRegistration !== true &&
                    <>
                        <div style={{display: "flex", justifyContent: "right", marginBottom: 15}}>
                            Псевдонім у форумі: {DataList.username?.length !== 0 || clientData.username !== ""
                                ? <span style={{color: "green"}}> *</span>
                                : <span style={{color: "red"}}> *</span>
                            }
                            <input
                                style={{marginLeft: 5, width: 350}}
                                type={"text"}
                                defaultValue={clientData.username !== undefined ? clientData.username : ""}
                                onChange={(event) => addClientData({username: event.target.value})}
                            />
                        </div>

                        <div style={{display: "flex", justifyContent: "right", marginBottom: 15}}>
                            Пароль: {(DataList.password === DataList.passwordEnter) && DataList.password?.length !== 0
                                ? <span style={{color: "green"}}> *</span>
                                : <>{DataList.password === "" ? <span style={{color: "red"}}> *</span> : <span style={{color: "blue"}}> *</span>}</>
                            }
                            <input
                                style={{marginLeft: 5, width: 350}}
                                type={"password"}
                                defaultValue={DataList.password !== "" ? DataList.password : ""}
                                onChange={(event) => addClientData({password: event.target.value})}
                            />
                        </div>
                        <div style={{display: "flex", justifyContent: "right", marginBottom: 15}}>
                            Підтвердіть пароль: {(DataList.password === DataList.passwordEnter) && DataList.password?.length !== 0
                                ? <span style={{color: "green"}}> *</span>
                                : <>{DataList.passwordEnter === "" ? <span style={{color: "red"}}> *</span> : <span style={{color: "blue"}}> *</span>}</>
                            }
                            <input
                                style={{marginLeft: 5, width: 350}}
                                type={"password"}
                                defaultValue={""}
                                onChange={(event) => addClientData({passwordEnter: event.target.value})}
                            />
                        </div>
                    </>
                }
            {/*----------------------------------------------------------------------------------------------------------*/}
                    </Form>
                </Row>
            </Container>
            <Container>
                <Delivery/>
            </Container>

        </>
    );
};

export default RegistrationForm;