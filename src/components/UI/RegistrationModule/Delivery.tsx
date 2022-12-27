import React, {FC, useEffect, useState} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {AccountActionType} from "../../../types/typeAccount";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

//======================================================================================================================

interface UkrPoshtaProps {
    region?: string,
    district?: string,
    city?: string,
    street?: string,
    number?: string,
    zipcode?: string,
}

interface UkrPoshta {
    region: string,
    district: string,
    city: string,
    street: string,
    number: string,
    zipcode: string,
}


interface NovaPoshtaProps {
    methods?: string,
    postOffice?: string,
    city?: string,
    street?: string,
    number?: string,
}

interface NovaPoshta {
    methods: string,
    postOffice: string,
    city: string,
    street: string,
    number: string,
}

//======================================================================================================================

const Delivery: FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const dataListNovaPoshta = useTypedSelector(state => state.account.dataList.addressNovaPoshta)
    const dataListUkrPoshta = useTypedSelector(state => state.account.dataList.addressUkrPoshta)
    const [deliveryMethod, setDeliveryMethod]  = useState<string>('');
    const [visible, setVisible] = useState<boolean>(true);
    const [dataUkrPoshta, setDataUkrPoshta] = useState<UkrPoshta>({
        region: "",
        district: "",
        city: "",
        street: "",
        number: "",
        zipcode: ""
    })

    const [dataNovaPoshta, setDataNovaPoshta] = useState<NovaPoshta>({
        methods: "",
        postOffice: "",
        city: "",
        street: "",
        number: ""
    })

    const addDataUkrPoshta = (data: UkrPoshtaProps) => {
        if (data.region !== undefined && data.region !== ""){
            setDataUkrPoshta({...dataUkrPoshta, region: data.region});
        }
        if (data.district !== undefined && data.district !== ""){
            setDataUkrPoshta({...dataUkrPoshta, district: data.district});
        }
        if (data.city !== undefined && data.city !== ""){
            setDataUkrPoshta({...dataUkrPoshta, city: data.city});
        }
        if (data.street !== undefined && data.street !== ""){
            setDataUkrPoshta({...dataUkrPoshta, street: data.street});
        }
        if (data.number !== undefined && data.number !== ""){
            setDataUkrPoshta({...dataUkrPoshta, number: data.number});
        }
        if (data.zipcode !== undefined && data.zipcode !== ""){
            setDataUkrPoshta({...dataUkrPoshta, zipcode: data.zipcode});
        }

        dispatch({
            type: AccountActionType.ADD_DATA_LIST,
            payload:{
                addressUkrPoshta: {
                    region: dataUkrPoshta.region,
                    district: dataUkrPoshta.district,
                    city: dataUkrPoshta.city,
                    street: dataUkrPoshta.street,
                    number: dataUkrPoshta.number,
                    zipcode: dataUkrPoshta.zipcode,
                },
                deliveryMethod: deliveryMethod
            }
        });
    }


    const addDataNovaPoshta = (data: NovaPoshtaProps) => {
        if (data.methods !== undefined && data.methods !== ""){
            setDataNovaPoshta({...dataNovaPoshta, methods: data.methods});
        }
        if (data.postOffice !== undefined && data.postOffice !== ""){
            setDataNovaPoshta({...dataNovaPoshta, postOffice: data.postOffice});
        }
        if (data.city !== undefined && data.city !== ""){
            setDataNovaPoshta({...dataNovaPoshta, city: data.city});
        }
        if (data.street !== undefined && data.street !== ""){
            setDataNovaPoshta({...dataNovaPoshta, street: data.street});
        }
        if (data.number !== undefined && data.number !== ""){
            setDataNovaPoshta({...dataNovaPoshta, number: data.number});
        }

        dispatch({
            type: AccountActionType.ADD_DATA_LIST,
            payload:{
                addressNovaPoshta:{
                    postOffice: dataNovaPoshta.postOffice,
                    city: dataNovaPoshta.city,
                    street: dataNovaPoshta.street,
                    number: dataNovaPoshta.number
                },
                deliveryMethod: deliveryMethod
            }
        });
    }

