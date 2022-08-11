import Image from "next/image";
import classes from "./ChatPhoneContainer.module.css";
import Logout from "../Navigation/Logout";
import { v4 as uuidv4 } from "uuid";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  getAllMessageRoute,
  host,
  sendMessageRoute,
} from "../../utils/APIRoutes";
import axios from "axios";
import { io } from "socket.io-client";
import ChatPhoneInput from "./ChatPhoneInput";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import logo from "./../../assets/robot.gif";
import { useSocket } from "../../store/SocketProvider";

function ChatPhoneContainer() {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkFetchedMsgs, setCheckFetchedMsgs] = useState(false);

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  // const socket = useRef();
  const router = useRouter();

  const socket = useSocket();

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
  }, [setCurrentUser, router]);

  useEffect(() => {
    if (currentUser) {
      // socket.current = io(host, {
      //   withCredentials: true,
      // });
      console.log(socket);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    setCurrentChat(JSON.parse(localStorage.getItem("messaging-user")));
  }, [setCurrentChat]);

  // console.log(currentChat, "we have reached");
  // console.log(currentUser);

  useEffect(() => {
    async function fetchSelectedUser() {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        
        setMessages(response.data);

        if(messages.length === 0){
          setCheckFetchedMsgs(false);
        }
        setCheckFetchedMsgs(true);
        setIsLoaded(true);
      }
    }

    fetchSelectedUser();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    // console.log(socket.current, "hello men");

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [arrivalMessage, socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    console.log(scrollRef);
    scrollRef.current?.scrollIntoView({ behaviour: "smooth"});
  }, [messages, scrollRef]);

  const viewChatsHandler = () => {
    router.push("/chat");
  };

  const messageLength = messages.length;

  return (
    <Fragment>
      {currentChat && (
        <div className={classes.chat__phone_container}>
          <div className={classes.chat__header}>
            <div className={classes.chat__avatar}>
              <IoArrowBack onClick={viewChatsHandler} />
              <Image
                src={currentChat.photo}
                alt="avatar"
                height={50}
                width={50}
                className={classes.avatar}
              />
              {isLoaded && <h3> {currentChat.username}</h3>}
            </div>
            <div>
              <Logout />
            </div>
          </div>
          <div className={classes.chat__messages}>
            {messageLength === 0 && checkFetchedMsgs ? (
              <div className={classes.welcome}>
                <Image
                  src={logo}
                  alt="Robot"
                  className={classes.image}
                  height={200}
                  width={300}
                />
                <p className={classes.welcome__message}>
                  Hi,{" "}
                  <span className={classes.username}>
                    {currentUser.username}
                  </span>
                </p>
                <p>Type a message to start chatting</p>
              </div>
            ) : (
              messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`${classes.message} ${
                        message.fromSelf
                          ? `${classes.sended}`
                          : `${classes.received}`
                      }`}
                    >
                      <div className={classes.content}>
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <ChatPhoneInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </Fragment>
  );
}

export default ChatPhoneContainer;
