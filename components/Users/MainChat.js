import classes from "./MainChat.module.css";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getAllUsersRoute, host } from "../../utils/APIRoutes";
import { useRouter } from "next/router";
import ChatContainer from "../Chat/ChatContainer";
import PhoneContacts from "./PhoneContact";
import { useSocket } from "../../store/SocketProvider";

function MainChat() {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  const socket = useSocket();

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
        setToken(localStorage.getItem("token"));
        setIsLoaded(true);
      }
    }
    setUser();
  }, [setIsLoaded, setCurrentUser, router]);

  // useEffect(() => {
  //   async function setUser() {
  //     if (!localStorage.getItem("chat-user")) {
  //       router.push("/login");
  //     } else {
  //       setIsLoaded(true);
  //     }
  //   }

  //   setUser();
  // }, [currentUser, setIsLoaded]);

  useEffect(() => {
    if (currentUser) {
      console.log(socket.current);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function getUsers() {
      if (currentUser) {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

          const url = `${getAllUsersRoute}/${currentUser._id}`;

          const response = await axios.get(
            `${getAllUsersRoute}/${currentUser._id}`,
            { headers: headers }
          );

          setAllUsers(response.data);
        } catch (error) {
          console.log(error);
        }
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
