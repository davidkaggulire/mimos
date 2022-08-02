import classes from "./MainChat.module.css";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getAllUsersRoute, host } from "../../utils/APIRoutes";
import { useRouter } from "next/router";
import ChatContainer from "../Chat/ChatContainer";
import { io } from "socket.io-client";
import PhoneContacts from "./PhoneContact";

function MainChat() {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const socket = useRef();

  // console.log(io(host));
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, [updateTarget, width]);

    return targetReached;
  };

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
  }, [setIsLoaded, setCurrentUser, router]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, {
        withCredentials: true,
      });
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function getUsers() {
      if (currentUser) {
        const response = await axios.get(
          `${getAllUsersRoute}/${currentUser._id}`
        );
        // console.log(response);

        setAllUsers(response.data);
      }
    }

    getUsers();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const isBreakpoint = useMediaQuery(600);
  // console.log(currentChat);

  return (
    <Fragment>
      {!isBreakpoint ? (
        <div className={classes.main__page}>
          <Contacts
            contacts={allUsers}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />

          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      ) : (
        <div className={classes.main__page}>
          <PhoneContacts
            contacts={allUsers}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
        </div>
      )}
    </Fragment>
  );
}

export default MainChat;
