import { Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import classes from "./SignupForm.module.css";
import Link from "next/link";
import { registerRoute } from "../../utils/APIRoutes";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useRouter } from "next/router";
import LoadingSpinner from "../UI/LoadingSpinner";

function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmType, setPasswordConfirmType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const togglePasswordConfirm = () => {
    if (passwordConfirmType === "password") {
      setPasswordConfirmType("text");
      return;
    }
    setPasswordConfirmType("password");
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const { password, passwordConfirm, email, username } = values;

    if (password !== passwordConfirm) {
      toast.error("Passwords should match", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should contain at least 3 characters",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email can't be empty", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setIsLoading(true);
      const { password, username, email, passwordConfirm } = values;
      const response = await fetch(registerRoute, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          email,
          passwordConfirm,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      const data = await response.json();
      console.log(data);

      if (data.status === "error") {
        console.log("failed");
        toast.error(data.message, toastOptions);
      }

      if (data.status === "success") {
        console.log("success");
        localStorage.setItem("chat-user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.token);
        router.push("/chat");
        setIsLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <div className={classes.form_div}>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className={classes.form}
        >
          <div className={classes.brand}>
            <h1 className={classes.app_heading}>Mimos</h1>
          </div>
          <input
            className={classes.input}
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <div className={classes.password__input}>
            <input
              className={classes.input}
              type={passwordType}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            {passwordType === "password" ? (
              <FaRegEyeSlash
                className={classes.toggle__btn}
                onClick={togglePassword}
              />
            ) : (
              <FaRegEye
                className={classes.toggle__btn}
                onClick={togglePassword}
              />
            )}
          </div>
          <div className={classes.password__input}>
            <input
              className={classes.input}
              type={passwordConfirmType}
              placeholder="Confirm password"
              name="passwordConfirm"
              onChange={handleChange}
            />

            {passwordConfirmType === "password" ? (
              <FaRegEyeSlash
                className={classes.toggle__btn}
                onClick={togglePasswordConfirm}
              />
            ) : (
              <FaRegEye
                className={classes.toggle__btn}
                onClick={togglePasswordConfirm}
              />
            )}
          </div>
          {isLoading && <LoadingSpinner className={classes.center__spin} />}
          {!isLoading && (
            <button type="submit" className={classes.button}>
              Create User
            </button>
          )}
          <span className={classes.switch}>
            Already have an account ?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer className={classes.toast} />
    </Fragment>
  );
}

export default SignUp;
