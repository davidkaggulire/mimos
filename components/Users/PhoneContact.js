import Image from "next/image";
import { Router, useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import classes from "./Contacts.module.css";

function PhoneContacts(props) {
  const { contacts, currentUser, changeChat } = props;
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.photo);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    // console.log(contact);
    setCurrentSelected(index);
    localStorage.setItem("messaging-user", JSON.stringify(contact));
    changeChat(contact);
    
    router.push('/phoneChat');
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
    </Fragment>
  );
}

export default PhoneContacts;
