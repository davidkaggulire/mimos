import { Fragment, useState } from "react";
import classes from "./ResetPassword.module.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { forgotPassword } from "../../utils/APIRoutes";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const [values, setValues] = useState({
    email: ""
  });

  const router = useRouter();

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validate = () => {
    const { email } = values;
    if (!email.includes('@')) {
      toast.error(
        "Email should contain '@'",
        toastOptions
      );
      return false;
    } 

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const { email } = values;
      console.log("clicked");

      const response = await fetch(forgotPassword, {
        method: "POST",
        body: JSON.stringify({
          email
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
        router.push("/login");
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
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <div className={classes.button__holder}>
            <button type="submit" className={classes.button}>
              Reset Password
            </button>
            <span className={classes.switch}>
              <Link href="/login">
                <a>Cancel</a>
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default ResetPassword;
