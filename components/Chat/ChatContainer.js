import Image from "next/image";
import classes from "./ChatContainer.module.css";
import Logout from "../Navigation/Logout";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getAllMessageRoute, sendMessageRoute } from "../../utils/APIRoutes";
import axios from "axios";
import { useSocket } from "../../store/SocketProvider";

function ChatContainer(props) {
  const { currentUser, currentChat, socket } = props;

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  // const socket = useSocket();

  const [isLoaded, setIsLoaded] = useState(false);

  // console.log(currentChat, "we have reached");

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
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  // console.log(messages);
  // console.log(socket.current, "hello men");
  // const isBreakpoint = useMediaQuery(480);


  return (
    <Fragment>
      
      {currentChat && <div className={classes.chat__container}>
        <div className={classes.chat__header}>
          <div className={classes.chat__avatar}>
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
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>}
    </Fragment>
  );
}

export default ChatContainer;
