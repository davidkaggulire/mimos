import Image from "next/image";
import Link from "next/link";
import Sidebar from "../UI/Sidebar";
import classes from "./Menu.module.css";
import { MdSettings } from "react-icons/md";
import { BiPowerOff } from "react-icons/bi";
import { useRouter } from "next/router";

function Menu(props) {
  const { currentUser } = props;
  const router = useRouter();
  console.log(currentUser);

  const handleLogout = async () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Sidebar onClose={props.onClose}>
      {/* <div> */}
      <nav className={classes.sidebar}>
        <div className={classes.user__container}>
          <Image
            className={classes.user__avatar}
            src={currentUser.photo}
            alt="avatar"
            height={50}
            width={50}
            // onClick={showImageFormHandler}
          />
          <h3>{currentUser.username}</h3>
        </div>
        <ul className={classes.side__element}>
          <li className={classes.side__link}>
            <Link href="/userProfile">
              <div className={classes.actions}>
                <MdSettings className={classes.side__icon} />
                Settings
              </div>
            </Link>
          </li>
          <li className={classes.side__link} onClick={handleLogout}>
            <div className={classes.actions} onClick={handleLogout}>
              <BiPowerOff className={classes.logout__icon} />
              Logout
            </div>
          </li>
        </ul>
      </nav>
      {/* </div> */}
    </Sidebar>
  );
}

export default Menu;
