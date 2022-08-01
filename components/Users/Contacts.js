import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import classes from "./Contacts.module.css";

function Contacts(props) {
  const { contacts, currentUser, changeChat } = props;
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.photo);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    console.log(contact);
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <Fragment>
      <div className={classes.contacts}>
        <h2 className={classes.app__heading}>Mimos</h2>
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
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="avatar"
                height={50}
                width={50}
              />
              <h4>{contact.username}</h4>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}

export default Contacts;
