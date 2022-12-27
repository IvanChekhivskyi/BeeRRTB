import React from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Col, Container, Row} from "react-bootstrap";

const AccountData: React.FC = () => {
    const dataList = useTypedSelector(state => state.account.dataList);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        id-Телефон: {dataList.phone}
                    </Col>
                    <Col>
                        Прізвище: {dataList.surname}
                    </Col>
                    <Col>
                        Ім'я: {dataList.firstName}
                    </Col>
                    <Col>
                        По-батькові: {dataList.middleName}
                    </Col>
                    <Col>
                        Nike у форумі: {dataList.username}
                    </Col>
                </Row>
                <Row>
                    <Row>Спосіб доставки: {dataList.deliveryMethod}</Row>
                    <Row>
                        <Col sm={2}>Адреса:</Col>
                        {dataList.deliveryMethod === "NovaPoshta" &&
                            <Col>
                                {dataList.addressNovaPoshta?.postOffice} |
                                {dataList.addressNovaPoshta?.city} |
                                {dataList.addressNovaPoshta?.street} |
                                {dataList.addressNovaPoshta?.number}
                            </Col>
                        }
                        {dataList.deliveryMethod === "UkrPoshta" &&
                            <Col>
                                {dataList.addressUkrPoshta?.region} |
                                {dataList.addressUkrPoshta?.district} |
                                {dataList.addressUkrPoshta?.city} |
                                {dataList.addressUkrPoshta?.street} |
                                {dataList.addressUkrPoshta?.number} |
                                {dataList.addressUkrPoshta?.zipcode}
                            </Col>
                        }
                    </Row>
                </Row>
            </Container>
        </>
    );
};

export default AccountData;