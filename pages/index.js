import { Fragment } from "react";
import Layout from "../components/Layout/Layout";
import Navigation from "../components/Navigation/Navigation";
// import { calculateRemainingTime } from "../store/retrieveStoredToken";

const Home = () => {
  return (
    <Fragment>
      <Navigation />
      <Layout />
    </Fragment>
  );
};

export default Home;
