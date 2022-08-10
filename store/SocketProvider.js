import { useRouter } from "next/router";
import { createContext, useContext, useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { host } from "../utils/APIRoutes";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const socket = useRef();
  socket.current = io(host, {
    withCredentials: true,
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
