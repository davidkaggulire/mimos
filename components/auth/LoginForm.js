import { Fragment, useState } from "react";

import Link from "next/link";
import classes from "./LoginForm.module.css";
import { toast, ToastContainer } from "react-toastify";

import { useRouter } from "next/router";
import { loginRoute } from "../../utils/APIRoutes";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import LoadingSpinner from "../UI/LoadingSpinner";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const router = useRouter();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const { password, username } = values;
    if (username.length < 3) {
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
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setIsLoading(true);
      const { password, username } = values;
      console.log("clicked");

      const response = await fetch(loginRoute, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      const data = await response.json();
      console.log(data);

      if (data.status === "fail") {
        console.log("failed");
        toast.error(data.message, toastOptions);
      }

      if (data.status === "success") {
        console.log("success");
        localStorage.setItem("chat-user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.token);
        router.push("/chat");
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
            min="3"
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

          {isLoading && <LoadingSpinner />}
          {!isLoading && (
            <button type="submit" className={classes.button}>
              Login
            </button>
          )}
          <span className={classes.switch}>
            Don't have an account ?{" "}
            <Link href="/signup">
              <a>Register</a>
            </Link>
          </span>

          <span className={classes.resetPassword}>
            <Link href="/passwordReset">
              <a>Forgot Password?</a>
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AuthForm;
