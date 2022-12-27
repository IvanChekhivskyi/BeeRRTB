import {Facebook, Skype, Telegram, Twitter} from "react-bootstrap-icons";
import {FC} from "react";

interface ButtonsSocialNetworks {
    phoneNumber: string;
}

export const ButtonsTwitter: FC<ButtonsSocialNetworks> = ({phoneNumber}): JSX.Element => {
    const CallTwitter = () => console.log("call: " + phoneNumber + "twitter")
    return(
        <>
            <button
                type={"button"}
                style={{width: 35, height: 35, justifyContent: "center", borderRadius: 50}}
                onClick={CallTwitter}
            >
                <Twitter size={25} color={"royalblue"} style={{position: "relative", left: -8}}/>
            </button>
        </>
    );
}

export const ButtonFacebook: FC<ButtonsSocialNetworks> = ({phoneNumber}): JSX.Element => {
    const CallFacebook = () => console.log("call: " + phoneNumber + "facebook")
    return(
        <>
            <button
                type={"button"}
                style={{width: 35, height: 35, justifyContent: "center", borderRadius: 50}}
                onClick={CallFacebook}
            >
                <Facebook size={25} color={"royalblue"} style={{position: "relative", left: -9, top: -1}}/>
            </button>
        </>
    );
}

export const ButtonTelegram: FC<ButtonsSocialNetworks> = ({phoneNumber}): JSX.Element => {
    const CallTelegram = () => console.log("call: " + phoneNumber + "telegram")
    return(
        <>
            <button
                type={"button"}
                style={{width: 35, height: 35, justifyContent: "center", borderRadius: 50}}
                onClick={CallTelegram}
            >
                <Telegram size={25} color={"royalblue"} style={{position: "relative", left: -9, top: -1}}/>
            </button>
        </>
    );
}

export const ButtonSkype: FC<ButtonsSocialNetworks> = ({phoneNumber}): JSX.Element => {
    const CallSkype = () => console.log("call: " + phoneNumber + "skype")
    return(
        <>
            <button
                type={"button"}
                style={{width: 35, height: 35, justifyContent: "center", borderRadius: 50}}
                onClick={CallSkype}
            >
                <Skype size={25} color={"royalblue"} style={{position: "relative", left: -9, top: -1}}/>
            </button>
        </>
    );
}