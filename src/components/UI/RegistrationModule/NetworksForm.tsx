import React, {FC} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {ButtonFacebook, ButtonSkype, ButtonsTwitter, ButtonTelegram} from "../Buttons/ButtonsSocialNetworks";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const NetworksForm: FC = (): JSX.Element => {
    const phone = useTypedSelector(state => state.account.dataList.phone)
    return (
        <Container>
            <Col sm={1}>
                <Row>Зворотній звязок:</Row>
                <Row>
                    {phone !== undefined &&
                    <Col style={{margin: 10}}>
                        <Row style={{justifyContent: "center"}}>
                            <ButtonsTwitter phoneNumber={phone}/>
                        </Row>
                        <Row style={{justifyContent: "center"}}>
                            <ButtonFacebook phoneNumber={phone}/>
                        </Row>
                        <Row style={{justifyContent: "center"}}>
                            <ButtonTelegram phoneNumber={phone}/>
                        </Row>
                        <Row style={{justifyContent: "center"}}>
                            <ButtonSkype phoneNumber={phone}/>
                        </Row>
                    </Col>
                    }
                </Row>
            </Col>
        </Container>
    );
};

export default NetworksForm;