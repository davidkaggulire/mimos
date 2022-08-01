import { Fragment } from "react";
import Head from "next/head";
import SignUp from "../components/auth/SignupForm";

function SignUpPage() {
  return (
    <Fragment>
      <Head>
        <title>Create account</title>
        <meta name="description" content="Signup form" />
      </Head>

      <SignUp />
    </Fragment>
  );
}

export default SignUpPage;
