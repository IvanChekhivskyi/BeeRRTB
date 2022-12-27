import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {useTypedSelector} from "../hooks/useTypedSelector";


const Info: FC = () => {
    const ref = useTypedSelector(state => state.product.ref)
    return (
        <div style={{background:"darkgrey", height: 550}}>
            <Link to={ref.comeback}>
                <button style={{background: "green",
                    color: "yellow",
                    width: 50,
                    borderRadius: "10%",
                    position: "absolute",
                    bottom: "50%"}}>
                    back
                </button>
            </Link>
            <Container>
                <Row>
                   <Col style={{display: "flex", justifyContent: "center", justifyItems: "center"}}><h1>INFO</h1></Col>
                </Row>
                <Row>
                    <Col style={{background: "green", color: "yellow", display: "flex", justifyContent: "center"}}>
                        <div><h5>Опис</h5></div>
                    </Col>
                    <Col style={{background: "blue", color: "yellow" ,display: "flex", justifyContent: "center"}}>
                        <div><h5>Обговорення</h5></div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{background: "greenyellow"}}>
                        <div>опис, що має лежати в aboutProduct.dat файлі з вказівкою на частину тексу... фото..., які прив'язані до id: {ref.id}</div>
                    </Col>
                    <Col style={{background: "lightblue"}}>
                        <div>створити блог і прив'язати координацію у ньому до теми по id: {ref.id}</div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Info;