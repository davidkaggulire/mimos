import { Fragment } from "react";
import Head from "next/head";
import LoginForm from "../components/auth/LoginForm";

function LoginPage() {

  return (
    <Fragment>
      <Head>
        <title>Login page</title>
        <meta name="description" content="Login form" />
      </Head>

      <LoginForm />
    </Fragment>
  );
}

export default LoginPage;
