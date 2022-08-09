import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Contacts.module.css";
import Profile from "./Profile";

function Contacts(props) {
  const { contacts, currentUser, changeChat } = props;
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const [imageFormShow, setImageFormShow] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.photo);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    // console.log(contact);
    setCurrentSelected(index);
    changeChat(contact);
  };

  const showImageFormHandler = () => {
    setImageFormShow(true);
  };

  const hideImageFormHandler = () => {
    setImageFormShow(false);
  };

  return (
    <Fragment>
      {imageFormShow && <Profile onClose={hideImageFormHandler} />}

      {currentUserImage && (
        <div className={classes.contacts}>
          <div className={classes.app__user}>
            <h2 className={classes.app__heading}>Mimos</h2>
            <Image
              className={classes.avatar}
              src={currentUserImage}
              alt="avatar"
              height={50}
              width={50}
              onClick={showImageFormHandler}
            />
          </div>

          {contacts.map((contact, index) => {
            return (
              <div
                className={`${classes.user__details} ${
                  index === currentSelected ? "selected" : ""
                }`}
                // className={classes.user__details}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <Image
                  className={classes.avatar}
                  src={contact.photo}
                  alt="avatar"
                  height={50}
                  width={50}
                />
                <h4>{contact.username}</h4>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}

export default Contacts;
