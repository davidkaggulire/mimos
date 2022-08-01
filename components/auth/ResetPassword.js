import { useEffect, useState, useRef, useReducer, Fragment } from "react";
import classes from "./ResetPassword.module.css";
import { emailReducer } from "./reducer";
import Input from "../UI/Input";
import LoadingSpinner from "../UI/LoadingSpinner";
import sendPasswordReset from "./sendPasswordReset";
import { Link, useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../UI/Notification";

const ResetPassword = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const emailInputRef = useRef();

  const { isValid: emailIsValid } = emailState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid);
    }, 500);

    // this runs as a clean up function
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (formIsValid) {
      setIsLoading(true);

      const email = emailState.value;
      const res = await sendPasswordReset(email);

      console.log(res);

      if (res.status === "success") {
        dispatch(
          uiActions.setNotification({
            status: "success",
            message: "Sent password Reset link to your email",
          })
        );

        setIsLoading(false);

        navigate("../auth", { replace: true });
      }  
      if(res.status === 'fail'){
        dispatch(
          uiActions.setNotification({
            status: "error",
            message: res.error.code,
          })
        );

        setIsLoading(false);
        navigate("../resetPassword", { replace: true });

      }
    } else {
      emailInputRef.current.focus();
    }
  };

  return (
    <Fragment>
    {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
    <div className={classes.form_section}>
      <h1 className={classes.heading}>Reset Password</h1>
      <form className={classes.resetform} onSubmit={submitHandler}>
        <div className={classes.control}>
          <Input
            ref={emailInputRef}
            id="email"
            label="Email"
            type="email"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Submit</button>}
          {isLoading && <LoadingSpinner />}
          {!isLoading &&<Link to="/auth">Cancel</Link>}
        </div>
      </form>
    </div>
    </Fragment>
  );
};

export default ResetPassword;
