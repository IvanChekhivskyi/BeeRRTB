import React, {useEffect, useState} from 'react';
import {Navbar, NavLink, Nav, NavbarBrand, Button} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import {LinkArray} from "./LinkArray";
import {Link} from "react-router-dom";
import {Children} from "./Children_TabsPage";
import {useDispatch} from "react-redux";
import {AccountActionType} from "../../types/typeAccount";
import {BasketFill} from "react-bootstrap-icons";
import ModuleLogin from "../UI/ModuleLogin";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ButtonsRegistration} from "../UI/Buttons/ButtonsRegistration";


const NaviBar = () => {
    const dispatch = useDispatch();
    const [openPage, setOpenPage] = useState<string>("");
    const [clickLogin, setClickLogin] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const isLogin = useTypedSelector(state => state.account.login.login);

    const SigneOut = () =>  dispatch({type: AccountActionType.SIGN_OUT});

    useEffect(() => {
        if(isLogin) {
            setShow(false)
        }else setShow(true)
    }, [isLogin])

    return (
        <>
            <Navbar collapseOnSelect expand={"xl"} bg={"dark"} variant={"dark"}>
                <NavbarBrand>World of Bee</NavbarBrand>
                <NavbarToggle aria-controls={"responsive-navbar-nav"}/>
                <NavbarCollapse  id={"responsive-navbar-nav"}>
                    <Nav fill variant="tabs" defaultActiveKey="/home">
                    <>
                        {LinkArray.map(link =>
                            <NavLink eventKey={link.path} onClick={() => setOpenPage(link.path)}>
                                <Link to={link.path}>{link.component}</Link>
                            </NavLink>
                        )}
                    </>
                    </Nav>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        {isLogin
                            ?   <Button
                                    variant={"danger"}
                                    style={{marginLeft: 10}}
                                    onClick={SigneOut}
                                >
                                    Вихід
                                </Button>

                            :   <>
                                    <ButtonsRegistration/>
                                    <Button
                                        variant={"success"}
                                        style={{marginLeft: 10}}
                                        onClick={() => setClickLogin(true)}
                                    >
                                        Вхід
                                    </Button>
                                </>
                        }
                        <Link to={'/basket'}>
                            <Button
                                style={{position: "relative", left: "70%"}}
                                variant={"success"}
                            >
                                <BasketFill/>
                            </Button>
                        </Link>
                    </div>
                </NavbarCollapse>
            </Navbar>
            <Navbar collapseOnSelect expand={"xl"} bg={"dark"} variant={"dark"} style={{display: "flex", justifyContent: "right"}}>
                {Children(openPage)}
            </Navbar>
            {show && <ModuleLogin show={clickLogin} setShow={setClickLogin}/>}
        </>
    );
};

export default NaviBar;