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

function ChatPhoneContainer() {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
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
  }, [setCurrentUser, router]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, {
        withCredentials: true,
      });
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    setCurrentChat(JSON.parse(localStorage.getItem("messaging-user")));
  }, [setCurrentChat]);

  console.log(currentChat, "we have reached");
  console.log(currentUser);

  useEffect(() => {
    async function fetchSelectedUser() {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
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

    console.log(socket.current, "hello men");

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
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const viewChatsHandler = () => {
    router.push('/chat');
  }

  return (
    <Fragment>
      {currentChat && (
        <div className={classes.chat__container}>
          <div className={classes.chat__header}>
            <div className={classes.chat__avatar}>
            <IoArrowBack onClick={viewChatsHandler}/>
              <Image
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
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
            {messages.map((message) => {
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
            })}
          </div>
          <div className={classes.chat_input}>
            <ChatPhoneInput handleSendMsg={handleSendMsg} />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default ChatPhoneContainer;
