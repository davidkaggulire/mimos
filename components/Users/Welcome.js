import classes from "./Welcome.module.css";
import logo from "../../assets/robot.gif";
import Image from "next/image";

function Welcome(props) {
  const { currentUser } = props;
  console.log(currentUser.username);
  return (
    <div className={classes.welcome}>
      <Image
        src={logo}
        alt="Robot"
        className={classes.image}
        height={200}
        width={300}
      />
      <h1>
        Welcome,{" "}
        <span className={classes.username}>{currentUser.username}</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </div>
  );
}

export default Welcome;
