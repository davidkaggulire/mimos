import { useRouter } from "next/router";
import { BiPowerOff } from "react-icons/bi";
import classes from './Logout.module.css';

function Logout() {
  const router = useRouter();
    const handleClick = async() => {
        localStorage.clear();
        router.push("/login")
    }
  return (
    <button className={classes.logout}>
      <BiPowerOff className={classes.power} onClick={handleClick}/>
    </button>
  );
}

export default Logout;
