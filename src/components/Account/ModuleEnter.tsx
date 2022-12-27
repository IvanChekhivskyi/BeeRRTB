import React, {FC} from 'react';
import {Button, Col, Modal, Row} from "react-bootstrap";

interface ModuleEnter {
    setEnter: (correct: boolean) => void;
    setShow?: (show: boolean) => void;
    enterCorrectOrder?: () => void;
    enterRemoveOrder?: () => void;
}

const ModuleEnter: FC<ModuleEnter> = ({setEnter, setShow, enterCorrectOrder, enterRemoveOrder}) => {

    const isCancel = () => setEnter(false);
    const isEnter = () => {
        setEnter(false);
        if(enterCorrectOrder) enterCorrectOrder();
        if(enterRemoveOrder) enterRemoveOrder();
        if (setShow) setShow(false);
    }

    return (
        <Modal

            show={true}
            onHide={isCancel}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Підтвердити внесені зміни
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col style={{display: "flex", justifyContent: "center"}}>
                        <Button
                            style={{width: 200}}
                            onClick={isCancel}
                            variant={"danger"}
                        >
                            Відмінити
                        </Button>
                    </Col>
                    <Col style={{display: "flex", justifyContent: "center"}}>
                        <Button
                            style={{width: 200}}
                            onClick={isEnter}
                            variant={"success"}
                        >
                            Підтвердити
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ModuleEnter;