//----------------------------------------------------------------------------------------------------------------------

    return (
        <Container>
            <Row>
                <Form.Group as={Col} controlId="formGridState" style={{marginBottom: 20}}>
                    <Form.Label><span style={{color: "lightgraygrey"}}>Спосіб доставки</span></Form.Label>
                    <Form.Select
                        defaultValue={""}
                        value={deliveryMethod}
                        onChange={(e: any) => setDeliveryMethod(e.currentTarget.value)}
                    >
                        <option  key={""} value={""}>Спосіб доставки</option>
                        <option  key={"NovaPoshta"} value={"NovaPoshta"}>Нова Пошта</option>
                        <option  key={"UkrPoshta"} value={"UkrPoshta"}>Укрпошта</option>
                        <option  key={"SelfDelivery"} value={"SelfDelivery"}>Самовивіз</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                {deliveryMethod === "UkrPoshta" &&
                <>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        Область: {dataUkrPoshta.region !== ""
                            ? <span style={{color: "green"}}> * </span>
                            : <span style={{color: "red"}}> * </span>
                        }
                        <input
                            style={{marginLeft: 5, width: "100%"}}
                            type={"text"}
                            defaultValue={dataListUkrPoshta?.region !== "" ? dataListUkrPoshta?.region : ""}
                            onChange={(event) =>  addDataUkrPoshta({region: event.target.value})}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        Район: {dataUkrPoshta.district !== ""
                            ? <span style={{color: "green"}}> * </span>
                            : <span style={{color: "red"}}> * </span>
                        }
                        <input
                            style={{marginLeft: 5, width: "100%"}}
                            type={"text"}
                            defaultValue={dataListUkrPoshta?.district !== "" ? dataListUkrPoshta?.district : ""}
                            onChange={(event) =>  addDataUkrPoshta({district: event.target.value})}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        Місто/село: {dataUkrPoshta.city !== ""
                        ? <span style={{color: "green"}}> * </span>
                        : <span style={{color: "red"}}> * </span>
                    }
                        <input
                            style={{marginLeft: 5, width: "100%"}}
                            type={"text"}
                            defaultValue={dataListUkrPoshta?.city !== "" ? dataListUkrPoshta?.city : ""}
                            onChange={(event) =>  addDataUkrPoshta({city: event.target.value})}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        Вулиця: {dataUkrPoshta.street !== ""
                        ? <span style={{color: "green"}}> * </span>
                        : <span style={{color: "red"}}> * </span>
                    }
                        <input
                            style={{marginLeft: 5, width: "100%"}}
                            type={"text"}
                            defaultValue={dataListUkrPoshta?.street !== "" ? dataListUkrPoshta?.street : ""}
                            onChange={(event) =>  addDataUkrPoshta({street: event.target.value})}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        Номер будину: {dataUkrPoshta.number !== ""
                        ? <span style={{color: "green"}}> * </span>
                        : <span style={{color: "red"}}> * </span>
                    }
                        <input
                            style={{marginLeft: 5, width: "100%"}}
                            type={"text"}
                            defaultValue={dataListUkrPoshta?.number !== "" ? dataListUkrPoshta?.number : ""}
                            onChange={(event) =>  addDataUkrPoshta({number: event.target.value})}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        Індекс: {dataUkrPoshta.zipcode !== ""
                        ? <span style={{color: "green"}}> * </span>
                        : <span style={{color: "red"}}> * </span>
                    }
                        <input
                            style={{marginLeft: 5, width: "100%"}}
                            type={"text"}
                            defaultValue={dataListUkrPoshta?.zipcode !== "" ? dataListUkrPoshta?.zipcode : ""}
                            onChange={(event) =>  addDataUkrPoshta({zipcode: event.target.value})}
                        />
                    </div>
                </>
                }
                {deliveryMethod === "NovaPoshta"&&
                    <>
                        <Form.Check type="checkbox" label="Самовивіз з відділення <<НоваПошта>>"  onClick={() => setVisible(!visible)}/>

                        <div style={{display: "flex", justifyContent: "right"}}>
                            Вибір відділення: {dataNovaPoshta.postOffice !== ""
                            ? <span style={{color: "green"}}> * </span>
                            : <span style={{color: "red"}}> * </span>
                        }
                            <input
                                style={{marginLeft: 5, width: "100%"}}
                                type={"text"}
                                defaultValue={dataListNovaPoshta?.postOffice !== "" ? dataListNovaPoshta?.postOffice : ""}
                                onChange={(event) =>  addDataNovaPoshta({postOffice: event.target.value})}
                            />
                        </div>

                        {visible &&
                            <>
                                <div style={{display: "flex", justifyContent: "right"}}>
                                    Місто/село: {dataNovaPoshta.city !== ""
                                    ? <span style={{color: "green"}}> * </span>
                                    : <span style={{color: "red"}}> * </span>
                                }
                                    <input
                                        style={{marginLeft: 5, width: "100%"}}
                                        type={"text"}
                                        defaultValue={dataListNovaPoshta?.city !== "" ? dataListNovaPoshta?.city : ""}
                                        onChange={(event) =>  addDataNovaPoshta({city: event.target.value})}
                                    />
                                </div>
                                <div style={{display: "flex", justifyContent: "right"}}>
                                    Вулиця: {dataNovaPoshta.street !== ""
                                    ? <span style={{color: "green"}}> * </span>
                                    : <span style={{color: "red"}}> * </span>
                                }
                                    <input
                                        style={{marginLeft: 5, width: "100%"}}
                                        type={"text"}
                                        defaultValue={dataListNovaPoshta?.street !== "" ? dataListNovaPoshta?.street : ""}
                                        onChange={(event) =>  addDataNovaPoshta({street: event.target.value})}
                                    />
                                </div>
                                <div style={{display: "flex", justifyContent: "right"}}>
                                    Номер будину: {dataNovaPoshta.number !== ""
                                    ? <span style={{color: "green"}}> * </span>
                                    : <span style={{color: "red"}}> * </span>
                                }
                                    <input
                                        style={{marginLeft: 5, width: "100%"}}
                                        type={"text"}
                                        defaultValue={dataListNovaPoshta?.number !== "" ? dataListNovaPoshta?.number : ""}
                                        onChange={(event) =>  addDataNovaPoshta({number: event.target.value})}
                                    />
                                </div>
                            </>
                        }

                    </>
                }
                {deliveryMethod === "SelfDelivery" &&
                    <>Контакти представника компанії для узгодження зустрічі</>
                }
            </Row>
        </Container>
    );
};

export default Delivery;