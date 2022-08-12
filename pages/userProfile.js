import Image from "next/image";
import { useEffect, useState } from "react";
import classes from "./../components/Users/UserProfile.module.css";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import { MdAccountCircle } from "react-icons/md";
import { BsFillChatFill, BsBellFill } from "react-icons/bs";

function UserProfile() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function setUser() {
      if (!localStorage.getItem("chat-user")) {
        router.push("/login");
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem("chat-user")));
        setIsLoaded(true);
      }
    }
    setUser();
  }, [setIsLoaded, setCurrentUser]);

  console.log(currentUser);

  const viewMainChat = () => {
    router.push("/chat");
  };

  return (
    <div>
      {isLoaded && (
        <div className={classes.window}>
          <div className={classes.heading}>
            <IoArrowBack
              onClick={viewMainChat}
              className={classes.arrow__back}
            />
            <p>Settings</p>
          </div>

          <div className={classes.top}>
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
        </div>
      )}
      <nav>
        <ul className={classes.list__container}>
          <li className={classes.list}>
            <div className={classes.list__item}>
              <MdAccountCircle
                className={`${classes.list__profile} ${classes.icon}`}
              />
              <p>Edit profile</p>
            </div>
          </li>

          <li className={classes.list}>
            <div className={classes.list__item}>
              <BsFillChatFill
                className={`${classes.list__chat} ${classes.icon}`}
              />
              <p>Chat Settings</p>
            </div>
          </li>

          <li className={classes.list}>
            <div className={classes.list__item}>
              <BsBellFill
                className={`${classes.list__notification} ${classes.icon}`}
              />
              <p>Notifications and sounds</p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default UserProfile;
