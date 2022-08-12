import { Fragment, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import classes from "./../components/Users/EditProfile.module.css";
import Image from "next/image";
import { BsFillCameraFill, BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

function EditProfile() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

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

  const backToSettings = () => {
    router.push("/userProfile");
  };

  return (
    <Fragment>
      <div className={classes.top__section}>
        <div className={classes.heading}>
          <IoArrowBack
            onClick={backToSettings}
            className={classes.arrow__back}
          />
          <p>Info</p>
        </div>
        {isLoaded && (
          <div className={classes.image__container}>
            <Image
              className={classes.user__avatar}
              src={currentUser.photo}
              alt="avatar"
              width={50}
              height={50}
            />

            <BsFillCameraFill className={classes.icon} onClick={toggling} />
            {isOpen && (
              <nav className={classes.dropdown__container}>
                <ul className={classes.dropdown__ul}>
                  <li className={classes.dropdown__list}>File</li>
                  <li className={classes.dropdown__list}>Camera</li>
                </ul>
              </nav>
            )}

            <p>{currentUser.username}</p>
          </div>
        )}
      </div>
      {isLoaded && (
        <div className={classes.middle__section}>
          <div className={classes.details}>
            <div className={classes.details__item}>
              <BsFillPersonFill
                className={`${classes.details__icon} ${classes.username}`}
              />
              <p>Username</p>
            </div>
            <p>{currentUser.username}</p>
          </div>

          <div className={classes.details}>
            <div className={classes.details__item}>
              <MdEmail
                className={`${classes.details__icon} ${classes.email}`}
              />
              <p>Email</p>
            </div>
            <p>{currentUser.email}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default EditProfile;
