import {useDispatch} from "react-redux";
import {Button} from "react-bootstrap";
import {AccountActionType} from "../../../types/typeAccount";
import {Link} from "react-router-dom";


export const ButtonsRegistration = () => {
    const dispatch = useDispatch();
    return(
      <>
          <Link to={'/account'}>
          <Button
              onClick={() => dispatch({
                  type: AccountActionType.ENTER_LOGIN,
                  payload: {
                      phone: "",
                      password: "",
                      login: false,
                      registration: true
                  }
              })}
          >
            Реєстрація
          </Button>
          </Link>
      </>
    );
}